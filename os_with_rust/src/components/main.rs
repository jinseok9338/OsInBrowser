use crate::apps::hello_world::HelloWorld;
use crate::components::window::window::WindowComponent;
use crate::utils::process_directory::{use_process_context, ProcessAction, ProcessState};

use uuid::Uuid;
use yew::prelude::*;

#[function_component(Main)]
pub fn main() -> Html {
    let process_directory_context = use_process_context();
    let process_directory_context_for_closure = process_directory_context.clone();
    let processes = process_directory_context.processes.clone();

    let onclick = {
        let process_directory_context_for_closure = process_directory_context_for_closure.clone();
        Callback::from(move |_| {
            let processes = process_directory_context_for_closure.clone();
            processes.dispatch(ProcessAction {
                action_type: "add_process".to_owned(),
                process: ProcessState {
                    process_name: Some("hello_world".to_owned()),
                    process: Some(html! {<HelloWorld/>}),
                    id: Some(Uuid::new_v4()),
                },
            });
        })
    };

    html! {
        <div>
            <button {onclick}>{"clickMe"}</button>
            {
                processes.into_iter().map(|process| {
                    html!{<WindowComponent key={process.id.unwrap().to_string()} id={process.id.unwrap().to_string()} >{ process.process.unwrap() }</WindowComponent>}
                }).collect::<Html>()
            }
        </div>
    }
}
