import { Menus } from "../../types/processDirectory";
import finder from "../../assets/images/dock/finder.png";
import { FilesContextValue } from "../../context/FilesContext";

import { lazy } from "solid-js";

const V86Emulator = lazy(() => import("."));

const menus: Menus[] = [
  {
    starting: "file",
    menus: [
      {
        files: "files",
        options: {
          option1: "option1",
          option2: "option2",
        },
      },
    ],
  },
];

export const V86MetaData = (url: string) => {
  return {
    active: false,
    iconPath:
      "https://w7.pngwing.com/pngs/772/259/png-transparent-logo-fun-video-games-discord-emulator-gba-icon-game-rectangle-orange.png",
    dimension: {
      height: 500,
      left: 100,
      top: 100,
      width: 500,
    },
    id: "V86",
    tempDimension: undefined,
    isFullSize: false,
    process: <V86Emulator url={url} />,
    processName: "V86",
    menus: menus,
    isShrunk: false,
    hasWindow: false,
  };
};
