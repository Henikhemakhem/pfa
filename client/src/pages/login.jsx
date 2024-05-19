import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
 // Importez votre propre fichier CSS principal ici
import '../css/custom-bs.css';
import '../css/jquery.fancybox.min.css';

import '../css/bootstrap-select.min.css' ;
import '../css/style.css';

import '../css/animate.min.css'; 
import '../css/bootstrap-select.min.css'; 
import '../css/custom-bs.css'; 
import '../css/custom-bs.css.map'; 
import '../css/jquery.fancybox.min.css'; 
import '../css/quill.snow.css'; 
import '../css/style.css'; 


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    localStorage.setItem("email",email)
      e.preventDefault();
      axios.post('http://localhost:3001/login', { email, password })
          .then(response => {
              const { data } = response;
            
              if (data === "success") {
                  // Stocker l'identifiant de l'employé dans le localStorage
                  localStorage.setItem('userid', response.data._id);
                  navigate('/home');
                
                  window.location.reload();
              } else {
                  console.log("La connexion a échoué");
              }
          })
          .catch(err => console.error(err));
  };
    return(
        <div>
<div>
  <section className="section-hero overlay inner-page bg-image" style={{backgroundImage: 'url("images/hero_1.jpg")'}} id="home-section">
    <div className="container">
      <div className="row">
        <div className="col-md-7">
          <h1 className="text-white font-weight-bold">Login</h1>
          <div className="custom-breadcrumbs">
            <a href="#">Home</a> <span className="mx-2 slash">/</span>
            <span className="text-white"><strong>Log In</strong></span>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="site-section">
    <div className="container">
      
        <div className="col-lg-6">
          <h2 className="mb-4">Log In To JobBoard</h2>
          <form onSubmit={handleSubmit} className="p-4 border rounded">
            <div className="row form-group">
            <div className="col-md-12 mb-3 mb-md-0">
                                            <label className="text-black" htmlFor="email">Email</label>
                                            <input 
                                                type="email" 
                                                id="email" 
                                                className="form-control" 
                                                placeholder="Email address" 
                                                value={email} 
                                                onChange={(e) => setEmail(e.target.value)} 
                                            />
                                        </div>
            </div>
            <div className="row form-group mb-4">
              <div className="col-md-12 mb-3 mb-md-0">
                                            <label className="text-black" htmlFor="password">Password</label>
                                            <input 
                                                type="password" 
                                                id="password" 
                                                className="form-control" 
                                                placeholder="Password" 
                                                value={password} 
                                                onChange={(e) => setPassword(e.target.value)} 
                                            />
                                        </div>
            </div>
            <div className="row form-group">
              <div className="col-md-12">
                <input type="submit" defaultValue="Log In" className="btn px-4 btn-primary text-white" />
              </div>
              <div className="col-md-12 mt-3">
        <p>Vous n'avez pas de compte ? <Link to="/sign">Inscrivez-vous</Link></p>
      </div>
            </div>
          </form>
        </div>
      
    </div>
  </section>
</div>

        </div>
    )
}
export default Login