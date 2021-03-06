/*
Group 8 - Assignment 3
Authors:
 - Jianxuan Li
 - Krupa Suhagiya
*/

// create pruchased items
function genItem(name, price){
    // the product item
    const dom = `<li class="item">${name}<span class="price">$${price}</span></li>`;
    document.getElementById("products").innerHTML += dom;
}

// show price
function price(name){
    const prices = {
        "Airpods": 200,
        "iPhone": 600,
        "Macbook": 2000,
        "iWatch": 500,
    }

    return prices[name];
}

// get HST
function hst(subtotal){
    return subtotal * 0.13;
}

// show info in receipt
function displayInfo(name, value){
    const dom = document.getElementById(`info-${name}`);
    dom !== null && (dom.innerHTML = value);
}

// show the subtotal and hst and grade total
function displayPrice(subtotal){

    const hst = Math.round(parseFloat(subtotal) * 0.13).toFixed(2); // tax
    const total = Math.round(parseFloat(hst) + parseFloat(subtotal)).toFixed(2); // grand total
    
    displayInfo("subtotal", `$${subtotal}`);
    displayInfo("hst", `$${hst}`);
    displayInfo("total", `$${total}`);
}

// call this function on page loaded to load receipt data from URL params
function initReceipt(){
    const urlParams = new URLSearchParams(window.location.search);

    let data = {}
    let subtotal = 0;

    urlParams.forEach(function(p,name){
        data[name] = p;

        // if the param is for products, we append it into the items list
        // if no, display into the payment info
        if (/products\[\d+\]/i.test(name)){
            genItem(p, price(p));
            subtotal += price(p);
        }else{
            displayInfo(name, p);
        }
    });

    displayPrice(subtotal);

    return data;
}

initReceipt();
