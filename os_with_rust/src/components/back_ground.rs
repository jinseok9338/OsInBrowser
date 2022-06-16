use yew::prelude::*;

#[derive(Clone, PartialEq, Properties)]
pub struct BackGroundProps {
    pub children: Children,
}

#[function_component(BackGround)]
pub fn background(props: &BackGroundProps) -> Html {
    html! {
       <div>
       {props.children.clone()}
       </div>
    }
}
