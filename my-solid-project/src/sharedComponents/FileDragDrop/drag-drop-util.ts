import get from "lodash/get";
import { configType } from "../../utils/constants";
// need to figure out the type of the files and config
export const fileValidator = (files: Blob[], config: configType) => {
  const { allowedFileFormats, fileSizeMBLimit, filesLimit } = config;
  const { length } = files;
  const { size, type } = files[0];
  let err = "";
  let result = {
    isValidFile: false,
    errVal: err,
  };
  if (length === 0) {
    return result;
  } else if (length > filesLimit) {
    err =
      filesLimit > 1
        ? `Only ${filesLimit} files are allowed to upload`
        : `Only one file is allowed to upload`;
  } else if (!allowedFileFormats.includes(type)) {
    err = "File format must be either png or jpg";
  } else if (size / 1024 / 1024 > fileSizeMBLimit) {
    err = `File size exceeded the limit of ${fileSizeMBLimit}MB`;
  } else {
    result.isValidFile = true;
  }
  result.errVal = err;
  return result;
};

export const preventBrowserDefaults = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();
};

export const handleDrag = (e: Event) => {
  preventBrowserDefaults(e);
};
export const handleDragIn = (e: Event) => {
  preventBrowserDefaults(e);
};
export const handleDragOut = (e: Event) => {
  preventBrowserDefaults(e);
};
