import airdrop from "./images/menu/airdrop.png";
import recents from "./images/menu/recents.png";
import apps from "./images/menu/apps.png";
import folder from "./images/menu/folder.png";
import desktop from "./images/menu/desktop.png";
import download from "./images/menu/download.png";
import pictures from "./images/menu/pictures.png";
import icloud from "./images/menu/icloud.png";
import documents from "./images/menu/documents.png";
import laptop from "./images/menu/laptop.png";

const SideBar =() =>{
    return (<div class="box-sidebar ">
    <div class="sidebar-background">
      <div class="sidebar-items" style={"margin-top:1rem;"}>
        <div class="item-category">Favourites</div>
        <div class="item-selected">
          <img src={airdrop} alt="" />
          <span>AirDrop</span>
        </div>
        <div class="item-selected">
          <img src={recents} alt="" />
          <span>Recents</span>
        </div>
        <div class="item-selected">
          <img src={apps} alt="" />
          <span>Applications</span>
        </div>
        <div class="item-selected">
          <img src={folder} alt="" />
          <span>Google Drive</span>
        </div>
        <div class="item-selected">
          <img src={desktop} alt="" />
          <span>Desktop</span>
        </div>
        <div class="item-selected">
          <img src={documents} alt="" />
          <span>Documents</span>
        </div>
        <div class="item-selected">
          <img src={download} alt="" />
          <span>Downloads</span>
        </div>
        <div class="item-selected">
          <img src={pictures} alt="" />
          <span>Pictures</span>
        </div>
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
  </div>)
}

export default SideBar