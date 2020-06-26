import React from "react";

const FullscreenSpinner = () => {
  return (
    <div className="d-flex align-items-center justify-content-center h-100">
      <div
        className="spinner-border text-primary"
        style={{ width: "5rem", height: "5rem", borderWidth: ".4rem" }}
        role="status"
      >
        <span className="sr-only">Učitava se...</span>
      </div>
    </div>
  );
};

export default FullscreenSpinner;
