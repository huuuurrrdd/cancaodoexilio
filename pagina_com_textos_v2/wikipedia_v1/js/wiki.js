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
    2. Read through the API's documentation and understand what needs to be included in the params of the request,
    create a generic params object
    3. Register event listners, fetch the data per the usaers input
    4. Output results to the UI (sucess and error)
    5. Adjust Ui states acordingly

    **Recursos**
    api: https://www.mediawiki.org/wiki/API; https://www.mediawiki.org/wiki/API:Action_API
    media wiki (en): https://en.wikipedia.org/w/api.php 


*/



///////////////////////////////////////////////////////

// 1. Extract all selectors, create helper functions /////////////
const submitButton = document.querySelector("#submit")
const input = document.querySelector('#input')
const errorSpan = document.querySelector('#error')
const resultsContainer = document.querySelector('#results')

const endpoint = 'https://en.wikipedia.org/w/api.php?'
const params = {
    origin: '*', // non auhteticated requests
    format: 'json',
    action: 'query',
    prop: 'extracts',
    exchars: 250,
    exintro: true,
    explaintext: true,
    generator: 'search',
    gsrlimit: 1

}
const disableUi = () => {
    input.disabled = true;
    submitButton.disabled = true;
};

const enableUi = () => {
    input.disabled = false;
    submitButton.disabled = false;
};


const clearPreviousResults = () => {
    resultsContainer.innerHTML = ''
    errorSpan.innerHTML = ''
}


const isInputEmpty = input => {
    if(!input || input === '') return true
    return false
}

const showError = error => {
    errorSpan.innerHTML = `🚨 ${error} 🚨`
}


const showResults = results => {
    results.forEach(result => {
        resultsContainer.innerHTML += `
        <div class = "results__item"> 
            <a href = "https://en.wikipedia.org/?curid=${result.pageId}" target="_blank" class= "card animated bounceInUp">
                <h2 class = "results__item__title">${result.title}</h2>
                <p class = "results__item__intro">${result.intro}</p>
            </a>
        </div>
        `
    })
}

//aqui
const gatherData = pages => {
    const results = Object.values (pages).map(page => ({
        pageId: page.pageid,
        title: page.title,
        intro: page.extract
    }))

    showResults(results)
}


// async + await fazem uma espera para processar os pedidos de http? (vêm sempre juntas)
// vai, junta os resultados e não faças mais nada enquanto não os obtiveres
const getData = async() => {
    const userInput = input.value
    if(isInputEmpty(userInput)) return // isto é return nada??

    params.gsrsearch = userInput
    clearPreviousResults()
    disableUi() // a ideia é que enquanto está a fazer a pesquisa, os utilizadores não façam mais pedidos

   

   try {
    // data em vez de response (vai direto ao topico)
    const {data} = await axios.get(endpoint,{params}) // a definicao dos parametros é um objeto

    if(data.error) throw new Error(data.error.info)
    //resultsContainer.innerHTML = data
    gatherData(data.query.pages)
   } catch (error) {
    showError(error)
   } finally {
    enableUi();
   }
}

const handleKeyEvent = e => {
    if (e.key === 'Enter') {
        getData()
    }
}

const registerEventHandlers = () => {
    input.addEventListener('keydown', handleKeyEvent)
    submitButton.addEventListener('click', getData)
}

registerEventHandlers()