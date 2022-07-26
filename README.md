# Browser Operating System (BOS) version 1.0.0

This is the first (and very crude) version of the operating system running in browser. It's not full blown operating system, but rather a show case of what browser and javascript ecosystem is cabable of.

---

## Version 1.1.0

- Tech used in this project

  - Solid Js - Alternative to React js. I just love the way solid js only handles reactivity so it doesn't rertender the whole components but only the ones being updated

  - Sass - I have used css, sass, styled components and tailwind css. I love tailwind but I love the functionality of sass since it is superset of css.

  - BrowserFs [GitHub Repo](https://github.com/jvilk/BrowserFS) - This allows to emulate fs api in node in browser. This seems to be very useful ut I have not incorporated it fully into my app. I will be done soon .. in version 1.1.0

  - Docker [DockerPage](https://www.docker.com/) - The docker is now an industry standard to containerize an app.

  - Google Cloud Run [GoogleCloudRun](https://cloud.google.com/run/?utm_source=google&utm_medium=cpc&utm_campaign=japac-AU-all-en-dr-bkws-all-pkws-trial-e-dr-1009882&utm_content=text-ad-none-none-DEV_c-CRE_602771386312-ADGP_Hybrid%20%7C%20BKWS%20-%20EXA%20%7C%20Txt%20~%20Compute%20~%20Cloud%20Run_cloud%20run-general%20-%20Products-44225-KWID_43700071610100400-kwd-678836618089&userloc_1030705-network_g&utm_term=KW_google%20cloud%20run&gclid=Cj0KCQjw8amWBhCYARIsADqZJoVVuxT5lj5q3Y_SG_mtYwxMbgLusms9bR9y1VyTornm11jShsjESCwaAp6aEALw_wcB&gclsrc=aw.ds) - Used to build CI/ CD pipe easily. I could have used GCP from ground up, but I love the simplicity of Google Cloud Run

  ***

  newly added in 1.1.0

- Features

  - file directory and files context and share it among desktop environment and finder(ex: the app that is created in the desktop and deleted in the finder happen at the same time)

  &nbsp;

   <img draggable={false} title="a title" alt="Alt text" src="./ReleaseNote/v1.1.0/happensync.gif">

  &nbsp;

  - select and deselect files

  &nbsp;

  <img draggable={false} title="a title" alt="Alt text" src="./ReleaseNote/v1.1.0/selectandeselect.gif">

  - create a empty text File and delete the files (demonstrated above)

  &nbsp;

  - change the file name

  <img draggable={false} title="a title" alt="Alt text" src="./ReleaseNote/v1.1.0/changeName.gif">

&nbsp;

- import files from external desktop with drag and drop

- minimize the window and grow back

- add file type in file type

- show file directory in the footer of the finder

- open file or folder on double click -- can get the raw data of the file

- ton of bugs fixed (shown below)

  1. fix the bug where you can't select the icon when first rendered[Done]

  1. fix the bug where you can't select the icons and deselect icons in Finder[Done]

  1. fix the bug where file Directory is loaded first so that it throws error because it didn't make any dirs yet [Done]

  1. fix the bug whene desktop environment is shared [Done]

  1. reactivity problem in finder app when the file is created [Done] -> this is important!!! [Done]

  1. fix the create File function where it doesn't have file id [Done]

  1. when the input becomes diabled it updates the name even if the name hasn't changed [Done]

  1. when creating files in any directory other than desktop the icons on desktop shows different directory ... weird [Done]

  1. we need a way to connect the mainDesktop and finder Desktop dir... How...

  1. icon should be rendered when the file name changes [Done]

  1. when onhover the icon in finder the file info is displayed far off the icon Tons fo things to fix... [Done] // the absolte position was the problemo...

  1. change the display none from visibility hidden so that it can take less space [Doesn't work]

  1. bug fixed can't change the file name to same name [Done]

  1. make icon img not draggable by default [Done]

  1. make background and border around icon when set not the box-shadow [Done]

- features that will be added in the 1.2.0

  1.  put linux in the desktop .. https://www.youtube.com/watch?v=Hu1RYVoCbgs&list=PLM88opVjBuU7xSRoHhs3hZBz3JmHHBMMN&index=16 dos emulator dos vs terminal

  1.  make image preview

  1.  make the icon movable from one folder to another

  1.  copy and paste
