use crate::components::desktop::dock::dock::Dock;
use crate::components::desktop::menubar::menubar::MenuBar;
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
