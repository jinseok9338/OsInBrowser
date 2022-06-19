use crate::hooks::use_measure::use_measure;
use crate::hooks::use_raf_state::use_raf_state;
use gloo_console::log;
use js_sys::Function;
use wasm_bindgen::prelude::Closure;
use wasm_bindgen::JsCast;
use web_sys::MouseEvent;
use web_sys::{window, HtmlDivElement};
use yew::{use_effect_with_deps, NodeRef};

// https://codesandbox.io/s/sleepy-sammet-qu1vvk?file=/src/App.js
// https://stackoverflow.com/questions/62600433/calculate-new-width-on-resize-for-a-react-hook
// import React, { useEffect, useState, useRef } from "react";
// import "./styles.css";

// export default function App() {
//   const [isResizable, setIsResizable] = useState(false);
//   const [newWidth, setIsNewWidth] = useState(500);
//   const divRef = useRef(null);

//   function handleResize() {
//     setIsResizable(true);
//   }

//   function handleMouseMove(event) {
//     console.log("move");
//     if (isResizable) {
//       let offsetRight = event.clientX;
//       let minWidth = 50;
//       let maxWidth = 700;
//       if (offsetRight > minWidth && offsetRight < maxWidth) {
//         setIsNewWidth(offsetRight);
//       }
//     }
//   }

//   function handleMouseUp() {
//     setIsResizable(false);
//   }

//   useEffect(() => {
//     divRef.current.addEventListener("mousedown", handleResize);
//     document.addEventListener("mousemove", handleMouseMove);
//     document.addEventListener("mouseup", handleMouseUp);
//     let divRefCurrent = divRef.current;

//     return () => {
//       divRefCurrent.removeEventListener("mousedown", handleResize);
//       document.removeEventListener("mousemove", handleMouseMove);
//       document.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, [isResizable]);

//   return (
//     <div
//       className={`relative-drawer`}
//       style={{
//         width: newWidth,
//         height: newWidth,
//         minWidth: 50
//       }}
//     >
//       <div className={"dragable"} ref={divRef} />
//     </div>
//   );
// }

#[derive(PartialEq, Default, Clone)]
pub struct IsResizable {
    resizable: bool,
}

#[derive(PartialEq, Default, Clone)]
pub struct NewWidthHeight {
    pub width: i32,
    pub height: i32,
}

pub struct XYPosition {
    x: f64,
    y: f64,
}

pub struct TopLeft {
    pub top: f64,
    pub left: f64,
}

pub fn use_resize_2(node: NodeRef, div_ref: NodeRef, height: i32, width: i32) -> NewWidthHeight {
    let is_resizable = use_raf_state(|| IsResizable { resizable: false });
    let new_width_height = use_raf_state(|| NewWidthHeight { width, height }); // init value will exist

    let original_mouse_x_y = use_raf_state(|| XYPosition {
        x: 0 as f64,
        y: 0 as f64,
    }); // init value will exist

    let original_x_y = use_raf_state(|| XYPosition {
        x: 0 as f64,
        y: 0 as f64,
    }); // init value will exist

    let window = window().unwrap();
    const MIN_WIDTH: i32 = 100;
    const MAX_WIDTH: i32 = 1980; // tweak this number to your liking...
    const MIN_HEIGHT: i32 = 100;
    const MAX_HEIGHT: i32 = 1080;

    let new_width_height_for_effect = new_width_height.clone();
    let is_resizable_for_effect = is_resizable.clone();
    let original_mouse_x_y_for_effect = original_mouse_x_y.clone();
    let original_x_y_for_effect = original_x_y.clone();
    use_effect_with_deps(
        move |_| {
            let div_element = div_ref.cast::<HtmlDivElement>().unwrap();
            let element = node.cast::<HtmlDivElement>().unwrap();
            let is_resizable_for_handle_resize = is_resizable_for_effect.clone();

            let original_mouse_x_y_for_effect_for_handle_size =
                original_mouse_x_y_for_effect.clone();
            let original_x_y_for_effect_for_handle_size = original_x_y_for_effect.clone();
            let div_element_for_handle_resizr = div_element.clone();
            let handle_resize =
                Closure::<dyn Fn(MouseEvent)>::wrap(Box::new(move |event: MouseEvent| {
                    original_mouse_x_y_for_effect_for_handle_size.set(XYPosition {
                        x: event.page_x() as f64,
                        y: event.page_y() as f64,
                    });
                    original_x_y_for_effect_for_handle_size.set(XYPosition {
                        x: div_element_for_handle_resizr
                            .get_bounding_client_rect()
                            .left(),
                        y: div_element_for_handle_resizr
                            .get_bounding_client_rect()
                            .top(),
                    });
                    is_resizable_for_handle_resize.set(IsResizable { resizable: true })
                }))
                .into_js_value()
                .dyn_into::<Function>()
                .unwrap();

            let is_resizable_for_handle_mouse_move = is_resizable_for_effect.clone();
            let original_mouse_x_y_for_effect_for_handle_mouse_move =
                original_mouse_x_y_for_effect.clone();
            let div_element_for_handle_mouse_move = div_element.clone();
            let original_x_y_for_effect_for_handle_mouse_move = original_x_y_for_effect.clone();
            let handle_mouse_move =
                Closure::<dyn Fn(MouseEvent)>::wrap(Box::new(move |event: MouseEvent| {
                    if is_resizable_for_handle_mouse_move.resizable {
                        let width = new_width_height_for_effect.width
                            + (event.page_x()
                                - original_mouse_x_y_for_effect_for_handle_mouse_move.x as i32);
                        let height = new_width_height_for_effect.height
                            - (event.page_y()
                                - original_mouse_x_y_for_effect_for_handle_mouse_move.y as i32);
                        if width > MIN_WIDTH && height > MIN_HEIGHT {
                            new_width_height_for_effect.set(NewWidthHeight { width, height });
                            let top = original_x_y_for_effect_for_handle_mouse_move.y
                                + (event.page_y() as f64
                                    - original_mouse_x_y_for_effect_for_handle_mouse_move.y);
                            // set the top to the element div
                            div_element_for_handle_mouse_move
                                .style()
                                .set_property("top", &format!("{top}px", top = top))
                                .unwrap();
                        }
                    }
                }))
                .into_js_value()
                .dyn_into::<Function>()
                .unwrap();

            let is_resizeble_for_handle_mouse_up = is_resizable_for_effect.clone();
            let handle_mouse_up =
                Closure::<dyn Fn(MouseEvent)>::wrap(Box::new(move |_event: MouseEvent| {
                    is_resizeble_for_handle_mouse_up.set(IsResizable { resizable: false })
                }))
                .into_js_value()
                .dyn_into::<Function>()
                .unwrap();

            element
                .add_event_listener_with_callback("mousedown", &handle_resize)
                .unwrap();
            window
                .add_event_listener_with_callback("mousemove", &handle_mouse_move)
                .unwrap();
            window
                .add_event_listener_with_callback("mouseup", &handle_mouse_up)
                .unwrap();

            let element_for_clean_up = element.clone();
            move || {
                element_for_clean_up
                    .remove_event_listener_with_callback("mousedown", &handle_resize)
                    .unwrap();
                window
                    .remove_event_listener_with_callback("mousemove", &handle_mouse_move)
                    .unwrap();
                window
                    .remove_event_listener_with_callback("mouseup", &handle_mouse_up)
                    .unwrap();
            }
        },
        [is_resizable.resizable],
    );

    return NewWidthHeight {
        width: new_width_height.width,
        height: new_width_height.height,
    };
}
