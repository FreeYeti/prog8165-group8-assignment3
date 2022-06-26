document.getElementById("products-form").addEventListener("submit", function(event){
    let has = false
    for(let i = 1; i <= 4; i++){
        if(document.getElementsByName(`product[${i}]`)[0].checked){
            has = true;
            break;
        }
    }

    if(!has){
        document.getElementById("info").innerHTML = "Please select at least one product to buy";
        return event.preventDefault();
    }
});