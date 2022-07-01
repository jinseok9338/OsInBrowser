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

import air from "./images/apps/air.png";
import { createEffect, createSignal, For, onMount, Ref } from "solid-js";
import { finderFunction } from "./finderFunction";
// import camera from "./images/apps/recents/camera.svg";
// import notes from "./images/apps/recents/notes.png";
// import office from "./images/apps/recents/office.svg";
// import settings from "./images/apps/recents/settings.png";
// import window from "./images/apps/recents/window.png";

const Finder = () => {
  const { setFocus, deselectAll } = finderFunction();

  return (
    <>
      <div class="box-body">
        <div class="box-sidebar ">
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
        </div>
        <div
          class="box-main"
          id="main-box"
          ref={(el) =>
            el.addEventListener("click", (e) => {
              deselectAll(e);
            })
          }
        >
          <For each={[1, 2, 3, 4, 5, 6, 7]}>
            {(item, index) => (
              <div id="sidebar-airdrop" class="app-layout hide">
                <div
                  class="align-center"
                  id={item.toString()}
                  onclick={(e) => {
                    setFocus(item.toString(), e);
                  }}
                >
                  <img src={air} alt="" />
                  {item}
                </div>
              </div>
            )}
          </For>
          {/*  <div id="sidebar-recents" class="app-layout hide">
            <div class="align-center">
              <img src="images/apps/recents/camera.svg" alt="" />
              Camera
            </div>
            <div class="align-center">
              <img src="images/apps/recents/notes.png" alt="" />
              Notes
            </div>
            <div class="align-center">
              <img src="images/apps/recents/office.svg" alt="" />
              Office
            </div>
            <div class="align-center">
              <img src="images/apps/recents/settings.png" alt="" />
              Settings
            </div>
            <div class="align-center">
              <img src="images/apps/recents/window.png" alt="" />
              Window
            </div>
          </div>

          <div id="sidebar-applications" class="app-layout hide">
            <div class="align-center">
              <img src="images/apps/ae.png" alt="" />
              Adobe After Effects CC 2019
            </div>
            <div class="align-center">
              <img src="images/apps/air.png" alt="" />
              AirDrop
            </div>
            <div class="align-center">
              <img src="images/apps/backup.png" alt="" />
              Time Machine
            </div>
            <div class="align-center">
              <img src="images/apps/bitcoin.png" alt="" />
              Bitcoin
            </div>
            <div class="align-center">
              <img src="images/apps/book.png" alt="" />
              Books
            </div>
            <div class="align-center">
              <img src="images/apps/calculator.png" alt="" />
              Calculator
            </div>
            <div class="align-center">
              <img src="images/apps/calendar.png" alt="" />
              Calendar
            </div>
            <div class="align-center">
              <img src="images/apps/chrome.png" alt="" />
              Google Chrome
            </div>
            <div class="align-center">
              <img src="images/apps/mail.png" alt="" />
              Mail
            </div>
            <div class="align-center">
              <img src="images/apps/messages.png" alt="" />
              Messages
            </div>
            <div class="align-center">
              <img src="images/apps/music.png" alt="" />
              Music
            </div>
            <div class="align-center">
              <img src="images/apps/onedrive.png" alt="" />
              Google One Drive
            </div>
            <div class="align-center">
              <img src="images/apps/pics.png" alt="" />
              Pictures
            </div>
            <div class="align-center">
              <img src="images/apps/ps.png" alt="" />
              Adobe Photoshop CC 2019
            </div>
            <div class="align-center">
              <img src="images/apps/safari.png" alt="" />
              Safari
            </div>
            <div class="align-center">
              <img src="images/apps/spotify.png" alt="" />
              Spotify
            </div>
            <div class="align-center">
              <img src="images/apps/stockmarket.png" alt="" />
              Stockmarket
            </div>
            <div class="align-center">
              <img src="images/apps/stocks.png" alt="" />
              Stocks
            </div>
            <div class="align-center">
              <img src="images/apps/textedit.png" alt="" />
              TextEdit
            </div>
            <div class="align-center">
              <img src="images/apps/tv.png" alt="" />
              Apple Tv
            </div>
            <div class="align-center">
              <img src="images/apps/twitter.png" alt="" />
              Twitter
            </div>
            <div class="align-center">
              <img src="images/apps/xcode.png" alt="" />
              Xcode
            </div>
          </div>
          <div id="sidebar-google-drive" class="app-layout hide">
            <div class="align-center">
              <img src="images/folder-icon.png" alt="" />
              My Documents
            </div>
          </div>
          <div id="sidebar-desktop" class="app-layout hide">
            <div class="align-center">
              <img src="images/folder-icon.png" alt="" />
              Web Development
            </div>
            <div class="align-center">
              <img src="images/folder-icon.png" alt="" />
              My Projects
            </div>
          </div>
          <div id="sidebar-documents" class="app-layout hide">
            <div class="align-center">
              <img src="images/folder-icon.png" alt="" />
              My Local Documents
            </div>
          </div>
          <div id="sidebar-pictures" class="app-layout hide">
            <div class="align-center">
              <img src="images/apps/photos.png" alt="" />
              Photos
            </div>
          </div>
          <div id="sidebar-your-macbook-pro" class="app-layout hide">
            <div class="align-center">
              <img src="images/disk.png" alt="" />
              Macintosh HD
            </div>
            <div class="align-center">
              <img src="images/globe.png" alt="" />
              Network
            </div>
          </div> */}
        </div>
      </div>
      <div class="box-footer"></div>
    </>
  );
};

export default Finder;
