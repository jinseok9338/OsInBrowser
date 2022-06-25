use yew::prelude::*;

#[function_component(HelloWorld)]
pub fn hello_world() -> Html {
    let counter = use_state(|| 0);

    let onclick = {
        let counter = counter.clone();
        Callback::from(move |_| counter.set(*counter + 1))
    };

    html! {
        <>
            <h1>{"Hello world"}</h1>
            <p>{*counter}</p>
            <button {onclick}>{"click +1"}</button>
        </>
    }
}
