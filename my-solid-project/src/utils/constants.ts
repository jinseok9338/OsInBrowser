import { customMenu } from "../types/customMenu";

export const TIFF_IMAGE_FORMATS = ["cr2", "dng", "nef", "tif", "tiff"];

export const IMAGE_FILE_EXTENSIONS = [
  ...TIFF_IMAGE_FORMATS,
  "ani",
  "apng",
  "avif",
  "bmp",
  "cur",
  "gif",
  "ico",
  "jfif",
  "jif",
  "jpe",
  "jpeg",
  "jpg",
  "pjp",
  "pjpeg",
  "png",
  "PNG",
  "svg",
  "webp",
  "xbm",
];

export const TEXT_FORMAT = ["txt", "utxt", "utf8", "text"];

export const DIRECTORY_LIST = [
  "/desktop",
  "/download",
  "/apps",
  "/pictures",
  "/documents",
  "/folder",
];

type MenuCollection = { [key: string]: customMenu[] };

export const CustomMenuOnIcon = (...args: any): MenuCollection => ({
  fileMenu: [
    {
      iconPath: "fa fa-file",
      title: "delete File",
      onClick: args["delete File"],
    },
    {
      iconPath: "fa fa-cogs",
      title: "settings",
      onClick: args["settings"],
    },
  ],
});

export interface configType {
  allowedFileFormats: string[];
  fileSizeMBLimit: number;
  filesLimit: number;
}

export const config = {
  allowedFileFormats: IMAGE_FILE_EXTENSIONS.map(
    (file) => `image/${file}`
  ).concat(["text/plain"]), // add more file type
  fileSizeMBLimit: 20,
  filesLimit: 1,
};

export const FILE_UPLOADER_STATE = {
  INIT: "INIT",
  PROCESSING: "PROCESSING",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};
