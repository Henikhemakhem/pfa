import React, { useState, useRef } from 'react';
import axios from 'axios';

function RelevantQuestions() {
  const [cvInfo, setCvInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const fileInputRef = useRef(null);

  const handleGetCVInfo = async () => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('cv', fileInputRef.current.files[0]);

    try {
      const response = await axios.post('http://localhost:5000/extract_cv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setCvInfo(response.data);
      setQuestions(response.data.relevant_questions);
      setAnswers(response.data.relevant_questions.reduce((acc, curr) => {
        acc[curr] = '';
        return acc;
      }, {}));
    } catch (error) {
      console.error('Erreur lors de la récupération des informations du CV:', error);
      setError('Une erreur s\'est produite lors de la récupération des informations du CV.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (question, answer) => {
    setAnswers(prevState => ({
      ...prevState,
      [question]: answer
    }));
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
  {/* CUSTOM CSS */}
  <style>
        {`
          h1, h2, h3, h4 {
            color: #13a58f;
          }
          .question {
            color: #555;
          }
        `}
      </style>

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
        <div className="site-section bg-transparent" id="home-section">
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <div className="cv-info-container">
                  <h2>Extraire les informations du CV</h2>
                  <input type="file" accept=".pdf" name="cv" ref={fileInputRef} />
                  <button onClick={handleGetCVInfo} disabled={loading}>
                    {loading ? 'Chargement...' : 'Extraire les informations'}
                  </button>

                  {error && <p className="error-message">{error}</p>}

                  {questions.length > 0 && (
                    <div>
                      <h3>Questions pertinentes pour les compétences du CV :</h3>
                      <ul>
                        {questions.map((question, index) => (
                          <li key={index} className="question">
                            {question}
                            <div className="input-group mb-3">
                              <div className="input-group-prepend">
                                <span className="input-group-text">Réponse</span>
                              </div>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Saisissez votre réponse ici"
                                value={answers[question]}
                                onChange={(e) => handleAnswerChange(question, e.target.value)}
                              />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Autres sections du site ici */}
      </div>
    </div>

  );
}

export default RelevantQuestions;
