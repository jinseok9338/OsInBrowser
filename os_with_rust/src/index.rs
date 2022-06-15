use crate::utils::process_directory::ProcessDirectoryContextProvider;
use yew::prelude::*;

#[function_component(App)]
pub fn app() -> Html {
    html! {
    <ProcessDirectoryContextProvider>
        <h1>{"Hello World"}</h1>
    </ProcessDirectoryContextProvider>
    }
}
