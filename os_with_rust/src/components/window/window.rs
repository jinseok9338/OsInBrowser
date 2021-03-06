use yew::prelude::*;

use crate::hooks::use_resize_4::Resizer;
use crate::{
    components::window::window_function::{enlarge, exit},
    context::process_directory_context::use_process_context,
    hooks::use_drag::use_draggable,
    types::process_directory::ProcessState,
};
use stylist::yew::styled_component;

#[derive(Properties, PartialEq)]
pub struct WindowProps {
    pub process: ProcessState,
}
#[derive(PartialEq, Default, Clone)]
pub struct TopLeft {
    pub top: f64,
    pub left: f64,
}

#[styled_component(WindowComponent)]
pub fn window(props: &WindowProps) -> Html {
    let process_directory_context = use_process_context();
    let id = props.process.id.unwrap().to_string().clone();

    let row_ref = use_node_ref();
    let container_ref = use_node_ref();
    let process = props.process.clone();
    let process_for_resize = process.clone();

    let dimension = process.dimension.clone().unwrap();
    use_draggable(row_ref.clone(), process, container_ref.clone());

    let process_directory_context_for_closure = process_directory_context.clone();
    let id_for_exit = id.clone();

    let exit = {
        Callback::from(move |_e: MouseEvent| {
            let processes = process_directory_context_for_closure.clone();
            let id_for_exit = id_for_exit.clone();
            exit(processes, id_for_exit);
        })
    };

    let process_directory_context_for_closure = process_directory_context.clone();
    let id_for_enlarge = id.clone();

    let enlarge = {
        Callback::from(move |_e: MouseEvent| {
            let processes_handler = process_directory_context_for_closure.clone();
            let processes = &processes_handler.processes;

            let process = processes
                .into_iter()
                .find(|process| process.id.unwrap().to_string() == id_for_enlarge.clone())
                .unwrap();

            enlarge(process, &processes_handler);
        })
    };

    html! {
      <div class={classes!("window_container", id.clone()
    )}
    style ={format!("top: {top}px ; left: {left}px ;",top = dimension.top , left = dimension.left)}
      ref={container_ref}
      >
                   <Resizer/>
                  <div class="row" ref={row_ref}>
                      <div class="column row-left">
                          <span class="row-dot" style="background:#ED594A;" onclick={exit}></span> // this is for closing the window
                          <span class="row-dot" style="background:#FDD800;" ></span> // this is for minimizing
                          <span class="row-dot" style="background:#5AC05A;" onclick={enlarge}></span> // this is for expanding
                      </div>

                      <div class="column row-middle">
                          <span>{props.process.process_name.clone().unwrap()}</span>
                      </div>
                  </div>
                  <div class="content">
                      {props.process.process.clone().unwrap()}
                  </div>
      </div>
      }
}

// css!(
//     r#"
//     top: ${top};
//     left: ${left};
//     "#
// ,top=format!("{top}px", top = coordinate.dx),
// left=format!("{left}px", left = coordinate.dy))

// ,css!(r#"
//       top: ${top}px;
//       width: ${width}px;
//       left: ${left}px;
//       height: ${height}px;
//       "#,top = dimension.top,
//       width= dimension.width,
//        left= dimension.left,
//         height= dimension.height)
