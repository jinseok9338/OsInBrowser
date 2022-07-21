import Finder from ".";
import { Menus } from "../../types/processDirectory";

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
    iconPath: "",
    dimension: {
      height: 500,
      left: 0,
      top: 100,
      width: 500,
    },
    id: "finder",
    tempDimension: undefined,
    isFullSize: false,
    process: <Finder />,
    processName: "finder",
    menus: menus,
    isShrunk: false,
  };
};
