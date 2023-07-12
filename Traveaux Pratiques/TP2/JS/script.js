var reclamations = document.getElementById("reclamations");
var combienReclamations = document.getElementById("combienReclamations");
var nbReclamations = document.getElementById("nbReclamations");
var montantsReclamations = document.getElementById("montantReclamations");


reclamations.addEventListener("change", function () {
    if (reclamations.value == "oui") {
        combienReclamations.style.display = "block";

    } else {
        combienReclamations.style.display = "none";
        montantsReclamations.style.display = "none";

    }
});


nbReclamations.addEventListener("change", function () {
    function ajouterReclamations() {
        var montantsReclamationsDiv = document.getElementById("montantReclamations");
        montantsReclamationsDiv.innerHTML = "";

        for (var i = 1; i <= nbReclamations.value; i++) {
            var label = document.createElement("label");
            label.textContent = "Pour la réclamation #" + i + ", quel montant avez-vous réclamé?";
            var input = document.createElement("input");
            input.type = "number";
            input.id = "montantReclamation" + i;

            montantsReclamationsDiv.appendChild(label);
            montantsReclamationsDiv.appendChild(input);
            montantsReclamationsDiv.insertAdjacentHTML('beforeend', '<br>');
        }
    }
    ajouterReclamations();
});

document.getElementById("formulaireAssurance").addEventListener("submit", function (e) {
    event.preventDefault();

    var genre = document.getElementById("genre").value;
    var age = document.getElementById("age").value;
    var valeurVehicule = document.getElementById("valeurVehicule").value;
    var anneeVehicule = document.getElementById("anneeVehicule").value;
    var nbReclamations = document.getElementById("nbReclamations").value;
    var totalReclamations = 0;

    for (var i = 1; i <= nbReclamations; i++) {
        var montantReclamation = document.getElementById("montantReclamation" + i).value;
        totalReclamations += parseInt(montantReclamation);
    }

    if (age < 16) {
        var erreur = document.getElementById("messageErreurAge").style.display = "block";
        erreur = document.getElementById("messageErreurAge").textContent = "Vous devez avoir au moins 16 ans pour soumettre une demande.";
        var erreurGeneral = document.getElementById("messageErreur").style.display = "block";

    }

    if ((genre === 'homme' && age < 18) || (genre === 'non-binaire' && age < 18)) {
        var erreur = document.getElementById("messageErreurAge").style.display = "block";
        erreur = document.getElementById("messageErreurAge").textContent = "Si vous etes un Homme ou Non-binaire, vous devez avoir au moins 18 ans pour soumettre une demande.";
        var erreurGeneral = document.getElementById("messageErreur").style.display = "block";

    }

    if (age >= 100) {
        var erreur = document.getElementById("messageErreurAge").style.display = "block";
        erreur = document.getElementById("messageErreurAge").textContent = "Vous devez avoir moins de 100 ans pour soumettre une demande.";
        var erreurGeneral = document.getElementById("messageErreur").style.display = "block";

    }

    if (anneeVehicule <= new Date().getFullYear() - 25) {
        var erreur = document.getElementById("messageErreurAnneeV").style.display = "block";
        erreur = document.getElementById("messageErreurAnneeV").textContent = "Votre vehicule ne doit pas avoir plus de 25 ans.";
        var erreurGeneral = document.getElementById("messageErreur").style.display = "block";

    }

    if (valeurVehicule > 100000) {
        var erreur = document.getElementById("messageErreurValeurV").style.display = "block";
        erreur = document.getElementById("messageErreurValeurV").textContent = "La valeur de votre vehicule ne doit pas depasser 100 000$.";
        var erreurGeneral = document.getElementById("messageErreur").style.display = "block";

    }

    if (nbReclamations > 4) {
        var erreur = document.getElementById("messageErreurNbReclamations").style.display = "block";
        erreur = document.getElementById("messageErreurNbReclamations").textContent = "Vous ne pouvez pas avoir plus de 4 reclamations.";
        var erreurGeneral = document.getElementById("messageErreur").style.display = "block";

    }

    if (totalReclamations > 35000) {
        var erreur = document.getElementById("messageErreurMontantReclamations").style.display = "block";
        erreur = document.getElementById("messageErreurMontantReclamations").textContent = "Le montant total de vos reclamations ne doit pas depasser 35 000$.";
        var erreurGeneral = document.getElementById("messageErreur").style.display = "block";
    }

    var prixBase;
    var montantAssuranceAnnuelle;
    var montantAssuranceMensuelle;

    if ((genre === "homme" || genre === "non-binaire") && age < 25) {
        prixBase = valeurVehicule * 0.05;
    } else if (age > 75) {
        prixBase = valeurVehicule * 0.04;
    } else {
        prixBase = valeurVehicule * 0.02;
    }

    if (totalReclamations > 25000) {
        montantAssuranceAnnuelle = prixBase + (350 * nbReclamations) + 500;
    } else {
        montantAssuranceAnnuelle = prixBase + (350 * nbReclamations);
    }

    montantAssuranceMensuelle = montantAssuranceAnnuelle / 12;

    if (document.getElementById("messageErreur").style.display === "none") {
        document.getElementById("resultat").style.display = "block";
        document.getElementById("montantAssuranceAnnuelle").textContent = montantAssuranceAnnuelle.toFixed(2) + "$";
        document.getElementById("montantAssuranceMensuelle").textContent = montantAssuranceMensuelle.toFixed(2) + "$";
    } else {
        document.getElementById("resultat").style.display = "none";
    }

    var nouvelleSoumission = document.getElementById("nouvelleSoumission");
    nouvelleSoumission.style.display = "block";
});

var boutonNouvelleSoumission = document.getElementById("boutonNouvelleSoumission");
boutonNouvelleSoumission.addEventListener("click", function () {

    document.getElementById("formulaireAssurance").reset();
    document.getElementById("nouvelleSoumission").style.display = "none";
    document.getElementById("resultat").style.display = "none";

    var montantsReclamationsDiv = document.getElementById("montantReclamations");
    while (montantsReclamationsDiv.firstChild) {
        montantsReclamationsDiv.removeChild(montantsReclamationsDiv.firstChild);
    }

    document.getElementById("messageErreur").style.display = "none";
    document.getElementById("messageErreurAge").style.display = "none";
    document.getElementById("messageErreurAnneeV").style.display = "none";
    document.getElementById("messageErreurValeurV").style.display = "none";
    document.getElementById("messageErreurNbReclamations").style.display = "none";
    document.getElementById("messageErreurMontantReclamations").style.display = "none";
    document.getElementById("combienReclamations").style.display = "none";
});
