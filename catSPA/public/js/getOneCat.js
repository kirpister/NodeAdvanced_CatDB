"use strict";

(function () {

    let resultarea;
    let messagearea;
    let catnumber;

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        resultarea = document.getElementById('resultarea');
        catnumber = document.getElementById('catnumber');
        messagearea = document.getElementById('messagearea');
        document.getElementById('submit').addEventListener('click', send);

    }

    const updateMessage = (message, type) => {
        messagearea.textContent = message;
        messagearea.setAttribute('class', type);
    }

    const clearMessage = () => {
        messagearea.textContent = '';
        messagearea.removeAttribute('class');
    }

    const send = async () => {
        clearMessage();
        resultarea.innerHTML = '';
        try {
            if(catnumber.value.trim().length > 0) {
                const data = await fetch(`http://localhost:4000/api/cats/${catnumber.value}`, {mode:'cors'});
                const result = await data.json();
                if (result) {
                    if (result.message) {
                        updateMessage(result.message, result.type)
                    }
                    else {
                        updateCat(result);
                    }
                }
                console.log(result);
            }
        
        }
        catch(err){
            updateMessage(`Not found ${err.message}`, 'error')

        }
    };

    const updateCat = (result) => {
        if (result.length === 0) return;
        const cat = result[0];
        resultarea.innerHTML = `<p><span class="legend">Number</span> ${cat.number} </p>
        <p><span class="legend">Name</span> ${cat.name} </p>
        <p><span class="legend">Year of Birth</span> ${cat.yearofbirth} </p>
        <p><span class="legend">Weight</span> ${cat.weight} kg</p>
        <p><span class="legend">Breed</span> ${cat.breed} </p>`

    }

})();