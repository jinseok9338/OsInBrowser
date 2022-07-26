use js_sys::{Date, Function};

use wasm_bindgen::{prelude::Closure, JsCast, JsValue};
use web_sys::window;

use yew::prelude::*;

#[derive(Properties, PartialEq)]
pub struct MenuBarProps {}

#[function_component(MenuBar)]
pub fn menubar(_props: &MenuBarProps) -> Html {
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
          <img draggable={false} src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Apple_logo_white.svg/1010px-Apple_logo_white.svg.png" class="apple-logo" width="20" height="45" alt=""/>
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
              <img draggable={false} src="./icons/high-volume.png" width="30" height="30" alt="" class="vol"/>
           </div>
           <div class="menu-ico">
               <img draggable={false} src="./icons/bluetooth.png" width="30" height="30" alt="" class="bluetooth"/>
           </div>
           <div class="menu-ico">
               <i class="fas fa-battery-half"></i>
           </div>
           <div class="menu-ico">
               <img draggable={false} src="./icons/wifi-signal.png" width="30" height="30" alt="" class="wifi"/>
           </div>
           <div class="menu-ico">
               <img draggable={false} src="./icons/search.png" width="30" height="30" alt="" class="search"/>
           </div>
           <div class="menu-ico">
              <img draggable={false} src="https://eshop.macsales.com/blog/wp-content/uploads/2021/03/control-center-icon.png" width="30" height="30" alt="" class="control-center"/>
           </div>
           <div class="menu-ico">
               <img draggable={false} src="./icons/microphone.png" width="30" height="30" alt="" class="microphone"/>
           </div>

           <div class="menu-time">
                {time.clone()}
           </div>
       </div>

    </div>}
}
