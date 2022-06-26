use gloo_console::{externs::log, log};
use gloo_events::EventListener;
use js_sys::Function;
use wasm_bindgen::{prelude::Closure, JsCast};

use web_sys::{window, EventTarget, HtmlElement};
use yew::{use_state_eq, NodeRef, UseReducerHandle};

use crate::{
    context::process_directory_context::{use_process_context, ProcessesState},
    hooks::use_effect_once::use_effect_once,
    types::process_directory::ProcessState,
    utils::resize_function::resize,
};

// panel.addEventListener("mousedown", function(e){
//     if (e.offsetX < BORDER_SIZE) {
//       m_pos = e.x;
//       document.addEventListener("mousemove", resize, false);
//     }
//   }, false);

//   document.addEventListener("mouseup", function(){
//       document.removeEventListener("mousemove", resize, false);
//   }, false);
use yew::prelude::*;

#[function_component(Resizer)]
pub fn resizer() -> Html {
    // let ref_left = use_node_ref();
    // let ref_top = use_node_ref();
    // let ref_right = use_node_ref();
    // let ref_bottom = use_node_ref();

    // let ref_bottom_left = use_node_ref();
    let ref_bottom_right = use_node_ref();
    // let ref_top_right = use_node_ref();
    // let ref_top_left = use_node_ref();

    let original_mouse_left = use_state_eq(|| 0.0);
    let original_mouse_top = use_state_eq(|| 0.0);
    use_effect_once(move || {
        let window = window().unwrap();
        let document = window.document().unwrap();

        let handlers = document.get_elements_by_class_name("resizer");
        log!(format!("{:?}", &handlers.length()));
        let item = handlers.item(0).unwrap();
        let element = item.unchecked_into::<HtmlElement>();
        const MIN_WIDTH: f64 = 100.0;
        const MIN_HEIGHT: f64 = 100.0;

        let use_process_context_for_closure = use_process_context.clone();
        let original_mouse_left_for_closure = original_mouse_left.clone();
        let original_mouse_top_for_closure = original_mouse_top.clone();

        let listener = EventListener::new(&element, "mousedown", move |_event| {
            log!("hey");
        });

        || {}
    });

    html! {<>
            <div class="right-top resizer"></div>
            <div class="right resizer"></div>
            <div class="right-bottom resizer" ref={ref_bottom_right} ></div>
            <div class="top resizer"></div>
            <div class="left-top resizer"></div>
            <div class="left-bottom resizer"></div>
            <div class="left resizer"></div>
            <div class="bottom resizer"></div>
        </>
    }
}
