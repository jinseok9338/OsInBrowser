use crate::components::desktop::dock::Dock;
use crate::components::desktop::menubar::MenuBar;
use yew::prelude::*;

#[derive(Properties, PartialEq)]
pub struct DesktopProps {
    pub children: Children,
}

#[function_component(Desktop)]
pub fn desktop(props: &DesktopProps) -> Html {
    html! {
    <>
        <MenuBar/>
            {props.children.clone()}
        <Dock/>
    </>
    }
}
