use std::rc::Rc;

use yew::{
    function_component, html, use_context, use_reducer, Children, ContextProvider, Properties,
    Reducible, UseReducerHandle,
};

/// reducer's Action
pub struct ProcessAction {
    process_name: String,
    action_type: String,
}

/// reducer's State
#[derive(Clone, PartialEq)]
struct ProcessState {
    process: String,
}

#[derive(Clone, PartialEq)]
pub struct ProcessesState {
    processes: Vec<ProcessState>,
}

impl Default for ProcessesState {
    fn default() -> Self {
        Self { processes: vec![] }
    }
}

impl Reducible for ProcessesState {
    /// Reducer Action Type
    type Action = ProcessAction;

    /// Reducer Function
    fn reduce(self: Rc<Self>, action: Self::Action) -> Rc<Self> {
        let add_process = {
            |process_name: &String| {
                let mut old_processes = self.processes.clone();
                old_processes.push(ProcessState {
                    process: process_name.to_owned(),
                })
            }
        };

        let next_ctr = match action.action_type.as_ref() {
            "add_process" => {
                add_process(&action.process_name);
                self.processes.clone()
            }
            &_ => todo!(),
        };

        Self {
            processes: next_ctr,
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
