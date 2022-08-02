import { onMount } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import useV86 from "./useV86";

interface V86Props {
  url: string; // onject to url string
}

const V86 = ({ url }: V86Props): JSX.Element => {
  let screenRef: HTMLDivElement | undefined = undefined;

  const { emulator, lockMouse } = useV86(url, screenRef!);
  const txtStyle = useV86ScreenSize(id, emulator());
  return (
    <StyledV86 ref={screenRef} onClick={lockMouse}>
      <div style={txtStyle} />
      <canvas />
    </StyledV86>
  );
};
export default V86;
