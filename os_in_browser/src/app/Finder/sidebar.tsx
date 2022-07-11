import airdrop from "../../assets/images/menu/airdrop.png";
import recents from "../../assets/images/menu/recents.png";
import apps from "../../assets/images/menu/apps.png";
import folder from "../../assets/images/menu/folder.png";
import desktop from "../../assets/images/menu/desktop.png";
import download from "../../assets/images/menu/download.png";
import pictures from "../../assets/images/menu/pictures.png";
import icloud from "../../assets/images/menu/icloud.png";
import documents from "../../assets/images/menu/documents.png";
import laptop from "../../assets/images/menu/laptop.png";
import { useFileDirectory } from "../../context/FileDirectoryContext";
import { For } from "solid-js";

interface Favorite {
  src: string;
  title: string;
  directory: string;
}

const favoriteArray: Favorite[] = [
  { src: airdrop, title: "Home", directory: "/home" },
  { src: recents, title: "Recents", directory: "/recents" },
  { src: apps, title: "Apps", directory: "/home/apps" },
  { src: folder, title: "Google Drive", directory: "/home/folder" },
  { src: desktop, title: "Desktop", directory: "/home/desktop" },
  { src: documents, title: "Documents", directory: "/home/documents" },
  { src: download, title: "Download", directory: "/home/downlaods" },
  { src: pictures, title: "Pictures", directory: "/home/pictures" },
];

interface SideBarProps {
  currentDirectory: string;
  ChangeDirectory: (directory: string) => void;
}

const SideBar = () => {
  const [
    currentDirectory,
    currentFiles,
    { ChangeDirectory, ChangeCurrentFiles },
  ] = useFileDirectory();

  const Favorites = () => (
    <>
      <div class="item-category">Favourites</div>
      <For each={favoriteArray}>
        {({ directory, src, title }) => (
          <div class="item-selected" onClick={() => ChangeDirectory(directory)}>
            <img src={src} alt="" />
            <span
              id={directory}
              style={`font-weight:${
                currentDirectory.currentDirectory == directory
                  ? "700"
                  : "normal"
              };`}
            >
              {title}
            </span>
          </div>
        )}
      </For>
    </>
  );

  return (
    <div class="box-sidebar ">
      <div class="sidebar-background">
        <div class="sidebar-items" style={"margin-top:1rem;"}>
          <Favorites />
          <div class="item-category">iCloud</div>
          <div class="item-selected">
            <img src={icloud} alt="" />
            <span>iCloud Drive</span>
          </div>
          <div class="item-category">Locations</div>
          <div class="item-selected">
            <img src={laptop} alt="" />
            <span>Your MacBook</span>
          </div>
          <div class="item-category">Tags</div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
