import React, { useState, useContext, Fragment } from "react";
import classnames from "classnames";

import { FirebaseContext } from "../../context/firebase";

import LoadingButton from "../common/LoadingButton";

const Login = () => {
  const firebase = useContext(FirebaseContext);
  /** @type import('firebase/app').auth.Auth */
  const auth = firebase.auth;
  /** @type import('firebase/app') */
  const app = firebase.app;

  const [state, setState] = useState({
    loading: false,
    email: "",
    password: "",

    error: null,
    resetPasswordOpen: false,
    resetPasswordEmail: "",
    resetPasswordLoading: false,
    resetPasswordSent: false,
    resetPasswordError: null,
  });

  const handleInputChange = (e) => {
    e.persist();
    setState((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e && e.preventDefault();

    setState((oldState) => ({ ...oldState, loading: !oldState.loading }));

    const { email, password } = state;

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => app.analytics().logEvent("login"))
      .catch((err) =>
        setState((oldState) => ({ ...oldState, error: err.code }))
      )
      .finally(() =>
        setState((oldState) => ({ ...oldState, loading: !oldState.loading }))
      );
  };

  const handleForgotPassword = () => {
    setState((oldState) => ({
      ...oldState,
      resetPasswordOpen: true,
    }));
  };

  const handleResetPasswordSubmit = (e) => {
    e && e.preventDefault();

    setState((oldState) => ({
      ...oldState,
      resetPasswordLoading: !oldState.resetPasswordLoading,
    }));

    auth
      .sendPasswordResetEmail(state.resetPasswordEmail)
      .then(() =>
        setState((oldState) => ({ ...oldState, resetPasswordSent: true }))
      )
      .catch((err) =>
        setState((oldState) => ({ ...oldState, resetPasswordError: err.code }))
      )
      .finally(() =>
        setState((oldState) => ({
          ...oldState,
          resetPasswordLoading: !oldState.resetPasswordLoading,
        }))
      );
  };

  let errorMessage = null;

  if (state.error === "auth/user-not-found") {
    errorMessage = (
      <div className="text-danger mb-0 mt-3">
        Korisnik sa tom email adresom ne postoji
      </div>
    );
  } else if (state.error === "auth/invalid-email") {
    errorMessage = (
      <div className="text-danger mb-0 mt-3">Nevažeća email adresa</div>
    );
  } else if (state.error === "auth/wrong-password") {
    errorMessage = (
      <div className="text-danger mb-0 mt-3">Pogrešna lozinka</div>
    );
  } else if (state.error) {
    errorMessage = (
      <div className="text-danger mb-0 mt-3">Greška: {state.error}</div>
    );
  }

  let resetPasswordErrorMessage = null;

  if (state.resetPasswordError === "auth/user-not-found") {
    resetPasswordErrorMessage = (
      <div className="text-danger mt-3">
        Korisnik sa tom email adresom ne postoji
      </div>
    );
  } else if (state.resetPasswordError === "auth/invalid-email") {
    resetPasswordErrorMessage = (
      <div className="text-danger mt-3">Nevažeća email adresa</div>
    );
  } else if (state.resetPasswordError) {
    resetPasswordErrorMessage = (
      <div className="text-danger mt-3">Greška: {state.resetPasswordError}</div>
    );
  }

  return (
    <div className="row align-items-center justify-content-center">
      <div className="col-sm-12 col-md-10 col-lg-7 col-xl-5">
        <h3 className="text-gray-700">Prijavi se</h3>
        <div className="card shadow animated--grow-in">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email adresa"
                  className="form-control"
                  value={state.email}
                  onChange={handleInputChange}
                  required={true}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Šifra"
                  className="form-control"
                  value={state.password}
                  onChange={handleInputChange}
                  required={true}
                />
              </div>
              <LoadingButton
                type="submit"
                className="btn btn-primary btn-block"
                loading={state.loading}
              >
                Prijavi se
              </LoadingButton>
              {errorMessage}
            </form>
          </div>
        </div>
        <div className="card shadow animated--grow-in mt-3">
          <div
            className={classnames("card-body", {
              "p-1 text-center": !state.resetPasswordOpen,
            })}
          >
            {state.resetPasswordOpen ? (
              <Fragment>
                {!state.resetPasswordSent ? (
                  <form onSubmit={handleResetPasswordSubmit}>
                    <div className="form-group">
                      <input
                        type="email"
                        name="resetPasswordEmail"
                        placeholder="Email adresa"
                        className="form-control"
                        value={state.resetPasswordEmail}
                        onChange={handleInputChange}
                        required={true}
                      />
                    </div>
                    <LoadingButton
                      type="submit"
                      className="btn btn-info btn-block"
                      loading={state.resetPasswordLoading}
                    >
                      Pošalji email za resetovanje šifre
                    </LoadingButton>
                    {resetPasswordErrorMessage}
                  </form>
                ) : (
                  <div className="text-success">
                    Email za resetovanje šifre je poslat!
                  </div>
                )}
              </Fragment>
            ) : (
              <button className="btn btn-link" onClick={handleForgotPassword}>
                Zaboravili ste šifru?
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
