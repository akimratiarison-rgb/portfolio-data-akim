
# app.py
from flask import Flask, render_template

app = Flask(__name__)

# ============================================
# MAINTENANCE : Ajoutez / modifiez vos projets ici
# ============================================
PROJETS = [
    {
        "titre": "Classification KNN – Systèmes IT",
        "description": "Modèle KNN pour classifier des états de systèmes informatiques. Optimisation via GridSearchCV.",
        "technos": ["Python", "Scikit-learn", "Pandas"],
        "lien": "#",
        "emoji": "🤖",
        "highlight": True   # pour l'asymétrie
    },
    {
        "titre": "Régression Linéaire – Prix Immo",
        "description": "Prédiction de prix immobiliers avec analyse exploratoire et visualisations Matplotlib.",
        "technos": ["Python", "NumPy", "Matplotlib"],
        "lien": "#",
        "emoji": "📈",
        "highlight": False
    },
    {
        "titre": "Dashboard GA4",
        "description": "Analyse du comportement utilisateur et reporting pour optimiser les conversions.",
        "technos": ["GA4", "Looker Studio", "GTM"],
        "lien": "#",
        "emoji": "📊",
        "highlight": False
    },
    {
        "titre": "Prédiction de séries temporelles",
        "description": "Modèle LSTM pour prévoir la demande énergétique. Déploiement Flask.",
        "technos": ["TensorFlow", "Keras", "Flask"],
        "lien": "#",
        "emoji": "⏳",
        "highlight": True
    },
{
"titre": "Analyse des ventes – Power BI",
"description": "Dashboard interactif pour suivre les KPI de ventes. Filtres dynamiques et prévisions.",
"technos": ["Power BI", "DAX", "SQL"],
"lien": "#",
"emoji": "📊",
"highlight": False
}
]

# ============================================
# MAINTENANCE : Ajoutez vos certifications ici
# ============================================
CERTIFICATIONS = [
    {
        "titre": "Python for Data Science & AI",
        "organisme": "IBM · Coursera",
        "date": "2024",
        "badge": "🏅",
        "lien": "#",
        "image": "cert.jpg"
        
    },
    {
        "titre": "Google Analytics Certification",
        "organisme": "Google",
        "date": "2024 – 2027",
        "badge": "🎯",
        "lien": "#",
        "image": "cert.jpg"
    },
    {
        "titre": "Azure Data Fundamentals (DP-900)",
        "organisme": "Microsoft",
        "date": "2025",
        "badge": "☁️",
        "lien": "#",
        "image": "cert.jpg"
    }
]

# SECTION COMPÉTENCES
COMPETENCES = {
    "Langages de programmation": ["Python", "JavaScript", "SQL", "Dart", "Rust"],
    "Librairies & Frameworks Python": ["NumPy", "Pandas", "Polars", "Matplotlib", "Scikit-learn", "ReportLab", "BeautifulSoup", "Flask", "Streamlit", "Jinja2"],
    "Machine Learning & Deep Learning": ["KNN", "Régression linéaire multiple", "GridSearchCV", "Deep Learning"],
    "Frontend": ["React.js", "Flutter", "HTML", "CSS", "Tailwind CSS"],
    "Analytics & BI": ["Google Analytics 4", "Power BI"],
    "Data Warehousing & Cloud": ["BigQuery", "Snowflake", "DBT"],
    "DevOps & Environnement": ["Docker", "Git", "GitHub", "VS Code"],
    "Autre": ["Web Scraping"]
}

@app.route("/")
def index():
    return render_template("index.html", projets=PROJETS, certifs=CERTIFICATIONS, competences=COMPETENCES)

if __name__ == "__main__":
    app.run(debug=True)