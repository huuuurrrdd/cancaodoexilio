
/*
    Esta página deve incluir:
    1. Pesquisa de palavras (a ser implementado)
    2. Texto original
    3. Texto eplicativo sobre o funcionamento da plataforma

*/

function fetchData(){
    let wordData, textData

    //dicionario json
    fetch("./dict3.json")
        .then(response => {
            if(!response.ok){ // menssagem de erro
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json()
        })
        .then(data => {
            wordData = data;
            return fetch("./textos_todos_v2.json") // fetch json dos textos
        })
        .then(response => { // mwensagem de erro
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json()
        })
        .then(data => {
            textData = data
            displayData(wordData, textData) //funcao com os 2 jsons
        })
        .catch(error => console.error('Failed to fetch data', error))

}

fetchData()



function displayData(wordData, textData){

/***************** Display dos elementos *******************/

    // /*********** Display titulo **************/
    let titulo_container = document.createElement("div")
    document.querySelector("body").appendChild(titulo_container)
    titulo_container.className += "titulo-container"

    let titulo = document.createElement("h1")
    document.querySelector(".titulo-container").appendChild(titulo)
    titulo.className += "titulo"
    titulo.innerHTML = "Canção do Exílio"

    // /*********** Display inputbox **************/
    let input_container = document.createElement("div")
    document.querySelector("body").appendChild(input_container)
    input_container.className += "input-container"

    let





}