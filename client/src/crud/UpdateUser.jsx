import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


function UpdateUser() {
  const { id } = useParams(); // Correction pour extraire l'ID du paramètre


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [education, setEducation] = useState('');
  const [personalProject, setPersonalProject] = useState('');
  const [softwareSkillsFaible, setSoftwareSkillsFaible] = useState('');
  const [softwareSkillsMoyen, setSoftwareSkillsMoyen] = useState('');
  const [softwareSkillsFort, setSoftwareSkillsFort] = useState('');
  const [hardwareSkillsFaible, setHardwareSkillsFaible] = useState('');
  const [hardwareSkillsMoyen, setHardwareSkillsMoyen] = useState('');
  const [hardwareSkillsFort, setHardwareSkillsFort] = useState('');
  const [languages, setLanguages] = useState('');
  const [certificates, setCertificates] = useState('');
  const [jobDescription, setJobDescription] = useState('');


  const navigate = useNavigate();


  useEffect(() => {
    axios.get('http://localhost:3001/getuser/' + id) // Correction pour concaténer l'ID avec l'URL
      .then(result => {
        console.log(result);
        setName(result.data.name);
        setEmail(result.data.email);
        setEducation(result.data.education);
        setPersonalProject(result.data.personalProject);
        setSoftwareSkillsFaible(result.data.softwareSkillsFaible);
        setSoftwareSkillsMoyen(result.data.softwareSkillsMoyen);
        setSoftwareSkillsFort(result.data.softwareSkillsFort);
        setHardwareSkillsFaible(result.data.hardwareSkillsFaible);
        setHardwareSkillsMoyen(result.data.hardwareSkillsMoyen);
        setHardwareSkillsFort(result.data.hardwareSkillsFort);
        setLanguages(result.data.languages);
        setCertificates(result.data.certificates);
        setJobDescription(result.data.jobDescription) 
      })
      .catch(err => console.error(err));
  }, [id]); // Correction pour inclure id dans les dépendances


  const update = (e) => {
    e.preventDefault();
    axios.put('http://localhost:3001/updateuser/' + id, {
      name,
      email,
      education,
      personalProject,
      softwareSkillsFaible,
      softwareSkillsMoyen,
      softwareSkillsFort,
      hardwareSkillsFaible,
      hardwareSkillsMoyen,
      hardwareSkillsFort,
      languages,
      certificates,
      jobDescription
    })
      .then(() => navigate("/profile/"+id))
      .catch(err => console.error(err));
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
    <div className="col-md-6 col-lg-4 mb-4">
    <div className="centered">
      <div className="card">
    
        <div className="card-body">
          <h2>Update User</h2>
          <form onSubmit={update}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="education" className="form-label">Education</label>
              <input type="text" className="form-control" id="education" value={education} onChange={(e) => setEducation(e.target.value)}  />
            </div>
            <div className="mb-3">
              <label htmlFor="personalProject" className="form-label">PersonalProject</label>
              <input type="text" className="form-control" id="personalProject" value={personalProject} onChange={(e) => setPersonalProject(e.target.value)}  />
            </div>
            <div className="form-group">
  <label htmlFor="software-skills">Software Skills</label>
  <div className="form-group">
    <label htmlFor="software-skills-faible">Software Skills - Faible</label>
    <input type="text" className="form-control" id="software-skills-faible" value={softwareSkillsFaible} onChange={(e) => setSoftwareSkillsFaible(e.target.value)}  />
  </div>

  <div className="form-group">
    <label htmlFor="software-skills-moyen">Software Skills - Moyen</label>
    <input type="text" className="form-control" id="software-skills-moyen" value={softwareSkillsMoyen} onChange={(e) => setSoftwareSkillsMoyen(e.target.value)}  />
  </div>

  <div className="form-group">
    <label htmlFor="software-skills-fort">Software Skills - Fort</label>
    <input type="text" className="form-control" id="software-skills-fort" value={softwareSkillsFort} onChange={(e) => setSoftwareSkillsFort(e.target.value)}  />
  </div>
</div>

<div className="form-group">
  <label htmlFor="hardware-skills">Hardware Skills</label>
  <div className="form-group">
    <label htmlFor="hardware-skills-faible">Hardware Skills - Faible</label>
    <input type="text" className="form-control" id="hardware-skills-faible" value={hardwareSkillsFaible} onChange={(e) => setHardwareSkillsFaible(e.target.value)}  />
  </div>

  <div className="form-group">
    <label htmlFor="hardware-skills-moyen">Hardware Skills - Moyen</label>
    <input type="text" className="form-control" id="hardware-skills-moyen" value={hardwareSkillsMoyen} onChange={(e) => setHardwareSkillsMoyen(e.target.value)}  />
  </div>

  <div className="form-group">
    <label htmlFor="hardware-skills-fort">Hardware Skills - Fort</label>
    <input type="text" className="form-control" id="hardware-skills-fort" value={hardwareSkillsFort} onChange={(e) => setHardwareSkillsFort(e.target.value)}  />
  </div>
</div>

            <div className="mb-3">
              <label htmlFor="languages" className="form-label">Languages</label>
              <input type="text" className="form-control" id="languages" value={languages} onChange={(e) => setLanguages(e.target.value)}  />
            </div>
            <div className="mb-3">
              <label htmlFor="certificates" className="form-label">Certificates</label>
              <input type="text" className="form-control" id="certificates" value={certificates} onChange={(e) => setCertificates(e.target.value)}  />
            </div>
            <div className="mb-3">
              <label className="form-label">JobDescription</label>
              <input type="text" className="form-control" id="jobDescription" value={ jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Update</button>
          </form>
        </div>
      </div>
    </div>
    </div>

      <footer className="footer position-absolute bottom-2 py-2 w-100">
          <div className="container">
            <div className="row align-items-center justify-content-lg-between">
              <div className="col-12 col-md-6 my-auto">
                <div className="copyright text-center text-sm text-white text-lg-start">
                  © ,
                  made with <i className="fa fa-heart" aria-hidden="true" /> by
                  <a href="https://www.creative-tim.com" className="font-weight-bold text-white" target="_blank">Creative Tim</a>
                  for a better web.
                </div>
              </div>
              <div className="col-12 col-md-6">
              <ul className="nav nav-footer justify-content-center justify-content-lg-end">
              <li className="nav-item">
                <a href="https://www.creative-tim.com" className="nav-link text-white" target="_blank">Creative Tim</a>
              </li>
              <li className="nav-item">
                <a href="https://www.creative-tim.com/presentation" className="nav-link text-white" target="_blank">About Us</a>
              </li>
              <li className="nav-item">
                <a href="https://www.creative-tim.com/blog" className="nav-link text-white" target="_blank">Blog</a>
              </li>
              <li className="nav-item">
                <a href="https://www.creative-tim.com/license" className="nav-link pe-0 text-white" target="_blank">License</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>

    </div>


  );
}


export default UpdateUser;
