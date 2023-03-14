"use strict";

(function () {

    document.addEventListener('DOMContentLoaded', init);

    async function init() {
        try {
            const data = await fetch('http://localhost:4000/api/cats', {mode: 'cors'});
            const cats = await data.json();

            const resultset = document.getElementById('resultset');
            for (const cat of cats) {
                const tr = document.createElement('tr');
                tr.appendChild(createCell(cat.number));
                tr.appendChild(createCell(cat.name));
                tr.appendChild(createCell(cat.yearofbirth));
                tr.appendChild(createCell(cat.weight));
                tr.appendChild(createCell(cat.breed));
                resultset.appendChild(tr);
            }
            
        }
        catch(err) {
            document.getElementById('messagearea').innerHTML = `<p class="error">${err.message}</p>`;
        }
    } // END OF INIT

    const createCell = (data) => {
        const td = document.createElement('td');
        td.textContent = data;
        return td;
    }

})();