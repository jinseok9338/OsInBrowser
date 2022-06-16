use std::rc::Rc;

use gloo_console::log;
use yew::{
    function_component, html, use_context, use_reducer, virtual_dom::VNode, Children,
    ContextProvider, Properties, Reducible, UseReducerHandle,
};

/// reducer's Action
pub struct ProcessAction {
    pub process: ProcessState,
    pub action_type: String,
}

/// reducer's State
#[derive(Clone, PartialEq, Debug)]
pub struct ProcessState {
    pub process_name: Option<String>,
    pub process: Option<VNode>,
}

#[derive(Clone, PartialEq)]
pub struct ProcessesState {
    pub processes: Vec<ProcessState>,
}

impl Default for ProcessesState {
    fn default() -> Self {
        Self {
            processes: vec![ProcessState {
                process_name: Some("this is hello world".to_owned()),
                process: Some(html! {<h1>{"hello"}</h1>}),
            }],
        }
    }
}

impl Reducible for ProcessesState {
    /// Reducer Action Type
    type Action = ProcessAction;

    /// Reducer Function
    fn reduce(self: Rc<Self>, action: Self::Action) -> Rc<Self> {
        let next_ctr = match action.action_type.as_ref() {
            "add_process" => {
                let mut old_processes = self.processes.clone();
                old_processes.push(ProcessState {
                    process: action.process.process,
                    process_name: action.process.process_name,
                });
                old_processes
            }
            &_ => self.processes.clone(),
        };

        Self {
            processes: next_ctr.to_vec(),
        }
        .into()
    }
}

#[derive(Debug, PartialEq, Properties)]
pub struct ProcessDirectoryProps {
    pub children: Children,
}

#[function_component(ProcessDirectoryContextProvider)]
pub fn process_directory(props: &ProcessDirectoryProps) -> Html {
    let process_directory_context = use_reducer(ProcessesState::default);

    html! {
        <ContextProvider<UseReducerHandle<ProcessesState>> context={process_directory_context.clone()}>
            // Every child here and their children will have access to this context.
            {props.children.clone()}
        </ContextProvider<UseReducerHandle<ProcessesState>>>
    }
}

pub fn use_process_context() -> UseReducerHandle<ProcessesState> {
    use_context::<UseReducerHandle<ProcessesState>>().expect("no ctx found")
}
