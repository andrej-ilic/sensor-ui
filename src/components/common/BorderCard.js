import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const BorderCard = ({ title, content, color, icon, animation }) => {
  return (
    <div
      className={classnames(`card border-left-${color} shadow py-2`, {
        "animated--grow-in": animation === "grow",
        "animated--fade-in": animation === "fade",
      })}
    >
      <div className="card-body">
        <div className="row no-gutters align-items-center">
          <div className="col">
            <div
              className={`text-xs font-weight-bold text-${color} text-uppercase`}
            >
              {title}
            </div>
            <h5 className="font-weight-bold text-gray-800 mb-0">{content}</h5>
          </div>
          {!!icon && (
            <div className="col-auto">
              <i className={`${icon} text-gray-300`} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

BorderCard.defaultProps = {
  color: "primary",
};

BorderCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  color: PropTypes.oneOf(["primary", "success", "info", "warning", "danger"]),
  icon: PropTypes.string,
  animation: PropTypes.oneOf(["fade", "grow", "none"]),
};

export default BorderCard;
