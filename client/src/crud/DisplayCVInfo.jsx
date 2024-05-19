import React, { useState, useRef } from 'react';
import axios from 'axios';

function DisplayCVInfo() {
  const [cvInfo, setCvInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null); // Définir une référence pour l'élément d'entrée de type fichier

  const handleGetCVInfo = async () => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('cv', fileInputRef.current.files[0]); // Accéder au fichier sélectionné à partir de la référence

    try {
      const response = await axios.post('http://localhost:5000/extract_cv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setCvInfo(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des informations du CV:', error);
      setError('Une erreur s\'est produite lors de la récupération des informations du CV.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cv-info-container">
      <br /><br />
      <h2>Extraire les informations du CV</h2>
      <input type="file" accept=".pdf" name="cv" ref={fileInputRef} />
 {/* Définir la référence sur l'élément d'entrée de type fichier */}
      <button onClick={handleGetCVInfo} disabled={loading}>
        {loading ? 'Chargement...' : 'Extraire les informations'}
      </button>

      {error && <p className="error-message">{error}</p>}

      {cvInfo && (
  <div>
    <h3>Informations extraites du CV :</h3>
    <ul>
      {Object.entries(cvInfo).map(([domain, info]) => (
        <li key={domain}>
          <strong>Domaine:</strong> {domain}<br />
          <strong>Langues:</strong> {info.languages.join(', ')}<br />
          <strong>Compétences:</strong> {info.skills.join(', ')}<br />
        </li>
      ))}
    </ul>
  </div>
)}

    </div>
  );
}

export default DisplayCVInfo;
