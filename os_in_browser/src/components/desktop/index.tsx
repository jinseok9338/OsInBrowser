import { JSX } from "solid-js/jsx-runtime";
import { ResolvedChildren } from "solid-js/types/reactive/signal";
import Dock from "./dock";
import Menubar from "./menubar";

interface DesktopProps {
  children: JSX.Element;
}

const Desktop = ({ children }: DesktopProps) => {
  return (
    <>
      <Menubar />
      <div class="mainDesktop">
        {children}
        <Dock />
      </div>
    </>
  );
};

export default Desktop;
