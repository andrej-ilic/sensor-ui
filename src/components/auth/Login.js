import React, { Fragment, useState, useContext } from "react";

import { FirebaseContext } from "../../context/firebase";

const Login = () => {
  const firebase = useContext(FirebaseContext);
  /** @type import('firebase/app').auth.Auth */
  const auth = firebase.auth;

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    e.persist();
    setInputs((oldInputs) => ({
      ...oldInputs,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e && e.preventDefault();

    const { email, password } = inputs;

    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {})
      .catch();
  };

  return (
    <Fragment>
      <div className="row align-items-center justify-content-center">
        <div className="col-sm-12 col-md-10 col-lg-7 col-xl-5">
          <h3>Login</h3>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    className="form-control"
                    value={inputs.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control"
                    value={inputs.password}
                    onChange={handleInputChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
