use gloo_console::log;
use js_sys::Function;
use wasm_bindgen::{prelude::Closure, JsCast};
use web_sys::{window, HtmlElement, MouseEvent};
use yew::{use_effect, use_effect_with_deps, NodeRef};

use crate::{
    context::process_directory_context::use_process_context,
    types::process_directory::ProcessState, utils::resize_function::resize,
};

use super::use_raf_state::use_raf_state;

pub fn use_resize_3(process: ProcessState, resize_handler: NodeRef) {
    let is_resizable = use_raf_state(|| false);
    let is_resizable_for_deps = is_resizable.clone();
    let original_mouse_left = use_raf_state(|| 0.0);
    let original_mouse_top = use_raf_state(|| 0.0);
    let dimension = process.dimension.clone().unwrap();
    let dimension_for_effect = dimension.clone();
    const MAX_HEIGHT: f64 = 1080.0;
    const MAX_WIDTH: f64 = 1920.0;
    const MIN_WIDTH: f64 = 100.0;
    const MIN_HEIGHT: f64 = 100.0;

    let use_process_context = use_process_context();

    let window = window().unwrap();

    let original_mouse_left_for_effect = original_mouse_left.clone();
    let original_mouse_top_for_effect = original_mouse_top.clone();
    let use_process_context_for_closure = use_process_context.clone();
    let dimension_for_closure = dimension_for_effect.clone();

    let is_resizable_for_effect = is_resizable.clone();

    use_effect(move || {
        let element = resize_handler.cast::<HtmlElement>().unwrap();
        let original_width = dimension_for_closure.width;
        let original_height = dimension_for_closure.height;
        let original_left = dimension_for_closure.left;
        let original_top = dimension_for_closure.top;
        let original_mouse_left_for_closure = original_mouse_left_for_effect.clone();
        let original_mouse_top_for_closure = original_mouse_top_for_effect.clone();
        let element_for_effect = element.clone();
        let is_resizable_for_closure = is_resizable_for_effect.clone();
        let handle_mouse_down =
            Closure::<dyn Fn(MouseEvent)>::wrap(Box::new(move |event: MouseEvent| {
                event.prevent_default();
                is_resizable_for_closure.set(true);
                //bunch of variables
                original_mouse_left_for_closure.set(event.page_x() as f64);
                original_mouse_top_for_closure.set(event.page_y() as f64);
            }))
            .into_js_value()
            .dyn_into::<Function>()
            .unwrap();

        let original_mouse_left_for_closure = original_mouse_left_for_effect.clone();
        let original_mouse_top_for_closure = original_mouse_top_for_effect.clone();
        let is_resizable_for_closure = is_resizable_for_effect.clone();
        let handle_mouse_move =
            Closure::<dyn Fn(MouseEvent)>::wrap(Box::new(move |event: MouseEvent| {
                let element_for_closure = element.clone();

                if *is_resizable_for_closure {
                    resize(
                        element_for_closure,
                        event.clone(),
                        &use_process_context_for_closure,
                        original_width,
                        original_height,
                        original_left,
                        original_top,
                        *original_mouse_left_for_closure,
                        *original_mouse_top_for_closure,
                        MIN_HEIGHT,
                        MIN_WIDTH,
                        process.clone(),
                    );
                }
            }))
            .into_js_value()
            .dyn_into::<Function>()
            .unwrap();
        let is_resizable_for_closure = is_resizable_for_effect.clone();

        let handle_mouse_up =
            Closure::<dyn Fn(MouseEvent)>::wrap(Box::new(move |_event: MouseEvent| {
                is_resizable_for_closure.set(false);
            }))
            .into_js_value()
            .dyn_into::<Function>()
            .unwrap();

        element_for_effect
            .add_event_listener_with_callback("mousedown", &handle_mouse_down)
            .unwrap();

        window
            .add_event_listener_with_callback("mousemove", &handle_mouse_move)
            .unwrap();
        window
            .add_event_listener_with_callback("mouseup", &handle_mouse_up)
            .unwrap();

        move || {
            // remove event listener on mouse up / init resize

            element_for_effect
                .remove_event_listener_with_callback("mousedown", &handle_mouse_down)
                .unwrap();

            window
                .remove_event_listener_with_callback("mousemove", &handle_mouse_move)
                .unwrap();
            window
                .remove_event_listener_with_callback("mouseup", &handle_mouse_up)
                .unwrap();
        }
    })
}
