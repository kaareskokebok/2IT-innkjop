function calculateTotalPrices() {
    const rows = document.querySelectorAll('table tr');
    let grandTotal = 0;
    let forbrukTotal = 0;
    rows.forEach(row => {
        // Bruker :nth-child for å velge cellene
        if (row.children.length < 6){
            return;
        }
        const unitPriceElement = row.querySelector('td:nth-child(4)');
        const quantityElement = row.querySelector('td:nth-child(5)');
        const totalPriceElement = row.querySelector('td:last-child');

        if (unitPriceElement && quantityElement && totalPriceElement) {
            const unitPrice = parseInt(unitPriceElement.textContent, 10);
            const quantity = parseInt(quantityElement.textContent, 10);
            const totalPrice = unitPrice * quantity;

            totalPriceElement.textContent = `${totalPrice}`; // Oppdaterer tekstinnholdet med totalprisen
            grandTotal += totalPrice;
        }
    });

    let radnr = 1;

    rows.forEach((row, index) => {
        // Sjekker om raden er før raden med "Sum forbruk"
        if (!row.innerHTML.includes('Sum forbruk') && radnr < 9) {
            // Henter verdien i den siste cellen
            const lastCellText = row.cells[row.cells.length - 1].textContent;
            const value = parseFloat(lastCellText) || 0; // Konverterer teksten til et tall, eller 0 hvis det ikke er et tall
            forbrukTotal += value; // Legger til verdien til total summen
            radnr++;
        }
        else{
            return;
        }
    });

    // Finner cellen hvor total summen skal vises og setter teksten til summen
    const sumForbrukCell = document.getElementById('sumForbruk');
    sumForbrukCell.textContent = forbrukTotal; // Viser summen formatert til to desimaler
    
    // Investering
    let totalInvest = 0;
    
    // Velger alle celler med klassen 'invest'
    const investCells = document.querySelectorAll('td.invest');
    
    investCells.forEach(cell => {
        // Henter beløpet fra cellen
        const amount = cell.textContent;
        // Konverterer beløpet til et tall og legger det til totalSum, hvis det er et gyldig tall
        totalInvest += parseFloat(amount) || 0;
    });
    
    // Oppdaterer cellen med id='sumInvestering' med totalSum
    const sumInvesteringElement = document.getElementById('sumInvestering');
    if (sumInvesteringElement) {
        sumInvesteringElement.textContent = totalInvest; // Formatterer totalSum som et tall med to desimaler
    }

    let totalServer = 0;
    const serverCells = document.querySelectorAll('td.server');
    serverCells.forEach(cell => {
        const amount = cell.textContent;
        totalServer += parseFloat(amount) || 0;
    })
    const sumServerElement = document.getElementById('sumServer');
    sumServerElement.textContent = totalServer;

    // Oppretter en ny rad for å vise den totale summen
    const table = document.querySelector('table');
    const totalRow = table.insertRow(-1); // Setter inn en ny rad på slutten av tabellen

    // Setter inn celler i den nye raden
    const cell1 = totalRow.insertCell(0);
    const cell2 = totalRow.insertCell(1);
    

    cell1.colSpan = "5"; // Får den første cellen til å spenne over 5 kolonner
    cell1.textContent = "Totalt";
    cell1.style.textAlign = "right";
    cell1.style.fontWeight = "bold";

    cell2.textContent = `${totalInvest+totalServer+forbrukTotal}`; // Setter inn den totale summen i den siste cellen
    cell2.style.textAlign = "right";
    cell2.style.fontWeight = "bold";
}

// Kaller funksjonen når vinduet lastes
window.onload = calculateTotalPrices;