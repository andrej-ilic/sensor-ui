import React, { useState, useEffect } from "react";

const DashboardImage = () => {
  const [imageUrl, setImageUrl] = useState("http://147.91.209.67/slika.jpg");

  useEffect(() => {
    const timeout = setInterval(() => {
      setImageUrl(`http://147.91.209.67/slika.jpg?${Date.now()}`);
    }, 60000);
    return () => clearInterval(timeout);
  }, []);

  return (
    <div className="row mb-3">
      <div className="col-12 col-xl-5">
        <div className="card shadow">
          <div className="card-body text-center">
            <img className="img-fluid" src={imageUrl} alt="IP Camera" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardImage;
