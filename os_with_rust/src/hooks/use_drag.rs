use gloo_console::log;
use js_sys::Function;
use wasm_bindgen::{prelude::Closure, JsCast, UnwrapThrowExt};
use web_sys::{window, AddEventListenerOptions, HtmlDivElement, MouseEvent, Window};
use yew::{use_effect, use_effect_with_deps, NodeRef};

use super::use_measure::{use_measure, UseMeasureState};

pub fn use_draggable(reference: NodeRef, state: UseMeasureState) {
    {
        use_effect(
            move || {
                let element = reference
                    .cast::<HtmlDivElement>()
                    .expect("div_ref not attached to div element");
                let window = window().unwrap();
                let document = window.document().unwrap();

                let handle_mouse_down =
                    Closure::<dyn Fn(MouseEvent)>::wrap(Box::new(move |event: MouseEvent| {
                        let window_element = document
                            .get_elements_by_class_name("window_container")
                            .item(0)
                            .unwrap()
                            .unchecked_into::<HtmlDivElement>();

                        let dx = &state.x;

                        let dy = &state.y;

                        log!(format!("{:?}", &dx));

                        let start_x = event.page_x() as f64 - dx;
                        let start_y = event.page_y() as f64 - dy;
                        let window_element_for_handle_mouse_move = window_element.clone();
                        let handle_mouse_move = Closure::<dyn Fn(MouseEvent)>::wrap(Box::new(
                            move |event: MouseEvent| {
                                let new_dx = event.page_x() as f64 - start_x;
                                let new_dy = event.page_y() as f64 - start_y;

                                window_element_for_handle_mouse_move
                                    .style()
                                    .set_property("left", &format!("{left}px", left = new_dx))
                                    .unwrap();
                                window_element_for_handle_mouse_move
                                    .style()
                                    .set_property("top", &format!("{top}px", top = new_dy))
                                    .unwrap();
                            },
                        ))
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
}
