use super::use_raf_state::use_raf_state;
use crate::hooks::use_measure::use_measure;
use gloo_console::log;
use js_sys::Function;
use wasm_bindgen::JsCast;
use wasm_bindgen::{prelude::Closure, UnwrapThrowExt};

use web_sys::{
    window, AddEventListenerOptions, Document, HtmlDivElement, MouseEvent, NodeList, Window,
};
use web_sys::{HtmlElement, Node};
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

pub fn use_resizable(node: NodeRef, id: String) -> Coordinate {
    // Elements
    let window = window().unwrap();
    let document: Document = window.clone().document().unwrap();
    let element = node.cast::<HtmlDivElement>().unwrap();
    let resizers: NodeList = document
        .query_selector_all(format!(".{id}", id = &id).as_ref())
        .unwrap();

    //bunch of variables
    let x_and_y_coordinate = use_raf_state(|| Coordinate {
        x: element.get_bounding_client_rect().x(),
        y: element.get_bounding_client_rect().y(),
    });
    const MINIMUM_SIZE: i32 = 20;

    use_effect_with_deps(
        move |_| {
            let update_value =
                Closure::<dyn Fn(MouseEvent)>::wrap(Box::new(move |event: MouseEvent| {
                    event.prevent_default();
                    let original_width = element
                        .style()
                        .get_property_value("width")
                        .unwrap()
                        .replace("px", "")
                        .parse::<i32>()
                        .unwrap();
                    let original_height = element
                        .style()
                        .get_property_value("height")
                        .unwrap()
                        .replace("px", "")
                        .parse::<i32>()
                        .unwrap();
                    let original_x = x_and_y_coordinate.x;
                    let original_y = x_and_y_coordinate.y;
                    let original_mouse_x = event.page_x();
                    let original_mouse_y = event.page_y();
                    window.add_event_listener_with_callback("mousemove", &resize);
                    window.add_event_listener_with_callback("mouseup", &stop_resize);
                }))
                .into_js_value()
                .dyn_into::<Function>()
                .unwrap();

            //For init_resize_variables
            let resizers_for_init_resize = resizers.clone();
            let init_resize =
                Closure::<dyn Fn(MouseEvent)>::wrap(Box::new(move |_event: MouseEvent| {
                    // add Event_listener
                    for x in 0..resizers_for_init_resize.length() {
                        resizers_for_init_resize
                            .item(x)
                            .unwrap()
                            .add_event_listener_with_callback("mousedown", &update_value);
                    }
                }))
                .into_js_value()
                .dyn_into::<Function>()
                .unwrap();
            || ();
        },
        (), // dependents
    );
}

// THis is closure hell ... Darn it...
// https://medium.com/the-z/making-a-resizable-div-in-js-is-not-easy-as-you-think-bda19a1bc53d
