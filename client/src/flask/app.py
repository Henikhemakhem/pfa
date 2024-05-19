# backend/utils.py
from collections import Counter
from nltk.tokenize import word_tokenize
import fitz  # PyMuPDF
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import numpy as np
import fitz
import tempfile

# Fonction pour extraire le texte d'un fichier PDF
# Fonction pour extraire le texte d'un PDF
def extract_text_from_pdf(pdf_file):
    with tempfile.NamedTemporaryFile(delete=False) as temp_pdf:
        temp_pdf.write(pdf_file.read())
        temp_pdf.seek(0)
        text = ""
        with fitz.open(temp_pdf.name) as pdf_document:
            for page_num in range(len(pdf_document)):
                page = pdf_document.load_page(page_num)
                text += page.get_text()
        return text

# Fonction pour extraire les langages utilisés et les compétences à partir du texte du CV
def extract_languages_and_skills(cv_text):
    domain_keywords = {
        "skills": ["compétences", "techniques"],
        "certificates": ["certifications", "certificats"],
        "projects": ["personal", "projects"]  # Correction : "projects" au lieu de "PROJETS"
    }
    domain_info = {domain: {"languages": [], "skills": []} for domain in domain_keywords}
    tokens = word_tokenize(cv_text.lower())
    current_domain = ""
    for token in tokens:
        for domain, keywords in domain_keywords.items():
            if any(keyword in token for keyword in keywords):
                current_domain = domain
                break
        if current_domain != "":
            if token.isalpha():
                if token in ["html", "css", "php", "javascript", "java", "python", "c", "c++", "matlab"]:
                    domain_info[current_domain]["languages"].append(token)
                else:
                    domain_info[current_domain]["skills"].append(token)
        elif token in [":", "-", "—"]:
            current_domain = ""
    return domain_info

# Fonction pour extraire les compétences du CV
def extract_skills(cv_info):
    skills = []
    for domain, info in cv_info.items():
        skills.extend(info["skills"])
    return skills
from transformers import BertTokenizer, BertModel
import torch

def generate_questions(text, question_database_file, threshold=0.75):
    # Charger le modèle BERT et le tokenizer
    tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
    model = BertModel.from_pretrained('bert-base-uncased')
    
    # Suppression des doublons et conversion en liste
    question_database = pd.read_csv(question_database_file)
    questions_corpus = list(set(question_database["Question"]))
    
    # Encodage du texte avec BERT
    inputs = tokenizer(text, padding=True, truncation=True, return_tensors="pt")
    with torch.no_grad():
        outputs = model(**inputs)
    text_vector = outputs.last_hidden_state.mean(dim=1)  # Moyenne des représentations des tokens pour obtenir une seule représentation pour le texte
    
    # Encodage des questions avec BERT
    question_inputs = tokenizer(questions_corpus, padding=True, truncation=True, return_tensors="pt")
    with torch.no_grad():
        question_outputs = model(**question_inputs)
    question_vectors = question_outputs.last_hidden_state.mean(dim=1)  # Moyenne des représentations des tokens pour obtenir une seule représentation pour chaque question
    
    # Calcul de la similarité cosinus entre le texte et les questions
    similarity_scores = torch.nn.functional.cosine_similarity(text_vector, question_vectors, dim=1)
    
    # Ensemble pour stocker les questions uniques
    unique_questions = set()
    
    # Sélection des questions les plus pertinentes (avec une similarité élevée)
    for score, question in zip(similarity_scores, questions_corpus):
        if score > threshold:
            unique_questions.add(question)
    
    return list(unique_questions)
