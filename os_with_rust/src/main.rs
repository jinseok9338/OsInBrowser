mod apps;
mod components;
mod hooks;
mod index;
mod utils;

use index::App;
fn main() {
    yew::start_app::<App>();
}
