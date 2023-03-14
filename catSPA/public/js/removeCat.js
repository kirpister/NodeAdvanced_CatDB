"use strict";

(function () {

    let inputField;
    let messagearea;

    document.addEventListener('DOMContentLoaded', init);

    const updateMessage = (message, type) => {
        messagearea.textContent = message;
        messagearea.setAttribute('class', type);
    }

    const clearMessage = () => {
        messagearea.textContent = '';
        messagearea.removeAttribute('class');
    }

    
    function init() {
        inputField = document.getElementById('catnumber');
        messagearea = document.getElementById("messagearea");
        document.getElementById('submit').addEventListener('click', send);
    }

    async function send() {
        clearMessage();
        const number = inputField.value;

        try {
            const options = {
                method: 'DELETE',
                mode: 'cors'
            }

            const data = await fetch(`http://localhost:4000/api/cats/${number}`, options);
            const status = await data.json();

            if(status.message) {
                updateMessage(status.message, status.type);
            }
        }
        catch(err) {
            updateMessage(err.message, 'error')
        }


    }


})();