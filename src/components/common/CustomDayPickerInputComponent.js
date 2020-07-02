import React, { Component } from "react";

class CustomDayPickerInputComponent extends Component {
  render() {
    return (
      <button {...this.props} className="btn btn-primary btn-icon-split">
        <span className="icon text-white-50">
          <i className="far fa-calendar-alt"></i>
        </span>
        <span className="text">{this.props.day}</span>
      </button>
    );
  }
}

export default CustomDayPickerInputComponent;
