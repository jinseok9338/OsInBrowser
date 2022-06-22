use gloo_console::log;
use std::rc::Rc;
use uuid::Uuid;
use yew::{
    function_component, html, use_context, use_reducer, virtual_dom::VNode, Children,
    ContextProvider, Properties, Reducible, UseReducerHandle,
};

/// reducer's Action
pub struct ProcessAction {
    pub process: ProcessState,
    pub action_type: String,
}

#[derive(Clone, PartialEq, Debug)]
pub struct Dimension {
    pub height: f64,
    pub width: f64,
    pub top: f64,
    pub left: f64,
}

/// reducer's State
#[derive(Clone, PartialEq, Debug)]
pub struct ProcessState {
    pub process_name: Option<String>,
    pub process: Option<VNode>,
    pub id: Option<Uuid>,
    pub dimension: Option<Dimension>,
    pub is_full_size: Option<bool>,
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
                process: Some(html! {<h1>{"this is hello world with button"}</h1>}),
                id: Some(Uuid::new_v4()),
                dimension: Some(Dimension {
                    height: 500.0,
                    width: 500.0,
                    left: 100.0,
                    top: 100.0,
                }),
                is_full_size: Some(false),
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
