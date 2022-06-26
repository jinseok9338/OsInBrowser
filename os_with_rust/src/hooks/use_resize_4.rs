use js_sys::Function;
use wasm_bindgen::{prelude::Closure, JsCast};
use web_sys::{window, HtmlElement, MouseEvent};
use yew::NodeRef;

use crate::{types::process_directory::ProcessState, utils::resize_function::resize};

// panel.addEventListener("mousedown", function(e){
//     if (e.offsetX < BORDER_SIZE) {
//       m_pos = e.x;
//       document.addEventListener("mousemove", resize, false);
//     }
//   }, false);

//   document.addEventListener("mouseup", function(){
//       document.removeEventListener("mousemove", resize, false);
//   }, false);

pub fn use_resize_4(process: ProcessState, resize_handler_node: NodeRef) {
    let resize_handler: HtmlElement = resize_handler_node.cast::<HtmlElement>().unwrap();
    let window = window().unwrap();
    let window_for_event = window.clone();
    let window_for_remove_event = window.clone();
    let dimension = process.dimension.clone().unwrap();

    let original_width = dimension.width;
    let original_height = dimension.height;
    let original_left = dimension.left;
    let original_top = dimension.top;

    let resize = Closure::<dyn Fn(MouseEvent)>::wrap(Box::new(move |event: MouseEvent| {}))
        .into_js_value()
        .dyn_into::<Function>()
        .unwrap();

    resize_handler
        .add_event_listener_with_callback(
            "mousedown",
            &Closure::<dyn Fn(MouseEvent)>::wrap(Box::new(move |event: MouseEvent| {
                let original_mouse_left = event.page_x() as f64;
                let original_mouse_top = event.page_y() as f64;
                window_for_event.add_event_listener_with_callback("mousemove", &resize);
            }))
            .into_js_value()
            .dyn_into::<Function>()
            .unwrap(),
        )
        .unwrap();

    window_for_remove_event.remove_event_listener_with_callback("mousemove", &resize);
}
