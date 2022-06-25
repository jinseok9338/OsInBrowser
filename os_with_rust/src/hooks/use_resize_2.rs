use crate::hooks::use_raf_state::use_raf_state;

use js_sys::Function;
use wasm_bindgen::prelude::Closure;
use wasm_bindgen::JsCast;
use web_sys::MouseEvent;
use web_sys::{window, HtmlDivElement};
use yew::{use_effect, NodeRef};

#[derive(PartialEq, Default, Clone)]
pub struct IsResizable {
    resizable: bool,
}

#[derive(PartialEq, Default, Clone)]
pub struct NewWidthHeight {
    pub width: i32,
    pub height: i32,
}
#[allow(dead_code)]
pub struct XYPosition {
    x: f64,
    y: f64,
}
#[allow(dead_code)]
pub struct TopLeft {
    pub top: f64,
    pub left: f64,
}
#[allow(dead_code)]
pub fn use_resize_2(node: NodeRef, div_ref: NodeRef) {
    let is_resizable = use_raf_state(|| IsResizable { resizable: false });

    let original_width = use_raf_state(|| 500);
    let original_height = use_raf_state(|| 500);

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

    let original_width_for_effect = original_width.clone();
    let original_height_for_effect = original_height.clone();
    let is_resizable_for_effect = is_resizable.clone();
    let original_mouse_x_y_for_effect = original_mouse_x_y.clone();
    let original_x_y_for_effect = original_x_y.clone();

    use_effect(move || {
        let div_element = div_ref.cast::<HtmlDivElement>().unwrap();
        let element = node.cast::<HtmlDivElement>().unwrap();
        let is_resizable_for_handle_resize = is_resizable_for_effect.clone();

        let original_mouse_x_y_for_effect_for_handle_size = original_mouse_x_y_for_effect.clone();
        let original_x_y_for_effect_for_handle_size = original_x_y_for_effect.clone();
        let div_element_for_handle_resizr = div_element.clone();

        let handle_mouse_down =
            Closure::<dyn Fn(MouseEvent)>::wrap(Box::new(move |event: MouseEvent| {
                event.prevent_default();
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
        let original_width_for_handle_mouse_move = original_width_for_effect.clone();
        let original_height_for_handle_mouse_move = original_height_for_effect.clone();

        let handle_mouse_move =
            Closure::<dyn Fn(MouseEvent)>::wrap(Box::new(move |event: MouseEvent| {
                if is_resizable_for_handle_mouse_move.resizable {
                    let original_mouse_x = original_mouse_x_y_for_effect_for_handle_mouse_move.x;
                    let original_mouse_y = original_mouse_x_y_for_effect_for_handle_mouse_move.y;

                    let original_y = original_x_y_for_effect_for_handle_mouse_move.x;

                    let width = *original_width_for_handle_mouse_move
                        + (event.page_x() - original_mouse_x as i32);
                    let height = *original_height_for_handle_mouse_move
                        - (event.page_y() - original_mouse_y as i32);

                    if width > MIN_WIDTH {
                        original_width_for_handle_mouse_move.set(width);

                        div_element_for_handle_mouse_move
                            .style()
                            .set_property("width", &format!("{width}px", width = width))
                            .unwrap();
                    }
                    if height > MIN_HEIGHT {
                        original_height_for_handle_mouse_move.set(height);
                        div_element_for_handle_mouse_move
                            .style()
                            .set_property("height", &format!("{height}px", height = height))
                            .unwrap();

                        let top = original_y + (event.page_y() as f64 - original_mouse_y);
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
            .add_event_listener_with_callback("mousedown", &handle_mouse_down)
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
                .remove_event_listener_with_callback("mousedown", &handle_mouse_down)
                .unwrap();
            window
                .remove_event_listener_with_callback("mousemove", &handle_mouse_move)
                .unwrap();
            window
                .remove_event_listener_with_callback("mouseup", &handle_mouse_up)
                .unwrap();
        }
    });
}
