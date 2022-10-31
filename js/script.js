let indexWerk = 1     // Teller voor nieuwe werkgevers
let aantalWerk = 0    // Aantal werkervaringen
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

function createParField(label, input) {
  // Deze functie maakt een nieuwe paragraaf aan en plaatst daarin een label en formulierveld
  let p = document.createElement('p');
  p.append(label, input);
  return p;
}

function verwijderenWerk() {
  // Deze functie verwijdert een werkervaring
  this.parentElement.remove();
  aantalWerk--;
}

function toevoegenWerk() {
  if (aantalWerk <=4) { // Maximaal 5 werkervaringen kunnen worden toegevoegd.
    // Velden met labels voor werkervaring maken
    const werkBegindatum = document.createElement('input');
    werkBegindatum.type = 'date'
    werkBegindatum.id = "werkBegindatum" + indexWerk;
    werkBegindatum.name = werkBegindatum.id;
    const label_werkBegindatum = document.createElement('label');
    label_werkBegindatum.setAttribute("for", werkBegindatum.id);
    label_werkBegindatum.textContent = "Van:";

    const werkEinddatum = document.createElement("input");
    werkEinddatum.type = "date";
    werkEinddatum.id = "werkEinddatum" + indexWerk;
    werkEinddatum.name = werkEinddatum.id;
    const label_werkEinddatum = document.createElement("label");
    label_werkEinddatum.setAttribute("for", werkEinddatum.id);
    label_werkEinddatum.textContent = "Tot:";
    
    const werkFunctie = document.createElement("input");
    werkFunctie.type = "text";
    werkFunctie.id = "werkFunctie" + indexWerk;
    werkFunctie.name = werkFunctie.id;
    const label_werkFunctie = document.createElement("label");
    label_werkFunctie.setAttribute("for", werkFunctie.id);
    label_werkFunctie.textContent = "Functie:";

    const werkWerkgever = document.createElement("input");
    werkWerkgever.type = "text";
    werkWerkgever.id = "werkWerkgever" + indexWerk;
    werkWerkgever.name = werkWerkgever.id;
    const label_werkWerkgever = document.createElement("label");
    label_werkWerkgever.setAttribute("for", werkWerkgever.id);
    label_werkWerkgever.textContent = "Werkgever:";

    const werkToelichting = document.createElement("textarea");
    werkToelichting.id = "werkToelichting" + indexWerk;
    werkToelichting.name = werkToelichting.id;
    const label_werkToelichting = document.createElement("label");
    label_werkToelichting.setAttribute("for", werkToelichting.id);
    label_werkToelichting.textContent = "Toelichting:";

    let divResult = document.querySelector("#divResult"); // Div voor het resultaat

    let divWerk = document.createElement('div'); // Div per werkervaring
    divWerk.id = "divWerk" + indexWerk;  

    // Paragrafen + velden (met label en input) binnen result div plaatsen
    divResult.appendChild(divWerk);
    document.getElementById("divWerk" + indexWerk).appendChild(createParField(label_werkBegindatum, werkBegindatum));
    document.getElementById("divWerk" + indexWerk).appendChild(createParField(label_werkEinddatum, werkEinddatum));
    document.getElementById("divWerk" + indexWerk).appendChild(createParField(label_werkFunctie, werkFunctie));
    document.getElementById("divWerk" + indexWerk).appendChild(createParField(label_werkWerkgever, werkWerkgever));
    document.getElementById("divWerk" + indexWerk).appendChild(createParField(label_werkToelichting, werkToelichting));

    // Button verwijderen werkervaring
    const btnVerwijderenWerk = document.createElement('button');
    btnVerwijderenWerk.type="button";
    btnVerwijderenWerk.textContent="x";
    btnVerwijderenWerk.id="btnVerwijderenWerk" + indexWerk;
    btnVerwijderenWerk.title="Werkervaring verwijderen";
    document.getElementById('divWerk' + indexWerk).appendChild(btnVerwijderenWerk);
    btnVerwijderenWerk.addEventListener('click', verwijderenWerk);
    
    indexWerk++;
    aantalWerk++;
  }
  else {
    document.getElementById('btnVerwijderenWerkgever').disabled = true;
  }
}