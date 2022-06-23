use gloo_console::log;
use wasm_bindgen::JsCast;
use web_sys::{HtmlCollection, HtmlElement};
pub fn focus(index: i32, element: HtmlElement, icons: HtmlCollection) {
    let previous = index - 1;
    let previous1 = index - 2;
    let next = index + 1;
    let next2 = index + 2;

    if previous == -1 {
        // first element
        element
            .style()
            .set_property("transform", "scale(1.5) translateY(-10px)")
            .expect("transoform is not setting in");

        let next_element: HtmlElement = icons
            .item(next as u32)
            .expect("this is not HTMLElement")
            .unchecked_into::<HtmlElement>();

        next_element
            .style()
            .set_property("transform", "scale(1.2) translateY(-6px)")
            .unwrap();

        let next_2_element: HtmlElement = icons
            .item(next2 as u32)
            .expect("this is not HTMLElement")
            .unchecked_into::<HtmlElement>();

        next_2_element
            .style()
            .set_property("transform", "scale(1.1)")
            .unwrap();
    } else if previous1 == -1 {
        // second element
        element
            .style()
            .set_property("transform", "scale(1.5)  translateY(-10px)")
            .unwrap();

        let previous_element = icons
            .item(previous as u32)
            .expect("this is not HTMLElement")
            .unchecked_into::<HtmlElement>();

        previous_element
            .style()
            .set_property("transform", "scale(1.2) translateY(-6px)")
            .unwrap();

        let next_element: HtmlElement = icons
            .item(next as u32)
            .expect("this is not HTMLElement")
            .unchecked_into::<HtmlElement>();

        next_element
            .style()
            .set_property("transform", "scale(1.2) translateY(-6px)")
            .unwrap();

        let next_2_element: HtmlElement = icons
            .item(next2 as u32)
            .expect("this is not HTMLElement")
            .unchecked_into::<HtmlElement>();

        next_2_element
            .style()
            .set_property("transform", "scale(1.1)")
            .unwrap();

        // need to review this
    } else if next == icons.length() as i32 {
        // last element
        element
            .style()
            .set_property("transform", "scale(1.5)  translateY(-10px)")
            .expect("transoform is not setting in");

        let previous_element = icons
            .item(previous as u32)
            .expect("this is not HTMLElement")
            .unchecked_into::<HtmlElement>();

        previous_element
            .style()
            .set_property("transform", "scale(1.2) translateY(-6px)")
            .unwrap();

        let previous_1_element: HtmlElement = icons
            .item(previous1 as u32)
            .expect("this is not HTMLElement2")
            .unchecked_into::<HtmlElement>();

        previous_1_element
            .style()
            .set_property("transform", "scale(1.1)")
            .unwrap();
    } else if next2 == icons.length() as i32 {
        // second to the last element
        element
            .style()
            .set_property("transform", "scale(1.5)  translateY(-10px)")
            .unwrap();

        let previous_element = icons
            .item(previous as u32)
            .expect("this is not HTMLElement")
            .unchecked_into::<HtmlElement>();

        previous_element
            .style()
            .set_property("transform", "scale(1.2) translateY(-6px)")
            .unwrap();

        let previous_1_element: HtmlElement = icons
            .item(previous1 as u32)
            .expect("this is not HTMLElement2")
            .unchecked_into::<HtmlElement>();

        previous_1_element
            .style()
            .set_property("transform", "scale(1.1)")
            .unwrap();

        let next_element: HtmlElement = icons
            .item(next as u32)
            .expect("this is not HTMLElement")
            .unchecked_into::<HtmlElement>();

        next_element
            .style()
            .set_property("transform", "scale(1.2) translateY(-6px)")
            .unwrap();
    } else {
        element
            .style()
            .set_property("transform", "scale(1.5)  translateY(-10px)")
            .unwrap();

        let previous_element = icons
            .item(previous as u32)
            .expect("this is not HTMLElement")
            .unchecked_into::<HtmlElement>();

        previous_element
            .style()
            .set_property("transform", "scale(1.2) translateY(-6px)")
            .unwrap();

        let previous_1_element: HtmlElement = icons
            .item(previous1 as u32)
            .expect("this is not HTMLElement2")
            .unchecked_into::<HtmlElement>();

        previous_1_element
            .style()
            .set_property("transform", "scale(1.1)")
            .unwrap();

        let next_element: HtmlElement = icons
            .item(next as u32)
            .expect("this is not HTMLElement")
            .unchecked_into::<HtmlElement>();

        next_element
            .style()
            .set_property("transform", "scale(1.2) translateY(-6px)")
            .unwrap();

        let next_2_element: HtmlElement = icons
            .item(next2 as u32)
            .expect("this is not HTMLElement")
            .unchecked_into::<HtmlElement>();

        next_2_element
            .style()
            .set_property("transform", "scale(1.1)")
            .unwrap();
    }
}
