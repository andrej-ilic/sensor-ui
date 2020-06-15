import React, { useContext, useState, useEffect, Fragment } from "react";

import { FirebaseContext } from "../../context/firebase";

const Dashboard = () => {
  const { db } = useContext(FirebaseContext);

  const [isLoading, setIsLoading] = useState(true);
  const [sensor, setSensor] = useState({});

  // useEffect(
  //   () =>
  //     db.doc(`sensor/mtiv09e1`).onSnapshot((doc) => {
  //       setSensor(doc.data());
  //       setIsLoading(false);
  //     }),
  //   [db]
  // );

  return (
    <Fragment>
      <h3>Dashboard</h3>
      {!isLoading && JSON.stringify(sensor)}
    </Fragment>
  );
};

export default Dashboard;
