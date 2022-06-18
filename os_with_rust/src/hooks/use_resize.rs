use super::{use_measure::use_measure, use_raf_state::use_raf_state};
use gloo_console::log;
use js_sys::Function;
use wasm_bindgen::prelude::Closure;
use wasm_bindgen::JsCast;
use web_sys::{
    window, AddEventListenerOptions, Document, Element, HtmlCollection, HtmlDivElement, MouseEvent,
};
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
    pub height: f64,
    pub width: f64,
}

pub fn use_resizable(node: NodeRef, id: String) {
    let state = use_measure(node.clone());
    log!(format!("{:?},{:?}", &state.width, &state.height));
    let x_and_y_coordinate = use_raf_state(|| Coordinate {
        width: state.width,
        height: state.height,
    });

    let width = x_and_y_coordinate.width;
    let height = x_and_y_coordinate.height;

    use_effect_with_deps(
        move |_| {
            let window = window().unwrap();
            let window_for_closure = window.clone();
            let document: Document = window.clone().document().unwrap();
            let element = node.cast::<HtmlDivElement>().unwrap();
            let resizers: HtmlCollection = document.get_elements_by_class_name(&id);

            //bunch of variables

            const MINIMUM_SIZE: i32 = 20;

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
                //update_value_closure

                let update_value_closure =
                    Closure::<dyn Fn(MouseEvent)>::wrap(Box::new(move |event: MouseEvent| {
                        event.prevent_default();
                        let original_width = state.width;

                        let original_height = state.height;
                        let original_x = element.get_bounding_client_rect().x();
                        let original_y = element.get_bounding_client_rect().y();
                        let original_mouse_x = event.page_x();
                        let original_mouse_y = event.page_y();

                        let current_resizer_for_closure = current_resizer_for_closure.clone();
                        let element = element.clone();
                        let x_and_y_coordinate = x_and_y_coordinate.clone();
                        //Resize Closure
                        let resize = Closure::<dyn Fn(MouseEvent)>::wrap(Box::new(
                            move |event: MouseEvent| {
                                if current_resizer_for_closure
                                    .class_list()
                                    .contains("bottom-right")
                                {
                                    let width =
                                        original_width as i32 + (event.page_x() - original_mouse_x);
                                    let height = original_height as i32
                                        + (event.page_y() - original_mouse_y);

                                    x_and_y_coordinate.set(Coordinate {
                                        width: width as f64,
                                        height: height as f64,
                                    });

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
                                    let width =
                                        original_width as i32 + (event.page_x() - original_mouse_x);

                                    x_and_y_coordinate.set(Coordinate {
                                        width: width as f64,
                                        height: height as f64,
                                    });
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
                                                        + (event.page_x() - original_mouse_x)
                                                            as f64
                                                ),
                                            )
                                            .unwrap();
                                    }
                                } else if current_resizer_for_closure
                                    .class_list()
                                    .contains("top-right")
                                {
                                    let width =
                                        original_width as i32 + (event.page_x() - original_mouse_x);
                                    let height = original_height as i32
                                        + (event.page_y() - original_mouse_y);
                                    x_and_y_coordinate.set(Coordinate {
                                        width: width as f64,
                                        height: height as f64,
                                    });
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
                                                        + (event.page_y() - original_mouse_y)
                                                            as f64
                                                ),
                                            )
                                            .unwrap();
                                    }
                                } else {
                                    let width =
                                        original_width as i32 - (event.page_x() - original_mouse_x);
                                    let height = original_height as i32
                                        - (event.page_y() - original_mouse_y);
                                    x_and_y_coordinate.set(Coordinate {
                                        width: width as f64,
                                        height: height as f64,
                                    });
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
                                                        + (event.page_x() - original_mouse_x)
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
                                                        + (event.page_y() - original_mouse_y)
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
                            .add_event_listener_with_callback_and_add_event_listener_options(
                                "mousemove",
                                &resize,
                                &AddEventListenerOptions::new().once(false),
                            )
                            .unwrap();

                        let window_for_closure = window_for_closure.clone();
                        let delete_resize = Closure::<dyn Fn(MouseEvent)>::wrap(Box::new(
                            move |_event: MouseEvent| {
                                window_for_closure
                                    .remove_event_listener_with_callback("mousemove", &resize)
                                    .unwrap();
                            },
                        ))
                        .into_js_value()
                        .dyn_into::<Function>()
                        .unwrap();

                        window
                            .add_event_listener_with_callback_and_add_event_listener_options(
                                "mouseup",
                                &delete_resize,
                                &AddEventListenerOptions::new().once(false),
                            )
                            .unwrap();
                    }))
                    .into_js_value()
                    .dyn_into::<Function>()
                    .unwrap();

                current_resizer
                    .add_event_listener_with_callback_and_add_event_listener_options(
                        "mousedown",
                        &update_value_closure,
                        &AddEventListenerOptions::new().once(false),
                    )
                    .unwrap();
            }

            move || {}
        },
        [width, height], // dependents
    );
}

// https://medium.com/the-z/making-a-resizable-div-in-js-is-not-easy-as-you-think-bda19a1bc53d
