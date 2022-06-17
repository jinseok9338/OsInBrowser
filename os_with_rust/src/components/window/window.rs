use gloo_console::log;

use yew::prelude::*;

use crate::hooks::{use_drag::use_draggable, use_resize::use_resizable};
use stylist::yew::styled_component;

#[derive(Properties, PartialEq)]
pub struct WindowProps {
    pub children: Children,
}

#[styled_component(WindowComponent)]
pub fn window(props: &WindowProps) -> Html {
    let row_ref = use_node_ref();
    let div_ref = use_node_ref();

    let coordinate = use_draggable(row_ref.clone());
    let height_and_width = use_resizable(div_ref.clone());

    log!(format!(
        "{:?},{:?}",
        &height_and_width.width, &height_and_width.height
    ));
    html! {
        <div class={classes!("window_container", css!(r#"
        transform: translate3d(${dx}px, ${dy}px, 0);
        width: ${width};
        height: ${height};
        "#,dx=&coordinate.dx, dy=&coordinate.dy, width =height_and_width.width, height=height_and_width.height))}
        >
            <div class="row" ref={row_ref}>
                <div class="column left">
                    <span class="dot" style="background:#ED594A;"></span> // this is for closing the window
                    <span class="dot" style="background:#FDD800;"></span> // this is for minimizing
                    <span class="dot" style="background:#5AC05A;"></span> // this is for expanding
                </div>
            </div>

            <div  ref={div_ref} class="content">

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
