interface LoaderProps {
  currentState: "INIT" | "PROCESSING" | "SUCCESS" | "FAILURE" | string;
}

const Loader = ({ currentState }: LoaderProps) => {
  return (
    <div
      style={{
        position: "absolute",
        left: "100px",
        top: "100px",
        display: `${currentState == "SUCCESS" ? "hidden" : "block"}`,
      }}
    >
      {currentState}
    </div>
  );
};

export default Loader;
