use js_sys::{Date, Function};

use wasm_bindgen::{prelude::Closure, JsCast, JsValue};
use web_sys::window;

use yew::prelude::*;

#[derive(Properties, PartialEq)]
pub struct MenuBarProps {}

#[function_component(MenuBar)]
pub fn menubar(props: &MenuBarProps) -> Html {
    let time_handler = use_state_eq(|| {
        Date::new(&JsValue::from_f64(Date::now()))
            .to_time_string()
            .to_string()
    });
    let time = &*time_handler.clone();
    let time_handler_for_clone = time_handler.clone();
    let window = window().unwrap();

    use_effect(move || {
        let set_time = Closure::<dyn Fn(Event)>::wrap(Box::new(move |_event: Event| {
            let time_handler_for_use_effect = time_handler_for_clone.clone();
            let now = Date::new(&JsValue::from_f64(Date::now()))
                .to_time_string()
                .to_string();
            time_handler_for_use_effect.set(now.clone());
        }))
        .into_js_value()
        .dyn_into::<Function>()
        .unwrap();

        window
            .set_timeout_with_callback_and_timeout_and_arguments_0(&set_time, 1000)
            .unwrap();

        || {}
    });
    html! {

        <div class="menu-bar">
       <div class="left">
           <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Apple_logo_white.svg/1010px-Apple_logo_white.svg.png" class="apple-logo" width="20" height="45" alt=""/>
           <span class="menus active">{"Finder"}</span>
           <span class="menus">{"File"}</span>
           <span class="menus">{"Edit"}</span>
           <span class="menus">{"View"}</span>
           <span class="menus">{"Go"}</span>
           <span class="menus">{"Window"}</span>
           <span class="menus">{"Help"}</span>
       </div>

       <div class="right">
           <div class="menu-ico">
               <img src="https://freepngimg.com/download/united_states/76187-sound-information-united-business-states-address-email.png" width="30" height="30" alt="" class="vol"/>
           </div>
           <div class="menu-ico">
               <i class="fab fa-bluetooth-b"></i>
           </div>
           <div class="menu-ico">
               <i class="fas fa-battery-half"></i>
           </div>
           <div class="menu-ico">
               <i class="fas fa-wifi"></i>
           </div>
           <div class="menu-ico">
               <i class="fas fa-search"></i>
           </div>
           <div class="menu-ico">
               <img src="https://eshop.macsales.com/blog/wp-content/uploads/2021/03/control-center-icon.png" width="30" height="30" alt="" class="control-center"/>
           </div>
           <div class="menu-ico">
               <img src="https://upload.wikimedia.org/wikipedia/en/8/8e/AppleSiriIcon2017.png" alt="" width="30" height="30" class="siri"/>
           </div>

           <div class="menu-time">
          {time.clone()}
           </div>
       </div>

    </div>}
}
