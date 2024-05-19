import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import '../css/score.css'; 

function Score() {
  const [cvInfo, setCvInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [individualScores, setIndividualScores] = useState([]);
  const [totalScore, setTotalScore] = useState(null);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);
 

  
  const navigate = useNavigate();
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

  const sendResponsesToFlask = async () => {
    setLoading(true);
    setError(null);

    try {
      const missingAnswers = questions.filter(question => !answers[question]);
      if (missingAnswers.length > 0) {
        throw new Error('Veuillez répondre à toutes les questions.');
      }

      const response = await axios.post('http://localhost:5000/compare_individual_responses', {
        answers: answers
      });
      setIndividualScores(response.data.scores);
      
      // Calcul du score total
      const total = response.data.scores.reduce((acc, curr) => acc + curr.score, 0);
      const average = total / response.data.scores.length; // Calcul de la moyenne
      setTotalScore(average);
    } catch (error) {
      console.error('Erreur lors de l\'envoi des réponses:', error);
      setError('Une erreur s\'est produite lors de l\'envoi des réponses: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  const navigateToChartPage = () => {
    navigate("/chart");
};
  const handleFileChange = () => {
    setFileName(fileInputRef.current.files[0].name);
  };

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

      <div className="form-group">
      <label htmlFor="cv-upload" className="d-block">Upload CV (PDF)</label>
      <label className="btn btn-primary btn-md btn-file">
        Browse File
        <input 
          type="file" 
          accept=".pdf" 
          name="cv" 
          hidden 
          ref={fileInputRef} 
          onChange={handleFileChange} 
        /> 
      </label>
      {fileName && <p>Selected file: {fileName}</p>}  <br />
      <button 
        onClick={handleGetCVInfo} 
        disabled={loading} 
        className="btn btn-primary btn-md mt-2"
      >
        {loading ? ' loading' : 'Generate questions'}
      
      </button>
    </div>
      {error && <p>{error}</p>}

      {cvInfo && (
 <div> <h3>Questions According to your Resume :</h3> <ul class="question-list"> {questions.map((question, index) => ( <li key={index} class="question-item"> <div class="question-frame"> <p class="question-text">{question}</p> <div class="answer-container"> <input type="text" placeholder="Entrez votre réponse ici" value={answers[question]} onChange={(e) => handleAnswerChange(question, e.target.value)} class="answer-input" /> {individualScores.length > 0 && ( <span class="score">Score : {individualScores[index].score}</span> )} </div> </div> </li> ))} </ul> </div>

   
)}

      {questions.length > 0 && (
         <div className="form-group">
      <button 
        onClick={sendResponsesToFlask} 
        disabled={loading} 
        className="btn btn-primary btn-md mb-2"
      >
        {loading ? 'Envoi des réponses...' : 'Get Your Score'}
      </button>
      <br />
      <button 
        onClick={navigateToChartPage} 
        className="btn btn-primary btn-md"
      >
        See Recommendation
      </button>
      <br />
      <br />
    </div>
      )}

      

      {totalScore !== null && (
        <div>
          <h3>Score total :</h3>
          <p>{totalScore}</p>
        </div>
      )}
    </div>
  );
// Styles CSS
  
}

export default Score;