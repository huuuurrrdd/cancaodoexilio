/*
    NOTA: Isto pode ser util para a parte da pesquisa de palavras do website

    Video de onde estou a copiar: https://www.youtube.com/watch?v=yqwHxAH1xrw

    Outros vídeos que eventualmente podem ajudar:
    - https://www.youtube.com/watch?v=yhbHM0Fzo-U (How to Use Wikipedia API for NLP Projects)
    - https://www.youtube.com/watch?v=RPz75gcHj18 (Coding Challenge #75: Wikipedia API)


*/

/*
    **STEPS**
    1. Extract all selectors, create helper functions




*/



///////////////////////////////////////////////////////

// 1. Extract all selectors, create helper functions /////////////
const submitButton = document.querySelector("#submit")
const input = document.querySelector('#input')
const errorSpan = document.querySelector('#error')
const resultsContainer = document.querySelector('#results')


//feedback de disable ao clicar na pesquisa
const changeUiState = (isDisabled) => {
    input.disabled = isDisabled
    submitButton.disabled = isDisabled
}

const clearPreviousResults = () => {
    resultsContainer.innerHTML = ''
    errorSpan.innerHTML = ''
}


const isInputEmpty = (input) => {
    if(!input || input === '') return true
    return false
}

const showError = (error) => {
    errorSpan.innerHTML = `!! ${error} !!`
}