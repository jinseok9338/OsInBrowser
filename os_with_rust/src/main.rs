use yew::{function_component, html};

#[function_component(HelloWorld)]
fn hello_world() -> Html {
    html! { "Hello world" }
}

fn main() {
    yew::start_app::<HelloWorld>();
}
