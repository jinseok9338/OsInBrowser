use crate::apps::hello_world::HelloWorld;
use crate::components::desktop::desktop::Desktop;
use crate::components::window::window::WindowComponent;
use crate::context::process_directory_context::use_process_context;

use yew::prelude::*;

#[function_component(Main)]
pub fn main() -> Html {
    let process_directory_context = use_process_context();
    let processes = process_directory_context.processes.clone();

    html! {
        <div>
            <Desktop>
            {
                processes.into_iter().map(|process| {
                    html!{
                    <WindowComponent key={process.id.unwrap().to_string()}
                    process={process.clone()} >
                    </WindowComponent>}
                }).collect::<Html>()
            }
            </Desktop>
        </div>
    }
}
