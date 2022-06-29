import { ProcessState } from "../types/processDirectory";
import { createContext, useContext, ParentComponent } from "solid-js";
import { createStore } from "solid-js/store";

export const processesDirectory = [
  {
    active: false,
    iconPath: "",
    dimension: {
      heigth: 500,
      left: 0,
      top: 100,
      width: 500,
    },
    id: "helloWorld",
    tempDimension: undefined,
    isFullSize: false,
    process: <h1>{"Hello"}</h1>,
    processName: "Hellow world",
    menus: [
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
    ],
  },
] as ProcessState[];
