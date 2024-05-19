import React, { useState } from 'react';
import axios from 'axios';

function CVUploader() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cvInfo, setCvInfo] = useState(null);

  const handleUploadCV = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('cv', e.target.files[0]);

    try {
      const response = await axios.post('http://localhost:5000/extract_cv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('CV Info:', response.data);
      setCvInfo(response.data); // Stocker les informations du CV dans l'état local
    } catch (error) {
      console.error('Erreur lors de l\'envoi du CV:', error);
      setError('Une erreur s\'est produite lors de l\'envoi du CV.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Uploader un CV</h2>
      <br /><br />
      <input type="file" accept=".pdf" onChange={handleUploadCV} />
      {loading && <p>Téléchargement en cours...</p>}
      {error && <p>Erreur: {error}</p>}
      
      {/* Afficher les informations du CV si disponibles */}
      {cvInfo && (
        <div>
          <h3>Informations du CV</h3>
          <ul>
            {Object.keys(cvInfo).map((domain, index) => (
              <li key={index}>
                <strong>{domain}</strong>: {cvInfo[domain]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CVUploader;
