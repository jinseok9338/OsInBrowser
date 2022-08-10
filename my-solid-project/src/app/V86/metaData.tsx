import Finder from ".";
import { Menus } from "../../types/processDirectory";
import finder from "../../assets/images/dock/finder.png";
import { FilesContextValue } from "../../context/FilesContext";

import V86Emulator from ".";

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
    iconPath: finder,
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
