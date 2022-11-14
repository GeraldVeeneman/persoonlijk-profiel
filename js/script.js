// Initialisatie variabelen tbv het toevoegen en verwijderen van rijen met velden
// voor Werkervaring, Opleiding, Training en Cursussen.
let indexWerk = 0;    // Teller voor werkervaringen
let aantalWerk = 0;   // Aantal toegevoegde werkervaringen

// Maximum aantal rijen per onderwerp
let maxWerk = 5
let maxOpleiding = 5;
let maxTraining = 3;
let maxCursus = 3;

var currentTab = 0;   // Current tab is set to be the first tab (0)
showTab(currentTab);  // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  //... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").textContent = "Verzenden";
  } else {
    document.getElementById("nextBtn").textContent = "Volgende";
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  //if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab >= x.length) {
    // ... the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}

function createParField(input) {
  let p = document.createElement("p");
  p.append(input);
  return p;
}

function changeToDateType() {
  const str = this.value;
  console.log(str);
  console.log(str.length);
  if (str.length == 10) { 
    // Converteer datestring naar datumformaat yyyy-mm-dd
    const day = str.substring(0, 2);
    const month = str.substring(3, 5);
    const year = str.substring(6, 10);
    const dateString = year + "-" + month + "-" + day;
    console.log(dateString);
    this.value = dateString;
    
  }
  // Verander het huidige veld in een datumveld
  this.type = "date";
}

function changeToTextType() {
  // Verander het huidige veld in een tekstveld
  
  this.type = "text";
  // Converteer datumstring naar dd-mm-jjjj formaat
  const str = this.value;
  if (str.length == 10) {
    const day = str.substring(8,10);
    const month = str.substring(5,7);
    const year = str.substring(0,4);
    const dateString = day + '-' + month + '-' + year;
    this.value = dateString;
  }
}

function verwijderenWerk() {
  // Deze functie verwijdert een werkervaring
  this.parentElement.remove();
  aantalWerk--;
}

function verwijderenRij() {
  // Deze functie verwijdert een rij uit werkervaring, opleiding, training of cursus
  // en vermindert het aantal (rijen) met 1  
  this.parentElement.remove();
}

function toevoegenWerk() {
  if (aantalWerk < maxWerk) {
    // Maximaal 5 werkervaringen kunnen worden toegevoegd.
    // Velden maken (begindatum, einddatum, functie, werkgever, toelichting)
    const werkBegindatum = document.createElement("input");
    werkBegindatum.type = "text";
    werkBegindatum.id = "werkBegindatum" + indexWerk;
    werkBegindatum.name = werkBegindatum.id;
    werkBegindatum.placeholder = "Begindatum";

    const werkEinddatum = document.createElement("input");
    werkEinddatum.type = "text";
    werkEinddatum.id = "werkEinddatum" + indexWerk;
    werkEinddatum.name = werkEinddatum.id;
    werkEinddatum.placeholder = "Einddatum";

    const werkFunctie = document.createElement("input");
    werkFunctie.type = "text";
    werkFunctie.id = "werkFunctie" + indexWerk;
    werkFunctie.name = werkFunctie.id;
    werkFunctie.placeholder = "Functie";

    const werkWerkgever = document.createElement("input");
    werkWerkgever.type = "text";
    werkWerkgever.id = "werkWerkgever" + indexWerk;
    werkWerkgever.name = werkWerkgever.id;
    werkWerkgever.placeholder = "Werkgever";

    const werkToelichting = document.createElement("textarea");
    werkToelichting.id = "werkToelichting" + indexWerk;
    werkToelichting.name = werkToelichting.id;
    werkToelichting.placeholder = "Toelichting over uitgevoerde werkzaamheden";

    let divRij = document.createElement("div"); // Div per werkervaring
    divRij.id = "divWerk" + indexWerk;

    let divResult = document.querySelector("#divWerkResult"); // Div voor het resultaat

    // Paragrafen + velden binnen result div plaatsen
    divResult.appendChild(divRij);
    document.getElementById("divWerk" + indexWerk).appendChild(createParField(werkBegindatum));
    document.getElementById("divWerk" + indexWerk).appendChild(createParField(werkEinddatum));
    document.getElementById("divWerk" + indexWerk).appendChild(createParField(werkFunctie));
    document.getElementById("divWerk" + indexWerk).appendChild(createParField(werkWerkgever));
    document.getElementById("divWerk" + indexWerk).appendChild(createParField(werkToelichting));

    // Button toevoegen werkervaring
    const btnToevoegenWerk = document.createElement("button");
    btnToevoegenWerk.type = "button";
    btnToevoegenWerk.textContent = "+";
    btnToevoegenWerk.id = "btnToevoegenWerk" + indexWerk;
    btnToevoegenWerk.title = "Werkervaring toevoegen";
    document.getElementById("divWerk" + indexWerk).appendChild(btnToevoegenWerk);
    btnToevoegenWerk.addEventListener("click", toevoegenWerk);

    // Button verwijderen werkervaring
    const btnVerwijderenWerk = document.createElement("button");
    btnVerwijderenWerk.type = "button";
    btnVerwijderenWerk.textContent = "x";
    btnVerwijderenWerk.id = "btnVerwijderenWerk" + indexWerk;
    btnVerwijderenWerk.title = "Werkervaring verwijderen";
    document.getElementById("divWerk" + indexWerk).appendChild(btnVerwijderenWerk);
    btnVerwijderenWerk.addEventListener("click", verwijderenWerk);

    werkBegindatum.addEventListener("focus", changeToDateType);
    werkBegindatum.addEventListener("blur", changeToTextType);
    werkEinddatum.addEventListener("focus", changeToDateType);
    werkEinddatum.addEventListener("blur", changeToTextType);

    // Scroll naar de nieuwe rij
    divRij.scrollIntoView({ behavior: "smooth" });

    indexWerk++;
    aantalWerk++;
  }
  else {
    // Melding tonen van maximum aantal rijen, die reeds zijn toegevoegd
    alert("Er zijn reeds " + aantalWerk + "rijen voor werkervaring(-en) toegevoegd");
  }
}

function toevoegenRij(subject) {
  // Bepaal divResult en aantal (reeds aanwezige) rijen per onderwerp
  divResult = document.querySelector("#div" + subject + "Result");
  aantal = divResult.childElementCount;
  index = aantal + 1;

  // Bepaal maximum aantal rijen per onderwerp
  if (subject === "Werk") {
    max = maxWerk; 
  } else if (subject === "Opleiding") {
    max = maxOpleiding;
  } else if (subject === "Training") {
    max = maxTraining;
  } else if (subject === "Cursus") {
    max = maxCursus;
  }

  if (aantal < max) {
    if (subject === "Werk") {
      // Maak een rij met de volgende velden voor werkervaring aan:
      // begindatum, einddatum, functie, werkgever, toelichting
      // TODO makenVeldenWerk();
    } else if (subject === "Opleiding" || subject === "Cursus" || subject === "Training") {
      // Maak een rij met de volgende velden voor Opleiding, Cursus of Training aan:
      // begindatum, einddatum, naam opleiding/cursus/training, instelling/instituut
      // TODO makenVeldenOpleiding();

      // Velden maken (begindatum, einddatum, naam opleiding/cursus/training, instelling/instituut)
      const begindatum = document.createElement("input");
      begindatum.type = "text";
      begindatum.id = subject + "Begindatum" + index;
      begindatum.name = begindatum.id;
      begindatum.placeholder = "Begindatum";

      const einddatum = document.createElement("input");
      einddatum.type = "text";
      einddatum.id = subject + "Einddatum" + index;
      einddatum.name = einddatum.id;
      einddatum.placeholder = "Einddatum";

      const naam = document.createElement("input");
      naam.type = "text";
      naam.id = "naam" + subject + index;
      naam.name = naam.id;
      naam.placeholder = "Naam " + subject;

      const inst = document.createElement("input");
      inst.type = "text";
      inst.id = "inst" + subject + index;
      inst.name = inst.id;
      inst.placeholder = "Instelling/Instituut " + subject;

      let divRij = document.createElement("div"); // Div per rij
      divRij.id = "div" + subject + index;

      // Paragrafen + velden (met label en input) binnen result div plaatsen
      divResult.appendChild(divRij);
      document
        .getElementById("div" + subject + index)
        .appendChild(createParField(begindatum));
      document
        .getElementById("div" + subject + index)
        .appendChild(createParField(einddatum));
      document
        .getElementById("div" + subject + index)
        .appendChild(createParField(naam));
      document
        .getElementById("div" + subject + index)
        .appendChild(createParField(inst));

      // Button toevoegen
      const btnToevoegen = document.createElement("button");
      btnToevoegen.type = "button";
      btnToevoegen.textContent = "+";
      btnToevoegen.id = "btnToevoegen" + subject + index;
      btnToevoegen.title = subject + " toevoegen";
      document
        .getElementById("div" + subject + index)
        .appendChild(btnToevoegen);
      btnToevoegen.addEventListener("click", () => {
        toevoegenRij(subject);
      });

      // Button verwijderen
      const btnVerwijderen = document.createElement("button");
      btnVerwijderen.type = "button";
      btnVerwijderen.textContent = "x";
      btnVerwijderen.id = "btnVerwijderen" + subject + index;
      btnVerwijderen.title = subject + " verwijderen";
      document
        .getElementById("div" + subject + index)
        .appendChild(btnVerwijderen);
      btnVerwijderen.addEventListener("click", verwijderenRij);

      begindatum.addEventListener("focus", changeToDateType);
      begindatum.addEventListener("blur", changeToTextType);
      einddatum.addEventListener("focus", changeToDateType);
      einddatum.addEventListener("blur", changeToTextType);
      
      // Scroll naar de nieuwe rij
      divRij.scrollIntoView({ behavior: "smooth" });
    }
  } else {
    // Melding tonen van maximum aantal rijen, die reeds zijn toegevoegd
    alert("Je hebt reeds het maximum aantal (" + max + ") toegestane rijen voor " + subject + " toegevoegd.");
  }
}
