import { Menus } from "../../types/processDirectory";
import finder from "../../assets/images/dock/finder.png";
import { FilesContextValue } from "../../context/FilesContext";
import { lazy } from "solid-js";

const Finder = lazy(() => import("."));

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

interface FinderMentaDataPropType {
  FilesContext: FilesContextValue;
  openFile: (fileType: string, filePath: string) => void;
  url?: string;
}

export const finderMetaData = ({
  FilesContext,
  openFile,
  url,
}: FinderMentaDataPropType) => {
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
    process: (
      /*@once*/ <Finder FilesContext={FilesContext} openFile={openFile} />
    ), // needs file context ...
    processName: "finder",
    menus: menus,
    isShrunk: false,
    hasWindow: true,
  };
};
