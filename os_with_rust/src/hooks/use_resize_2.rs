// https://codesandbox.io/s/sleepy-sammet-qu1vvk?file=/src/App.js
// https://stackoverflow.com/questions/62600433/calculate-new-width-on-resize-for-a-react-hook
// import React, { useEffect, useState } from "react";
// import "./styles.css";

// export default function App() {
//   const [isResizable, setIsResizable] = useState(false);
//   const [newWidth, setIsNewWidth] = useState(500);

//   function handleResize() {
//     setIsResizable(true);
//   }

//   function handleMouseMove(event) {
//     console.log("move");
//     if (isResizable) {
//       let offsetRight = event.clientX;
//       let minWidth = 50;
//       let maxWidth = 700;
//       if (offsetRight > minWidth && offsetRight < maxWidth) {
//         setIsNewWidth(offsetRight);
//       }
//     }
//   }

//   function handleMouseUp() {
//     setIsResizable(false);
//   }

//   useEffect(() => {
//     document.addEventListener("mousemove", handleMouseMove);
//     document.addEventListener("mouseup", handleMouseUp);

//     return () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//       document.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, [isResizable]);

//   return (
//     <div
//       className={`relative-drawer`}
//       style={{
//         width: newWidth,
//         height: newWidth,
//         minWidth: 50
//       }}
//     >
//       <div className={"dragable"} onMouseDown={() => handleResize()} />
//     </div>
//   );
// }
