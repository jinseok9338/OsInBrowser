use gloo_console::log;
use std::rc::Rc;
use uuid::Uuid;
use yew::{
    function_component, html, use_context, use_reducer, Children, ContextProvider, Properties,
    Reducible, UseReducerHandle,
};

use crate::types::process_directory::{Dimension, ProcessAction, ProcessState};

#[derive(Clone, PartialEq)]
pub struct ProcessesState {
    pub processes: Vec<ProcessState>,
}

impl Default for ProcessesState {
    fn default() -> Self {
        Self {
            processes: vec![ProcessState {
                process_name: Some("this is hello world".to_owned()),
                process: Some(html! {<h1>{"this is hello world with button"}</h1>}),
                id: Some(Uuid::new_v4()),
                dimension: Some(Dimension {
                    height: 500.0,
                    width: 500.0,
                    left: 100.0,
                    top: 100.0,
                }),
                is_full_size: Some(false),
                temp_dimension: None,
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
                    id: action.process.id,
                    dimension: action.process.dimension,
                    is_full_size: action.process.is_full_size,
                    temp_dimension: action.process.temp_dimension,
                });
                old_processes
            }
            "exit_process" => {
                let old_processes = self.processes.clone();
                let result = old_processes
                    .into_iter()
                    .filter(|process| process.id != action.process.id)
                    .collect::<Vec<ProcessState>>();

                result
            }
            "enlarge" => {
                let old_processes = self.processes.clone();
                let new_processes = old_processes
                    .into_iter()
                    .map(|process| {
                        let id = action.process.id.unwrap();

                        match process.id.unwrap() {
                            _ if process.id.unwrap() == id => ProcessState {
                                dimension: process.dimension,
                                id: process.id,
                                is_full_size: Some(!process.is_full_size.unwrap()),
                                process: process.process,
                                process_name: process.process_name,
                                temp_dimension: process.temp_dimension,
                            },
                            _ => process,
                        }
                    })
                    .collect::<Vec<ProcessState>>();

                new_processes
            }
            "change_the_dimension" => {
                let old_processes = self.processes.clone();
                let new_processes = old_processes
                    .into_iter()
                    .map(|process| {
                        let id = action.process.id.unwrap();
                        let dimension = action.process.dimension.clone();
                        let temp_dimension = action.process.temp_dimension.clone();
                        match process.id.unwrap() {
                            _ if process.id.unwrap() == id => ProcessState {
                                dimension,
                                id: process.id,
                                is_full_size: process.is_full_size,
                                process: process.process,
                                process_name: process.process_name,
                                temp_dimension,
                            },
                            _ => process,
                        }
                    })
                    .collect::<Vec<ProcessState>>();
                new_processes
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
