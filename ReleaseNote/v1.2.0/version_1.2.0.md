# Browser Operating System (BOS) version 1.2.0

This is the first (and very crude) version of the operating system running in browser. It's not full blown operating system, but rather a show case of what browser and javascript ecosystem is cabable of.

---

## Version 1.2.0

- Tech used in this project

  - Solid Js - Alternative to React js. I just love the way solid js only handles reactivity so it doesn't rertender the whole components but only the ones being updated

  - Sass - I have used css, sass, styled components and tailwind css. I love tailwind but I love the functionality of sass since it is superset of css.

  - BrowserFs [GitHub Repo](https://github.com/jvilk/BrowserFS) - This allows to emulate fs api in node in browser. This seems to be very useful ut I have not incorporated it fully into my app. I will be done soon .. in version 1.1.0

  - Docker [DockerPage](https://www.docker.com/) - The docker is now an industry standard to containerize an app.

  - Google Cloud Run [GoogleCloudRun](https://cloud.google.com/run/?utm_source=google&utm_medium=cpc&utm_campaign=japac-AU-all-en-dr-bkws-all-pkws-trial-e-dr-1009882&utm_content=text-ad-none-none-DEV_c-CRE_602771386312-ADGP_Hybrid%20%7C%20BKWS%20-%20EXA%20%7C%20Txt%20~%20Compute%20~%20Cloud%20Run_cloud%20run-general%20-%20Products-44225-KWID_43700071610100400-kwd-678836618089&userloc_1030705-network_g&utm_term=KW_google%20cloud%20run&gclid=Cj0KCQjw8amWBhCYARIsADqZJoVVuxT5lj5q3Y_SG_mtYwxMbgLusms9bR9y1VyTornm11jShsjESCwaAp6aEALw_wcB&gclsrc=aw.ds) - Used to build CI/ CD pipe easily. I could have used GCP from ground up, but I love the simplicity of Google Cloud Run

  ***

  newly added in 1.2.0

- Features

  - file directory and files context and share it among desktop environment and finder(ex: the app that is created in the desktop and deleted in the finder happen at the same time)

  &nbsp;

   <img draggable={false} title="a title" alt="Alt text" src="./happensync.gif">

  &nbsp;

  - select and deselect files

  &nbsp;

  <img draggable={false} title="a title" alt="Alt text" src="./selectandeselect.gif">

  - create a empty text File and delete the files (demonstrated above)

  &nbsp;

  - change the file name

  <img draggable={false} title="a title" alt="Alt text" src="./changeName.gif">

&nbsp;

- import files from external desktop with drag and drop

- minimize the window and grow back

- add file type in file type

- show file directory in the footer of the finder

- open file or folder on double click -- can get the raw data of the file
