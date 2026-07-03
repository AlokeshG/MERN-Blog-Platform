import { ClipLoader } from "react-spinners";

function Loader() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        background: "rgba(255,255,255,0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <ClipLoader
        color="#0d6efd"
        size={70}
      />
    </div>
  );
}

export default Loader;