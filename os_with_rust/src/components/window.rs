use yew::prelude::*;

#[derive(Properties, PartialEq)]
pub struct WindowProps {
    pub children: Children,
}

#[function_component(Window)]
pub fn window(props: &WindowProps) -> Html {
    html! {
        <div class="window_container">
            <div class="row">
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
    }
}
