use crate::utils::web_sys_ext::{window, Window};
use gloo_console::log;
use js_sys::Function;
use wasm_bindgen::{prelude::Closure, JsCast, UnwrapThrowExt};
use web_sys::{AddEventListenerOptions, HtmlDivElement, MouseEvent};
use yew::{use_effect_with_deps, use_state, NodeRef};

pub struct Coordinate {
    pub dx: f64,
    pub dy: f64,
}

pub fn use_draggable(node: NodeRef) -> Coordinate {
    let x_and_y_coordinate = use_state(|| Coordinate { dx: 0.0, dy: 0.0 });
    let dx = (*x_and_y_coordinate).dx;
    let dy = (*x_and_y_coordinate).dy;
    let window: Window = window().unwrap();
    let window_for_event_listener: Window = window.clone();
    log!(format!("{:?}", &node));
    let element = node.cast::<HtmlDivElement>().unwrap();

    use_effect_with_deps(
        move |_| {
            let x_and_y_coordinate = x_and_y_coordinate.clone();
            let dx = (*x_and_y_coordinate).dx;
            let dy = (*x_and_y_coordinate).dy;
            let handle_mouse_down = Closure::once(move |event: MouseEvent| {
                let start_x = event.page_x() as f64 - dx;
                let start_y = event.page_y() as f64 - dy;

                let handle_mouse_move = Closure::once(move |event: MouseEvent| {
                    let new_dx = event.page_x() as f64 - start_x;
                    let new_dy = event.page_y() as f64 - start_y;
                    x_and_y_coordinate.set(Coordinate {
                        dx: new_dx,
                        dy: new_dy,
                    });
                })
                .into_js_value()
                .dyn_into::<Function>()
                .unwrap();
                window
                    .add_event_listener_with_callback("mousemove", &handle_mouse_move)
                    .unwrap_throw();
                window
                    .add_event_listener_with_callback_and_add_event_listener_options(
                        "mouseup",
                        &Closure::once(move |_event: MouseEvent| {
                            window_for_event_listener.remove_event_listener_with_callback(
                                "mousemove",
                                &handle_mouse_move,
                            )
                        })
                        .into_js_value()
                        .dyn_into::<Function>()
                        .unwrap(),
                        &AddEventListenerOptions::new().once(true),
                    )
                    .unwrap_throw();
            })
            .into_js_value()
            .dyn_into::<Function>()
            .unwrap();
            element
                .add_event_listener_with_callback("mousedown", &handle_mouse_down)
                .unwrap_throw();

            move || {
                element
                    .add_event_listener_with_callback("mousedown", &handle_mouse_down)
                    .unwrap_throw();
            }
        },
        [dx, dy], // dependents
    );

    return Coordinate { dx, dy };
}
