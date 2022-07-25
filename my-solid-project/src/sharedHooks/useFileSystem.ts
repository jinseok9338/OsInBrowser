import { useFileSystem } from "../context/windowFileSystem";
import { createSignal, createEffect } from "solid-js";
import { v4 as uuidv4 } from "uuid";
import { fsFunction } from "../utils/fsFunction";

import { createStore } from "solid-js/store";

import { fileType, useFileSystemHookType } from "../types/fileSystemType";

// Need a better naming ...

const useFileSystemhook = (
  currentdir = "/home/desktop"
): useFileSystemHookType => {
  //fisrt import fs object
  const { fs } = useFileSystem();
  const {
    readFileSync,
    readdirSync,
    renameFile,
    makefile,
    deletefile,
    getFileType,
    setIcon,
  } = fsFunction();

  //initialize the files and directory ... but do I need one??
  const [currentDirectory, setCurrentDirectory] = createSignal(currentdir);
  const [currentFiles, setCurrentFiles] = createStore([] as fileType[]);

  //change the files depending on the directory that is passed down in the argument
  /* A hook that is called everytime the cd changes. */
  createEffect((prev) => {
    const cd = currentDirectory();
    if (cd != prev) {
      setCurrentDirectory(cd);
      let cFiles = readdirSync(cd)
        .sort()
        .map(
          (file) =>
            ({
              name: file,
              iconPath: setIcon(getFileType(file)),
              id: uuidv4(),
              filePath: `${cd}/${file}`,
              dir: cd,
              filetype: getFileType(file),
            } as fileType)
        );
      setCurrentFiles(cFiles);
    }
    return cd;
  });

  /**
   * It takes two strings, renames a file, and returns a boolean
   * @param {string} oldPath - the path of the file you want to rename
   * @param {string} newPath - the new name of the file
   * @returns The return value is a boolean.
   */
  const changeFileName = (oldPath: string, newPath: string) => {
    let filePath = renameFile(oldPath, newPath);

    const files = readdirSync(currentDirectory())
      .sort()
      .map(
        (file) =>
          ({
            name: file,
            iconPath: setIcon(getFileType(file)),
            filetype: getFileType(file),
            id: uuidv4(),
            filePath: `${currentDirectory()}/${file}`,
            dir: currentDirectory(),
          } as fileType)
      );
    setCurrentFiles(files);
  };

  /**
   * It takes a string as an argument and returns a buffer of the file
   * @param {string} filePath - The path to the file you want to read.
   * @returns the buffer of the file
   */
  const readFile = (filePath: string) => {
    return readFileSync(filePath);
  };

  /**
   * It takes a file path and some data, and then creates a file at that path with that data then set the file signal
   * @param {string} filePath - The path to the file you want to create.
   * @param {any} data - the data you want to write to the file
   */
  const makeFile = (filePath: string, data: any) => {
    makefile(filePath, data);
    const files = readdirSync(currentDirectory())
      .sort()
      .map(
        (file) =>
          ({
            name: file,
            iconPath: setIcon(getFileType(file)),
            filetype: getFileType(file),
            id: uuidv4(),
            filePath: filePath,
            dir: currentDirectory(),
          } as fileType)
      );
    setCurrentFiles(files);
  };

  /**
   * It deletes a file and then updates the current files in the state
   * @param {string} filePath - The path of the file to be deleted
   * @returns the current directory.
   */
  const deleteFile = (filePath: string) => {
    let res = deletefile(filePath);
    if (res) {
      const files = readdirSync(currentDirectory())
        .sort()
        .map(
          (file) =>
            ({
              name: file,
              iconPath: setIcon(getFileType(file)),
              filetype: getFileType(file),
              id: uuidv4(),
              filePath: `${currentDirectory()}/${file}`,
              dir: currentDirectory(),
            } as fileType)
        );
      setCurrentFiles(files);
    } else {
      return;
    }
  };

  return {
    currentFiles,
    setCurrentFiles,
    currentDirectory,
    changeFileName,
    readFile,
    setCurrentDirectory,
    makeFile,
    readdirSync,
    deleteFile,
  };
};

export default useFileSystemhook;

// make two use File System object one for the desktop main and one for the finder
