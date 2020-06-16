import React from "react";
import PropTypes from "prop-types";

const Spinner = ({ size, color }) => {
  return (
    <div
      className={`spinner-border text-${color}`}
      style={{
        width: `${size}rem`,
        height: `${size}rem`,
        borderWidth: `${(size / 12.5).toFixed(1)}rem`,
        position: "absolute",
        top: "50%",
        left: "50%",
      }}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

Spinner.defaultProps = {
  color: "primary",
  size: 5,
};

Spinner.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

export default Spinner;
