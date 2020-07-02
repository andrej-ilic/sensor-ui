import React, { useState, useEffect, Fragment } from "react";

const DashboardImage = () => {
  const [state, setState] = useState({ image: null, loading: true });

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setState({ image, loading: false });
    };
    image.src = `http://147.91.209.67/slika.jpg`;

    const timeout = setInterval(() => {
      const newImage = new Image();
      newImage.onload = () => {
        setState({ image: newImage, loading: false });
      };
      newImage.src = `http://147.91.209.67/slika.jpg?${Date.now()}`;
    }, 60000);
    return () => clearInterval(timeout);
  }, []);

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
