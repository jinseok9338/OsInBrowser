// Taking care of the browser-specific prefixes.
// @ts-ignore
window.requestFileSystem =
  // @ts-ignore
  window.requestFileSystem || window.webkitRequestFileSystem;
// @ts-ignore
window.directoryEntry = window.directoryEntry || window.webkitDirectoryEntry;

function onFs(fs: FileSystem) {
  fs.root.getDirectory(
    "Documents",
    { create: true },
    function (directoryEntry) {
      //directoryEntry.isFile === false
      //directoryEntry.isDirectory === true
      //directoryEntry.name === 'Documents'
      //directoryEntry.fullPath === '/Documents'
    },
    onError
  );
}

// Opening a file system with temporary storage
// @ts-ignore
window.requestFileSystem(TEMPORARY, 1024 * 1024 /*1MB*/, onFs, onError);
