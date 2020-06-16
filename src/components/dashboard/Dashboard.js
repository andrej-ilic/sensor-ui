import React, { useContext, useState, useEffect, Fragment } from "react";

import { FirebaseContext } from "../../context/firebase";

import Spinner from "../common/Spinner";
import SensorState from "./SensorState";

const Dashboard = () => {
  const firebase = useContext(FirebaseContext);
  /** @type import('firebase/app').firestore.Firestore */
  const db = firebase.db;

  const [isLoading, setIsLoading] = useState(true);
  const [sensor, setSensor] = useState({});

  useEffect(
    () =>
      db.doc(`sensor/mtiv09e1`).onSnapshot((doc) => {
        setSensor(doc.data());
        setIsLoading(false);
      }),
    [db]
  );

  return (
    <Fragment>
      <h3>Dashboard</h3>
      {isLoading ? (
        <Spinner />
      ) : (
        <SensorState
          temperature={sensor.temperature}
          humidity={sensor.humidity}
          averageTemperature={sensor.averageTemperature}
          averageHumidity={sensor.averageHumidity}
        />
      )}
    </Fragment>
  );
};

export default Dashboard;
