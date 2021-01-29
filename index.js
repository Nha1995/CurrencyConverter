const from = document.querySelector('.converterBlock__From');
const to = document.querySelector('.converterBlock__To');
const currencyFrom = from.querySelectorAll('.converterBlock__button');
const currencyTo = to.querySelectorAll('.converterBlock__button');
const options = document.querySelectorAll('option');
const textFrom = document.querySelector('.converterBlock__convertOneFrom');
const textTo = document.querySelector('.converterBlock__convertOneTo');
const leftInput = document.querySelector('.leftInput');
const rightInput = document.querySelector('.rightInput');
const swapButton = document.querySelector('.svg');

let currencyTrackerFrom = 'RUB';
let currencyTrackerTo = 'USD';
let courseLeftValue;
let courseRightValue;
textReduction('RUB', 'USD');

swapButton.addEventListener('click', () => {
        let randomValue = rightInput.value;
        rightInput.value = leftInput.value;
        leftInput.value = randomValue;
        let randomTracker = currencyTrackerFrom;
        currencyTrackerFrom = currencyTrackerTo;
        currencyTrackerTo = randomTracker;
        let otherText = textFrom.textContent;
        textFrom.textContent = textTo.textContent;
        textTo.textContent = otherText;
        
        let leftActive = from.querySelector('.active');
        let rightActive = to.querySelector('.active');
        if(leftActive.textContent != rightActive.textContent) {
            currencyFrom.forEach((item) => {
                if(item.textContent == rightActive.textContent) {                    
                    item.classList.add('active');
                }
                if(rightActive.tagName == 'SELECT') {
                    item.value = rightActive.value;
                }
            })
            currencyTo.forEach((item) => {
                if(item.textContent == leftActive.textContent) {                    
                    item.classList.add('active');
                }
                if(leftActive.tagName == 'SELECT') {
                    item.value = leftActive.value;
                }
            })            
            leftActive.classList.remove('active');
            rightActive.classList.remove('active');
        }
        if(leftActive.tagName ==  rightActive.tagName) {
            let activeValue = leftActive.value;
            leftActive.value = rightActive.value;
            rightActive.value = activeValue;
        }
    });

leftInput.addEventListener('input', () => {
    rightInput.value = leftInput.value * courseLeftValue.toFixed(4);
})

rightInput.addEventListener('input', () => {
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
            rightInput.value = leftInput.value.toFixed(4);
            courseLeftValue = 1;
            courseRightValue = 1; 
    } else {  

    fetch(`https://api.ratesapi.io/api/latest?base=${from}&symbols=${to}`)
        .then(response => response.json())
        .then((data) => {
            let fromValue = data.rates[`${to}`]; 
            courseLeftValue = fromValue;           
            textFrom.textContent = `1 ${from} = ${fromValue} ${to}`;
            rightInput.value = `${(leftInput.value * courseLeftValue).toFixed(4)}`;})
            .catch((error) => {
                alert('Что-то пошло не так...');
            })

         fetch(`https://api.ratesapi.io/api/latest?base=${to}&symbols=${from}`)
        .then(response => response.json())
        .then((data) => {
            let toValue = data.rates[`${from}`];    
            courseRightValue = toValue;
            textTo.textContent = `1 ${to} = ${toValue} ${from}`;
         });
        }
};