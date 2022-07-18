import { IMAGE_FILE_EXTENSIONS, TEXT_FORMAT } from "../../../utils/constants";
import _folder from "../../../assets/images/apps/folder.png";
import pics from "../../../assets/images/apps/pics.png";
import xcode from "../../../assets/images/apps/xcode.png";
import textEdit from "../../../assets/images/apps/textedit.png";

export const getExtension = (directory: string) => {
  return /[.]/.exec(directory) ? /[^.]+$/.exec(directory) : undefined;
};

export const setIcon = (directory: string) => {
  let iconName = getExtension(directory)?.toString();
  if (iconName == undefined) {
    // get the folder icon since it's folder
    return "https://w7.pngwing.com/pngs/153/567/png-transparent-macbook-pro-macos-apple-samples-blue-angle-electronics-thumbnail.png";
  }
  if (IMAGE_FILE_EXTENSIONS.includes(iconName)) {
    return pics;
  }
  if (TEXT_FORMAT.includes(iconName)) {
    return textEdit;
  }
  return xcode;
};
