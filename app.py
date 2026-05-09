
# app.py
from flask import Flask, render_template

app = Flask(__name__)

# ============================================
# MAINTENANCE : Ajoutez / modifiez vos projets ici
# ============================================
PROJETS = [
    {
        "titre": "Ohatra oa",
        "description": "ohatra",
        "technos": ["Deep learning"],
        "lien": "#",
        "image": "dashboard.png",    
        "highlight": True   
    },
    {
        "titre": "Régression Linéaire – Prix Immo",
        "description": "Prédiction de prix immobiliers avec analyse exploratoire et visualisations Matplotlib.",
        "technos": ["Python", "NumPy", "Matplotlib"],
        "lien": "#",
        "image": "powerbi.png",
        "highlight": False
    },
    {
        "titre": "Mbola !",
        "description": "aiza koa.",
        "technos": ["no no no "],
        "lien": "#",
        "image": "dashboard.png",
        "highlight": False
    },
    {
        "titre": "Mbola !",
        "description": "aiza koa.",
        "technos": ["no no no "],
        "lien": "#",
        "image": "dashboard.png",
        "highlight": False
    },
   
    {
        "titre": "Mitady !",
        "description": "tsy aiko.",
        "technos": ["streamlit ?"],
        "lien": "#",
        "image": "dashboard.png",
        "highlight": True
    },
{
"titre": "Analyse des ventes Power BI",
"description": "hevitra mety",
"technos": ["Power BI"],
"lien": "#",
"highlight": False
}
]

# ============================================
# MAINTENANCE : Ajout certifications ici
# ============================================
CERTIFICATIONS = [
    {
        "titre": "Data Analyst : Career Preparation ",
        "organisme": "IBM",
        "date": "2026",
        "badge": "🏅",
        "lien": "https://cognitiveclass.ai/certificates/384230bc-e72f-4a37-add0-7f91c265d03b",
        "image": "ibm-cert.png"
        
    },
    {
        "titre": "Google Analytics Certification",
        "organisme": "Google",
        "date": "2026 – 2027",
        "badge": "🎯",
        "lien": "https://skillshop.credential.net/f26e5ea6-86df-4e7d-abaf-af094291bed3?record_view=true",
        "image": "google-analytics-badge.png"
    },
    {
        "titre": "JavaScript Certification (Problem Solving)",
        "organisme": "CodinGame",
        "date": "2026",
        "badge": "☁️",
        "lien": "https://www.codingame.com/certification/IM6f_CS7i578DpWklLug0w",
        "image": "js.png"
    }
]

# SECTION COMPÉTENCES
COMPETENCES = {
    "Langages de programmation": ["Python", "JavaScript", "SQL"],
    "Librairies & Frameworks Python": ["NumPy", "Pandas","Scrapy", "Matplotlib", "Scikit-learn", "BeautifulSoup", "Flask", "Streamlit", "Jinja2"],
    "Machine Learning & Deep Learning": ["KNN", "Régression linéaire multiple", "GridSearchCV"],
    "Frontend": [ "HTML", "CSS", "Tailwind CSS"],
    "Analytics & BI": ["Google Analytics 4", "Power BI", "Looker Studio", "GTM"],
    "Data Warehousing & Cloud": ["BigQuery", "DBT"],
    "DevOps & Environnement": ["Docker", "Git", "GitHub", "VS Code"],
    "Collection de données": ["Web Scraping"]
}

@app.route("/")
def index():
    return render_template("index.html", projets=PROJETS, certifs=CERTIFICATIONS, competences=COMPETENCES)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)