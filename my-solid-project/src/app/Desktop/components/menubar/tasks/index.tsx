interface TasksProps {
  iconPath: string;
  processName: string;
  id: string;
  shrink: (id: string) => void;
}

const Tasks = ({ iconPath, processName, id, shrink }: TasksProps) => {
  return (
    <div class="menus" onclick={() => shrink(id)}>
      <div class="taskIcon">
        <img
          src={
            "https://toppng.com/uploads/preview/youtube-social-media-icon-social-media-icon-png-icone-do-youtube-11562958792oqqewxr6w9.png"
          }
          alt=""
          class="taskIconImg"
        />
      </div>
      <span class="task">{processName}</span>
    </div>
  );
};

export default Tasks;
