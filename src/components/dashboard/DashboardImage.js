import React, { useState, useEffect, useContext, Fragment } from "react";
import { FirebaseContext } from "../../context/firebase";

const DashboardImage = () => {
  const [state, setState] = useState({ image: null, loading: true });
  const firebase = useContext(FirebaseContext);
  /** @type import('firebase/app').storage.Storage */
  const storage = firebase.storage;

  useEffect(() => {
    const imageRef = storage.ref("/image.jpg");
    const image = new Image();
    image.onload = () => {
      setState({ image, loading: false });
    };
    imageRef.getDownloadURL().then((url) => {
      image.src = url;
    });

    const timeout = setInterval(() => {
      const newImage = new Image();
      newImage.onload = () => {
        setState({ image: newImage, loading: false });
      };
      imageRef.getDownloadURL().then((url) => {
        image.src = url;
      });
    }, 60000);

    return () => clearInterval(timeout);
  }, [storage]);

  return (
    <Fragment>
      {!state.loading && (
        <div className="row mb-3">
          <div className="col-12 col-xl-5">
            <div className="card shadow animated--grow-in">
              <div className="card-body text-center">
                <img
                  className="img-fluid"
                  src={state.image.src}
                  alt="IP Camera"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default DashboardImage;
