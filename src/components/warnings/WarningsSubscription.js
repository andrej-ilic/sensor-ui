import React, { Fragment, useContext, useState } from "react";
// import moment from "moment";
import classnames from "classnames";

import useUser from "../../hooks/useUser";
import { FirebaseContext } from "../../context/firebase";

import Spinner from "../common/Spinner";
import LoadingButton from "../common/LoadingButton";
import useFirestoreUser from "../../hooks/useFirestoreUser";
import { useEffect } from "react";

const WarningsSubscription = () => {
  const firebase = useContext(FirebaseContext);
  /** @type import('firebase/app').firestore.Firestore */
  const db = firebase.db;

  const { user, isVerified } = useUser();
  const [firestoreUser, loading] = useFirestoreUser(user.email);
  const [state, setState] = useState({
    temperature: (firestoreUser && firestoreUser.temperature) || "",
    humidity: (firestoreUser && firestoreUser.humidity) || "",
    error: null,
    success: null,
    loading: false,
    subLoading: false,
  });

  useEffect(() => {
    setState((oldState) => ({
      ...oldState,
      temperature: (firestoreUser && firestoreUser.temperature) || "",
      humidity: (firestoreUser && firestoreUser.humidity) || "",
    }));
  }, [firestoreUser]);

  const canSubscribe =
    firestoreUser && firestoreUser.temperature && firestoreUser.humidity;
  const isSubscribed = firestoreUser && firestoreUser.sendAlerts;

  const unverifiedContent = (
    <div className="card shadow">
      <div className="card-header">
        <h6 className="font-weight-bold text-danger m-0">Niste verifikovani</h6>
      </div>
      <div className="card-body">
        Morate verifikovati svoj nalog kako bi mogli da se pretplatite na
        upozorenja.
      </div>
    </div>
  );

  const handleInputChange = (e) => {
    e.persist();
    setState((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdateLimits = () => {
    setState((oldState) => ({ ...oldState, error: null, success: null }));

    const { temperature, humidity } = state;

    const tempLimit = parseFloat(temperature);
    const humidLimit = parseFloat(humidity);

    if (
      isNaN(tempLimit) ||
      isNaN(humidLimit) ||
      tempLimit < 1 ||
      humidLimit < 1 ||
      tempLimit > 100 ||
      humidLimit > 99
    ) {
      setState((oldState) => ({
        ...oldState,
        error: "Unete vrednosti nisu validne",
      }));
      return;
    }

    setState((oldState) => ({ ...oldState, loading: !oldState.loading }));

    db.doc(`users/${user.email}`)
      .set({ temperature: tempLimit, humidity: humidLimit }, { merge: true })
      .then(() =>
        setState((oldState) => ({
          ...oldState,
          success: "Podešavanja su uspešno sačuvana",
        }))
      )
      .catch(() =>
        setState((oldState) => ({ ...oldState, error: "Došlo je do greške" }))
      )
      .finally(() =>
        setState((oldState) => ({ ...oldState, loading: !oldState.loading }))
      );
  };

  const handleSubscriptionChange = (sendAlerts) => {
    setState((oldState) => ({ ...oldState, subLoading: !oldState.subLoading }));

    db.doc(`users/${user.email}`)
      .update({
        sendAlerts,
      })
      .finally(() => {
        setState((oldState) => ({
          ...oldState,
          subLoading: !oldState.subLoading,
        }));
      });
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {isVerified ? (
            <div className="row">
              <div className="col-12 col-xl-4">
                <div className="card shadow border-left-primary animated--grow-in">
                  <div className="card-body">
                    Na ovoj stranici se možete prijaviti na upozorenja. Da bi
                    ste se prijavili, potrebno je da unesete željene granice.
                    Kada temperatura ili vlažnost pređu unete granice bićete
                    obavešteni putem email poruke. Poruka će stići na onu email
                    adresu kojom ste se registrovali.
                    <hr />
                    Dobićete najviše jednu poruku na svakih sat vremena. Možete
                    se odjaviti od upozorenja u svakom trenutku.
                  </div>
                </div>
              </div>
              <div className="col-12 col-xl-4 mt-3 mt-xl-0">
                <div className="card shadow border-left-info animated--grow-in">
                  <div className="card-body">
                    <label htmlFor="temperature">Granica za temperaturu</label>
                    <div className="input-group">
                      <input
                        className="form-control"
                        type="number"
                        name="temperature"
                        value={state.temperature}
                        onChange={handleInputChange}
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">°C</div>
                      </div>
                    </div>
                    <div className="my-2">
                      <label htmlFor="humidity">Granica za vlažnost</label>
                      <div className="input-group">
                        <input
                          className="form-control"
                          type="number"
                          name="humidity"
                          value={state.humidity}
                          onChange={handleInputChange}
                        />
                        <div className="input-group-append">
                          <div className="input-group-text">%</div>
                        </div>
                      </div>
                    </div>
                    {state.error && (
                      <div className="text-danger">{state.error}</div>
                    )}
                    {state.success && (
                      <div className="text-success">{state.success}</div>
                    )}
                    <div className="form-group text-center mt-3 mb-0">
                      <LoadingButton
                        className="btn btn-primary"
                        loading={state.loading}
                        onClick={handleUpdateLimits}
                      >
                        Potvrdi
                      </LoadingButton>
                    </div>
                  </div>
                </div>
              </div>
              {/* {warnings.lastSendTime && warnings.lastSendTime !== -1 && (
                <div className="col-12 col-xl-5 mt-xl-0 mt-3">
                  <div className="card shadow border-left-info animated--grow-in">
                    <div className="card-body text-center">
                      <h4 className="text-gray-700">
                        Poslednje upozorenje poslato{" "}
                        {moment(warnings.lastSendTime).fromNow()}.
                      </h4>
                      {warnings.lastSendTime &&
                        warnings.lastSendTime !== -1 && (
                          <h4 className="text-gray-700">
                            {moment(warnings.lastSendTime).format(
                              "Do MMM YYYY. H:mm:SS"
                            )}
                          </h4>
                        )}
                    </div>
                  </div>
                </div>
              )} */}
              {canSubscribe && (
                <div className="col-12 col-xl-4 mt-xl-0 mt-3">
                  <div
                    className={classnames("card shadow animated--grow-in", {
                      "border-left-success": !isSubscribed,
                      "border-left-danger": isSubscribed,
                    })}
                  >
                    <div className="card-body text-center">
                      <h4 className="text-gray-700">
                        {isSubscribed
                          ? "Prijavljeni ste na upozorenja"
                          : "Niste prijavljeni na upozorenja"}
                      </h4>
                      <LoadingButton
                        className={classnames("btn mt-2", {
                          "btn-success": !isSubscribed,
                          "btn-danger": isSubscribed,
                        })}
                        onClick={
                          isSubscribed
                            ? () => handleSubscriptionChange(false)
                            : () => handleSubscriptionChange(true)
                        }
                        loading={state.subLoading}
                      >
                        {isSubscribed ? "Odjavi se" : "Prijavi se"}
                      </LoadingButton>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            unverifiedContent
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default WarningsSubscription;
