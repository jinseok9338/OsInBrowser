interface OnClickDragBoxProps {
  height: number;
  width: number;
  top: number;
  left: number;
}

const OnClickDragBox = ({ height, width, top, left }: OnClickDragBoxProps) => {
  return (
    <div
      class="onClickDragBox"
      style={`
height:${height}px;
width:${width}px;
top:${top}px;
left:${left}px;
`}
    />
  );
};

export default OnClickDragBox;
