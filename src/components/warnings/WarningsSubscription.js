import React, { Fragment, useContext, useState } from "react";
import moment from "moment";
import classnames from "classnames";

import useWarnings from "../../hooks/useWarnings";
import useUser from "../../hooks/useUser";
import { FirebaseContext } from "../../context/firebase";

import Spinner from "../common/Spinner";
import LoadingButton from "../common/LoadingButton";

const WarningsSubscription = () => {
  const firebase = useContext(FirebaseContext);
  /** @type import('firebase/app').firestore.Firestore */
  const db = firebase.db;
  /** @type import('firebase/app') */
  const firebaseApp = firebase.app;
  const { user, isVerified } = useUser();
  const [warnings, loading] = useWarnings();
  const [subLoading, setSubLoading] = useState(false);

  const isSubscribed =
    warnings &&
    warnings.emails.find((email) => email === user.email) !== undefined;

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

  const subscribeToWarnings = () => {
    setSubLoading((before) => !before);

    db.doc(`sensor/mtiv09e1/data/warnings`)
      .update({
        emails: firebaseApp.firestore.FieldValue.arrayUnion(user.email),
      })
      .finally(() => {
        setSubLoading((before) => !before);
      });
  };

  const unsubscribeFromWarnings = () => {
    setSubLoading((before) => !before);

    db.doc(`sensor/mtiv09e1/data/warnings`)
      .update({
        emails: firebaseApp.firestore.FieldValue.arrayRemove(user.email),
      })
      .finally(() => {
        setSubLoading((before) => !before);
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
              <div className="col-12 col-xl-3">
                <div className="card shadow border-left-primary animated--grow-in">
                  <div className="card-body">
                    Na ovoj stranici se možete prijaviti na upozorenja. Ako ste
                    prijavljeni, kada temperatura ili vlažnost senzora pređe
                    određenu granicu biće Vam poslat email upozorenja na onu
                    email adresu kojom ste se registrovali.
                  </div>
                </div>
              </div>
              {warnings.lastSendTime && warnings.lastSendTime !== -1 && (
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
              )}
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
                          ? unsubscribeFromWarnings
                          : subscribeToWarnings
                      }
                      loading={subLoading}
                    >
                      {isSubscribed ? "Odjavi se" : "Prijavi se"}
                    </LoadingButton>
                  </div>
                </div>
              </div>
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
