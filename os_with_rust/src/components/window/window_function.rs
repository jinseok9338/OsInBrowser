use gloo_console::log;
use uuid::Uuid;
use web_sys::{window, HtmlDivElement};
use yew::UseReducerHandle;

use crate::{
    context::process_directory_context::ProcessesState,
    types::process_directory::{Dimension, ProcessAction, ProcessState},
};

pub fn enlarge(
    process: &ProcessState,
    element: HtmlDivElement,
    processes: &UseReducerHandle<ProcessesState>,
) {
    let original_dimension = &process.dimension.clone().unwrap();
    let window = window().unwrap();
    let inner_height = window.inner_height().unwrap().as_f64().unwrap();
    let inner_width = window.inner_width().unwrap().as_f64().unwrap();

    if !process.is_full_size.unwrap() {
        processes.dispatch(ProcessAction {
            action_type: "enlarge".to_owned(),
            process: process.to_owned(),
        });
        processes.dispatch(ProcessAction {
            action_type: "change_the_dimension".to_owned(),
            process: ProcessState {
                process_name: None,
                process: None,
                id: process.id,
                dimension: Some(Dimension {
                    height: inner_height,
                    width: inner_width,
                    top: 0.0,
                    left: 0.0,
                }),
                is_full_size: None,
                temp_dimension: Some(original_dimension.to_owned()),
            },
        });

    // Need to make is_full to true
    } else {
        let original_dimension = process.temp_dimension.as_ref().unwrap();
        processes.dispatch(ProcessAction {
            action_type: "enlarge".to_owned(),
            process: process.to_owned(),
        });
        processes.dispatch(ProcessAction {
            action_type: "change_the_dimension".to_owned(),
            process: ProcessState {
                process_name: None,
                process: None,
                id: process.id,
                dimension: Some(Dimension {
                    height: original_dimension.height,
                    width: original_dimension.width,
                    top: original_dimension.top,
                    left: original_dimension.left,
                }),
                is_full_size: None,
                temp_dimension: None,
            },
        });

        // Need to make is_full to false
    }
}

pub fn exit(processes: UseReducerHandle<ProcessesState>, id: String) {
    processes.dispatch(ProcessAction {
        action_type: "exit_process".to_owned(),
        process: ProcessState {
            id: Some(Uuid::try_parse(&id).unwrap()),
            dimension: None,
            process_name: None,
            process: None,
            is_full_size: None,
            temp_dimension: None,
        },
    })
}
