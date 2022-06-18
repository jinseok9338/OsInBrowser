use super::{use_measure::use_measure, use_raf_state::use_raf_state};
use gloo_console::log;
use js_sys::Function;
use wasm_bindgen::prelude::Closure;
use wasm_bindgen::JsCast;
use web_sys::{window, Document, Element, HtmlCollection, HtmlDivElement, MouseEvent};
use yew::{use_effect_with_deps, NodeRef};
// function makeResizableDiv(div) {
//     const element = document.querySelector(div);
//     const resizers = document.querySelectorAll(div + ' .resizer')
//     const minimum_size = 20;
//     let original_width = 0;
//     let original_height = 0;
//     let original_x = 0;
//     let original_y = 0;
//     let original_mouse_x = 0;
//     let original_mouse_y = 0;
//     for (let i = 0;i < resizers.length; i++) {
//       const currentResizer = resizers[i];
//       currentResizer.addEventListener('mousedown', function(e) {
//         e.preventDefault()
//         original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
//         original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
//         original_x = element.getBoundingClientRect().left;
//         original_y = element.getBoundingClientRect().top;
//         original_mouse_x = e.pageX;
//         original_mouse_y = e.pageY;
//         window.addEventListener('mousemove', resize)
//         window.addEventListener('mouseup', stopResize)
//       })

//       function resize(e) {
//         if (currentResizer.classList.contains('bottom-right')) {
//           const width = original_width + (e.pageX - original_mouse_x);
//           const height = original_height + (e.pageY - original_mouse_y)
//           if (width > minimum_size) {
//             element.style.width = width + 'px'
//           }
//           if (height > minimum_size) {
//             element.style.height = height + 'px'
//           }
//         }
//         else if (currentResizer.classList.contains('bottom-left')) {
//           const height = original_height + (e.pageY - original_mouse_y)
//           const width = original_width - (e.pageX - original_mouse_x)
//           if (height > minimum_size) {
//             element.style.height = height + 'px'
//           }
//           if (width > minimum_size) {
//             element.style.width = width + 'px'
//             element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
//           }
//         }
//         else if (currentResizer.classList.contains('top-right')) {
//           const width = original_width + (e.pageX - original_mouse_x)
//           const height = original_height - (e.pageY - original_mouse_y)
//           if (width > minimum_size) {
//             element.style.width = width + 'px'
//           }
//           if (height > minimum_size) {
//             element.style.height = height + 'px'
//             element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
//           }
//         }
//         else {
//           const width = original_width - (e.pageX - original_mouse_x)
//           const height = original_height - (e.pageY - original_mouse_y)
//           if (width > minimum_size) {
//             element.style.width = width + 'px'
//             element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
//           }
//           if (height > minimum_size) {
//             element.style.height = height + 'px'
//             element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
//           }
//         }
//       }

//       function stopResize() {
//         window.removeEventListener('mousemove', resize)
//       }
//     }
//   }

#[derive(PartialEq, Default, Clone)]
struct Coordinate {
    pub x: f64,
    pub y: f64,
}

