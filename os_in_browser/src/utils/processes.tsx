import { ProcessState } from "../types/processDirectory";
import { createContext, useContext, ParentComponent } from "solid-js";
import { createStore } from "solid-js/store";
import Finder from "../app/Finder";
import { finderMetaData } from "../app/Finder/metadata";

export const processesDirectory = [finderMetaData] as ProcessState[];
