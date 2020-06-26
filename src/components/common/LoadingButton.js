import React from "react";
import PropTypes from "prop-types";

const LoadingButton = ({ loading, children, ...rest }) => {
  return (
    <button {...rest}>
      {loading ? (
        <div className="spinner-border spinner-border-sm" role="status">
          <span className="sr-only">Učitava se...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

LoadingButton.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default LoadingButton;
