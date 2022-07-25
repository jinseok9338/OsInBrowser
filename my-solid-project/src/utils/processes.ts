import { ProcessState } from "../types/processDirectory";
import { createContext, useContext, ParentComponent } from "solid-js";
import { createStore } from "solid-js/store";
import Finder from "../app/Finder";
import { finderMetaData } from "../app/Finder/metadata";

export const ProcessExists = (state: ProcessState[], id: string) => {
  let IdExists = state.filter((process) => process.id == id).length != 0;

  return IdExists;
};
