import { useProcess } from "../../../../context/processDirectory";
import useMoveDock from "./dockFunction";

interface DockProps {
  id: string;
}

const Dock = () => {
  const [state, { addProcess }] = useProcess();
  useMoveDock();

  return (
    <div class="dock">
      <div class="dock-container">
        <li class="li-1">
          <div class="name">{"Finder"}</div>
          <img
            class="ico"
            src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853981255cc36b3a37af_finder.png"
            alt=""
            id="dock-icon"
            onclick={() => {
              addProcess("finder");
            }}
          />
        </li>
        <li class="li-2">
          <div class="name">{"Siri"}</div>
          <img
            class="ico"
            src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853ff3bafbac60495771_siri.png"
            alt=""
          />
        </li>
        <li class="li-3">
          <div class="name">{"LaunchPad"}</div>
          <img
            class="ico"
            src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853943597517f128b9b4_launchpad.png"
            alt=""
          />
        </li>
        <li class="li-4">
          <div class="name">{"Contacts"}</div>
          <img
            class="ico"
            src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853743597518c528b9b3_contacts.png"
            alt=""
          />
        </li>
        <li class="li-5">
          <div class="name">{"Notes"}</div>
          <img
            class="ico"
            src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853c849ec3735b52cef9_notes.png"
            alt=""
          />
        </li>
        <li class="li-6">
          <div class="name">{"Reminders"}</div>
          <img
            class="ico"
            src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853d44d99641ce69afeb_reminders.png"
            alt=""
          />
        </li>
        <li class="li-7">
          <div class="name">{"Photos"}</div>
          <img
            class="ico"
            src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853c55558a2e1192ee09_photos.png"
            alt=""
          />
        </li>
        <li class="li-8">
          <div class="name">{"Messages"}</div>
          <img
            class="ico"
            src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853a55558a68e192ee08_messages.png"
            alt=""
          />
        </li>
        <li class="li-9">
          <div class="name">{"FaceTime"}</div>
          <img
            class="ico"
            src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f708537f18e2cb27247c904_facetime.png"
            alt=""
          />
        </li>
        <li class="li-10">
          <div class="name">{"Music"}</div>
          <img
            class="ico"
            src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853ba0782d6ff2aca6b3_music.png"
            alt=""
          />
        </li>
        <li class="li-11">
          <div class="name">{"Podcasts"}</div>
          <img
            class="ico"
            src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853cc718ba9ede6888f9_podcasts.png"
            alt=""
          />
        </li>
        <li class="li-12">
          <div class="name">{"TV"}</div>
          <img
            class="ico"
            src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f708540dd82638d7b8eda70_tv.png"
            alt=""
          />
        </li>
        <li class="li-12">
          <div class="name">{"App Store"}</div>
          <img
            class="ico"
            src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853270b5e2ccfd795b49_appstore.png"
            alt=""
          />
        </li>
        <li class="li-14">
          <div class="name">{"Safari"}</div>
          <img
            class="ico"
            src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853ddd826358438eda6d_safari.png"
            alt=""
          />
        </li>
        <li class="li-bin li-15">
          <div class="name">{"Bin"}</div>
          <img
            class="ico ico-bin"
            src="https://findicons.com/files/icons/569/longhorn_objects/128/trash.png"
            alt=""
          />
        </li>
      </div>
    </div>
  );
};

export default Dock;
