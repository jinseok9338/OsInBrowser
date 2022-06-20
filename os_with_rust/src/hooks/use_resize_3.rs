// import React, { useRef, useEffect } from "react";
// import "./App.css";

// function App() {
//   const ref = useRef(null);
//   const refLeft = useRef(null);
//   const refTop = useRef(null);
//   const refRight = useRef(null);
//   const refBottom = useRef(null);

//   useEffect(() => {
//     const resizeableEle = ref.current;
//     const styles = window.getComputedStyle(resizeableEle);
//     let width = parseInt(styles.width, 10);
//     let height = parseInt(styles.height, 10);
//     let x = 0;
//     let y = 0;

//     resizeableEle.style.top = "50px";
//     resizeableEle.style.left = "50px";

//     // Right resize
//     const onMouseMoveRightResize = (event) => {
//       const dx = event.clientX - x;
//       x = event.clientX;
//       width = width + dx;
//       resizeableEle.style.width = `${width}px`;
//     };

//     const onMouseUpRightResize = (event) => {
//       document.removeEventListener("mousemove", onMouseMoveRightResize);
//     };

//     const onMouseDownRightResize = (event) => {
//       x = event.clientX;
//       resizeableEle.style.left = styles.left;
//       resizeableEle.style.right = null;
//       document.addEventListener("mousemove", onMouseMoveRightResize);
//       document.addEventListener("mouseup", onMouseUpRightResize);
//     };

//     // Top resize
//     const onMouseMoveTopResize = (event) => {
//       const dy = event.clientY - y;
//       height = height - dy;
//       y = event.clientY;
//       resizeableEle.style.height = `${height}px`;
//     };

//     const onMouseUpTopResize = (event) => {
//       document.removeEventListener("mousemove", onMouseMoveTopResize);
//     };

//     const onMouseDownTopResize = (event) => {
//       y = event.clientY;
//       const styles = window.getComputedStyle(resizeableEle);
//       resizeableEle.style.bottom = styles.bottom;
//       resizeableEle.style.top = null;
//       document.addEventListener("mousemove", onMouseMoveTopResize);
//       document.addEventListener("mouseup", onMouseUpTopResize);
//     };

//     // Bottom resize
//     const onMouseMoveBottomResize = (event) => {
//       const dy = event.clientY - y;
//       height = height + dy;
//       y = event.clientY;
//       resizeableEle.style.height = `${height}px`;
//     };

//     const onMouseUpBottomResize = (event) => {
//       document.removeEventListener("mousemove", onMouseMoveBottomResize);
//     };

//     const onMouseDownBottomResize = (event) => {
//       y = event.clientY;
//       const styles = window.getComputedStyle(resizeableEle);
//       resizeableEle.style.top = styles.top;
//       resizeableEle.style.bottom = null;
//       document.addEventListener("mousemove", onMouseMoveBottomResize);
//       document.addEventListener("mouseup", onMouseUpBottomResize);
//     };

//     // Left resize
//     const onMouseMoveLeftResize = (event) => {
//       const dx = event.clientX - x;
//       x = event.clientX;
//       width = width - dx;
//       resizeableEle.style.width = `${width}px`;
//     };

//     const onMouseUpLeftResize = (event) => {
//       document.removeEventListener("mousemove", onMouseMoveLeftResize);
//     };

//     const onMouseDownLeftResize = (event) => {
//       x = event.clientX;
//       resizeableEle.style.right = styles.right;
//       resizeableEle.style.left = null;
//       document.addEventListener("mousemove", onMouseMoveLeftResize);
//       document.addEventListener("mouseup", onMouseUpLeftResize);
//     };

//     // Add mouse down event listener
//     const resizerRight = refRight.current;
//     resizerRight.addEventListener("mousedown", onMouseDownRightResize);
//     const resizerTop = refTop.current;
//     resizerTop.addEventListener("mousedown", onMouseDownTopResize);
//     const resizerBottom = refBottom.current;
//     resizerBottom.addEventListener("mousedown", onMouseDownBottomResize);
//     const resizerLeft = refLeft.current;
//     resizerLeft.addEventListener("mousedown", onMouseDownLeftResize);

//     return () => {
//       resizerRight.removeEventListener("mousedown", onMouseDownRightResize);
//       resizerTop.removeEventListener("mousedown", onMouseDownTopResize);
//       resizerBottom.removeEventListener("mousedown", onMouseDownBottomResize);
//       resizerLeft.removeEventListener("mousedown", onMouseDownLeftResize);
//     };
//   }, []);

//   return (
//     <div className="container">
//       <div ref={ref} className="resizeable">
//         <div ref={refLeft} className="resizer resizer-l"></div>
//         <div ref={refTop} className="resizer resizer-t"></div>
//         <div ref={refRight} className="resizer resizer-r"></div>
//         <div ref={refBottom} className="resizer resizer-b"></div>
//       </div>
//     </div>
//   );
// }

// export default App;

use gloo::history::History;
use js_sys::Function;
use wasm_bindgen::{prelude::Closure, JsCast};
use web_sys::{window, HtmlDivElement};
use yew::prelude::*;

use crate::hooks::use_effect_once::use_effect_once;

#[derive(Properties, PartialEq)]
pub struct ResizerHandlerProps {
    div_ref: NodeRef,
    left_ref: NodeRef,
    right_ref: NodeRef,
    top_ref: NodeRef,
    bottom_ref: NodeRef,
}

#[function_component(ResizerHandler)]
pub fn resizer_handler(props: &ResizerHandlerProps) -> Html {
    use_effect_once(move || {
        {
            // bunch of variables
            let resizable_element = props.div_ref.clone().cast::<HtmlDivElement>().unwrap();
            let window = window().unwrap();
            let styles = resizable_element.style();
            let width: i32 = styles
                .get_property_value("width")
                .unwrap()
                .as_str()
                .replace("px", "")
                .parse()
                .unwrap();
            let height: i32 = styles
                .get_property_value("height")
                .unwrap()
                .as_str()
                .replace("px", "")
                .parse()
                .unwrap();
            let x = 0;
            let y = 0;

            // styles.set_property("top","50px");
            // styles.set_property("left","50px");

            //Right resize
            let on_mouse_move_right_resize =
                Closure::<dyn Fn(MouseEvent)>::wrap(Box::new(move |event: MouseEvent| {
                    window.remove_event_listener_with_callback(
                        "mousemove",
                        &on_mouse_move_right_resize,
                    );
                }))
                .into_js_value()
                .dyn_into::<Function>()
                .unwrap();

            let on_mouse_down_right_resize =
                Closure::<dyn Fn(MouseEvent)>::wrap(Box::new(move |event: MouseEvent| {
                    let x = event.client_x();
                    resizable_element
                        .style()
                        .set_property("left", styles.get_property_value("left").unwrap().as_str());
                    resizable_element.style().remove_property("right");

                    window
                        .add_event_listener_with_callback("mousemove", &on_mouse_move_right_resize);
                    window.add_event_listener_with_callback("mouseup", &on_mouse_up_right_resize);
                }))
                .into_js_value()
                .dyn_into::<Function>()
                .unwrap();

            //Top resize
            let on_mouse_move_top_resize =
                Closure::<dyn Fn(MouseEvent)>::wrap(Box::new(move |event: MouseEvent| {
                    let dy = event.client_y() - y;
                    let height = height - dy;
                    let y = event.client_y();
                    resizable_element
                        .style()
                        .set_property("height", &format!("{:?}px", height));
                }))
                .into_js_value()
                .dyn_into::<Function>()
                .unwrap();
        }
        || {}
    });

    html! {}
}
