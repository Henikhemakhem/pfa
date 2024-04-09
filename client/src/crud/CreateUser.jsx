import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import '../css/animate.min.css'; 
import '../css/bootstrap-select.min.css'; 
import '../css/custom-bs.css'; 
import '../css/custom-bs.css.map'; 
import '../css/jquery.fancybox.min.css'; 
import '../css/quill.snow.css'; 
import '../css/style.css'; 


function CreateUser() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/createuser", {
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
      jobDescription,
    })
      .then(result => {
        console.log(result);
        navigate(`/profile/${result.data._id}`);
      })
      .catch(error => {
        console.error("Error:", error);
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
      <div className="site-mobile-menu-body" />
    </div> {/* .site-mobile-menu */}
    {/* NAVBAR */}
   
    {/* HOME */}
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
    <section className="site-section">
      <div className="container">
        <div className="row align-items-center mb-5">
          <div className="col-lg-8 mb-4 mb-lg-0">
            <div className="d-flex align-items-center">
              <div>
                <h2>Post A Job</h2>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="row">
              <div className="col-6">
                <a href="#" className="btn btn-block btn-light btn-md"><span className="icon-open_in_new mr-2" />Preview</a>
              </div>
              <div className="col-6">
                <a href="#" className="btn btn-block btn-primary btn-md">Save Job</a>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-lg-12">
            <form className="p-4 p-md-5 border rounded" method="post" onSubmit={handleSubmit}>
              <h3 className="text-black mb-5 border-bottom pb-2">Job Details</h3>
              <div className="form-group">
                <label htmlFor="company-website-tw d-block">Upload Featured Image</label> <br />
                <label className="btn btn-primary btn-md btn-file">
                  Browse File<input type="file" hidden />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="">Name</label>
                <input type="text" className="form-control"   value={name} onChange={(e) => setName(e.target.value)} required placeholder="your name" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text" className="form-control"  value={email} onChange={(e) => setEmail(e.target.value)} required  placeholder="you@yourdomain.com" />
              </div>
              <div className="form-group">
                <label htmlFor="job-title">Job Title</label>
                <input type="text" className="form-control" id="job-title" placeholder="Product Designer" />
              </div>
              <div className="form-group">
                <label htmlFor="job-location">Education</label>
                <input type="text" className="form-control" value={education} onChange={(e) => setEducation(e.target.value)} required placeholder="e.g. Computer Science" />
              </div>
              <div className="form-group">
                <label htmlFor="job-region">Job Region</label>
                <select className="selectpicker border rounded" id="job-region" data-style="btn-black" data-width="100%" data-live-search="true" title="Select Region">
                  <option>Anywhere</option>
                  <option>San Francisco</option>
                  <option>Palo Alto</option>
                  <option>New York</option>
                  <option>Manhattan</option>
                  <option>Ontario</option>
                  <option>Toronto</option>
                  <option>Kansas</option>
                  <option>Mountain View</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="job-type">Personal Project</label>
                <input  type="text" className="form-control" value={personalProject} onChange={(e) => setPersonalProject(e.target.value)} required>
               </input>  
              
              </div>
              <div className="form-group">
  <label htmlFor="job-type">Personal Project</label>
  <input type="text" className="form-control" value={personalProject} onChange={(e) => setPersonalProject(e.target.value)} required placeholder="Enter your personal project" />
</div>

<div className="form-group">
  <label htmlFor="software-skills">Software Skills</label>
  <div className="form-group">
    <label htmlFor="software-skills-faible">Software Skills - Faible</label>
    <input type="text" className="form-control" id="software-skills-faible" value={softwareSkillsFaible} onChange={(e) => setSoftwareSkillsFaible(e.target.value)} required placeholder="Enter your software skills (Faible)" />
  </div>

  <div className="form-group">
    <label htmlFor="software-skills-moyen">Software Skills - Moyen</label>
    <input type="text" className="form-control" id="software-skills-moyen" value={softwareSkillsMoyen} onChange={(e) => setSoftwareSkillsMoyen(e.target.value)} required placeholder="Enter your software skills (Moyen)" />
  </div>

  <div className="form-group">
    <label htmlFor="software-skills-fort">Software Skills - Fort</label>
    <input type="text" className="form-control" id="software-skills-fort" value={softwareSkillsFort} onChange={(e) => setSoftwareSkillsFort(e.target.value)} required placeholder="Enter your software skills (Fort)" />
  </div>
</div>

<div className="form-group">
  <label htmlFor="hardware-skills">Hardware Skills</label>
  <div className="form-group">
    <label htmlFor="hardware-skills-faible">Hardware Skills - Faible</label>
    <input type="text" className="form-control" id="hardware-skills-faible" value={hardwareSkillsFaible} onChange={(e) => setHardwareSkillsFaible(e.target.value)} required placeholder="Enter your hardware skills (Faible)" />
  </div>

  <div className="form-group">
    <label htmlFor="hardware-skills-moyen">Hardware Skills - Moyen</label>
    <input type="text" className="form-control" id="hardware-skills-moyen" value={hardwareSkillsMoyen} onChange={(e) => setHardwareSkillsMoyen(e.target.value)} required placeholder="Enter your hardware skills (Moyen)" />
  </div>

  <div className="form-group">
    <label htmlFor="hardware-skills-fort">Hardware Skills - Fort</label>
    <input type="text" className="form-control" id="hardware-skills-fort" value={hardwareSkillsFort} onChange={(e) => setHardwareSkillsFort(e.target.value)} required placeholder="Enter your hardware skills (Fort)" />
  </div>
</div>

<div className="form-group">
                      <label htmlFor="languages">Languages</label>
                      <input type="text" className="form-control" value={languages} onChange={(e) => setLanguages(e.target.value)} required placeholder="Enter languages" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="certificates">Certificates</label>
                      <input type="text" className="form-control" value={certificates} onChange={(e) => setCertificates(e.target.value)} required placeholder="Enter certificates" />
                    </div>

              <div className="form-group">
                <label htmlFor="job-description">Job Description</label>
                <textarea className="editor" id="editor-1" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} required placeholder="write your Job Description">
                  <p>Write Job Description!</p>
                </textarea>
              </div>
              <h3 className="text-black my-5 border-bottom pb-2">Company Details</h3>
              <div className="form-group">
                <label htmlFor="company-name">Company Name</label>
                <input type="text" className="form-control" id="company-name" placeholder="e.g. New York" />
              </div>
              <div className="form-group">
                <label htmlFor="company-tagline">Tagline (Optional)</label>
                <input type="text" className="form-control" id="company-tagline" placeholder="e.g. New York" />
              </div>
              <div className="form-group">
                <label htmlFor="job-description">Company Description (Optional)</label>
                <div className="editor" id="editor-2">
                  <p>Description</p>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="company-website">Website (Optional)</label>
                <input type="text" className="form-control" id="company-website" placeholder="https://" />
              </div>
              <div className="form-group">
                <label htmlFor="company-website-fb">Facebook Username (Optional)</label>
                <input type="text" className="form-control" id="company-website-fb" placeholder="companyname" />
              </div>
              <div className="form-group">
                <label htmlFor="company-website-tw">Twitter Username (Optional)</label>
                <input type="text" className="form-control" id="company-website-tw" placeholder="@companyname" />
              </div>
              <div className="form-group">
                <label htmlFor="company-website-tw">Linkedin Username (Optional)</label>
                <input type="text" className="form-control" id="company-website-tw" placeholder="companyname" />
              </div>
              <div className="form-group">
                <label htmlFor="company-website-tw d-block">Upload Logo</label> <br />
                <label className="btn btn-primary btn-md btn-file">
                  Browse File<input type="file" hidden />
                </label>
              </div>
            </form>
          </div>
        </div>
        <div className="row align-items-center mb-5">
          <div className="col-lg-4 ml-auto">
            <div className="row">
              <div className="col-6">
                <a href="#" className="btn btn-block btn-light btn-md"><span className="icon-open_in_new mr-2" />Preview</a>
              </div>
              <div className="col-6">
                <a href="#" className="btn btn-block btn-primary btn-md" onClick={handleSubmit}>Save Job</a>
              </div>
            </div>
          </div>
        </div>
      </div>
  
    </section>
   
    </div>

</div>

          
          
  )
}

export default CreateUser;
