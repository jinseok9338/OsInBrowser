interface FileEntryProps {
  name: string;
  path: string;
}

export const FileEntryForDesktop = ({ name, path }: FileEntryProps) => {
  // const {icon, pid} = useFileInfo(path)

  return (
    <div class="app-layout hide">
      <div class="align-center" id={name} onclick={(e) => {}}>
        <img class="img" src={path} alt={path} />
        {name}
      </div>
    </div>
  );
};
