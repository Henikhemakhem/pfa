import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function User() {
  // Définir l'état initial des données utilisateur
  const [userData, setUserData] = useState([]);
  const { id } = useParams(); // Correction pour extraire l'ID du paramètre
  useEffect(() => {
    // Charger les données des utilisateurs depuis le backend lors du montage du composant
    axios.get('http://localhost:3001/getuser/' + id)
      .then(response => setUserData(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  // Fonction pour supprimer un utilisateur en fonction de son ID
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/deleteuser/${id}`)
      .then(response => {
        console.log(response);
        // Recharger la page pour refléter les changements après la suppression
        window.location.reload();
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };
  
  return (
<div>
  <title>JobBoard — Website Template by Colorlib</title>
  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <link rel="stylesheet" href="~/css/custom-bs.css" />
  <link rel="stylesheet" href="~/css/jquery.fancybox.min.css" />
  <link rel="stylesheet" href="~/css/bootstrap-select.min.css" />
  <link rel="stylesheet" href="~/fonts/icomoon/style.css" />
  <link rel="stylesheet" href="~/fonts/line-icons/style.css" />
  <link rel="stylesheet" href="~/css/owl.carousel.min.css" />
  <link rel="stylesheet" href="~/css/animate.min.css" />
  <link rel="stylesheet" href="~/css/quill.snow.css" />
  {/* MAIN CSS */}
  <link rel="stylesheet" href="~/css/style.css" />    
 
  <div className="site-wrap">
    <div className="site-mobile-menu site-navbar-target">
      <div className="site-mobile-menu-header">
        <div className="site-mobile-menu-close mt-3">
          <span className="icon-close2 js-menu-toggle" />
        </div>
        </div>
      </div>
      <div className="site-mobile-menu-body" />
    </div> {/* .site-mobile-menu */}
    {/* NAVBAR */}
    <section className="section-hero overlay inner-page bg-image" style={{backgroundImage: 'url("images/hero_1.jpg")'}} id="home-section">
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
      {/* Affichage des utilisateurs */}
      <main className="main-content mt-0">
        <div className="container-fluid py-4">
          <div className="row justify-content-center">
          
              <div  className="col-md-6 col-lg-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{userData.name}</h5>
                    <p className="card-text"><strong>Email:</strong> {userData.email}</p>
                    <p className="card-text"><strong>Education:</strong> {userData.education}</p>
                    <p className="card-text"><strong>Personal Project:</strong> {userData.personalProject}</p>
             
                    <p className="card-text" ><strong>Software Skills (Faible):</strong > {userData.softwareSkillsFaible}</p>
                    <p className="card-text"><strong>Software Skills (Moyen):</strong> {userData.softwareSkillsMoyen}</p>
                    <p className="card-text"><strong>Software Skills (Fort):</strong> {userData.softwareSkillsFort}</p>
                    <p className="card-text"><strong>Hardware Skills (Faible):</strong> {userData.hardwareSkillsFaible}</p>
                    <p className="card-text"><strong>Hardware Skills (Moyen):</strong> {userData.hardwareSkillsMoyen}</p>
                    <p className="card-text"><strong>Hardware Skills (Fort):</strong> {userData.hardwareSkillsFort}</p>
                    <p className="card-text"><strong>Languages:</strong> {userData.languages}</p>
                    <p className="card-text"><strong>Certificates:</strong> {userData.certificates}</p>
                    <p className="card-text"><strong>Job Description:</strong> {userData.jobDescription}</p>
                    {/* Boutons pour éditer et supprimer l'utilisateur */}
                    <div className="text-end">
                      <Link to={`/profile/update/${userData._id}`} className='btn btn-outline-primary me-2'>Edit</Link>
                      <button onClick={() => handleDelete(userData._id)} className='btn btn-outline-danger'>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
  
          </div>
        </div>
      </main>
    </div>
  );
}

export default User;
