import React, { Fragment } from "react";
import EmailValidationCheck from "../common/EmailValidationCheck";

const WarningsPage = () => {
  return (
    <Fragment>
      <h3 className="text-gray-700">Upozoravanje</h3>
      <EmailValidationCheck />
    </Fragment>
  );
};

export default WarningsPage;
