let indexWerk = 1 // Teller voor nieuwe werkgevers
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
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Verzenden";
  } else {
    document.getElementById("nextBtn").innerHTML = "Volgende";
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

function verwijderenWerk() {
  this.parentElement.remove();
}

function toevoegenWerk() {
  if (indexWerk <=5) { // Maximaal 5 werkervaringen kunnen worden toegevoegd.
    // Velden maken (input en label)
    const werkBegindatum = document.createElement('input');
    werkBegindatum.type = 'date'
    werkBegindatum.id = "werkBegindatum" + indexWerk;
    werkBegindatum.name = werkBegindatum.id;
    const label_werkBegindatum = document.createElement('label');
    label_werkBegindatum.setAttribute("for", werkBegindatum.id);
    label_werkBegindatum.innerHTML = "Van:";

    const werkEinddatum = document.createElement("input");
    werkEinddatum.type = "date";
    werkEinddatum.id = "werkEinddatum" + indexWerk;
    werkEinddatum.name = werkEinddatum.id;
    const label_werkEinddatum = document.createElement("label");
    label_werkEinddatum.setAttribute("for", werkEinddatum.id);
    label_werkEinddatum.innerHTML = "Tot:";
    
    const werkFunctie = document.createElement("input");
    werkFunctie.type = "text";
    werkFunctie.id = "werkFunctie" + indexWerk;
    werkFunctie.name = werkFunctie.id;
    const label_werkFunctie = document.createElement("label");
    label_werkFunctie.setAttribute("for", werkFunctie.id);
    label_werkFunctie.innerHTML = "Functie:";

    const werkWerkgever = document.createElement("input");
    werkWerkgever.type = "text";
    werkWerkgever.id = "werkWerkgever" + indexWerk;
    werkWerkgever.name = werkWerkgever.id;
    const label_werkWerkgever = document.createElement("label");
    label_werkWerkgever.setAttribute("for", werkWerkgever.id);
    label_werkWerkgever.innerHTML = "Werkgever:";

    const werkToelichting = document.createElement("textarea");
    werkToelichting.id = "werkToelichting" + indexWerk;
    werkToelichting.name = werkToelichting.id;
    const label_werkToelichting = document.createElement("label");
    label_werkToelichting.setAttribute("for", werkToelichting.id);
    label_werkToelichting.innerHTML = "Toelichting:";

    // Div per werkervaring
    let divWerk = document.createElement('div');
    divWerk.id = "divWerk" + indexWerk;

    // Nieuwe paragraaf (per veld) maken
    let parBegindatum = document.createElement('p');    
    parBegindatum.id="parBegindatum" + indexWerk;

    let parEinddatum = document.createElement("p");
    parEinddatum.id = "parEinddatum" + indexWerk;

    let parFunctie = document.createElement("p");
    parFunctie.id = "parFunctie" + indexWerk;

    let parWerkgever = document.createElement("p");    
    parWerkgever.id = "parWerkgever" + indexWerk;

    let parToelichting = document.createElement("p");
    parToelichting.id = "parToelichting" + indexWerk;

    // Paragrafen binnen result div plaatsen
    document.getElementById('divResult').appendChild(divWerk);
    document.getElementById("divWerk" + indexWerk).appendChild(parBegindatum);
    document.getElementById("divWerk" + indexWerk).appendChild(parEinddatum);
    document.getElementById("divWerk" + indexWerk).appendChild(parFunctie);
    document.getElementById("divWerk" + indexWerk).appendChild(parWerkgever);
    document.getElementById("divWerk" + indexWerk).appendChild(parToelichting);


    // Velden binnen paragraaf toevoegen
    document.getElementById("parBegindatum" + indexWerk).appendChild(label_werkBegindatum);
    document.getElementById("parBegindatum" + indexWerk).appendChild(werkBegindatum);
    document.getElementById("parEinddatum" + indexWerk).appendChild(label_werkEinddatum);
    document.getElementById("parEinddatum" + indexWerk).appendChild(werkEinddatum);
    document.getElementById("parFunctie" + indexWerk).appendChild(label_werkFunctie);
    document.getElementById("parFunctie" + indexWerk).appendChild(werkFunctie);
    document.getElementById("parWerkgever" + indexWerk).appendChild(label_werkWerkgever);
    document.getElementById("parWerkgever" + indexWerk).appendChild(werkWerkgever);
    document.getElementById("parToelichting" + indexWerk).appendChild(label_werkToelichting);
    document.getElementById("parToelichting" + indexWerk).appendChild(werkToelichting);

    // Button verwijderen werkervaring
    const btnVerwijderenWerk = document.createElement('button');
    btnVerwijderenWerk.type="button";
    btnVerwijderenWerk.innerHTML="&times";
    btnVerwijderenWerk.id="btnVerwijderenWerk" + indexWerk;
    btnVerwijderenWerk.title="Werkervaring verwijderen";
    document.getElementById('divWerk' + indexWerk).appendChild(btnVerwijderenWerk);
    btnVerwijderenWerk.addEventListener('click', verwijderenWerk);
    indexWerk++;
  }
  else {
    document.getElementById('btnVerwijderenWerkgever').disabled = true;
  }
}