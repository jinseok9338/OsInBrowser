import { IMAGE_FILE_EXTENSIONS, TEXT_FORMAT } from "../../../utils/constants";
import folder from "../images/apps/folder.png";
import pics from "../images/apps/pics.png";
import xcode from "../images/apps/xcode.png";
import textEdit from "../images/apps/textedit.png";

export const getExtension = (directory: string) => {
  return /[.]/.exec(directory) ? /[^.]+$/.exec(directory) : undefined;
};

export const setIcon = (directory: string) => {
  let iconName = getExtension(directory)?.toString();
  if (iconName == undefined) {
    // get the folder icon since it's folder
    return folder;
  }
  if (IMAGE_FILE_EXTENSIONS.includes(iconName)) {
    return pics;
  }
  if (TEXT_FORMAT.includes(iconName)) {
    return textEdit;
  }
  return xcode;
};
