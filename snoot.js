/*
snoot.js
form validatio code for snoot.html 

Author: Joaquin Santiago Ruiz 

Date: 8/6/18
*/

"use strict";
var twentyNine = document.createDocumentFragment();
var thirty = document.createDocumentFragment();
var thirtyOne = document.createDocumentFragment();
var formValidity = true;  


//fuction to remove selcet list defaults
function removeSelectDefaults(){
    var emptyBoxes = document.getElementsByTagName("select");
   for(var i = 0; i < emptyBoxes.length; i++){
       emptyBoxes[i].selectedIndex = -1;
   }
}
 
// function to set up document fragment for days of the month 
function setUpDays(){
  var dates = document.getElementById("delivDy").getElementsByTagName("option");
  twentyNine.appendChild(dates[28].cloneNode(true));
  thirty.appendChild(dates[29].cloneNode(true));
  thirty.appendChild(dates[28].cloneNode(true));
  thirtyOne.appendChild(dates[28].cloneNode(true));
  thirtyOne.appendChild(dates[29].cloneNode(true));
  thirtyOne.appendChild(dates[30].cloneNode(true));

}

//funciton to set up the list of dys based the selected month
function updateDays(){
    var deliveryDay = document.getElementById("delivDy");
    var dates = deliveryDay.getElementsByTagName("option");
    var deliveryMonth = document.getElementById("delivMo");
    var deliveryYear = document.getElementById("delivYr");
// cover for no month selected 
    if(deliveryMonth.selecetedIndex === -1){
        return;
    }
    var selectedMonth = 
    deliveryMonth.options[deliveryMonth.selectedIndex].value;
    while(dates[28]){
        deliveryDay.removeChild(dates[28]);
    }

    if(deliveryYear.selectedIndex === -1){
        deliveryDay.selectedIndex = 0; 
    }
      // if feb and 2020twentynine
      if (selectedMonth === "2" && deliveryYear.options[deliveryYear.selectedIndex].value === "2020" ){
           deliveryDay.appendChild(twentyNine.cloneNode(true));
    }
    // else if 30 day month thirty
        else if (selectedMonth === "4" ||selectedMonth === "6" || selectedMonth === "9" || selectedMonth === "11"){
            deliveryDay.appendChild(thirty.cloneNode(true));
        }

    // else if 31 day month thirtyOne
     else if (selectedMonth === "1" ||selectedMonth === "3" || selectedMonth === "5" || selectedMonth === "7"|| selectedMonth === "8"|| selectedMonth === "10"|| selectedMonth === "12"){
        deliveryDay.appendChild(thirtyOne.cloneNode(true));
    }
}

//FUNCTION TO inspect custom check box on message change
function autoCheckCustom(){
    var messageBox = document.getElementById("customText");
    
   // textarea has message, check the box
   if (messageBox.value !== "" && messageBox.value !== messageBox.placeholder){
       document.getElementById("custom").checked = "checked";
   }

   // textare has no message, uncheck the box
   else{
       document.getElementById("custom").checked = "";
   }


}

//
function copyBillingAddress(){
    var billingInputElement = document.querySelectorAll("#billingAddress input");
    var deliveryInputElement = document.querySelectorAll("#deliveryAddress input");

    //duplicate address- checked box is checked - copy 
    if(document.getElementById("sameAddr").checked){
        for(var i = 0; i < billingInputElement.length; i++){
            deliveryInputElement[i + 1].value = 
            billingInputElement[i].value;
        }
        document.querySelector("#deliveryAddress select").value = 
        document.querySelector("#billingAddress select").value;
    }

    // duplicate adrress - checkbox not chekced - erase
    else{
        for(var i = 0; i < billingInputElement.length; i++){
            deliveryInputElement[i + 1].value = ""; 
        }
        document.querySelector("#deliveryAddress select").selecetedIndex = -1;
    }

}


