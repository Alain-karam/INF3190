function validateForm() {
    var form = document.getElementById("adoptionForm");
    var nom = form.elements["nom"].value;
    var age = form.elements["age"].value;
    var courriel = form.elements["courriel"].value;
    var adresse = form.elements["adresse"].value;
    var ville = form.elements["ville"].value;
    var codePostal = form.elements["cp"].value;

    // Validation du nom de l'animal
    if (nom.length < 3 || nom.length > 20) {
        alert("Le nom de l'animal doit avoir entre 3 et 20 caractères.");
        return false;
    }

    // Validation de l'âge
    if (isNaN(age) || age < 0 || age > 30) {
        alert("L'âge doit être une valeur numérique entre 0 et 30.");
        return false;
    }

    // Validation de l'adresse courriel
    var courrielRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!courrielRegex.test(courriel)) {
        alert("L'adresse courriel n'a pas un format valide.");
        return false;
    }

    // Validation de l'adresse
    var adresseRegex = /^[^,]+$/;
    if (!adresseRegex.test(adresse)) {
        alert("L'adresse ne peut pas contenir de virgule.");
        return false;
    }

    // Validation du code postal
    var codePostalRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    if (!codePostalRegex.test(codePostal)) {
        alert("Le code postal doit avoir un format canadien valide.");
        return false;
    }

    // Si toutes les validations passent, soumettre le formulaire au backend
    return true;
}
