const Finder = () => {
  return (
    <div id="view">
      <div id="sidebar">
        <ul>
          <li>
            <span class="group">Favorites</span>
            <ul>
              <li class="current_page">
                <i class="afiles"></i>
                All My Files
              </li>
              <li>
                <i class="airdrop"></i>
                AirDrop
              </li>
              <li>
                <i class="apps"></i>
                Applications
              </li>
              <li>
                <i class="desk"></i>
                Desktop
              </li>
              <li>
                <i class="docs"></i>
                Documents
              </li>
              <li>
                <i class="downs"></i>
                Downloads
              </li>
              <li>
                <i class="mov"></i>
                Movies
              </li>
              <li>
                <i class="music"></i>
                Music
              </li>
              <li>
                <i class="pic"></i>
                Pictures
              </li>
            </ul>
          </li>
          <li>
            <span class="group">Shared</span>
          </li>
        </ul>
      </div>
      <div id="content">
        <div class="folder">
          <div class="icon"></div>
          <span>Desktop</span>
        </div>
        <div class="folder">
          <div class="icon"></div>
          <span>Documents</span>
        </div>
        <div class="folder">
          <div class="icon"></div>
          <span>Downloads</span>
        </div>
        <div class="folder">
          <div class="icon"></div>
          <span>Movies</span>
        </div>
        <div class="folder">
          <div class="icon"></div>
          <span>Music</span>
        </div>
        <div class="folder">
          <div class="icon"></div>
          <span>Pictures</span>
        </div>
        <div class="folder">
          <div class="icon"></div>
          <span>Public</span>
        </div>
      </div>
    </div>
  );
};

export default Finder;
