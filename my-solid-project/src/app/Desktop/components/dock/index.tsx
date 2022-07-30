import { useProcess } from "../../../../context/processDirectory";
import useMoveDock from "./dockFunction";
import Finder from "../../../../assets/images/dock/finder.png";
import LaunchPad from "../../../../assets/images/dock/launchPad.png";
import Editor from "../../../../assets/images/dock/Microsoft_Visual_Studio_Code.png";
import Photos from "../../../../assets/images/dock/picture.png";
import Firefox_Nightly from "../../../../assets/images/dock/Firefox_Nightly.png";
import message from "../../../../assets/images/dock/message.png";
import github from "../../../../assets/images/dock/github.png";
import itunes from "../../../../assets/images/dock/iTunes.png";
import media from "../../../../assets/images/dock/media.png";

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
            draggable={false}
            class="ico"
            src={Finder}
            alt=""
            id="dock-icon"
            onclick={() => {
              addProcess("finder");
            }}
          />
        </li>

        <li class="li-3">
          <div class="name">{"LaunchPad"}</div>
          <img draggable={false} class="ico" src={LaunchPad} alt="" />
        </li>

        <li class="li-5">
          <div class="name">{"Editor"}</div>
          <img draggable={false} class="ico" src={Editor} alt="" />
        </li>

        <li class="li-7">
          <div class="name">{"Photos"}</div>
          <img draggable={false} class="ico" src={Photos} alt="" />
        </li>
        <li class="li-8">
          <div class="name">{"Messages"}</div>
          <img draggable={false} class="ico" src={message} alt="" />
        </li>

        <li class="li-10">
          <div class="name">{"Music"}</div>
          <img draggable={false} class="ico" src={itunes} alt="" />
        </li>

        <li class="li-12">
          <div class="name">{"Video Player"}</div>
          <img draggable={false} class="ico" src={media} alt="" />
        </li>
        <li class="li-13">
          <div class="name">{"GitHub"}</div>
          <img
            onclick={() => {
              window.open("https://github.com/jinseok9338/OsInBrowser");
            }}
            draggable={false}
            class="ico"
            src={github}
            alt=""
          />
        </li>

        <li class="li-14">
          <div class="name">{"Browser"}</div>
          <img draggable={false} class="ico" src={Firefox_Nightly} alt="" />
        </li>
      </div>
    </div>
  );
};

export default Dock;

const NotUsedMenu = () => {
  return (
    <>
      <li class="li-2">
        <div class="name">{"Siri"}</div>
        <img
          draggable={false}
          class="ico"
          src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853ff3bafbac60495771_siri.png"
          alt=""
        />
      </li>
      <li class="li-bin li-15">
        <div class="name">{"Bin"}</div>
        <img
          draggable={false}
          class="ico ico-bin"
          src="https://findicons.com/files/icons/569/longhorn_objects/128/trash.png"
          alt=""
        />
      </li>
      <li class="li-4">
        <div class="name">{"Contacts"}</div>
        <img
          draggable={false}
          class="ico"
          src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853743597518c528b9b3_contacts.png"
          alt=""
        />
      </li>
      <li class="li-12">
        <div class="name">{"App Store"}</div>
        <img
          draggable={false}
          class="ico"
          src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853270b5e2ccfd795b49_appstore.png"
          alt=""
        />
      </li>
      <li class="li-11">
        <div class="name">{"Podcasts"}</div>
        <img
          draggable={false}
          class="ico"
          src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853cc718ba9ede6888f9_podcasts.png"
          alt=""
        />
      </li>
      <li class="li-9">
        <div class="name">{"FaceTime"}</div>
        <img
          draggable={false}
          class="ico"
          src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f708537f18e2cb27247c904_facetime.png"
          alt=""
        />
      </li>
      <li class="li-6">
        <div class="name">{"Reminders"}</div>
        <img
          draggable={false}
          class="ico"
          src="https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853d44d99641ce69afeb_reminders.png"
          alt=""
        />
      </li>
    </>
  );
};
