import React, { Fragment, useState } from "react";

import useUser from "../../hooks/useUser";
import LoadingButton from "./LoadingButton";

const EmailValidationCheck = () => {
  const { user, isVerified } = useUser();

  const [state, setState] = useState({
    loading: false,
    sent: false,
    error: false,
  });

  const sendNewVerificationEmail = () => {
    setState((oldState) => ({ ...oldState, loading: true }));

    user
      .sendEmailVerification()
      .then(() =>
        setState((oldState) => ({ ...oldState, sent: true, loading: false }))
      )
      .catch(() => setState((oldState) => ({ ...oldState, error: true })));
  };

  return (
    <Fragment>
      {!isVerified && !state.error && (
        <div className="alert alert-warning">
          {!state.sent && (
            <Fragment>
              Vaša email adresa nije potvrđena. Kliknite na link u
              verifikacionom email-u koji ste dobili prilikom registracije.
              Ukoliko vam je potreban novi verifikacioni email
              <LoadingButton
                className="btn btn-sm btn-warning ml-2"
                onClick={sendNewVerificationEmail}
                loading={state.loading}
              >
                kliknite ovde
              </LoadingButton>
              <div>
                Ukoliko ste već potvrdili email adresu osvežite stranicu.
              </div>
            </Fragment>
          )}
          {state.sent && (
            <Fragment>Verifikacioni email uspešno poslat!</Fragment>
          )}
        </div>
      )}
      {!isVerified && state.error && (
        <div className="alert alert-danger">
          Došlo je do greške pri slanju verifikacionog email-a. Pokušajte ponovo
          kasnije.
        </div>
      )}
    </Fragment>
  );
};

export default EmailValidationCheck;
