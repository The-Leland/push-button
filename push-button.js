


const symbols = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const specialSymbols = [
    '⁂', '№', '§', '∞',
    '℮', 'Ω'
];

const prizeTable = {
    grand: { symbol: '⁂', amount: 1000000 },
    first: { symbol: '№', amount: 500000 },
    second: { symbol: '§', amount: 250000 },
    third: { symbol: '∞', amount: 100000 },
    fourth: { symbol: '℮', amount: 50000 },
    fifth: { symbol: 'Ω', amount: 25000 },
    win: 1000
};

const winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 6],
    [1, 3, 7],
    [2, 4, 6],
    [3, 5, 8],
    [4, 6, 8],
    [1, 4, 5],
    [2, 4, 7],
    [3, 4, 8]
];

let balance = 100;
let currentBet = 0;

function generateSlots() {
    const slot1 = randomSymbol();
    const slot2 = randomSymbol();
    const slot3 = randomSymbol();
    const slot4 = randomSymbol();
    const slot5 = randomSymbol();
    const slot6 = randomSymbol();
    const slot7 = randomSymbol();
    const slot8 = randomSymbol();
    const slot9 = randomSymbol();
    return [slot1, slot2, slot3, slot4, slot5, slot6, slot7, slot8, slot9];
}

function randomSymbol() {
    const rand = Math.random();
    if (rand < 0.1) {
        return specialSymbols[Math.floor(Math.random() * specialSymbols.length)];
    } else {
        return symbols[Math.floor(Math.random() * symbols.length)];
    }
}

function checkWin(slots) {
    let payout = 0;
    winLines.forEach(line => {
        const [a, b, c] = line;
        const symbolsInLine = [slots[a], slots[b], slots[c]];
        if (symbolsInLine.every(symbol => symbol === symbolsInLine[0])) {
            payout = prizeTable.win;
            displayFeedback(`You won on line [${line}]!`);
        }
    });
    return payout;
}

function handleSpin() {
    if (currentBet > balance) {
        displayFeedback("Not enough credits!");
        return;
    }
    balance -= currentBet;
    updateBalance();
    displayFeedback('Spinning...');
    const result = generateSlots();
    displayResult(result);
    const payout = checkWin(result);
    balance += payout;
    updateBalance();
    if (payout > 0) {
        displayFeedback(`You won ${payout} credits!`);
    } else {
        displayFeedback('No win, try again!');
    }
}

function displayResult(slots) {
    const slotResultsDiv = document.getElementById('slotResults');
    slotResultsDiv.innerHTML = 'Result:<br>';
    for (let i = 0; i < 9; i++) {
        if (i % 3 === 0) {
            slotResultsDiv.innerHTML += '<br>';
        }
        slotResultsDiv.innerHTML += `${slots[i]} `;
    }
}

function updateBalance() {
    const balanceDisplay = document.getElementById('balanceDisplay');
    balanceDisplay.innerHTML = `Balance: ${balance} Credits`;
}

function displayFeedback(message) {
    const feedbackMessageDiv = document.getElementById('feedbackMessage');
    feedbackMessageDiv.innerHTML = message;
}

document.getElementById('bet2').addEventListener('click', () => {
    currentBet = 2;
    displayFeedback('You chose to bet 2 credits.');
});

document.getElementById('bet5').addEventListener('click', () => {
    currentBet = 5;
    displayFeedback('You chose to bet 5 credits.');
});

document.getElementById('betAll').addEventListener('click', () => {
    currentBet = balance;
    displayFeedback(`You chose to bet all ${balance} credits.`);
});

document.getElementById('spinBtn').addEventListener('click', handleSpin);