function validateAddress(fieldsetId){
    var inputElement = document.querySelectorAll("#" + fieldsetId + " input");
    var errorDiv = document.querySelectorAll("#" + fieldsetId + " .errorMessage")[0];
    var fieldsetValidity = true; 
    var elementCount = inputElement.length;
    var currentElement;
    try{
        //loop through input fields looking for blanksss
        for (var i = 0; i < elementCount; i++){
            currentElement = inputElement[i]
            //blanks
            if(currentElement.value === ""){
                currentElement.style.background = "rgb(255,233,233)";
                fieldsetValidity = false;
            }
            // not blanks
            else {
                currentElement.style.border = "white";
            }
        }
        // validate selected list feild 
        currentElement = document.querySelectorAll("#" + fieldsetId + " select") ;
        if (currentElement.selecetedIndex === -1){
            currentElement.style.border = "1px solid red";
            fieldsetValidity = false;
        }
        // action for invalid field set
        if (fieldsetValidity === false){
            if(fieldsetId === "billingAddress"){
                throw" please complete all billing addres information"
            }
            else {
                throw "please complete all delivery address information "
            }
        }
        else{
            errorDiv.style.display = "none";
            errorDiv.innerHTML = "";
        }
    }
    catch (msg){
        errorDiv.style.display = "block"; 
        errorDiv.innerHTML = msg; 
        formValidity = false;
    }
}


// function to validate delivery date
function validateDeliveryDate(){
    var errorDiv = document.querySelectorAll(" #paymentInfo" + " .errorMessage")[0];
    var fieldsetValidity = true; 
    var ccNumElement = document.getElementById("ccNum");
    var selectElement = document.querySelectorAll("#paymentInfo" + "select");
    var cvvNumEle = document.getElementById("cvv");
    var cards = document.getElementById("paymentType")
    var elementCount = selectElements.length;
    var currentElement;

    try{
        //validate radio button 
        if(!cards[0].checked && !cards[2].checked && !cards[3].checked){
            for (var i =0; i < cards.length; i++){
                cards[i].style.outline = "1px solid red";
            }
            fieldsetValidity = false;
        }
        else{
            for (var i =0; i < cards.length; i++){
                cards[i].style.outline = "";
        }
        }
        // action for invalid field set
        if (fieldsetValidity === false){
            throw "please complete all payment info";
        }
        else{
            errorDiv.style.display = "none";
            errorDiv.innerHTML = "";
        }
    }
    catch(msg){
        errorDiv.style.display = "block"; 
        errorDiv.innerHTML = msg;   
        formValidity = false;
    }
}




function validatePayment(){
    var errorDiv = document.querySelectorAll(" #paymentInfo" + " .errorMessage")[0];
    var fieldsetValidity = false; 
    var ccNumElement = document.getElementById("ccNum");
    var selectElement = document.querySelectorAll("#paymentInfo" + "select");
    var elementCount = selectElements.length;
    var cvvElement = document.getElementById("cvv");
var cards = document.getElementsByName("paymentType");
    var currentElement;

    // where we left off 
    try{
        //validate radio button 
        if(!cards[0].checked && !cards[2].checked && !cards[3].checked){
            for (var i =0; i < cards.length; i++){
                cards[i].style.outline = "1px solid red";
            }
            fieldsetValidity = false;
        }
        if(ccNumElement.value === ""){
            ccNumElement.style.background = "rgb(255, 233, 233)";
        }
        else {
            ccNumElement.style.borderColor = white;
        }
        // action for invalid field set
        if (fieldsetValidity === false){
            throw "please complete all payment info";
        }
        else{
            errorDiv.style.display = "none";
            errorDiv.innerHTML = "";
        }
    }
    catch(msg){
        errorDiv.style.display = "block"; 
        errorDiv.innerHTML = msg; 
        formValidity = false;
    }
}

function validateMessage(){
    var msgBox = document.getElementById("custom");
    var ccNumElement = document.getElementById("#message");
    var selectElement = document.querySelectorAll("#message" + " .errorMessage")[0];
    var fieldsetValidity = true;


try{

       //validate checkbox and text are custom message
       if(document.getElementById("custom").checked && (msgBox.value === "" || msgBox.value === placeholder)){
           throw "please enter your custom message text." ;
       }else{
            errorDiv.style.display = "none";
            errorDiv.innerHTML = "";
            msgBox.style.background = "white";
       }
    }
    catch(msg){
        errorDiv.style.display = "block"; 
        errorDiv.innerHTML = msg; 
        messageBox.style.background = "rgb(255, 233, 233)";
        formValidity = false;
    }
}


