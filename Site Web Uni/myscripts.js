$(document).ready(function(){ // permet la navigation entre les 3 options du menu
  var currentSection = "accueil";
  var buttonClickAllowed = true;

  function enableButtonClick() {
    buttonClickAllowed = true;
  }

  $(".button_accueil").click(function(){ // accueil
    if (buttonClickAllowed && currentSection !== "accueil") {
      $(".inscription, .carte").slideUp();
      $(".accueil").delay(500).slideDown(); // le temps que le panneau descend
      currentSection = "accueil"; // var qui permet de voir sur quel menu l'utilisateur choisi
      buttonClickAllowed = false; // gèle le boutton afin d'éviter que l'utilisateur le pèse deux fois en ligne
      setTimeout(enableButtonClick, 1000); // timeout nécessaire afin d'éviter que deux panneaux embarquent un par dessus l'autre
    }
  });

  $(".button_inscription").click(function(){ // s'inscrire
    if (buttonClickAllowed && currentSection !== "inscription") {
      $(".accueil, .carte").slideUp();
      $(".inscription").delay(500).slideDown(); 
      currentSection = "inscription";
      buttonClickAllowed = false;
      setTimeout(enableButtonClick, 1000); 
    }
  });

  $(".button_carte").click(function(){ // localiser une activité
    if (buttonClickAllowed && currentSection !== "carte") {
      $(".accueil, .inscription").slideUp();
      $(".carte").delay(500).slideDown();
      currentSection = "carte";
      buttonClickAllowed = false;
      setTimeout(enableButtonClick, 1000); 
    }
  });
});

var data = [  // valeurs de la table afin qu'on puisse intégrer du js
  {"order": 1, "activity": "Natation", "manager": "Michel Provencher", "numofsub": 7},
  {"order": 2, "activity": "Badminton", "manager": "Daniel Lefevbre", "numofsub": 15},
  {"order": 3, "activity": "Randonnée", "manager": "Catherine Pelletier", "numofsub": 10},
  {"order": 4, "activity": "Kayak", "manager": "Josée Coté", "numofsub": 14},
  {"order": 5, "activity": "Velo", "manager": "Jean-Yves Surroy", "numofsub": 22},
  {"order": 6, "activity": "Echecs", "manager": "Emilie Simard", "numofsub": 11}
];

function updateTable() { // permet de modifier l'ordre de la table avec les nouvelles valeurs de sortTable()
  var table = document.getElementById("table-activites");

  for (var i = 1; i < table.rows.length; i++) { // passe à travers tout les valeurs de la table et les update
    table.rows[i].cells[0].innerHTML = data[i - 1].order;
    table.rows[i].cells[1].innerHTML = data[i - 1].activity;
    table.rows[i].cells[2].innerHTML = data[i - 1].manager;
    table.rows[i].cells[3].innerHTML = data[i - 1].numofsub;
  }
}

function fillTable() { // permet de remplir la table avec les information dans var data
  var table = document.getElementById("table-activites");

  for (var i = 0; i < data.length; i++) {
    var row = table.insertRow(i + 1);
    var cellOrder = row.insertCell(0);
    var cellActivity = row.insertCell(1);
    var cellManager = row.insertCell(2);
    var cellNumOfSub = row.insertCell(3);

    cellOrder.innerHTML = data[i].order;
    cellActivity.innerHTML = data[i].activity;
    cellManager.innerHTML = data[i].manager;
    cellNumOfSub.innerHTML = data[i].numofsub;
  }
}


function clearTable() { // permet d'effacer la table et son contenu
  var table = document.getElementById("table-activites");

  // Start from the last row and remove each row
  for (var i = table.rows.length - 1; i > 0; i--) {
    table.deleteRow(i);
  }

  fillTable(); // appel de la fonction pour la re-remplir
}

// Ajouter un écouteur d'événements pour le chargement de la page
document.addEventListener("DOMContentLoaded", function() {
  // Appeler la fonction fillTable lors du chargement de la page
  fillTable();
});

var sortOrder = 1; // 1 pour identifier que c'est du plus petit au plus grand

function sortTable(columnIndex) {
  data.sort(function(a, b) {
    var x = a[Object.keys(a)[columnIndex]];
    var y = b[Object.keys(b)[columnIndex]];

    // Vérifie si les valeurs de la table sont des chiffres, puis les sort si oui
    if (!isNaN(x) && !isNaN(y)) {
      return sortOrder * (x - y);
    }

    return sortOrder * x.localeCompare(y);
  });

  // Permet de toggle de ascending à descending
  sortOrder *= -1;

  updateTable();
}