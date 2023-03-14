"use strict";

(function(){

    let numberField;
    let nameField;
    let yearofbirthField;
    let weightField;
    let breedField;
    let messagearea;
    
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        numberField = document.getElementById('number');
        nameField = document.getElementById('name');
        yearofbirthField = document.getElementById('yearofbirth');
        weightField = document.getElementById('weight');
        breedField = document.getElementById('breed');
        messagearea = document.getElementById('messagearea');
        
        document.getElementById('submit').addEventListener('click', send);

    }

    async function send(){

        clearMessage();

        const cat = {
            number: +numberField.value,
            name: nameField.value,
            yearofbirth: +yearofbirthField.value,
            weight: +weightField.value,
            breed: breedField.value
        };
        
        try {
            const options = {
                method:"POST",
                body:JSON.stringify(cat),
                headers:{
                    "Content-Type":"application/json"
                },
                mode:"cors"
            }

            const data = await fetch('http://localhost:4000/api/cats', options);
            const status = await data.json();

            if(status.message) {
                updateMessage(status.message, status.type);
            }
            
        } catch (error) {
            updateMessage(err.message, 'error');
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

  
})();