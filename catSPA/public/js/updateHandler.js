"use strict";

(function() {

    let numberField;
    let nameField;
    let yearofbirthField;
    let weightField;
    let breedField;
    let messagearea;
    let searchState = true;

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        numberField = document.getElementById('number');
        nameField = document.getElementById('name');
        yearofbirthField = document.getElementById('yearofbirth');
        weightField = document.getElementById('weight');
        breedField = document.getElementById('breed');
        messagearea = document.getElementById('messagearea');

        updateFields();

        document.getElementById('submit').addEventListener('click', send);

        numberField.addEventListener('focus', clearAll);
    }

    async function send() {

        clearMessage();

        try {
            if (searchState) {
                if(numberField.value.trim().length > 0) {
                    const data = await fetch(`http://localhost:4000/api/cats/${numberField.value}`, {mode:'cors'});
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
            else {
                const cat = {
                    number: numberField.value,
                    name: nameField.value,
                    yearofbirth: yearofbirthField.value,
                    weight: weightField.value,
                    breed: breedField.value
                };

                const options = {
                    method: "PUT",
                    body: JSON.stringify(cat),
                    headers: {
                        "Content-Type":"application/json"
                    },
                    mode: "cors"
                }

                const data = await fetch (`http://localhost:4000/api/cats/${cat.number}`, options);
                const status = await data.json();

                if (status.message) {
                    updateMessage(status.message, status.type);
                }

                searchState = true;
                updateFields();
            }
        }
        catch(err) {
            updateMessage(err.message, 'ERROR!');
        }
    }

    const updateMessage = (message, type) => {
        messagearea.textContent = message;
        messagearea.setAttribute('class', type);
    }

    const clearMessage = () => {
        messagearea.textContent = '';
        messagearea.removeAttribute('class');
    }

    const clearAll = () => {
        if (searchState) {
            clearFieldValues();
            clearMessage();
        }
    }

    const updateFields = () => {
        if (searchState) {
            numberField.removeAttribute('readonly');
            nameField.setAttribute('readonly', true);
            yearofbirthField.setAttribute('readonly', true);
            weightField.setAttribute('readonly', true);
            breedField.setAttribute('readonly', true);
        }
        else {
            numberField.setAttribute('readonly', true);
            nameField.removeAttribute('readonly');
            yearofbirthField.removeAttribute('readonly');
            weightField.removeAttribute('readonly');
            breedField.removeAttribute('readonly');
        }
    }

    const clearFieldValues = () => {
        numberField.value = '';
        nameField.value = '';
        yearofbirthField.value = '';
        weightField.value = '';
        breedField.value = '';
        searchState = true;
        updateFields();
    }

    const updateCat = (result) => {

        if (result.length === 0) return;
        const cat = result[0];

        numberField.value = cat.number;
        nameField.value = cat.name;
        yearofbirthField.value = cat.yearofbirth;
        weightField.value = cat.weight;
        breedField.value = cat.breed;
        searchState = false;
        updateFields();
    }

    

})();