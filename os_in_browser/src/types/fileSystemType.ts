import { fileType } from "../context/FileDirectoryContext";
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
}
