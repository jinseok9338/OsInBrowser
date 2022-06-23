mod apps;
mod components;

mod hooks;
mod index;
mod utils;

mod context;
mod types;

use index::App;
fn main() {
    yew::start_app::<App>();
}
