import React, { Fragment } from "react";

import EmailValidationCheck from "../common/EmailValidationCheck";
import WarningsSubscription from "./WarningsSubscription";

const WarningsPage = () => {
  return (
    <Fragment>
      <h3 className="text-gray-700">Upozoravanje</h3>
      <EmailValidationCheck />
      <WarningsSubscription />
    </Fragment>
  );
};

export default WarningsPage;
