use crate::apps::hello_world::HelloWorld;
use yew::prelude::*;
pub struct Process<T>
where
    T: FunctionComponent,
{
    component: T,
    window: bool,
}

#[derive(PartialEq)]
pub struct ProcessDirectory {
    hello_world: Process<HelloWorld>,
}
