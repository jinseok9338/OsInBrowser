use gloo_console::log;
use js_sys::Function;
use wasm_bindgen::{prelude::Closure, JsCast, UnwrapThrowExt};
use web_sys::{window, AddEventListenerOptions, HtmlDivElement, MouseEvent, Window};
use yew::{use_effect, NodeRef};

use crate::{
    context::process_directory_context::use_process_context,
    types::process_directory::{Dimension, ProcessAction, ProcessState},
};

pub fn use_draggable(reference: NodeRef, process: ProcessState, div_ref: NodeRef) {
    let process_directory_context = use_process_context();
    let is_full_size = process.clone().is_full_size.unwrap();

    use_effect(
        move || {
            let process_directory_context = process_directory_context.clone();
            let process = process.clone();
            let id = process.id;
            let element = reference
                .cast::<HtmlDivElement>()
                .expect("div_ref not attached to div element");
            let div_element = div_ref
                .cast::<HtmlDivElement>()
                .expect("div_ref not attached to div element");
            let window = window().unwrap();

            let process_for_handle_mouse_down = process.clone();
            let process_dimension = process_for_handle_mouse_down.dimension.unwrap().clone();
            let element_for_closure = element.clone();
            let div_element_for_closure = div_element.clone();
            let handle_mouse_down =
                Closure::<dyn Fn(MouseEvent)>::wrap(Box::new(move |event: MouseEvent| {
                    let dx = process_dimension.left; // original dx = top
                    let dy = process_dimension.top;
                    let width = process_dimension.width;
                    let height = process_dimension.height;

                    let start_x = event.page_x() as f64 - dx;
                    let start_y = event.page_y() as f64 - dy;

                    let process_directory_for_mouse_down = process_directory_context.clone();
                    let element_for_closure = element_for_closure.clone();
                    let div_element_for_closure = div_element_for_closure.clone();
                    let handle_mouse_move =
                        Closure::<dyn Fn(MouseEvent)>::wrap(Box::new(move |event: MouseEvent| {
                            let new_dx = event.page_x() as f64 - start_x;
                            let new_dy = event.page_y() as f64 - start_y;
                            log!("renderedd");
                            if !is_full_size && new_dy > 30.0 {
                                // process_directory_for_mouse_down.dispatch(ProcessAction {
                                //     action_type: "change_the_dimension".to_owned(),
                                //     process: ProcessState {
                                //         process_name: None,
                                //         process: None,
                                //         id,
                                //         dimension: Some(Dimension {
                                //             height: height.to_owned(),
                                //             width: width.to_owned(),
                                //             top: new_dy,
                                //             left: new_dx,
                                //         }),
                                //         is_full_size: None,
                                //         temp_dimension: None,
                                //     },
                                // });
                            }
                        }))
                        .into_js_value()
                        .dyn_into::<Function>()
                        .unwrap();

                    let window_for_event_listener: Window = window.clone();
                    window
                        .add_event_listener_with_callback("mousemove", &handle_mouse_move)
                        .unwrap_throw();

                    window
                        .add_event_listener_with_callback_and_add_event_listener_options(
                            "mouseup",
                            &Closure::<dyn Fn(MouseEvent)>::wrap(Box::new(
                                move |_event: MouseEvent| {
                                    window_for_event_listener
                                        .remove_event_listener_with_callback(
                                            "mousemove",
                                            &handle_mouse_move,
                                        )
                                        .unwrap_throw()
                                },
                            ))
                            .into_js_value()
                            .dyn_into::<Function>()
                            .unwrap(),
                            &AddEventListenerOptions::new().once(true),
                        )
                        .unwrap_throw();
                }))
                .into_js_value()
                .dyn_into::<Function>()
                .unwrap();
            element
                .add_event_listener_with_callback("mousedown", &handle_mouse_down)
                .unwrap_throw();

            move || {
                element
                    .remove_event_listener_with_callback("mousedown", &handle_mouse_down)
                    .unwrap_throw();
            }
        },
        // dependents
    );
}
