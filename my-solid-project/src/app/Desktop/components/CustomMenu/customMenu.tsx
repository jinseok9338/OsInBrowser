import { Accessor, For, JSX } from "solid-js";

interface CustomMenuProps {
  open: Accessor<boolean>;
  position: {
    left: number;
    top: number;
  };
  menus: {
    title: string;
    icon?: JSX.Element;
    onClick?: (...args: any) => void;
  }[];
}

const CustomMenu = ({ open, position, menus }: CustomMenuProps) => {
  return (
    <div
      class="customMenu"
      style={` top: ${position.top}px;
    left: ${position.left}px;
    display:${open() ? "flex" : "none"}`}
    >
      <ul class="customMenu-list">
        <For each={menus} fallback={<div>Loading...</div>}>
          {(menu) => (
            <>
              <li class="customMenu-item" onClick={menu.onClick}>
                <button class="customMenu-button">
                  {menu.icon}
                  <span>{menu.title} </span>
                </button>
              </li>
            </>
          )}
        </For>
      </ul>
      {/* <ul class="customMenu-list">
        <li class="customMenu-item context-buttons">
          <button class="context-button">
            <svg viewBox="0 0 16 16">
              <path d="M16,7H3.8l5.6-5.6L8,0L0,8l8,8l1.4-1.4L3.8,9H16V7z"></path>
            </svg>
          </button>
          <button class="context-button">
            <svg viewBox="0 0 16 16">
              <path d="M8,0L6.6,1.4L12.2,7H0v2h12.2l-5.6,5.6L8,16l8-8L8,0z"></path>
            </svg>
          </button>
          <button class="context-button">
            <svg viewBox="0 0 16 16">
              <path
                d="M13.6,2.3C12.2,0.9,10.2,0,8,0C3.6,0,0,3.6,0,8s3.6,8,8,8c3.7,0,6.8-2.5,7.7-6h-2.1c-0.8,2.3-3,4-5.6,4c-3.3,0-6-2.7-6-6
                                s2.7-6,6-6c1.7,0,3.1,0.7,4.2,1.8L9,7h7V0L13.6,2.3z"
              ></path>
            </svg>
          </button>
          <button class="context-button">
            <svg viewBox="0 0 16 16" class="favourite">
              <path d="M8,12.2l4.9,3l-1.3-5.6L16,5.8l-5.8-0.5L8,0L5.8,5.3L0,5.8l4.4,3.8l-1.3,5.6L8,12.2z"></path>
            </svg>
          </button>
        </li>
      </ul> */}

      {/* <ul class="customMenu-list">
        <li class="customMenu-item">
          <button class="customMenu-button">
            <svg
              // save file icon
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="css-i6dzq1"
            >
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>

            <span>Save as... </span>
            <span>CTRL+S </span>
          </button>
        </li>

        <li class="customMenu-item">
          <button class="customMenu-button">
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="css-i6dzq1"
            >
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>

            <span>Print... </span>
            <span>CTRL+P </span>
          </button>
        </li>
      </ul>
      <ul class="customMenu-list">
        <li class="customMenu-item">
          <button class="customMenu-button">
            <svg></svg>

            <span>Select All</span>
            <span>CTRL+A</span>
          </button>
        </li>
      </ul>
      <ul class="customMenu-list">
        <li class="customMenu-item">
          <button class="customMenu-button">
            <svg></svg>

            <span>View source</span>
            <span>CTRL+U</span>
          </button>
        </li>
        <li class="customMenu-item">
          <button class="customMenu-button">
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="css-i6dzq1"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>

            <span>Inspect</span>
            <span>CTRL+SHIFT+I</span>
          </button>
        </li>
      </ul> */}
    </div>
  );
};

export default CustomMenu;
