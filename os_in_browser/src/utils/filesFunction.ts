import { initialize } from "browserfs";
import FS, { FSModule } from "browserfs/dist/node/core/FS";
import ini from "ini";

interface ShortCut {
  URL: string;
  IconFile: string;
}

export const getProcessByFileExtension = (extension: string): string => {
  return "";
};

export const getShortCut = (
  path: string,
  fileSystem: FSModule
): Promise<ShortCut> =>
  new Promise((resolve) => {
    fileSystem.readFile(path, (_error, contents = Buffer.from("")) =>
      resolve(ini.parse(contents.toString()) as ShortCut)
    );
  });
