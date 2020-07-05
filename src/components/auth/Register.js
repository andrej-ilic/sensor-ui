import React, { useState, useContext } from "react";

import { FirebaseContext } from "../../context/firebase";

import LoadingButton from "../common/LoadingButton";

const Register = () => {
  const firebase = useContext(FirebaseContext);
  /** @type import('firebase/app').auth.Auth */
  const auth = firebase.auth;
  /** @type import('firebase/app').firestore.Firestore */
  const db = firebase.db;

  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    e.persist();
    setInputs((oldInputs) => ({
      ...oldInputs,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e && e.preventDefault();

    setIsLoading(true);

    const { email, password } = inputs;

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => userCredential.user.sendEmailVerification())
      .then(() =>
        db.doc(`users/${email}`).set({ sendAlerts: false, lastAlertTime: -1 })
      )
      .catch((err) => setError(err.code))
      .finally(() => setIsLoading(false));
  };

  let errorMessage = null;

  if (error === "auth/email-already-in-use") {
    errorMessage = (
      <div className="text-danger mb-0 mt-3">
        Korisnik sa tom email adresom već postoji
      </div>
    );
  } else if (error === "auth/invalid-email") {
    errorMessage = (
      <div className="text-danger mb-0 mt-3">Ne važeća email adresa</div>
    );
  } else if (error === "auth/weak-password") {
    errorMessage = <div className="text-danger mb-0 mt-3">Slaba lozinka</div>;
  }

  return (
    <div className="row align-items-center justify-content-center">
      <div className="col-sm-12 col-md-10 col-lg-7 col-xl-5">
        <h3 className="text-gray-700">Registruj se</h3>
        <div className="card">
          <div className="card-body">
            <form className="needs-validation" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email adresa"
                  className="form-control"
                  value={inputs.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Šifra"
                  className="form-control"
                  value={inputs.password}
                  onChange={handleInputChange}
                />
              </div>
              <LoadingButton
                type="submit"
                className="btn btn-primary btn-block"
                loading={isLoading}
              >
                Registruj se
              </LoadingButton>
              {errorMessage}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
