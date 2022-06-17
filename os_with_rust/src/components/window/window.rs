use yew::prelude::*;

use crate::hooks::use_raf_state::use_raf_state;

#[derive(Properties, PartialEq)]
pub struct WindowProps {
    pub children: Children,
}

#[function_component(Window)]
pub fn window(props: &WindowProps) -> Html {
    let state = use_raf_state(|| (0f64, 0f64));

    {
        let state = state.clone();
        use_event_with_window("resize", move |e: Event| {
            let window: Window = e.target_unchecked_into();
            state.set((
                window.inner_width().unwrap().as_f64().unwrap(),
                window.inner_height().unwrap().as_f64().unwrap(),
            ));
        });
    }

    html! {
        <div class="window_container">
            <div class="row">
                <div class="column left">
                    <span class="dot" style="background:#ED594A;"></span> // this is for closing the window
                    <span class="dot" style="background:#FDD800;"></span> // this is for minimizing
                    <span class="dot" style="background:#5AC05A;"></span> // this is for expanding
                </div>
            </div>

            <div class="content">
            {props.children.clone()}
            </div>
      </div>
    }
}
