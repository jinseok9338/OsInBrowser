use uuid::Uuid;
use web_sys::HtmlDivElement;
use yew::UseReducerHandle;

use crate::{
    context::process_directory_context::ProcessesState,
    types::process_directory::{ProcessAction, ProcessState},
};

pub fn enlarge(process: &ProcessState, element: HtmlDivElement) {
    if !process.is_full_size.unwrap() {
        element.style().set_property("width", "100vw").unwrap();
        element.style().set_property("height", "100vh").unwrap();
        element.style().set_property("top", "0px").unwrap();
        element.style().set_property("left", "0px").unwrap();

    // Need to make is_full to true
    } else {
        let dimension = process.dimension.as_ref().unwrap().clone();
        let width = dimension.width;
        let height = dimension.height;
        let top = dimension.top;
        let left = dimension.left;

        element
            .style()
            .set_property("width", &format!("{:?}px", width))
            .unwrap();
        element
            .style()
            .set_property("height", &format!("{:?}px", height))
            .unwrap();
        element
            .style()
            .set_property("top", &format!("{:?}px", top))
            .unwrap();
        element
            .style()
            .set_property("left", &format!("{:?}px", left))
            .unwrap();

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
        },
    })
}
