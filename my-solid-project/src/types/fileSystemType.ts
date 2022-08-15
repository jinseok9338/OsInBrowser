import { SetStoreFunction } from "solid-js/store";
import { Accessor, Setter } from "solid-js";
export interface useFileSystemHookType {
  currentFiles: fileType[];
  setCurrentFiles: SetStoreFunction<fileType[]>;
  currentDirectory: Accessor<string>;
  changeFileName: (oldPath: string, newPath: string) => void;
  readFile: (filePath: string) => Buffer;
  setCurrentDirectory: Setter<string>;
  makeFile: (filePath: string, data: any) => void;
  readdirSync: (cd: string) => string[];
  deleteFile: (filePath: string) => void;
}

export interface fileType {
  name: string;
  iconPath: string;
  id: string;
  filePath: string;
  dir: string;
  filetype: string;
  processId: string;
}
