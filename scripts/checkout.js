// get product from url paramters, return array of products
function getProducts(){
    const urlParams = new URLSearchParams(window.location.search);

    let products = []
    urlParams.forEach(function(p){
        products.push(p.toString());
    }); 

    return products;
}

// give user a feedback in form
function feedback(name, msg){
    document.getElementById(`feedback-${name}`).innerHTML = msg;
    return true;
}

//// validation functions

// check cridt card number
function validateCardNumber(number){
    const result = /^\d{4}(-|\s)\d{4}(-|\s)\d{4}(-|\s)\d{4}$/gm.test(number);
    if (result) return true;

    feedback("cardnumber", "Please use a correct card number like: 1234-1234-1234-1234");
    return false;
}

// check phone number
function validatePhoneNumber(number){
    const result = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/m.test(number);
    if (result) return true;
    feedback("mobile", "Please use a correct phonenumber like: 123 123 1234");
    return false;
}

// check post code is correct
function validatePostCode(postcode){
    const result = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/g.test(postcode);
    if (result) return true;
    feedback("postcode", "Please use a correct postcode like: N2C 1Y5");
    return false;  

}

// check format of credit card exipiry date
function validateExpiry(expirty){
    const result = /\b[A-Z]{3}\/?([0-9]{4}|[0-9]{2})\b/.test(expirty);
    if (result) return true;
    feedback("expiry", "Please use a correct format like: MMM/yyyy (NOV/2011)");
    return false;  
}

// check passwords are match
function validationPassword(password, confirm){
    if(password != confirm){
        feedback("confirmpassword", "Password must be matched");
        return false;
    }
    return true;
}

// set message to none
function resetMessage(){
    const doms = document.getElementsByClassName("feedback");
    for (let index = 0; index < doms.length; index++) {
        const element = doms[index];
        element.innerHTML = "";
    }
}

// submit the form
function submit(event){
    resetMessage(); // empty the message box

    // the form data which need to submit to next page
    const formData = new FormData();

    // append products to formdata, for the finial submit
    const products = getProducts();
    for(let i = 0; i < products.length; i++){
        formData.append(`products[${i}]`, products[i]);
    }

    // collect values from form
    const inputs = document.getElementsByClassName("field");
    for (let i = 0; i < inputs.length; i++) {
        const el = inputs[i];
        formData.append(el.getAttribute('name'), el.value);
    }

    // do validation here
    let v1 = validateCardNumber(formData.get("cardnumber"))
    let v2 = validatePhoneNumber(formData.get("mobile"))
    let v3 = validatePostCode(formData.get("postcode"))
    let v4 = validateExpiry(formData.get("expiry"))
    let v5 = validationPassword(formData.get("password"), formData.get("confirmpassword"))

    // if there is an error, stop here
    let success = v1 && v2 && v3 && v4 && v5;
    if (!success) return event.preventDefault();
    
    // convert formdata to a querystring, so we can pass to next page
    const queryString = new URLSearchParams(formData).toString()
    window.location.href = "receipt.html?" + queryString;
    return event.preventDefault();
}

document.getElementById("checkout-form").addEventListener('submit', submit);