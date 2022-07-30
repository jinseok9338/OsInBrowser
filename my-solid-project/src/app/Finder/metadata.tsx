import Finder from ".";
import { Menus } from "../../types/processDirectory";
import finder from "../../assets/images/dock/finder.png";

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

export const finderMetaData = (props: any) => {
  return {
    active: false,
    iconPath: finder, // this needs to be fixed
    dimension: {
      height: 500,
      left: 0,
      top: 100,
      width: 500,
    },
    id: "finder",
    tempDimension: undefined,
    isFullSize: false,
    process: <Finder FilesContext={props} />, // needs file context ...
    processName: "finder",
    menus: menus,
    isShrunk: false,
  };
};
