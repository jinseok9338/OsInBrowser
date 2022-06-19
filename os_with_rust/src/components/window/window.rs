use gloo_console::log;

use yew::prelude::*;

use crate::hooks::{
    use_drag::use_draggable, use_raf_state::use_raf_state, use_resize::use_resizable,
    use_resize_2::use_resize_2,
};
use stylist::yew::styled_component;

#[derive(Properties, PartialEq)]
pub struct WindowProps {
    pub children: Children,
    pub id: String,
}
#[derive(PartialEq, Default, Clone)]
pub struct TopLeft {
    pub top: f64,
    pub left: f64,
}

#[styled_component(WindowComponent)]
pub fn window(props: &WindowProps) -> Html {
    let row_ref = use_node_ref();
    let top_right_ref = use_node_ref();
    let window_ref = use_node_ref();
    let top_left = use_raf_state(|| TopLeft::default());

    use_draggable(row_ref.clone(), window_ref.clone(), top, left);
    let new_width_height = use_resize_2(top_right_ref.clone(), window_ref.clone(), 500, 500);

    html! {
        <div class={classes!("window_container", css!(r#"
        width: ${width}px;
        height: ${height}px;
        "#,
         width=new_width_height.width,
         height=new_width_height.height,
    ))}
        ref={window_ref}
        >
            <div class="resizers" >
                <div  class={classes!("resizer", "top-left", {props.id.clone()})} ></div>
                <div class={classes!("resizer", "top-right", {props.id.clone()})} ref={top_right_ref}></div>
                <div class={classes!("resizer", "bottom-left", {props.id.clone()})} ></div>
                <div class={classes!("resizer", "bottom-right", {props.id.clone()})} ></div>
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
    }
}

// css!(
//     r#"
//     top: ${top};
//     left: ${left};
//     "#
// ,top=format!("{top}px", top = coordinate.dx),
// left=format!("{left}px", left = coordinate.dy))
