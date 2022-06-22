use crate::apps::hello_world::HelloWorld;
use crate::components::desktop::desktop::Desktop;
use crate::components::window::window::WindowComponent;
use crate::utils::process_directory::{
    use_process_context, Dimension, ProcessAction, ProcessState,
};

use uuid::Uuid;
use yew::prelude::*;

#[function_component(Main)]
pub fn main() -> Html {
    let process_directory_context = use_process_context();
    let process_directory_context_for_closure = process_directory_context.clone();
    let processes = process_directory_context.processes.clone();

    html! {
        <div>
            <Desktop>
            {
                processes.into_iter().map(|process| {
                    html!{
                    <WindowComponent key={process.id.unwrap().to_string()}
                     id={process.id.unwrap().to_string()}
                    dimension={process.dimension.unwrap()} >
                    { process.process.unwrap() }</WindowComponent>}
                }).collect::<Html>()
            }
            </Desktop>
        </div>
    }
}
