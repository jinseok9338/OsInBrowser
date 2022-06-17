use gloo_console::log;

use yew::prelude::*;

use crate::hooks::use_drag::use_draggable;
use stylist::yew::styled_component;

#[derive(Properties, PartialEq)]
pub struct WindowProps {
    pub children: Children,
}

#[styled_component(WindowComponent)]
pub fn window(props: &WindowProps) -> Html {
    let div_ref = use_node_ref();
    log!(format!("{:?}", &div_ref));

    let coordinate = use_draggable(div_ref.clone());

    html! {
        <div class={classes!("window_container", css!(
                r#"
                top: ${top};
                left: ${left};
                "#
            ,top=format!("{top}px", top = coordinate.dx),
            left=format!("{left}px", left = coordinate.dy)))}
            ref={div_ref} >
            <div class="row">
                <div class="column left">
                    <span class="dot" style="background:#ED594A;"></span> // this is for closing the window
                    <span class="dot" style="background:#FDD800;"></span> // this is for minimizing
                    <span class="dot" style="background:#5AC05A;"></span> // this is for expanding
                </div>
            </div>

            <div  class="content">
                {props.children.clone()}
            </div>
      </div>
    }
}
