document.getElementById('claims').addEventListener('change', function() {
    var claimQuestions = document.getElementById('claimQuestions');
    if (this.value === 'yes') {
        claimQuestions.style.display = 'block';
        addClaimQuestion();
    } else {
        claimQuestions.style.display = 'none';
        document.getElementById('claimAmounts').innerHTML = '';
    }
});

function addClaimQuestion() {
    var numClaims = document.getElementById('numClaims').value;
    var claimAmounts = document.getElementById('claimAmounts');
    claimAmounts.innerHTML = '';

    for (var i = 1; i <= numClaims; i++) {
        var label = document.createElement('label');
        label.textContent = 'Pour la réclamation #' + i + ', quel montant avez-vous réclamé?';

        var input = document.createElement('input');
        input.type = 'number';

        claimAmounts.appendChild(label);
        claimAmounts.appendChild(input);
    }
}

document.getElementById('insuranceForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var gender = document.getElementById('gender').value;
    var age = document.getElementById('age').value;
    var vehicleValue = document.getElementById('vehicleValue').value;
    var vehicleYear = document.getElementById('vehicleYear').value;
    var claims = document.getElementById('claims').value;

    var numClaims = 0;
    var claimAmounts = [];

    if (claims === 'yes') {
        numClaims = document.getElementById('numClaims').value;
        for (var i = 1; i <= numClaims; i++) {
            claimAmounts.push(parseInt(document.getElementById('claimAmount' + i).value));
        }
    }

    // Perform validations
    var errorMessages = [];

    if (!gender) {
        errorMessages.push('Veuillez sélectionner votre genre.');
    }

    if (age < 16 || (gender === 'male' && age < 18) || (gender === 'non-binary' && age < 18) || age >= 100) {
        errorMessages.push('Désolé, nous n\'avons aucun produit à offrir pour ce profil de client.');
    }

    if (vehicleYear <= new Date().getFullYear() - 25) {
        errorMessages.push('Désolé, nous n\'avons aucun produit à offrir pour ce profil de véhicule.');
    }

    if (vehicleValue > 100000) {
        errorMessages.push('Désolé, nous n\'avons aucun produit à offrir pour un véhicule de plus de 100 000$.');
    }

    if (numClaims > 4 || claimAmounts.length > 4) {
        errorMessages.push('Désolé, nous n\'avons aucun produit à offrir pour une personne avec plus de 4 réclamations.');
    }

    var totalClaimAmount = claimAmounts.reduce(function(acc, amount) {
        return acc + amount;
    }, 0);

    if (totalClaimAmount > 35000) {
        errorMessages.push('Désolé, nous n\'avons aucun produit à offrir pour une personne avec plus de 35 000$ de réclamation.');
    }

    if (errorMessages.length > 0) {
        var errorMessage = document.createElement('p');
        errorMessage.id = 'error';
        errorMessage.textContent = errorMessages.join(' ');

        var result = document.getElementById('result');
        result.innerHTML = '';
        result.appendChild(errorMessage);
        result.style.display = 'block';
    } else {
        var baseAmount;

        if ((gender === 'male' || gender === 'non-binary') && age < 25) {
            baseAmount = vehicleValue * 0.05;
        } else if (age >= 75) {
            baseAmount = vehicleValue * 0.04;
        } else {
            baseAmount = vehicleValue * 0.02;
        }

        var annualAmount = baseAmount + (350 * numClaims);

        if (totalClaimAmount > 25000) {
            annualAmount += 500;
        }

        var monthlyAmount = (annualAmount / 12).toFixed(2);

        var quote = document.createElement('p');
        quote.textContent = 'Prix annuel de la soumission d\'assurance: ' + annualAmount.toFixed(2) + '$';

        var monthlyAmountText = document.createElement('p');
        monthlyAmountText.textContent = 'Montant mensuel: ' + monthlyAmount + '$';

        var result = document.getElementById('result');
        result.innerHTML = '';
        result.appendChild(quote);
        result.appendChild(monthlyAmountText);
        result.style.display = 'block';
    }
});
