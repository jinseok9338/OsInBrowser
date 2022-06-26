import { useProcess } from "./context/processDirectory";

const Main = () => {
  const [state, { addProcess, deleteProcess }] = useProcess();
  return <div>Count value is {state.length}</div>;
};

export default Main;
