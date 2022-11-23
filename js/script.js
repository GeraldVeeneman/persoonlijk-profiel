"use strict";
// Initialisatie variabelen tbv het toevoegen en verwijderen van rijen met velden
// voor Werkervaring, Opleiding, Training en Cursussen.
let indexWerk = 0; // Teller voor werkervaringen
let aantalWerk = 0; // Aantal toegevoegde werkervaringen

// Maximum aantal rijen per onderwerp
const maxWerk = 5;
const maxOpleiding = 5;
const maxTraining = 3;
const maxCursus = 3;

// Elementen voor dropdown velden
const button = document.querySelector("#button");
const select = document.querySelector("#dropdown");
const options = document.querySelectorAll(".option");
const selectLabel = document.querySelector("#select-label");

button.addEventListener("click", function (e) {
  e.preventDefault();
  toggleHidden();
});

function toggleHidden() {
  select.classList.toggle("hidden");
}

options.forEach(function(option) {
  option.addEventListener("click", function (e) {
    setSelectTitle(e);
  });
});

function setSelectTitle(e) {
	const labelElement = document.querySelector(`label[for="${e.target.id}"]`).innerText;
	selectLabel.innerText = labelElement;
	toggleHidden();
};


var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

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
  if (n == x.length - 1) {
    document.getElementById("nextBtn").textContent = "Verzenden";
  } else {
    document.getElementById("nextBtn").textContent = "Volgende";
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n);
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
  var x,
    y,
    i,
    valid = true;
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
  var i,
    x = document.getElementsByClassName("step");
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
    const day = str.substring(8, 10);
    const month = str.substring(5, 7);
    const year = str.substring(0, 4);
    const dateString = day + "-" + month + "-" + year;
    this.value = dateString;
  }
}

function verwijderenRij() {
  // Deze functie verwijdert een rij uit werkervaring, opleiding, training of cursus
  this.parentElement.remove();
}

function makenVelden(subject, index) {
  // Deze functie maakt velden (oftewel DOM elementen) aan voor Werkervaring of Opleiding/Training/Cursus
  let velden;

  if (subject === "Werk") {
    // Velden maken voor Werkervaring (begindatum, einddatum, functie, werkgever, toelichting)
    const begindatum = document.createElement("input");
    begindatum.type = "text";
    begindatum.id = "begindatum" + index;
    begindatum.name = begindatum.id;
    begindatum.placeholder = "Begindatum";

    const einddatum = document.createElement("input");
    einddatum.type = "text";
    einddatum.id = "einddatum" + index;
    einddatum.name = einddatum.id;
    einddatum.placeholder = "Einddatum";

    const functie = document.createElement("input");
    functie.type = "text";
    functie.id = "functie" + index;
    functie.name = functie.id;
    functie.placeholder = "Functie";

    const werkgever = document.createElement("input");
    werkgever.type = "text";
    werkgever.id = "werkgever" + index;
    werkgever.name = werkgever.id;
    werkgever.placeholder = "Werkgever";

    const toelichting = document.createElement("textarea");
    toelichting.id = "toelichting" + index;
    toelichting.name = toelichting.id;
    toelichting.placeholder = "Toelichting over uitgevoerde werkzaamheden";

    velden = { begindatum, einddatum, functie, werkgever, toelichting };

  } else if (
    subject === "Opleiding" ||
    subject === "Cursus" ||
    subject === "Training"
  ) {
    // Velden maken voor Opleiding, Cursus of Training
    // (begindatum, einddatum, naam opleiding/cursus/training, instelling/instituut)
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

    velden = { begindatum, einddatum, naam, inst };  
  }

  return velden;
}

function toevoegenRij(subject) {
  // Bepaal divResult en aantal (reeds aanwezige) rijen per onderwerp
  const divResult = document.querySelector("#div" + subject + "Result");
  let aantal = divResult.childElementCount;
  let index = aantal + 1;
  let max;

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
    // Div maken die als parent div dient voor de velden per rij
    let divRij = document.createElement("div");
    divRij.id = "div" + subject + index;

    // Div per rij binnen result div plaatsen
    divResult.appendChild(divRij);

    const velden = makenVelden(subject, index);

    let veldElementen = Object.values(velden);

    veldElementen.forEach((veldElement) =>
      document
        .getElementById("div" + subject + index)
        .appendChild(createParField(veldElement))
    );

    // Datumvelden converteren van datum naar tekst en visa versa
    velden.begindatum.addEventListener("focus", changeToDateType);
    velden.begindatum.addEventListener("blur", changeToTextType);
    velden.einddatum.addEventListener("focus", changeToDateType);
    velden.einddatum.addEventListener("blur", changeToTextType);

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

    // Scroll naar de nieuwe rij
    divRij.scrollIntoView({ behavior: "smooth" });
  } else {
    // Melding tonen van maximum aantal rijen, die reeds zijn toegevoegd
    alert("Je hebt reeds het maximum aantal (" + max + ") toegestane rijen voor " + subject + " toegevoegd.");
  }
}
