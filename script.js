const inputField = document.querySelector('.inputField');
const country1 = document.querySelector('.country1');
const country2 = document.querySelector('.country2');
const calcButton = document.querySelector('.calc');
const resultContainer = document.querySelector(('.result'));
const formulier = document.querySelector('#formulier');

function handleRequest(response){
  const responseTxt = JSON.parse(response.responseText);
  const omrekenWaarde = Object.values(responseTxt.rates)[0];
  calculate(omrekenWaarde);
}

function exchangeRate(event){
  event.preventDefault();
  if (country1.value === country2.value){
    calculate(1);
  } else {
    const request = new XMLHttpRequest();
    request.addEventListener('readystatechange', function(event){
      const response = event.target;
      if(response.readyState === 4 && response.status === 200){
        handleRequest(response);
      }
    });
    request.open('GET', 'https://api.exchangeratesapi.io/latest?base=' + country1.value + '&symbols=' + country2.value);
    request.send();
  }
}

function calculate(omrekenWaarde){
  const number = parseFloat(inputField.value) * omrekenWaarde ;
  const roundedNumber = number.toLocaleString(nl-BE,{
    style:"currency",
    currency: country2.value,
    currencyDisplay: "symbol"
  });
  resultContainer.textContent = roundedNumber;
}

calcButton.addEventListener('click', exchangeRate);