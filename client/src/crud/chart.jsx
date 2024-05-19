import React, { useState, useEffect } from "react";
import axios from "axios";

function Chart() {
    const [imageURL, setImageURL] = useState("");

    useEffect(() => {
        // Appel à votre route Flask pour générer le graphique et récupérer l'URL de l'image
        axios.get("http://localhost:5000/generate_chart")
            .then(response => {
                setImageURL(response.data.image_url);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération de l'URL de l'image :", error);
            });
    }, []);

    return (
        <div className="site-wrap">
      <div className="site-mobile-menu site-navbar-target">
        <div className="site-mobile-menu-header">
          <div className="site-mobile-menu-close mt-3">
            <span className="icon-close2 js-menu-toggle" />
          </div>
        </div>
        <div className="site-mobile-menu-body" />
      </div> {/* .site-mobile-menu */}
      {/* NAVBAR */}
   
      <section className="section-hero overlay inner-page bg-image" style={{backgroundImage: 'url("images/hero_1.jpg")'}}>
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <h1 className="text-white font-weight-bold">Post A Job</h1>
              <div className="custom-breadcrumbs">
                <a href="#">Home</a> <span className="mx-2 slash">/</span>
                <a href="#">Job</a> <span className="mx-2 slash">/</span>
                <span className="text-white"><strong>Post a Job</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br /><br />
      <div>
      {imageURL && (
               <img 
                   src={`http://localhost:5000/${imageURL}`} 
                   alt="Pie Chart" 
                   style={{ width: "700px", height: "700px" }} // Ajout des styles pour la largeur et la hauteur
               />
            )}

<br />
<br />
</div>
</div> 
    );
}

export default Chart;
