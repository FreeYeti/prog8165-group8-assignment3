
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
}

// validation functions
function validateCardNumber(number){
    const result = /^\d{4}(-|\s)\d{4}(-|\s)\d{4}(-|\s)\d{4}$/gm.test(number);
    if (result) return true;

    feedback("cardnumber", "Please use a correct card number like: 1234-1234-1234-1234");
    return false;
}

function validatePhoneNumber(number){

}

function validatePostCode(postcode){

}

function validateExpiry(expirty){

}

// submit the form
function submit(event){

    // the form data which need to submit to next page
    const formData = new FormData();


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
    /// credit card number
    if (!validateCardNumber(formData.get("cardnumber"))){
        return event.preventDefault();
    }

    // convert formdata to a querystring, so we can pass to next page
    const queryString = new URLSearchParams(formData).toString()
    window.location.href = "receipt.html?" + queryString;
    return event.preventDefault();
}

document.getElementById("checkout-form").addEventListener('submit', submit);