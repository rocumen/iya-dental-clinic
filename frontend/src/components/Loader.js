import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: "100px",
        height: "100px",
        margin: "auto",
        display: "block",
      }}
    >
      {" "}
    </Spinner>
    // <div
    //   style={{ height: "50vh" }}
    //   className="w-100 d-flex align-items-center justify-content-center"
    // >
    //   <div className="spinner-parent">
    //     <div className="spinner ">
    //       <div className="spinnerin"></div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Loader;
