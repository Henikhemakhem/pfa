from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import numpy as np
from transformers import BertTokenizer, BertModel
import torch
import fitz
import tempfile
from app import extract_languages_and_skills, extract_skills, extract_text_from_pdf, generate_questions

app = Flask(__name__)
CORS(app)  # Active CORS pour toute l'application

# Charger la base de données de questions et réponses
base_data = pd.read_csv('questions_reponse.csv')

# Initialiser le vectoriseur TF-IDF
vectorizer = TfidfVectorizer()

# Charger le modèle BERT et le tokenizer
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertModel.from_pretrained('bert-base-uncased')

# Définir une fonction pour encoder les réponses en utilisant BERT
def encode_responses(responses):
    inputs = tokenizer(responses, padding=True, truncation=True, return_tensors="pt")
    with torch.no_grad():
        outputs = model(**inputs)
    return outputs.last_hidden_state.mean(dim=1)  # Moyenne des représentations des tokens pour obtenir une seule représentation par réponse

@app.route('/receive_data', methods=['POST'])
def receive_data():
    data = request.json  # Récupère les données JSON envoyées dans le corps de la requête

    questions = data.get('questions', [])
    answers = data.get('answers', {})
    
    # Afficher uniquement les réponses
    for question, answer in answers.items():
        print(f" Réponse: {answer}")
    
    # Comparaison avec la base de données de questions et calcul du score
    
    return jsonify({'answers': answers})

@app.route('/compare_responses', methods=['POST'])
def compare_responses():
    data = request.json
    candidate_answers = data.get('answers', {})
    generated_questions = list(candidate_answers.keys())  # Obtenir les questions générées

    # Récupérer les réponses correspondant aux questions générées depuis la base de données
    filtered_base_data = base_data[base_data['Question'].isin(generated_questions)]
    base_answers = filtered_base_data['Reponse'].tolist()
    
    # Prétraiter les réponses du candidat et de la base de données avec BERT
    candidate_vector = encode_responses(list(candidate_answers.values()))
    base_vector = encode_responses(base_answers)
    
    # Calcul de la similarité cosinus entre les représentations des réponses du candidat et de la base de données
    similarity_scores = torch.nn.functional.cosine_similarity(candidate_vector, base_vector)

    # Calcul du score moyen de similarité
    average_similarity_score = (similarity_scores.mean().item() * 100) - 10

    return jsonify({'score': average_similarity_score})

@app.route("/extract_cv", methods=["POST"])
def extract_cv_route():
    cv_file = request.files['cv']  # Récupère le fichier de CV envoyé par le client
    text = extract_text_from_pdf(cv_file)
    relevant_questions = generate_questions(text, "questions_reponse.csv")
    return jsonify({"relevant_questions": relevant_questions})
import matplotlib.pyplot as plt

import numpy as np
import os
from collections import defaultdict




@app.route('/compare_individual_responses', methods=['POST'])
def compare_individual_responses():
    data = request.json
    candidate_answers = data.get('answers', {})
    
    # Dictionnaire pour stocker les scores agrégés pour chaque compétence
    aggregated_scores = defaultdict(list)
    
    # Comparaison de chaque réponse avec la base de données de réponses
    for question, candidate_answer in candidate_answers.items():
        # Trouver la réponse correcte dans la base de données
        correct_answer_row = base_data[base_data['Question'] == question]
        if not correct_answer_row.empty:
            correct_answer = correct_answer_row.iloc[0]['Reponse']
            skills_generer = correct_answer_row.iloc[0]['Skill']
            # Calcul du score de similarité entre la réponse du candidat et la réponse correcte
            score = calculate_similarity(candidate_answer, correct_answer)
            aggregated_scores[skills_generer].append(score)
    
    # Calculer la moyenne des scores pour chaque compétence
    skill_averages = {skill: np.mean(scores) for skill, scores in aggregated_scores.items()}
    
    # Générer le graphique à partir des compétences générées et des moyennes des scores
    generate_skill_chart(skill_averages)
   
    
    # Liste pour stocker les scores de chaque réponse
    scores = []
    
    # Comparaison de chaque réponse avec la base de données de réponses
    for question, candidate_answer in candidate_answers.items():
        # Trouver la réponse correcte dans la base de données
        correct_answer_row = base_data[base_data['Question'] == question]
        if not correct_answer_row.empty:
            correct_answer = correct_answer_row.iloc[0]['Reponse']
            # Calcul du score de similarité entre la réponse du candidat et la réponse correcte
            score = calculate_similarity(candidate_answer, correct_answer)
            scores.append({"question": question, "score": score})
    
    return jsonify({'scores': scores})
    


@app.route('/generate_skill_chart', methods=['GET'])
def generate_skill_chart(skill_averages):
    # Extraire les compétences et les moyennes des scores
    skills = list(skill_averages.keys())
    skill_scores = list(skill_averages.values())

    # Création du graphique circulaire (pie chart)
    plt.figure(figsize=(10, 10))
    plt.pie(skill_scores, labels=skills, autopct='%1.1f%%', startangle=140)
    plt.axis('equal')  # Assurez-vous que le pie chart est un cercle
    plt.title('Répartition des scores moyens par compétence')
    plt.savefig('static/pie_chart.png')
 


@app.route('/generate_chart', methods=['GET'])
def generate_chart():   
     # URL de l'image générée par votre application Flask
    image_url = "static/pie_chart.png"
    return jsonify({'image_url': image_url})
 # Fermer le graphique pour libérer la mémoire

     # Renvoyer le chemin absolu de l'image


    # Sauvegarde du graphique en tant qu'image ou affichage dans le notebook
      # Sauvegarde du graphique sous forme d'image
    # plt.show()  # Affichage du graphique dans le notebook (décommentez cette ligne si vous utilisez Jupyter Notebook ou Google Colab)




def calculate_similarity(candidate_answer, correct_answer):
    # Prétraiter les réponses avec le vectoriseur TF-IDF
    tfidf_matrix = vectorizer.fit_transform([candidate_answer, correct_answer])
    # Calculer la similarité cosinus entre les deux réponses
    similarity_score = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix)[0][1]
    return similarity_score * 100

if __name__ == "__main__":
    app.run(debug=True, port=5000)