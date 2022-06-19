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
pub struct NewWidth {
    pub width: i32,
}

pub fn use_resize_2(node: NodeRef, div_ref: NodeRef) -> NewWidth {
    let is_resizable = use_raf_state(|| IsResizable { resizable: false });
    let new_width = use_raf_state(|| NewWidth { width: 500 as i32 }); // init value will exist

    let window = window().unwrap();
    const MIN_WIDTH: i32 = 50;
    const MAX_WIDTH: i32 = 1980; // tweak this number to your liking...

    let new_width_for_effect = new_width.clone();
    let is_resizable_for_effect = is_resizable.clone();
    use_effect_with_deps(
        move |_| {
            let div_element = div_ref.cast::<HtmlDivElement>().unwrap();
            let element = node.cast::<HtmlDivElement>().unwrap();
            let is_resizable_for_handle_resize = is_resizable_for_effect.clone();
            let handle_resize =
                Closure::<dyn Fn(MouseEvent)>::wrap(Box::new(move |_event: MouseEvent| {
                    is_resizable_for_handle_resize.set(IsResizable { resizable: true })
                }))
                .into_js_value()
                .dyn_into::<Function>()
                .unwrap();

            let is_resizable_for_handle_mouse_move = is_resizable_for_effect.clone();
            let handle_mouse_move =
                Closure::<dyn Fn(MouseEvent)>::wrap(Box::new(move |event: MouseEvent| {
                    if is_resizable_for_handle_mouse_move.resizable {
                        let offset_right = event.client_x(); // Can't do clent_x because my div is not fixed
                        let x_position_of_div = div_element.get_bounding_client_rect().x();
                        if offset_right > MIN_WIDTH && offset_right < MAX_WIDTH {
                            new_width_for_effect.set(NewWidth {
                                width: offset_right - x_position_of_div as i32,
                            })
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

    return NewWidth {
        width: new_width.width,
    };
}
