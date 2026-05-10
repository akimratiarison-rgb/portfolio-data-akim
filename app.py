from flask import Flask, render_template, request, jsonify, session, redirect, url_for
from flask_mail import Mail, Message
import json
import os

app = Flask(__name__)

# ========== CONFIGURATION GÉNÉRALE ==========
app.config['SECRET_KEY'] = 'ma-super-cle-secrete-pour-session'  # nécessaire pour la session
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'tratiarisonakiim@gmail.com'
app.config['MAIL_PASSWORD'] = 'wrgcojnsfmtqpqsy'  # sans espaces
app.config['MAIL_DEFAULT_SENDER'] = 'tratiarisonakiim@gmail.com'

mail = Mail(app)

# ========== SYSTÈME DE TRADUCTION (JSON) ==========
# Charge les traductions depuis le fichier translations.json
with open(os.path.join(app.root_path, 'translations.json'), 'r', encoding='utf-8') as f:
    translations = json.load(f)

def _(text):
    """Fonction de traduction : retourne le texte dans la langue de la session."""
    lang = session.get('lang', 'fr')
    return translations.get(lang, {}).get(text, text)

# Route pour changer la langue
@app.route('/language/<lang>')
def set_language(lang):
    if lang in ['fr', 'en']:
        session['lang'] = lang
    return redirect(request.referrer or url_for('index'))

# ========== DONNÉES ==========
PROJETS = [
    {
        "titre": "Ohatra oa",
        "description": "ohatra",
        "technos": ["Deep learning"],
        "lien": "#",
        "image": "anaconda.png",    
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
        "image": "flask.png",
        "highlight": False
    },
    {
        "titre": "Mbola !",
        "description": "aiza koa.",
        "technos": ["no no no "],
        "lien": "#",
        "image": "numpy.png",
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

# ========== ROUTES ==========
@app.route("/")
def index():
    return render_template("index.html", projets=PROJETS, certifs=CERTIFICATIONS, competences=COMPETENCES, _=_)

@app.route("/test")
def test():
    return "Route test OK"

@app.route("/send-message", methods=["POST"])
def send_message():
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        subject = data.get('subject')
        message = data.get('message')
        
        if not all([name, email, subject, message]):
            return jsonify({"error": "Tous les champs sont requis"}), 400
        
        msg = Message(
            subject=f"Contact Portfolio – {subject}",
            recipients=['tratiarisonakiim@gmail.com'],
            body=f"Nom : {name}\nEmail : {email}\n\nMessage :\n{message}",
            reply_to=email
        )
        mail.send(msg)
        return jsonify({"success": True, "message": "Message envoyé avec succès"}), 200
    except Exception as e:
        print(f"Erreur d'envoi : {e}")
        return jsonify({"error": "Erreur interne, veuillez réessayer"}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)