interface FileEntryProps {
  name: string;
  path: string;
  setFocus: (name: string, e: MouseEvent) => void;
}

export const FileEntryForDesktop = ({
  name,
  path,
  setFocus,
}: FileEntryProps) => {
  // const {icon, pid} = useFileInfo(path)

  return (
    <div class="app-layout hide">
      <div
        class="align-center-desktop"
        id={name}
        onclick={(e) => {
          e.stopPropagation();
          setFocus(name, e);
        }}
      >
        <img class="img" src={path} alt={path} />
        {name}
      </div>
    </div>
  );
};
