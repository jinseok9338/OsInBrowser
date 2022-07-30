# Browser Operating System (BOS) version 1.1.1

This is the first (and very crude) version of the operating system running in browser. It's not full blown operating system, but rather a show case of what browser and javascript ecosystem is cabable of.

live version - https://osinbrowser-mddjix57ia-du.a.run.app

---

## Version 1.1.1

- Tech used in this project

  - Solid Js - Alternative to React js. I just love the way solid js only handles reactivity so it doesn't rertender the whole components but only the ones being updated

  - Sass - I have used css, sass, styled components and tailwind css. I love tailwind but I love the functionality of sass since it is superset of css.

  - BrowserFs [GitHub Repo](https://github.com/jvilk/BrowserFS) - This allows to emulate fs api in node in browser. This seems to be very useful ut I have not incorporated it fully into my app. I will be done soon .. in version 1.1.0

  - Docker [DockerPage](https://www.docker.com/) - The docker is now an industry standard to containerize an app.

  - Google Cloud Run [GoogleCloudRun](https://cloud.google.com/run/?utm_source=google&utm_medium=cpc&utm_campaign=japac-AU-all-en-dr-bkws-all-pkws-trial-e-dr-1009882&utm_content=text-ad-none-none-DEV_c-CRE_602771386312-ADGP_Hybrid%20%7C%20BKWS%20-%20EXA%20%7C%20Txt%20~%20Compute%20~%20Cloud%20Run_cloud%20run-general%20-%20Products-44225-KWID_43700071610100400-kwd-678836618089&userloc_1030705-network_g&utm_term=KW_google%20cloud%20run&gclid=Cj0KCQjw8amWBhCYARIsADqZJoVVuxT5lj5q3Y_SG_mtYwxMbgLusms9bR9y1VyTornm11jShsjESCwaAp6aEALw_wcB&gclsrc=aw.ds) - Used to build CI/ CD pipe easily. I could have used GCP from ground up, but I love the simplicity of Google Cloud Run

  ***

# Fix bugs and design - by Aug 1st Version 1.1.1

### Bugs

    1. when making the file in the desktop the finder current directory also changes [Done]

    2. when hovering the desktop file in finder the hover effect is shown outside the finder container other files are not a problem [Done]

    3. diable the input focus on file Entry when not selected [Done]

    4. set the custom menu on home directory in finder [Done]

### Design Change

    1. when focused change the focus backgrouund and make the flex more modern looking [Done] https://css-tricks.com/having-a-little-fun-with-custom-focus-styles/

    2. better task bar ... how to make one. [Done] - circular menu
    https://codepen.io/barhatsor/pen/YzwxaQV
    https://codepen.io/simgooder/pen/bVLjgM/ -- this is what I am going with ... tomorrow

    3. change the dock icon [Done]

    4. change the logo [Done]

    5. better customMenu style [Done] https://codepen.io/Danny-Dasilva/pen/wvGaMxE ... this is a good referernce

    6. need better file type icons [Done]

### New Feature or changes in Version 1.1.1

    1. make weather report section on menu bar [Done]

    3. change the clock format to 24hour base on click [Done]

    2. Add create Folder functionality [Done]

### features that will be added in the 1.2.0

1.  put linux in the desktop .. https://www.youtube.com/watch?v=Hu1RYVoCbgs&list=PLM88opVjBuU7xSRoHhs3hZBz3JmHHBMMN&index=16 dos emulator dos vs terminal

1.  make image preview

1.  make the icon movable from one folder to another

1.  copy and paste
