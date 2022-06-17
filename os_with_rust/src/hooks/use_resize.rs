use crate::hooks::use_measure::use_measure;
use gloo_console::log;
use js_sys::Function;
use wasm_bindgen::JsCast;
use wasm_bindgen::{prelude::Closure, UnwrapThrowExt};
use web_sys::{window, AddEventListenerOptions, HtmlDivElement, MouseEvent, Window};
use yew::{use_effect_with_deps, NodeRef};

use super::use_raf_state::use_raf_state;

// var p = document.querySelector('p');

// p.addEventListener('click', function init() {
//     p.removeEventListener('click', init, false);
//     p.className = p.className + ' resizable';
//     var resizer = document.createElement('div');
//     resizer.className = 'resizer';
//     p.appendChild(resizer);
//     resizer.addEventListener('mousedown', initDrag, false);
// }, false);

// var startX, startY, startWidth, startHeight;

// function initDrag(e) {
//    startX = e.clientX;
//    startY = e.clientY;
//    startWidth = parseInt(document.defaultView.getComputedStyle(p).width, 10);
//    startHeight = parseInt(document.defaultView.getComputedStyle(p).height, 10);
//    document.documentElement.addEventListener('mousemove', doDrag, false);
//    document.documentElement.addEventListener('mouseup', stopDrag, false);
// }

// function doDrag(e) {
//    p.style.width = (startWidth + e.clientX - startX) + 'px';
//    p.style.height = (startHeight + e.clientY - startY) + 'px';
// }

// function stopDrag(e) {
//     document.documentElement.removeEventListener('mousemove', doDrag, false);    document.documentElement.removeEventListener('mouseup', stopDrag, false);
// }

//Closure Hell..... Shit...
#[derive(PartialEq, Default, Clone)]
pub struct Coordinate {
    pub width: f64,
    pub height: f64,
}

pub fn use_resizable(node: NodeRef) -> Coordinate {
    let height_width_state = use_measure(node.clone());
    let x_and_y_coordinate = use_raf_state(Coordinate::default);
    let width = (*x_and_y_coordinate).width;
    let height = (*x_and_y_coordinate).height;

    let window: Window = window().unwrap();
    let window_for_init_drag = window.clone();

    let window_for_do_drag = window.clone();
    {
        use_effect_with_deps(
            move |_| {
                let node_to_element = node.cast::<HtmlDivElement>().unwrap();

                //This is for defining init_drag function
                let init_drag =
                    Closure::<dyn Fn(MouseEvent)>::wrap(Box::new(move |event: MouseEvent| {
                        let start_x = event.client_x();
                        let start_y = event.client_y();

                        let start_width = height_width_state.width;
                        let start_height = height_width_state.height;
                        let x_and_y_coordinate_for_do_drag = x_and_y_coordinate.clone();

                        //This is for defining do_drag function
                        let do_drag = Closure::<dyn Fn(MouseEvent)>::wrap(Box::new(
                            move |event: MouseEvent| {
                                x_and_y_coordinate_for_do_drag.set(Coordinate {
                                    width: start_width + event.client_x() as f64 - start_x as f64,
                                    height: start_height + event.client_y() as f64 - start_y as f64,
                                });
                                log!("dragging");
                            },
                        ))
                        .into_js_value()
                        .dyn_into::<Function>()
                        .unwrap();

                        //invoke do drag with mousemove action type
                        window_for_init_drag
                            .add_event_listener_with_callback_and_add_event_listener_options(
                                "mousemove",
                                &do_drag,
                                &AddEventListenerOptions::new().once(true),
                            )
                            .unwrap_throw();

                        let window_for_stop_drag = window.clone();
                        // this is for defining stop_drag
                        let stop_drag = Closure::<dyn Fn(MouseEvent)>::wrap(Box::new(
                            move |_event: MouseEvent| {
                                window_for_stop_drag
                                    .remove_event_listener_with_callback("mousemove", &do_drag)
                                    .unwrap_throw();
                                log!("stopdragging");
                            },
                        ))
                        .into_js_value()
                        .dyn_into::<Function>()
                        .unwrap();

                        // invoke stop_drag
                        window_for_do_drag
                            .add_event_listener_with_callback_and_add_event_listener_options(
                                "mouseup",
                                &stop_drag,
                                &AddEventListenerOptions::new().once(true),
                            )
                            .unwrap_throw();
                    }))
                    .into_js_value()
                    .dyn_into::<Function>()
                    .unwrap();

                // invoke init_drag
                node_to_element
                    .add_event_listener_with_callback_and_add_event_listener_options(
                        "mousemove",
                        &init_drag,
                        &AddEventListenerOptions::new().once(true),
                    )
                    .unwrap_throw();
                log!("init dragging");
                || {}
            },
            [width, height], // dependents
        );
    }
    Coordinate { width, height }
}
