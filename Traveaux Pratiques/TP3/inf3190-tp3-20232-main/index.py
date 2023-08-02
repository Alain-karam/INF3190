from flask import Flask, flash, render_template, request, redirect, url_for, g
from database import Database
import smtplib, random
from email.mime.text import MIMEText

app = Flask(__name__, static_url_path="", static_folder="static")

# Définir une clé secrète pour la session
app.secret_key = 'clef'

# Fonction pour obtenir une connexion à la base de données
def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        g._database = Database()
    return g._database

# Déconnexion de la base de données après chaque requête
@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.disconnect()

# Route pour afficher la page d'accueil
@app.route('/')
def index():
    db = get_db()
    all_animaux = db.get_animaux()

    # Sélectionner 5 animaux au hasard pour afficher sur la page d'accueil
    random_animaux = random.sample(all_animaux, 5)

    return render_template('index.html', animaux=random_animaux)

# Route pour afficher les détails d'un animal spécifique
@app.route('/animal/<int:animal_id>')
def animal(animal_id):
    db = get_db()
    animal = db.get_animal(animal_id)

    if animal is not None:
        return render_template('animal.html', animal=animal)
    else:
        return render_template('error.html', error_message="L'animal demandé n'existe pas.")

# Route pour afficher le formulaire de recherche
@app.route('/search', methods=['GET'])
def search_animals():
    return render_template('search.html')

# Route pour afficher les résultats de recherche
@app.route('/search', methods=['POST'])
def search_results():
    search_term = request.form.get('search_term')

    db = get_db()
    search_results = db.search_animaux(search_term)
    return render_template('search_results.html', search_results=search_results)

# Route pour ajouter un nouvel animal à la liste d'adoption
@app.route('/add', methods=['POST'])
def add_animal():
    nom = request.form.get('nom')
    espece = request.form.get('espece')
    race = request.form.get('race')
    age = request.form.get('age')
    description = request.form.get('description')
    courriel = request.form.get('courriel')
    adresse = request.form.get('adresse')
    ville = request.form.get('ville')
    cp = request.form.get('cp')

    db = get_db()
    animal_id = db.add_animal(nom, espece, race, age, description, courriel, adresse, ville, cp)
    flash(f"L'animal \"{nom}\" a été ajouté à la liste d'adoption avec succès!", 'success')
    return redirect(url_for('index'))

# Route pour afficher la page de contact avec le propriétaire de l'animal
@app.route('/contact/<int:animal_id>', methods=['GET', 'POST'])
def contact(animal_id):
    db = get_db()
    animal = db.get_animal(animal_id)

    if request.method == 'POST':
        user_name = request.form.get('user_name')
        user_email = request.form.get('user_email')
        message = request.form.get('message')

        if animal is not None:
            owner_email = animal['courriel']

            msg = MIMEText(message)
            msg['From'] = user_email
            msg['To'] = owner_email
            msg['Subject'] = f'Intérêt pour l\'adoption de {animal["nom"]}'

            server = smtplib.SMTP('localhost')
            server.send_message(msg)
            server.quit()

            flash('Votre courriel a été envoyé au propriétaire de l\'animal.', 'success')
            return redirect(url_for('animal', animal_id=animal_id))

    return render_template('contact.html', animal=animal)

# Route pour afficher le formulaire d'adoption
@app.route('/adoption', methods=['GET', 'POST'])
def adoption_form():
    if request.method == 'POST':
        nom = request.form.get('nom')
        espece = request.form.get('espece')
        race = request.form.get('race')
        age = int(request.form.get('age'))
        description = request.form.get('description')
        courriel = request.form.get('courriel')
        adresse = request.form.get('adresse')
        ville = request.form.get('ville')
        cp = request.form.get('cp')

        db = get_db()
        animal_id = db.add_animal(nom, espece, race, age, description, courriel, adresse, ville, cp)
        return redirect(url_for('adoption_confirmation', animal_id=animal_id))
    return render_template('adoption_form.html')

# Route pour afficher la confirmation d'adoption
@app.route('/adoption_confirmation/<int:animal_id>')
def adoption_confirmation(animal_id):
    db = get_db()
    animal = db.get_animal(animal_id)
    return render_template('adoption_confirmation.html', animal=animal)

@app.route('/send_email', methods=['POST'])
def send_email():
    if request.method == 'POST':
        user_email = request.form.get('user_email')
        message = request.form.get('message')

        # Code pour envoyer le courriel

        flash('Votre courriel a été envoyé au propriétaire de l\'animal.', 'success')
        return redirect(url_for('index'))

# Point d'entrée pour l'exécution de l'application Flask
if __name__ == "__main__":
    app.run(debug=True)
