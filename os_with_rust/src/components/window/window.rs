use gloo_console::log;

use yew::prelude::*;

use crate::{hooks::use_drag::use_draggable, utils::process_directory::Dimension};
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
    let resizable_ref = use_node_ref();
    let ref_left = use_node_ref();
    let ref_top = use_node_ref();
    let ref_right = use_node_ref();
    let ref_bottom = use_node_ref();

    let ref_bottom_left = use_node_ref();
    let ref_bottom_right = use_node_ref();
    let ref_top_right = use_node_ref();
    let ref_top_left = use_node_ref();

    let row_ref = use_node_ref();
    let container_ref = use_node_ref();

    use_draggable(row_ref.clone(), container_ref.clone());

    html! {
    <div class={classes!("window_container")}
    ref={container_ref}
    >
        <div class="resizeable" ref={resizable_ref}>
            <div  class={classes!("resizer", "resizer-l", {props.id.clone()})} ref={ref_left} ></div>
            <div class={classes!("resizer", "resizer-t", {props.id.clone()})} ref={ref_top}></div>
            <div class={classes!("resizer", "resizer-r", {props.id.clone()})} ref={ref_right}></div>
            <div class={classes!("resizer", "resizer-b", {props.id.clone()})} ref={ref_bottom}></div>
            <div class={classes!("resizer", "resizer-tr", {props.id.clone()})} ref={ref_top_right}></div>
            <div class={classes!("resizer", "resizer-tl", {props.id.clone()})} ref={ref_top_left}></div>
            <div class={classes!("resizer", "resizer-br", {props.id.clone()})} ref={ref_bottom_right}></div>
            <div class={classes!("resizer", "resizer-bl", {props.id.clone()})} ref={ref_bottom_left}></div>

            <div>
                <div class="row" ref={row_ref}>
                    <div class="column left">
                        <span class="dot" style="background:#ED594A;"></span> // this is for closing the window
                        <span class="dot" style="background:#FDD800;"></span> // this is for minimizing
                        <span class="dot" style="background:#5AC05A;"></span> // this is for expanding
                    </div>
                </div>

                <div class="content">
                    {props.children.clone()}
                </div>

            </div>

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
