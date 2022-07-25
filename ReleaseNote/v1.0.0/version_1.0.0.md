# Browser Operating System (BOS) version 1.0.0

This is the first (and very crude) version of the operating system running in browser. It's not full blown operating system, but rather a show case of what browser and javascript ecosystem is cabable of.

---

## Version 1.0.0

- Tech used in this project

  - Solid Js - Alternative to React js. I just love the way solid js only handles reactivity so it doesn't rertender the whole components but only the ones being updated

  - Sass - I have used css, sass, styled components and tailwind css. I love tailwind but I love the functionality of sass since it is superset of css.

  - BrowserFs [GitHub Repo](https://github.com/jvilk/BrowserFS) - This allows to emulate fs api in node in browser. This seems to be very useful ut I have not incorporated it fully into my app. I will be done soon .. in version 1.1.0

  - Docker [DockerPage](https://www.docker.com/) - The docker is now an industry standard to containerize an app.

  - Google Cloud Run [GoogleCloudRun](https://cloud.google.com/run/?utm_source=google&utm_medium=cpc&utm_campaign=japac-AU-all-en-dr-bkws-all-pkws-trial-e-dr-1009882&utm_content=text-ad-none-none-DEV_c-CRE_602771386312-ADGP_Hybrid%20%7C%20BKWS%20-%20EXA%20%7C%20Txt%20~%20Compute%20~%20Cloud%20Run_cloud%20run-general%20-%20Products-44225-KWID_43700071610100400-kwd-678836618089&userloc_1030705-network_g&utm_term=KW_google%20cloud%20run&gclid=Cj0KCQjw8amWBhCYARIsADqZJoVVuxT5lj5q3Y_SG_mtYwxMbgLusms9bR9y1VyTornm11jShsjESCwaAp6aEALw_wcB&gclsrc=aw.ds) - Used to build CI/ CD pipe easily. I could have used GCP from ground up, but I love the simplicity of Google Cloud Run

- Apperance

  - MacOs Like theme (backgroud, dock and navber above)

  - window resizes from all the edges and corners (implemented without any library)

  - first version of finder App (without any functionality)

  - draggable window without any library

 <img draggable={false} title="a title" alt="Alt text" src="./capture.gif">

- features that will be added in version 1.1.0 (rolled out by July 25th)

  - show file icon in grid area [Done]

  - add create file functionality []

  - select and deselect the file [Done]

  - when hover it the icon show the file info [Done]

  - delete file functionality []

  - show icons according to the file extension [...Partially Done]

  - move the files in grid area []

  - change the file name with click []

  - full blown Finder App []

- Bugs to fix

  - Resizer issue where if either axis's length is less than the minimal value the resizing stops. I want the other axis still resizes even thought one axis goes below the minimal value

  - Browser FS is still a bit iffy and I can't seem to get it work the way I like [Done]
