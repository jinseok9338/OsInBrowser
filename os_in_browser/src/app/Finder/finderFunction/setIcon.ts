import { IMAGE_FILE_EXTENSIONS, TEXT_FORMAT } from "../../../utils/constants";
import folder from "../../../assets/images/apps/folder.png";
import picture from "../../../assets/images/apps/picture.png";
import unknown from "../../../assets/images/apps/unknown.png";
import textEdit from "../../../assets/images/apps/textedit.png";

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
    return picture;
  }
  if (TEXT_FORMAT.includes(iconName)) {
    return textEdit;
  }

  //this is unoknown type
  return unknown;
};
