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
const selectButtons = document.querySelectorAll(".select-button");
const options = document.querySelectorAll(".option");

selectButtons.forEach(function(selectButton) {
  selectButton.addEventListener("click", (e) => {
      e.preventDefault();
      const selectGroup = e.target.closest('.select-group');
      const dropdown = selectGroup.querySelector('.dropdown');
      const arrow = selectGroup.querySelector('.arrow');
      toggleArrows(arrow);      
      toggleHidden(dropdown);
    });
});

function toggleArrows(e) {
  if (e.className == "arrow arrow--down") {
    e.className = "arrow arrow--up";
  } else {
    e.className = "arrow arrow--down";
  }
}

function toggleHidden(e) {
  e.classList.toggle("hidden");
}


options.forEach(function(option) {
  option.addEventListener("click", (e) => {
      setSelectTitle(e);
    });
});

function setSelectTitle(e) {
	const labelElement = document.querySelector(`label[for="${e.target.id}"]`).innerText;
  const selectGroup = e.target.closest('.select-group');
  const dropdown = e.target.closest('.dropdown');
  const selectLabel = selectGroup.querySelector('.select-label');
  selectLabel.classList.remove('select-label--placeholder');
	selectLabel.innerText = labelElement;
  const arrow = selectGroup.querySelector('.arrow');
  toggleArrows(arrow);
	toggleHidden(dropdown);
};

let currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form...
  const x = document.getElementsByClassName("tab");
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
  const x = document.getElementsByClassName("tab");
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

function createParLabelField(label, input) {
  let p = document.createElement("p");
  p.append(label, input);
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
  // Deze functie maakt velden met bijbehorende labels aan voor Werkervaring of Opleiding/Training/Cursus
  let velden;

  if (subject === "Werk") {
    // Velden en labels maken voor Werkervaring (begindatum, einddatum, functie, werkgever, toelichting)
    // Label en veld worden binnen een paragraaf toegevoegd
    // De aangemaakte paragraaf wordt uiteindelijk als een variabele opgeslagen en doorgegeven. 

    // Begindatum werkervaring
    const inputBegindatum = document.createElement("input");
    inputBegindatum.type = "text";
    inputBegindatum.id = "begindatum" + index;
    inputBegindatum.name = inputBegindatum.id;
    inputBegindatum.placeholder = "Begindatum";

    inputBegindatum.addEventListener("focus", changeToDateType);
    inputBegindatum.addEventListener("blur", changeToTextType);

    const labelBegindatum = document.createElement("label");
    labelBegindatum.setAttribute("for", inputBegindatum.id);
    labelBegindatum.textContent = "Begindatum";
    const begindatum = createParLabelField(labelBegindatum, inputBegindatum);    
    console.log(begindatum);

    // Einddatum werkervaring
    const inputEinddatum = document.createElement("input");
    inputEinddatum.type = "text";
    inputEinddatum.id = "einddatum" + index;
    inputEinddatum.name = inputEinddatum.id;
    inputEinddatum.placeholder = "Einddatum";

    inputEinddatum.addEventListener("focus", changeToDateType);
    inputEinddatum.addEventListener("blur", changeToTextType);

    const labelEinddatum = document.createElement("label");
    labelEinddatum.setAttribute("for", inputEinddatum.id);
    labelEinddatum.textContent = "Einddatum";

    const einddatum = createParLabelField(labelEinddatum, inputEinddatum);

    // Functie werkervaring
    const inputFunctie = document.createElement("input");
    inputFunctie.type = "text";
    inputFunctie.id = "functie" + index;
    inputFunctie.name = inputFunctie.id;
    inputFunctie.placeholder = "Functie";

    const labelFunctie = document.createElement("label");
    labelFunctie.setAttribute("for", inputFunctie.id);
    labelFunctie.textContent = "Functie";

    const functie = createParLabelField(labelFunctie, inputFunctie);

    // Werkgever werkervaring
    const inputWerkgever = document.createElement("input");
    inputWerkgever.type = "text";
    inputWerkgever.id = "werkgever" + index;
    inputWerkgever.name = inputWerkgever.id;
    inputWerkgever.placeholder = "Werkgever";

    const labelWerkgever = document.createElement("label");
    labelWerkgever.setAttribute("for", inputWerkgever.id);
    labelWerkgever.textContent = "Werkgever";

    const werkgever = createParLabelField(labelWerkgever, inputWerkgever);

    // Toelichting werkervaring
    const inputToelichting = document.createElement("textarea");
    inputToelichting.id = "toelichting" + index;
    inputToelichting.name = inputToelichting.id;
    inputToelichting.placeholder = "Toelichting over uitgevoerde werkzaamheden";

    const labelToelichting = document.createElement("label");
    labelToelichting.setAttribute("for", inputToelichting.id);
    labelToelichting.textContent = "Toelichting";

    const toelichting = createParLabelField(labelToelichting, inputToelichting);

    velden = { begindatum, einddatum, functie, werkgever, toelichting };

  } else if (
    subject === "Opleiding" ||
    subject === "Cursus" ||
    subject === "Training"
  ) {
    // Velden maken voor Opleiding, Cursus of Training
    // (begindatum, einddatum, naam opleiding/cursus/training, instelling/instituut)

    // Begindatum opleiding/Cursus/Training
    const inputBegindatum = document.createElement("input");
    inputBegindatum.type = "text";
    inputBegindatum.id = "begindatum" + index;
    inputBegindatum.name = inputBegindatum.id;
    inputBegindatum.placeholder = "Begindatum";

    inputBegindatum.addEventListener("focus", changeToDateType);
    inputBegindatum.addEventListener("blur", changeToTextType);

    const labelBegindatum = document.createElement("label");
    labelBegindatum.setAttribute("for", inputBegindatum.id);
    labelBegindatum.textContent = "Begindatum";

    const begindatum = createParLabelField(labelBegindatum, inputBegindatum);

    // Einddatum opleiding/Cursus/Training
    const inputEinddatum = document.createElement("input");
    inputEinddatum.type = "text";
    inputEinddatum.id = "einddatum" + index;
    inputEinddatum.name = inputEinddatum.id;
    inputEinddatum.placeholder = "Einddatum";

    inputEinddatum.addEventListener("focus", changeToDateType);
    inputEinddatum.addEventListener("blur", changeToTextType);

    const labelEinddatum = document.createElement("label");
    labelEinddatum.setAttribute("for", inputEinddatum.id);
    labelEinddatum.textContent = "Einddatum";

    const einddatum = createParLabelField(labelEinddatum, inputEinddatum);

    // Naam opleiding/cursus/training
    const inputNaam = document.createElement("input");
    inputNaam.type = "text";
    inputNaam.id = "naam" + subject + index;
    inputNaam.name = inputNaam.id;
    inputNaam.placeholder = "Naam " + subject;

    const labelNaam = document.createElement("label");
    labelNaam.setAttribute("for", inputEinddatum.id);
    labelNaam.textContent = "Naam";

    const naam = createParLabelField(labelNaam, inputNaam);

    // Instelling opleiding/cursus/training
    const inputInst = document.createElement("input");
    inputInst.type = "text";
    inputInst.id = "inst" + subject + index;
    inputInst.name = inputInst.id;
    inputInst.placeholder = "Instelling/Instituut " + subject;

    const labelInst = document.createElement("label");
    labelInst.setAttribute("for", inputInst.id);
    labelInst.textContent = "Instelling/Instituut";

    const inst = createParLabelField(labelInst, inputInst);

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
        .appendChild(veldElement)
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
    btnVerwijderen.className = "button button--red";
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
