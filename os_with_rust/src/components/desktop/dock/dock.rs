use crate::{
    apps::hello_world::HelloWorld,
    components::desktop::dock::dock_function::{focus, move_the_dock},
    context::process_directory_context::use_process_context,
    types::process_directory::{Dimension, ProcessAction, ProcessState},
};
use js_sys::Function;
use uuid::Uuid;
use wasm_bindgen::{prelude::Closure, JsCast};
use web_sys::{window, Document, HtmlCollection, HtmlElement};
use yew::prelude::*;

#[derive(Properties, PartialEq)]
pub struct DockProps {
    // processes: ProcessesState,
}

#[function_component(Dock)]
pub fn dock(_props: &DockProps) -> Html {
    let window = window().unwrap();

    use_effect(move || {
        let window = window.clone();
        let document_for_icon: Document = window.clone().document().unwrap();
        let document_for_dock_element = window.clone().document().unwrap();

        let icons: HtmlCollection = document_for_icon.get_elements_by_class_name("ico");
        let length = icons.length(); // let length = icons.length;

        for index in 0..length {
            let icons_for_loop = icons.clone();
            let element: HtmlElement = icons_for_loop
                .item(index)
                .expect("this is not HTMLElement1")
                .unchecked_into::<HtmlElement>();

            let element_for_closure = element.clone();
            let icons_for_closure = icons.clone();

            element
                .add_event_listener_with_callback(
                    "mouseover",
                    &Closure::<dyn Fn(MouseEvent)>::wrap(Box::new(move |_event: MouseEvent| {
                        let icons = icons_for_closure.clone();
                        let element = element_for_closure.clone();
                        focus(index as i32, element, icons);
                    }))
                    .into_js_value()
                    .dyn_into::<Function>()
                    .unwrap(),
                )
                .unwrap();
            let icons_for_mouse_leave = icons.clone();

            element
                .add_event_listener_with_callback(
                    "mouseleave",
                    &Closure::<dyn Fn(MouseEvent)>::wrap(Box::new(move |_event: MouseEvent| {
                        for index in 0..length {
                            let element = icons_for_mouse_leave
                                .item(index)
                                .expect("this is not element")
                                .unchecked_into::<HtmlElement>();
                            element
                                .style()
                                .set_property("transform", "scale(1) translateY(0px)")
                                .unwrap();
                        }
                    }))
                    .into_js_value()
                    .dyn_into::<Function>()
                    .unwrap(),
                )
                .unwrap();
        }
        let dock_element: HtmlElement = document_for_dock_element
            .get_elements_by_class_name("dock-container")
            .item(0)
            .unwrap()
            .unchecked_into::<HtmlElement>();

        window
            .add_event_listener_with_callback(
                "mousemove",
                &Closure::<dyn Fn(MouseEvent)>::wrap(Box::new(move |event: MouseEvent| {
                    let dock_element_for_closure = dock_element.clone();
                    move_the_dock(event, dock_element_for_closure);
                }))
                .into_js_value()
                .dyn_into::<Function>()
                .unwrap(),
            )
            .unwrap();

        || {}
    });
    let process_directory_context_for_closure = use_process_context();
    let onclick = {
        let process_directory_context_for_closure = process_directory_context_for_closure.clone();
        Callback::from(move |_event: MouseEvent| {
            let processes = process_directory_context_for_closure.clone();
            processes.dispatch(ProcessAction {
                action_type: "add_process".to_owned(),
                process: ProcessState {
                    process_name: Some("hello_world".to_owned()),
                    process: Some(html! {<HelloWorld/>}),
                    id: Some(Uuid::new_v4()),
                    dimension: Some(Dimension {
                        height: 500.0,
                        width: 500.0,
                        left: 100.0,
                        top: 100.0,
                    }),
                    temp_dimension: None,
                    is_full_size: Some(false),
                },
            });
        })
    };
    html! {
        <div class="dock">
        <div class="dock-container">
          <li class="li-1">
            <div class="name">{"Finder"}</div>
           <img draggable={false} class="ico"  {onclick} src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853981255cc36b3a37af_finder.png" alt=""/>
          </li>
          <li class="li-2">
            <div class="name">{"Siri"}</div>
           <img draggable={false} class="ico" src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853ff3bafbac60495771_siri.png" alt=""/>
          </li>
          <li class="li-3">
            <div class="name">{"LaunchPad"}</div>
           <img draggable={false} class="ico" src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853943597517f128b9b4_launchpad.png" alt=""/>
          </li>
          <li class="li-4">
            <div class="name">{"Contacts"}</div>
           <img draggable={false} class="ico" src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853743597518c528b9b3_contacts.png" alt=""/>
          </li>
          <li class="li-5">
            <div class="name">{"Notes"}</div>
           <img draggable={false} class="ico" src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853c849ec3735b52cef9_notes.png" alt=""/>
          </li>
          <li class="li-6">
            <div class="name">{"Reminders"}</div>
           <img draggable={false} class="ico" src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853d44d99641ce69afeb_reminders.png" alt=""/>
          </li>
          <li class="li-7">
            <div class="name">{"Photos"}</div>
           <img draggable={false} class="ico" src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853c55558a2e1192ee09_photos.png" alt=""/>
          </li>
          <li class="li-8">
            <div class="name">{"Messages"}</div>
           <img draggable={false} class="ico" src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853a55558a68e192ee08_messages.png" alt=""/>
          </li>
          <li class="li-9">
            <div class="name">{"FaceTime"}</div>
           <img draggable={false} class="ico" src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f708537f18e2cb27247c904_facetime.png" alt=""/>
          </li>
          <li class="li-10">
            <div class="name">{"Music"}</div>
           <img draggable={false} class="ico" src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853ba0782d6ff2aca6b3_music.png" alt=""/>
          </li>
          <li class="li-11">
            <div class="name">{"Podcasts"}</div>
           <img draggable={false} class="ico" src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853cc718ba9ede6888f9_podcasts.png" alt=""/>
          </li>
          <li class="li-12">
            <div class="name">{"TV"}</div>
           <img draggable={false} class="ico" src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f708540dd82638d7b8eda70_tv.png" alt=""/>
          </li>
          <li class="li-12">
            <div class="name">{"App Store"}</div>
           <img draggable={false} class="ico" src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853270b5e2ccfd795b49_appstore.png" alt=""/>
          </li>
          <li class="li-14">
            <div class="name">{"Safari"}</div>
           <img draggable={false} class="ico" src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853ddd826358438eda6d_safari.png" alt=""/>
          </li>
          <li class="li-bin li-15">
            <div class="name">{"Bin"}</div>
           <img draggable={false} class="ico ico-bin" src="https://findicons.com/files/icons/569/longhorn_objects/128/trash.png" alt=""/>
          </li>

        </div>
      </div>
    }
}
