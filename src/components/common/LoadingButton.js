import React from "react";

const LoadingButton = ({ loading, children, ...rest }) => {
  return (
    <button {...rest}>
      {loading ? (
        <div class="spinner-border spinner-border-sm" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingButton;
