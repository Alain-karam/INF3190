var reclamations = document.getElementById("reclamations");
var combienReclamations = document.getElementById("combienReclamations");
var nbReclamations = document.getElementById("nbReclamations");
var montantsReclamations = document.getElementById("montantsReclamations");

reclamations.addEventListener("change", function() {
    if (reclamations.value == "oui") {
        combienReclamations.style.display = "block";
        
    } else {
        combienReclamations.style.display = "none";
    }
});


nbReclamations.addEventListener("change", function() {
    function ajouterReclamations() {
        var montantsReclamations = 0;
        var listeReclamations = document.getElementById("listeReclamations");
        listeReclamations.innerHTML = "";

        for ( i = 1; i <= nbReclamations.value; i++) {
            var label = document.createElement("label");
            label.textContent = "Pour la réclamation #" + i + ", quel montant avez-vous réclamé?";

            var input = document.createElement("input");
            input.type = "number";
            input.id = "montantReclamation" + i;
            
            listeReclamations.appendChild(label);
            listeReclamations.appendChild(input);
        }
    }
    ajouterReclamations();
});

document.getElementById("formulaireAssurance").addEventListener("submit", function(e) {

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

    console.log(totalReclamations);

    if  (age < 16 || 
        (genre === 'homme' && age < 18) || 
        (genre === 'non-binaire' && age < 18) || 
        age >= 100 ||
        anneeVehicule <= new Date().getFullYear() - 25 ||
        valeurVehicule > 100000 ||
        nbReclamations > 4 ||
        totalReclamations > 35000) {

            var erreur = document.getElementById("messageErreur").style.display = "block";
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
        montantAssuranceAnnuelle = prixBase + (350*nbReclamations) + 500;
    } else {
        montantAssuranceAnnuelle = prixBase + (350*nbReclamations);
    }

    montantAssuranceMensuelle = montantAssuranceAnnuelle / 12;

    document.getElementById("resultat").style.display = "block";
    document.getElementById("montantAssuranceAnnuelle").textContent = montantAssuranceAnnuelle.toFixed(2) + "$";
    document.getElementById("montantAssuranceMensuelle").textContent = montantAssuranceMensuelle.toFixed(2) + "$";

});