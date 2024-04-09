import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
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
function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate(); // Define navigate

    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/register', { email, password, confirmPassword })
            .then(result => {console.log(result)
            navigate('/')
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <div>
                <section className="section-hero overlay inner-page bg-image" style={{backgroundImage: 'url("images/hero_1.jpg")'}} id="home-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-7">
                                <h1 className="text-white font-weight-bold">Sign Up</h1>
                                <div className="custom-breadcrumbs">
                                    <a href="#">Home</a> <span className="mx-2 slash">/</span>
                                    <span className="text-white"><strong>Sign up</strong></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="site-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 mb-5">
                                <h2 className="mb-4">Sign Up To JobBoard</h2>
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
                                    <div className="row form-group">
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
                                    <div className="row form-group mb-4">
                                        <div className="col-md-12 mb-3 mb-md-0">
                                            <label className="text-black" htmlFor="confirmPassword">Re-Type Password</label>
                                            <input 
                                                type="password" 
                                                id="confirmPassword" 
                                                className="form-control" 
                                                placeholder="Re-type Password" 
                                                value={confirmPassword} 
                                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                            />
                                        </div>
                                    </div>
                                    <div className="row form-group">
                                        <div className="col-md-12">
                                            <input type="submit" value="Sign Up" className="btn px-4 btn-primary text-white" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Signup;