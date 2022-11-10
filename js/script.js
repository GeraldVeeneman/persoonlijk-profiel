let indexWerk = indexOpleiding = indexTraining = indexCursus = 1;       // Teller voor werkervaringen, opleidingen, trainingen en curussen
let aantalWerk = aantalOpleiding = aantalTraining = aantalCursus = 0;   // Aantal toegevoegde werkervaringen, opleidingen, trainingen en cursussen
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

function toevoegenWerk() {
  if (aantalWerk < 5) {
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

    let divWerk = document.createElement("div"); // Div per werkervaring
    divWerk.id = "divWerk" + indexWerk;

    let divResult = document.querySelector("#divWerkResult"); // Div voor het resultaat

    let p = document.createElement("p");

    // Paragrafen + velden binnen result div plaatsen
    divResult.appendChild(divWerk);
    document.getElementById("divWerk" + indexWerk).appendChild(createParField(werkBegindatum));
    document.getElementById("divWerk" + indexWerk).appendChild(createParField(werkEinddatum));
    document.getElementById("divWerk" + indexWerk).appendChild(createParField(werkFunctie));
    document.getElementById("divWerk" + indexWerk).appendChild(createParField(werkWerkgever));
    document.getElementById("divWerk" + indexWerk).appendChild(createParField(werkToelichting));

    // Button toevoegen werkervaring
    const btnToevoegenWerk2 = document.createElement("button");
    btnToevoegenWerk2.type = "button";
    btnToevoegenWerk2.textContent = "+";
    btnToevoegenWerk2.id = "btnToevoegenWerk" + indexWerk;
    btnToevoegenWerk2.title = "Werkervaring toevoegen";
    document.getElementById("divWerk" + indexWerk).appendChild(btnToevoegenWerk2);
    btnToevoegenWerk2.addEventListener("click", toevoegenWerk);

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
    divWerk.scrollIntoView({ behavior: "smooth" });

    indexWerk++;
    aantalWerk++;
  }
  else {
    document.getElementById('btnVerwijderenWerkgever').disabled = true;
  }
}

function toevoegenItem(subject, max) {
  if (eval("aantal" + subject) < max) {
    // Velden maken (begindatum, einddatum, naam opleiding/cursus/training, instelling/instituut)
    const begindatum = document.createElement("input");
    begindatum.type = "date";
    begindatum.id = subject + "Begindatum" + eval("index" + subject);
    begindatum.name = subject + "Begindatum".id;
    const labelBegindatum = document.createElement("label");
    labelBegindatum.setAttribute("for", begindatum.id);
    labelBegindatum.textContent = "Van:";

    const einddatum = document.createElement("input");
    einddatum.type = "date";
    einddatum.id = subject + "Einddatum" + eval("index" + subject);
    einddatum.name = subject + "Einddatum".id;
    const labelEinddatum = document.createElement("label");
    labelEinddatum.setAttribute("for", einddatum.id);
    labelEinddatum.textContent = "Tot:";

    const naam = document.createElement("input");
    naam.type = "text";
    naam.id = "naam" + subject + indexWerk;
    naam.name = naam.id;
    naam.placeholder = "Naam " + subject;

    const inst = document.createElement("input");
    inst.type = "text";
    inst.id = "inst" + subject + eval("index" + subject);
    inst.name = inst.id;
    inst.placeholder = "Instelling/Instituut " + subject;

    let divOpleiding = document.createElement("div"); // Div per item
    divOpleiding.id = "div" + subject + eval("index" + subject);

    let divResult = document.querySelector("#divOpleidingResult"); // Div voor het resultaat

    // Paragrafen + velden (met label en input) binnen result div plaatsen
    divResult.appendChild(divOpleiding);
    document
      .getElementById("div" + subject + eval("index" + subject))
      .appendChild(createParField(begindatum));
    document
      .getElementById("div" + subject + eval("index" + subject))
      .appendChild(createParField(einddatum));
    document
      .getElementById("div" + subject + eval("index" + subject))
      .appendChild(createParField(naam));
    document
      .getElementById("div" + subject + eval("index" + subject))
      .appendChild(createParField(inst));

    // Button verwijderen opleiding
    const btnVerwijderenOpleiding = document.createElement("button");
    btnVerwijderenOpleiding.type = "button";
    btnVerwijderenOpleiding.textContent = "x";
    btnVerwijderenOpleiding.id = "btnVerwijderenOpleiding" + indexOpleiding;
    btnVerwijderenOpleiding.title = "Opleiding verwijderen";
    document
      .getElementById("divOpleiding" + indexWerk)
      .appendChild(btnVerwijderenOpleiding);
    btnVerwijderenOpleiding.addEventListener("click", verwijderenOpleiding);

    indexOpleiding++;
    aantalOpleiding++;
  } else {
    document.getElementById("btnVerwijderenOpleiding").disabled = true;
  }
}