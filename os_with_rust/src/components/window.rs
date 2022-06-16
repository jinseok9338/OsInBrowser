use yew::prelude::*;

#[derive(Properties, PartialEq)]
pub struct WindowProps {
    pub children: Children,
}

#[function_component(Window)]
pub fn window(props: &WindowProps) -> Html {
    html! {
       <div class="window">
            {props.children.clone()}
       </div>
    }
}
