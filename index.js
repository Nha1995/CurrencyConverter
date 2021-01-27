const from = document.querySelector('.converterBlock__From');
const to = document.querySelector('.converterBlock__To');
const currencyFrom = from.querySelectorAll('.converterBlock__button');
const currencyTo = to.querySelectorAll('.converterBlock__button');
const options = document.querySelectorAll('option');
const textFrom = document.querySelector('.converterBlock__convertOneFrom');
const textTo = document.querySelector('.converterBlock__convertOneTo');
const leftInput = document.querySelector('.leftInput');
const rightInput = document.querySelector('.rightInput');

let currencyTrackerFrom = 'RUB';
let currencyTrackerTo = 'USD';
let courseLeftValue = 1;
let courseRightValue = 0.013;

textReduction('RUB', 'USD');

leftInput.addEventListener('input', (event) => {
    rightInput.value = `${(leftInput.value * courseLeftValue).toFixed(4)}`;
})

rightInput.addEventListener('input', (event) => {
    leftInput.value = `${(rightInput.value * courseRightValue).toFixed(4)}`;
})

currencyFrom.forEach((item) => {
    item.addEventListener('click', () => {
        const oldActiveitem = from.querySelector('.active');
        if (oldActiveitem) {
            oldActiveitem.classList.remove('active');
        }
        item.classList.add("active")

        if(item.tagName == 'BUTTON') {
            currencyTrackerFrom = item.textContent;
        } else {
            currencyTrackerFrom = item.value;
        }
        textReduction(currencyTrackerFrom, currencyTrackerTo);
    })
});

currencyTo.forEach((item,) => {
    item.addEventListener('click', () => {
        const oldActiveitem = to.querySelector('.active');
        if (oldActiveitem) {
            oldActiveitem.classList.remove('active');
        }
        item.classList.add("active")

        if(item.tagName == 'BUTTON') {
            currencyTrackerTo = item.textContent;
        } else {
            currencyTrackerTo = item.value;
        }
        textReduction(currencyTrackerFrom, currencyTrackerTo);
    })
});

function textReduction(from, to) {
    if(from == to) {
        textFrom.textContent = `1 ${from} = 1 ${to}`;
        textTo.textContent = `1 ${to} = 1 ${from}`;
    } else {  

    fetch(`https://api.ratesapi.io/api/latest?base=${from}&symbols=${to}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data.rates);
            let fromValue = data.rates[`${to}`]; 
            courseLeftValue = fromValue;           
            textFrom.textContent = `1 ${from} = ${fromValue} ${to}`;
         });

         fetch(`https://api.ratesapi.io/api/latest?base=${to}&symbols=${from}`)
        .then((response) => response.json())
        .then((data) => {
            let toValue = data.rates[`${from}`];
            courseRightValue = toValue;
            textTo.textContent = `1 ${to} = ${toValue} ${from}`;
         });
        }
};
    