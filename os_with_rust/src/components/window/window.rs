use gloo_console::log;

use js_sys::Function;
use uuid::Uuid;
use wasm_bindgen::{prelude::Closure, JsCast};
use web_sys::HtmlDivElement;
use yew::prelude::*;

use crate::{
    hooks::use_drag::use_draggable,
    utils::{
        process_directory::{use_process_context, Dimension, ProcessAction, ProcessState},
        window::{enlarge, exit},
    },
};
use stylist::yew::styled_component;

#[derive(Properties, PartialEq)]
pub struct WindowProps {
    pub children: Children,
    pub id: String,
    pub dimension: Dimension,
}
#[derive(PartialEq, Default, Clone)]
pub struct TopLeft {
    pub top: f64,
    pub left: f64,
}

#[styled_component(WindowComponent)]
pub fn window(props: &WindowProps) -> Html {
    let id = props.id.clone();
    // let resizable_ref = use_node_ref();
    // let ref_left = use_node_ref();
    // let ref_top = use_node_ref();
    // let ref_right = use_node_ref();
    // let ref_bottom = use_node_ref();

    // let ref_bottom_left = use_node_ref();
    // let ref_bottom_right = use_node_ref();
    // let ref_top_right = use_node_ref();
    // let ref_top_left = use_node_ref();

    let row_ref = use_node_ref();
    let container_ref = use_node_ref();

    use_draggable(row_ref.clone(), container_ref.clone());
    let process_directory_context = use_process_context();
    let process_directory_context_for_closure = process_directory_context.clone();
    let id_for_exit = id.clone();

    let exit = {
        Callback::from(move |_e: MouseEvent| {
            let processes = process_directory_context_for_closure.clone();
            let id_for_exit = id_for_exit.clone();
            exit(processes, id_for_exit);
        })
    };

    let container_ref_clone = container_ref.clone();
    let process_directory_context_for_closure = process_directory_context.clone();
    let id_for_enlarge = id.clone();

    let enlarge = {
        Callback::from(move |_e: MouseEvent| {
            let processes = process_directory_context_for_closure.clone();
            let processes = &processes.processes;

            let process = processes
                .into_iter()
                .find(|process| process.id.unwrap().to_string() == id_for_enlarge.clone())
                .unwrap();
            let element = container_ref_clone.cast::<HtmlDivElement>().unwrap();
            enlarge(process, element);
        })
    };

    html! {
    <div class={classes!("window_container", props.id.clone())}
    ref={container_ref}
    >
                <div class="row" ref={row_ref}>
                    <div class="column row-left">
                        <span class="row-dot" style="background:#ED594A;" onclick={exit}></span> // this is for closing the window
                        <span class="row-dot" style="background:#FDD800;" ></span> // this is for minimizing
                        <span class="row-dot" style="background:#5AC05A;" onclick={enlarge}></span> // this is for expanding
                    </div>
                </div>
                <div class="content">
                    {props.children.clone()}
                </div>
    </div>
    }
}

// css!(
//     r#"
//     top: ${top};
//     left: ${left};
//     "#
// ,top=format!("{top}px", top = coordinate.dx),
// left=format!("{left}px", left = coordinate.dy))