pub fn use_resizable(node: NodeRef, id: String) {
    let state = use_measure(node.clone());
    let x_and_y_coordinate = use_raf_state(|| Coordinate {
        x: state.x,
        y: state.y,
    });

    let x = x_and_y_coordinate.x;
    let y = x_and_y_coordinate.y;

    {
        use_effect_with_deps(
            move |_| {
                let window = window().unwrap();
                let window_for_closure = window.clone();
                let document: Document = window.clone().document().unwrap();
                let element = node.cast::<HtmlDivElement>().unwrap();
                let resizers: HtmlCollection = document.get_elements_by_class_name(&id);

                //bunch of variables

                const MINIMUM_SIZE: i32 = 20;

                x_and_y_coordinate.set(Coordinate {
                    x: element.get_bounding_client_rect().x(),
                    y: element.get_bounding_client_rect().y(),
                });

                //For init_resize_variables
                let resizers = resizers.clone();
                let element = element.clone();
                // add Event_listener
                for n in 0..resizers.length() {
                    let current_resizer: Element = resizers.item(n).unwrap();

                    let window_for_closure = window_for_closure.clone();
                    let current_resizer_for_closure = current_resizer.clone();
                    let element: HtmlDivElement = element.clone();
                    let window = window.clone();
                    let x_and_y_coordinate = x_and_y_coordinate.clone();
                    current_resizer
                        .add_event_listener_with_callback(
                            "mousedown",
                            // Update_value_closure
                            &Closure::<dyn Fn(MouseEvent)>::wrap(Box::new(
                                move |event: MouseEvent| {
                                    event.prevent_default();
                                    let original_width = state.width;

                                    let original_height = state.height;
                                    let original_x = x_and_y_coordinate.x;
                                    let original_y = x_and_y_coordinate.y;
                                    let original_mouse_x = event.page_x();
                                    let original_mouse_y = event.page_y();

                                    //Resize Closure
                                    let current_resizer_for_closure =
                                        current_resizer_for_closure.clone();
                                    let element = element.clone();
                                    let resize = Closure::<dyn Fn(MouseEvent)>::wrap(Box::new(
                                        move |event: MouseEvent| {
                                            if current_resizer_for_closure
                                                .class_list()
                                                .contains("bottom-right")
                                            {
                                                let width = original_width as i32
                                                    + (event.page_x() - original_mouse_x);
                                                let height = original_height as i32
                                                    + (event.page_y() - original_mouse_y);
                                                if width > MINIMUM_SIZE {
                                                    element
                                                        .style()
                                                        .set_property(
                                                            "width",
                                                            &format!("{width}px", width = width),
                                                        )
                                                        .unwrap();
                                                }
                                                if height > MINIMUM_SIZE {
                                                    element
                                                        .style()
                                                        .set_property(
                                                            "height",
                                                            &format!("{height}px", height = height),
                                                        )
                                                        .unwrap();
                                                }
                                            } else if current_resizer_for_closure
                                                .class_list()
                                                .contains("bottom-left")
                                            {
                                                let height = original_height as i32
                                                    + (event.page_y() - original_mouse_y);
                                                let width = original_width as i32
                                                    + (event.page_x() - original_mouse_x);
                                                if height > MINIMUM_SIZE {
                                                    element
                                                        .style()
                                                        .set_property(
                                                            "height",
                                                            &format!("{height}px", height = height),
                                                        )
                                                        .unwrap();
                                                }
                                                if width > MINIMUM_SIZE {
                                                    element
                                                        .style()
                                                        .set_property(
                                                            "width",
                                                            &format!("{width}px", width = width),
                                                        )
                                                        .unwrap();
                                                    element
                                                        .style()
                                                        .set_property(
                                                            "left",
                                                            &format!(
                                                                "{left}px",
                                                                left = original_x
                                                                    + (event.page_x()
                                                                        - original_mouse_x)
                                                                        as f64
                                                            ),
                                                        )
                                                        .unwrap();
                                                }
                                            } else if current_resizer_for_closure
                                                .class_list()
                                                .contains("top-right")
                                            {
                                                let width = original_width as i32
                                                    + (event.page_x() - original_mouse_x);
                                                let height = original_height as i32
                                                    + (event.page_y() - original_mouse_y);
                                                if width > MINIMUM_SIZE {
                                                    element
                                                        .style()
                                                        .set_property(
                                                            "width",
                                                            &format!("{width}px", width = width),
                                                        )
                                                        .unwrap();
                                                }
                                                if height > MINIMUM_SIZE {
                                                    element
                                                        .style()
                                                        .set_property(
                                                            "height",
                                                            &format!("{height}px", height = height),
                                                        )
                                                        .unwrap();
                                                    element
                                                        .style()
                                                        .set_property(
                                                            "top",
                                                            &format!(
                                                                "{top}px",
                                                                top = original_y as f64
                                                                    + (event.page_y()
                                                                        - original_mouse_y)
                                                                        as f64
                                                            ),
                                                        )
                                                        .unwrap();
                                                }
                                            } else {
                                                let width = original_width as i32
                                                    - (event.page_x() - original_mouse_x);
                                                let height = original_height as i32
                                                    - (event.page_y() - original_mouse_y);
                                                if width > MINIMUM_SIZE {
                                                    element
                                                        .style()
                                                        .set_property(
                                                            "width",
                                                            &format!("{width}px", width = width),
                                                        )
                                                        .unwrap();
                                                    element
                                                        .style()
                                                        .set_property(
                                                            "left",
                                                            &format!(
                                                                "{left}px",
                                                                left = original_x
                                                                    + (event.page_x()
                                                                        - original_mouse_x)
                                                                        as f64
                                                            ),
                                                        )
                                                        .unwrap();
                                                }
                                                if height > MINIMUM_SIZE {
                                                    element
                                                        .style()
                                                        .set_property(
                                                            "height",
                                                            &format!("{height}px", height = height),
                                                        )
                                                        .unwrap();
                                                    element
                                                        .style()
                                                        .set_property(
                                                            "top",
                                                            &format!(
                                                                "{top}px",
                                                                top = original_y as f64
                                                                    + (event.page_y()
                                                                        - original_mouse_y)
                                                                        as f64
                                                            ),
                                                        )
                                                        .unwrap();
                                                }
                                            }
                                        },
                                    ))
                                    .into_js_value()
                                    .dyn_into::<Function>()
                                    .unwrap();

                                    window
                                        .add_event_listener_with_callback("mousemove", &resize)
                                        .unwrap();

                                    let window_for_closure = window_for_closure.clone();
                                    window
                                        .add_event_listener_with_callback(
                                            "mouseup",
                                            &Closure::<dyn Fn(MouseEvent)>::wrap(Box::new(
                                                move |_event: MouseEvent| {
                                                    window_for_closure
                                                        .remove_event_listener_with_callback(
                                                            "mousemove",
                                                            &resize,
                                                        )
                                                        .unwrap();
                                                },
                                            ))
                                            .into_js_value()
                                            .dyn_into::<Function>()
                                            .unwrap(),
                                        )
                                        .unwrap();
                                },
                            ))
                            .into_js_value()
                            .dyn_into::<Function>()
                            .unwrap(),
                        )
                        .unwrap();
                }

                move || ()
            },
            [x, y], // dependents
        );
    }
}

// THis is closure hell ... Darn it...
// https://medium.com/the-z/making-a-resizable-div-in-js-is-not-easy-as-you-think-bda19a1bc53d
