import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Profile() {
  const { id } = useParams();

  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/getuser/' + id)
      .then(result => {
        console.log(result);
        setUserData(result.data);
      })
      .catch(err => console.error(err));
  }, [id]);

  const update = (e) => {
    e.preventDefault();
    axios.put('http://localhost:3001/updateuser/' + id, userData)
      .then(() => navigate("/profile"))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <main className="main-content mt-0">
        <div className="page-header align-items-start min-vh-100" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80")'}}>
          <span className="mask bg-gradient-dark opacity-6" />
          <div className="container my-auto">
            <div className="row">
              <div className="col-lg-4 col-md-8 col-12 mx-auto">
                <div className="card z-index-0 fadeIn3 fadeInBottom">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                      <h4 className="text-white font-weight-bolder text-center mt-5 mb-0">Profile</h4>
                      <div className="row mt-3">
                        <div className="col-2 text-center ms-auto">
                          <a className="btn btn-link px-3" href="javascript:;">
                            <i className="fa fa-facebook text-white text-lg" />
                          </a>
                        </div>
                        <div className="col-2 text-center px-1">
                          <a className="btn btn-link px-3" href="javascript:;">
                            <i className="fa fa-github text-white text-lg" />
                          </a>
                        </div>
                        <div className="col-2 text-center me-auto">
                          <a className="btn btn-link px-3" href="javascript:;">
                            <i className="fa fa-google text-white text-lg" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <form role="form" className="text-start" onSubmit={update}>
        
                      <div className="mb-3 text-center">
                      <div className="container-fluid py-4">
  <div className="row justify-content-center">
    <div className="col-xl-10">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Profile</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Name:</label>
                <div className="card">{userData.name}</div>
              </div>
              <div className="mb-3">
                <label className="form-label">Email:</label>
                <div className="card">{userData.email}</div>
              </div>
              <div className="mb-3">
                <label className="form-label">Education:</label>
                <div className="card">{userData.education}</div>
              </div>
              <div className="mb-3">
                <label className="form-label">Personal Project:</label>
                <div className="card">{userData.personalProject}</div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Skills:</label>
                <div className="card">{userData.skills}</div>
              </div>
              <div className="mb-3">
                <label className="form-label">Languages:</label>
                <div className="card">{userData.languages}</div>
              </div>
              <div className="mb-3">
                <label className="form-label">Certificates:</label>
                <div className="card">{userData.certificates}</div>
              </div>
              <div className="mb-3">
                <label className="form-label">JobDescription:</label>
                <div className="card">{userData.jobDescription}</div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</div>

                      </div>
                    
                    </form>
                  </div>
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
  </main>
  {/*   Core JS Files   */}
  {/* Github buttons */}
  {/* Control Center for Material Dashboard: parallax effects, scripts for the example pages etc */}
  
</div>
  )
}

export default Profile;