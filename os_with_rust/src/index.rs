use crate::components::back_ground::BackGround;
use crate::components::main::Main;

use crate::utils::process_directory::ProcessDirectoryContextProvider;
use yew::prelude::*;

#[function_component(App)]
pub fn app() -> Html {
    html! {
    <ProcessDirectoryContextProvider>
        <BackGround>
            <Main/>
        </BackGround>
    </ProcessDirectoryContextProvider>
    }
}
