const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
/*this is the quote display element, got from the id in the index.html*/
const quoteInputElement = document.getElementById('quoteInput')
/*this is teh quote input element, got the id from the index.html*/
const timerElement = document.getElementById('timer')

/*we need to set up an evenet listener, to check if what we're typing is correct*/
quoteInputElement.addEventListener('input', () => {
    /*every single time user types something, a console logs 'changed'*/
    /*console.log('changed')*/
    /* want we want: we want to loop over all the different chars, and compare each
    individual character to the input characters, based on their position.
    If they are the same, add the correct class, and incorrect otherwise.*/

    /*get different spans*/
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')

    /*we want it so when we type everything out correctly, auto new quote*/
    let correct = true

    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        if (character == null) {
            /*if we haven't typed character yet
            remove incorrect and remove correct class*/
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
        } else if (character === characterSpan.innerText) {
            /*if the character = the quote char,
            add correct class, remove incorrect class*/
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        } else {
            /*if the character != quote char,
            remove correct class, add incorrect class*/
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct = false
        }
    })
    if (correct) renderNewQuote()
})

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
    /*this is a fetch api that 'fetches' api*/
    .then(response => response.json())
    /*this returns a promise, that is then converted to json*/
    .then(data => data.content)
    /*we just want the "content" key from the data attribute,
    which is only the "content" part of the whole jumble of
    words n symbols in the API*/
}

/*we want to make an asynchronous function, meaning that it is 
waiting a promise*/
async function renderNewQuote() {
    const quote = await getRandomQuote()
    /*console.log(quote)*/
    /*this logs the random quote into the console*/
    quoteDisplayElement.innerHTML = ''
    /*this makes the inner text of the quote dusplay = quote*/

    /*we want to make an individual element for each character in our quote
    to track if we typed the right letter in the quote*/
    /*if we pass in an empty string, it will convert the string to an array, which each individual character
    is one element in the array. Then we can loop over the array*/
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        /*getting each individual character in the string (the constant),
        creating a span for it, and then setting
        the inner text to the span, to that individual character that was recieved*/
        /*characterSpan.classList.add('correct')*/
        /*adds a class called correct, that we can edit in the styles.css*/
        quoteDisplayElement.appendChild(characterSpan)
        /*every time we render new quote, we want to restart timer*/
        startTimer()
    })

    quoteInputElement.value = null
    /*this clears the input element every time we get a new quote*/
}

let startTime
function startTimer() {
    timerElement.innerText = 0
    /*we want to update our timer every single second
    To do so, we will be getting our current time - the start time*/
    startTime = new Date()
    /*this gets the current time*/
    setInterval(() => {
        timer.innerText = getTimerTime()
    }, 1000)
    /*def of setInterval function: every 1000 ms, we're gonna run this function*/
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000)
    /* this is always accurate using the new date - start time */
    /*dividing by 1000 gives us seconds (1000ms = 1 second)*/
}

/*calling the function*/
renderNewQuote()