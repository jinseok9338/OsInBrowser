use uuid::Uuid;
use web_sys::{HtmlCollection, HtmlElement, MouseEvent};
use yew::UseReducerHandle;

use crate::{
    context::process_directory_context::ProcessesState,
    types::process_directory::{Dimension, ProcessAction, ProcessState},
};

pub fn resize(
    resizer: HtmlElement,
    event: MouseEvent,
    use_process_context: &UseReducerHandle<ProcessesState>,
    original_width: f64,
    original_height: f64,
    original_left: f64,
    original_top: f64,
    original_mouse_left: f64,
    original_mouse_top: f64,
    min_height: f64,
    min_width: f64,
    process: ProcessState,
) {
    let first_class_name = resizer.class_list().item(0).unwrap();

    match first_class_name.as_str() {
        "top" => {
            top_resize(
                event,
                use_process_context,
                original_width,
                original_height,
                original_left,
                original_top,
                original_mouse_left,
                original_mouse_top,
                min_height,
                min_width,
                process,
            );
        }
        "right-top" => {
            right_top_resize(
                event,
                use_process_context,
                original_width,
                original_height,
                original_left,
                original_top,
                original_mouse_left,
                original_mouse_top,
                min_height,
                min_width,
                process,
            );
        }
        "right" => {
            right_resize(
                event,
                use_process_context,
                original_width,
                original_height,
                original_left,
                original_top,
                original_mouse_left,
                original_mouse_top,
                min_height,
                min_width,
                process,
            );
        }
        "right-bottom" => {
            right_bottom_resize(
                event,
                use_process_context,
                original_width,
                original_height,
                original_left,
                original_top,
                original_mouse_left,
                original_mouse_top,
                min_height,
                min_width,
                process,
            );
        }
        "bottom" => {
            bottom_resize(
                event,
                use_process_context,
                original_width,
                original_height,
                original_left,
                original_top,
                original_mouse_left,
                original_mouse_top,
                min_height,
                min_width,
                process,
            );
        }
        "left-bottom" => {
            left_bottom_resize(
                event,
                use_process_context,
                original_width,
                original_height,
                original_left,
                original_top,
                original_mouse_left,
                original_mouse_top,
                min_height,
                min_width,
                process,
            );
        }
        "left" => {
            left_resize(
                event,
                use_process_context,
                original_width,
                original_height,
                original_left,
                original_top,
                original_mouse_left,
                original_mouse_top,
                min_height,
                min_width,
                process,
            );
        }
        "left-top" => {
            left_top_resize(
                event,
                use_process_context,
                original_width,
                original_height,
                original_left,
                original_top,
                original_mouse_left,
                original_mouse_top,
                min_height,
                min_width,
                process,
            );
        }
        &_ => todo!(),
    }
}

fn top_resize(
    event: MouseEvent,
    use_process_context: &UseReducerHandle<ProcessesState>,
    original_width: f64,
    original_height: f64,
    original_left: f64,
    original_top: f64,
    original_mouse_left: f64,
    original_mouse_top: f64,
    min_height: f64,
    min_width: f64,
    process: ProcessState,
) {
}

fn right_top_resize(
    event: MouseEvent,
    use_process_context: &UseReducerHandle<ProcessesState>,
    original_width: f64,
    original_height: f64,
    original_left: f64,
    original_top: f64,
    original_mouse_left: f64,
    original_mouse_top: f64,
    min_height: f64,
    min_width: f64,
    process: ProcessState,
) {
}

fn right_resize(
    event: MouseEvent,
    use_process_context: &UseReducerHandle<ProcessesState>,
    original_width: f64,
    original_height: f64,
    original_left: f64,
    original_top: f64,
    original_mouse_left: f64,
    original_mouse_top: f64,
    min_height: f64,
    min_width: f64,
    process: ProcessState,
) {
}

fn right_bottom_resize(
    event: MouseEvent,
    use_process_context: &UseReducerHandle<ProcessesState>,
    original_width: f64,
    original_height: f64,
    original_left: f64,
    original_top: f64,
    original_mouse_left: f64,
    original_mouse_top: f64,
    min_height: f64,
    min_width: f64,
    process: ProcessState,
) {
    let width = original_width + (event.page_x() as f64 - original_mouse_left);
    let height = original_height + (event.page_y() as f64 - original_mouse_top);

    let new_process = ProcessState {
        process_name: None,
        process: None,
        id: process.id,
        dimension: Some(Dimension {
            height,
            width,
            top: original_top,
            left: original_left,
        }),
        is_full_size: None,
        temp_dimension: process.temp_dimension,
    };

    if width > min_width {
        // unpdate dimension
        use_process_context.dispatch(ProcessAction {
            process: new_process.clone(),
            action_type: "change_the_dimension".to_owned(),
        })
    }
    if height > min_height {
        // update dimension
        use_process_context.dispatch(ProcessAction {
            process: new_process.clone(),
            action_type: "change_the_dimension".to_owned(),
        })
    }
}

fn bottom_resize(
    event: MouseEvent,
    use_process_context: &UseReducerHandle<ProcessesState>,
    original_width: f64,
    original_height: f64,
    original_left: f64,
    original_top: f64,
    original_mouse_left: f64,
    original_mouse_top: f64,
    min_height: f64,
    min_width: f64,
    process: ProcessState,
) {
}

fn left_bottom_resize(
    event: MouseEvent,
    use_process_context: &UseReducerHandle<ProcessesState>,
    original_width: f64,
    original_height: f64,
    original_left: f64,
    original_top: f64,
    original_mouse_left: f64,
    original_mouse_top: f64,
    min_height: f64,
    min_width: f64,
    process: ProcessState,
) {
}

fn left_resize(
    event: MouseEvent,
    use_process_context: &UseReducerHandle<ProcessesState>,
    original_width: f64,
    original_height: f64,
    original_left: f64,
    original_top: f64,
    original_mouse_left: f64,
    original_mouse_top: f64,
    min_height: f64,
    min_width: f64,
    process: ProcessState,
) {
}

fn left_top_resize(
    event: MouseEvent,
    use_process_context: &UseReducerHandle<ProcessesState>,
    original_width: f64,
    original_height: f64,
    original_left: f64,
    original_top: f64,
    original_mouse_left: f64,
    original_mouse_top: f64,
    min_height: f64,
    min_width: f64,
    process: ProcessState,
) {
}
