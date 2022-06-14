mod apps;
mod utils;

use crate::apps::hello_world::HelloWorld;

fn main() {
    yew::start_app::<HelloWorld>();
}