function validateCreateAccount(){
    var msgBox = document.getElementById("customText");
    var errorDiv = document.querySelectorAll("#createAccount" + " .errorMessage")[0];
    var usernameElement = document.getElementById("username");
    var element1Element =document.getElementById("pass1");
    var element2Element =document.getElementById("pass2");
    var invColor = "rgb(255,233,233)";
    var passwordMismatch = false;
    var fieldsetValidity = true;
    usernameElement.style.background = "white";
    pass1Element.style.background = "white";
    pass2Element.style.background = "white";
    errorDiv.style.display = "none"; 
    errorDiv.innerHTML = ""; 




try{
    if(usernameElement.value !== "" && pass1Element.value !== "" && pass2Element.value !== ""){
        //one or more feilds has data
        if (pass1Element.value !== pass2Element.value){// verify password match
            fieldsetValidity = false;
            passwordMismatch = true;
            throw "password entered do not match, please re-enter. ";
        }
    }
    else if (usernameElement.value !== "" && pass1Element.value !== "" && pass2Element.value !== ""){
        fieldsetValidity = true;
        passwordMismatch = false;
    }
    else{
        fieldsetValidity = false;
        throw "please enter all field to create account"
    }
}
    catch(msg){
        errorDiv.style.display = "block"; 
        errorDiv.innerHTML = msg; 
        pass1Element.style.background = invColor;
        pass2Element.style.background = invColor;      
        formValidity = false;
        if(passwordMismatch){
            usernameElement.style.background = "white";
        }else{
            usernameElement.style.background = invcolor;
        }

    }
}

//function to vaidate entier formValidatiy
function validateForm(evt){
    if(evt.preventDefault){
        evt.preventDefault();
    }
    else{
        evt.returnValue = false;
    }
    formValidity = true;

    validateAddress("billingAddress");
    validateAddress("deliveryAddress");
    validateDeliveryDate();
    validatePayment();
    validateMessage();
    validateCreateAccount()

    //Form is valid
    if(formValidity === true){
        document.getElementById("errorText").innerHTML = "";
        document.getElementById("errorText").style.display= "none";
        document.getElementsByTagName("form")[0].submit();
    }
    else{
        document.getElementById("errorText").innerHTML = "Please fix the indicated problems and then resubmit your order";
        document.getElementById("errorText").style.display = "block";
        scroll (0,0);
    }
}


// fucntion that sets up pag eon load event 
function setUpPage(){
    removeSelectDefaults();   
    setUpDays();
    createEventListeners();

}

//function to create out event listener 
function createEventListeners(){
    var deliveryMonth = document.getElementById("delivMo");
    if (deliveryMonth.addEventListener){
        deliveryMonth.addEventListener("change", updateDays, false);
    }else if (deliveryMonth.attachEvent){
        deliveryMonth.addEventListener("onchange", updateDays);
    }
    var deliveryYear = document.getElementById("delivYr");
    if (deliveryYear.addEventListener){
        deliveryYear.addEventListener("change", updateDays, false);
    }else if (deliveryYear.attachEvent){
        deliveryYear.addEventListener("onchange", updateDays);
    }
    var messageBox = document.getElementById("customText");
    if (messageBox.addEventListener){
        messageBox.addEventListener("change", autoCheckCustom)
    }else if (messageBox.attachEvent){
        messageBox.attachEvent("onchange", autoCheckCustom);
    
   }
   var same = document.getElementById("sameAddr");
    if (same.addEventListener){
        same.addEventListener("change", copyBillingAddress, false);
    }else if (same.attachEvent){
        same.attachEvent("onchange", copyBillingAddress);
   }

   var form = document.getElementsByTagName("form")[0];
    if (form.addEventListener){
       form.addEventListener("submit", validateForm, false);
    }else if (form.attachEvent){
        form.attachEvent("onsubmit", validateForm);
    }
}   



//page load event handlers 
if (window.addEventListener){
    window.addEventListener("load", setUpPage, false);
}else if (window.attachEvent){
    window.addEventListener("onload",setUpPage);
}