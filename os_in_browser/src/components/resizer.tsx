import useResize from "../hooks/useResize";

const Resizers = () => {
  let rightBottomResizer;
  let rightTopResizer;
  let topResizer;
  let rightResizer;
  let leftBottomResizer;
  let leftTopResizer;
  let leftResizer;
  let bottomResizer;

  const rightBottomResize = useResize(rightBottomResizer);
  const rightTopResize = useResize(rightTopResizer);
  const topResize = useResize(topResizer);
  const rightResize = useResize(rightResizer);
  const leftBottomResize = useResize(leftBottomResizer);
  const leftTopResize = useResize(leftTopResizer);
  const leftResize = useResize(leftResizer);
  const bottomResize = useResize(bottomResizer);

  return (
    <>
      <div class="right-top resizer" ref={rightTopResizer}></div>
      <div class="right resizer" ref={rightResizer}></div>
      <div
        class="right-bottom resizer"
        ref={rightBottomResizer}
        onmousedown={rightBottomResize.onMouseDown}
      ></div>
      <div class="top resizer" ref={topResizer}></div>
      <div class="left-top resizer" ref={leftTopResizer}></div>
      <div class="left-bottom resizer" ref={leftBottomResizer}></div>
      <div class="left resizer" ref={leftResizer}></div>
      <div class="bottom resizer" ref={bottomResizer}></div>
    </>
  );
};

export default Resizers;
