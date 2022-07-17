import { customMenu } from "../hooks/useRightClickMenu";

export const TIFF_IMAGE_FORMATS = [".cr2", ".dng", ".nef", ".tif", ".tiff"];

export const IMAGE_FILE_EXTENSIONS = [
  ...TIFF_IMAGE_FORMATS,
  ".ani",
  ".apng",
  ".avif",
  ".bmp",
  ".cur",
  ".gif",
  ".ico",
  ".jfif",
  ".jif",
  ".jpe",
  ".jpeg",
  ".jpg",
  ".pjp",
  ".pjpeg",
  ".png",
  ".svg",
  ".webp",
  ".xbm",
];

export const TEXT_FORMAT = ["txt", "utxt", "utf8", "text"];

export const DIRECTORY_LIST = [
  "/home/desktop",
  "/home/downlaods",
  "/home/apps",
  "/home/pictures",
  "/home/documents",
  "/home/folder",
];

type MenuCollection = { [key: string]: customMenu[] };

export const menusCollection: MenuCollection = {
  fileMenu: [
    {
      iconPath: "fa fa-file",
      title: "delete File",
      onClick: () => alert("create Folder"),
      props: {},
    },
    {
      iconPath: "fa fa-folder-open",
      title: "rename FIle",
      onClick: () => alert("create Folder"),
      props: {},
    },
    {
      iconPath: "fa fa-cogs",
      title: "settings",
      onClick: () => alert("setting Opened"),
      props: {},
    },
  ],
};
