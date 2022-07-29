import { customMenu } from "../../../../types/customMenu";

type MenuCollection = { menu: customMenu[] };

const useCreateMenu = (menuKind: string, args: any): customMenu[] => {
  const Menu: any = {
    defaultMenu: (args: any): MenuCollection => ({
      menu: [
        {
          icon: (
            //create text file icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#898c94"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-file"
            >
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
              <polyline points="13 2 13 9 20 9"></polyline>
            </svg>
          ),
          title: "create Text File",
          onClick: () =>
            args["createTextFile"](args["args"][0], args["args"][1]),
        },
        {
          icon: (
            <svg
              viewBox="0 0 64 58.67"
              fill="#898c94"
              stroke="#898c94"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                  <path
                    class="cls-1"
                    d="M45.33,50.67h5.34V56A2.67,2.67,0,1,0,56,56V50.67h5.33a2.67,2.67,0,0,0,0-5.34H56V40a2.67,2.67,0,1,0-5.33,0v5.33H45.33a2.67,2.67,0,0,0,0,5.34Z"
                  />
                  <path
                    class="cls-1"
                    d="M34.67,53.33H8a2.67,2.67,0,0,1-2.67-2.66v-32A2.67,2.67,0,0,1,8,16H58.67V29.33A2.66,2.66,0,0,0,61.33,32h0A2.66,2.66,0,0,0,64,29.33V8a8,8,0,0,0-8-8H45.33a8,8,0,0,0-6.4,3.2l-5.6,7.47H8a8,8,0,0,0-8,8v32a8,8,0,0,0,8,8H34.67A2.67,2.67,0,0,0,37.33,56h0A2.67,2.67,0,0,0,34.67,53.33ZM43.2,6.4a2.68,2.68,0,0,1,2.13-1.07H56A2.68,2.68,0,0,1,58.67,8v2.67H40Z"
                  />
                </g>
              </g>
            </svg>
          ),
          title: "create Folder",
          onClick: () => alert("create Folder"),
        },
        {
          icon: (
            <svg
              fill="none"
              stroke="#898c94"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
              viewBox="0 0 32 32"
            >
              <path
                class="st0"
                d="M28.7,13.4c-0.3-1.7-1-3.2-1.9-4.6c-1.5,0.8-3,0.9-3.8,0.1c-0.8-0.8-0.7-2.2,0.1-3.8c-1.4-0.9-2.9-1.6-4.6-1.9
         C18.1,4.9,17.1,6,16,6s-2.1-1.1-2.6-2.7c-1.7,0.3-3.2,1-4.6,1.9c0.8,1.5,0.9,3,0.1,3.8S6.7,9.6,5.2,8.8c-0.9,1.4-1.6,2.9-1.9,4.6
         C4.9,13.9,6,14.9,6,16s-1.1,2.1-2.7,2.6c0.3,1.7,1,3.2,1.9,4.6c1.5-0.8,3-0.9,3.8-0.1s0.7,2.2-0.1,3.8c1.4,0.9,2.9,1.6,4.6,1.9
         c0.5-1.6,1.5-2.7,2.6-2.7s2.1,1.1,2.6,2.7c1.7-0.3,3.2-1,4.6-1.9c-0.8-1.5-0.9-3-0.1-3.8c0.8-0.8,2.2-0.7,3.8,0.1
         c0.9-1.4,1.6-2.9,1.9-4.6C27.1,18.1,26,17.1,26,16S27.1,13.9,28.7,13.4z"
              />
              <circle class="st0" cx="16" cy="16" r="3" />
            </svg>
          ),
          title: "settings",
          onClick: () => alert("setting Opened"),
        },
      ],
    }),

    iconMenu: (args: any): MenuCollection => ({
      menu: [
        {
          icon: null,
          title: "delete File",
          onClick: args["deleteFile"],
        },
        {
          icon: null,
          title: "settings",
          onClick: args["settings"],
        },
      ],
    }),
  };

  return Menu[menuKind](args).menu; // MenuCollection
};

export default useCreateMenu;
