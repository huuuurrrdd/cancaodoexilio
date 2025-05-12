
/*
    Esta página deve incluir:
    1. Pesquisa de palavras (a ser implementado)
    2. Texto original
    3. Texto eplicativo sobre o funcionamento da plataforma

*/


function getQueryParam(param){
    let urlParams = new URLSearchParams (window.location.search)
    return urlParams.get(param) // devolve a palavra? 
}




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


//Não sei o que estou a fazer...
//https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/value (este n ajuda!!)
// Este pode ajudar: https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_input_type_search (mais ou menos!!)
// o melhor é ir ver ao site das galinhas

function displayData(wordData, textData){

/***************** Display dos elementos *******************/

    // /*********** Display titulo **************/
    let titulo_container = document.createElement("div") // div para titulo
    document.querySelector("body").appendChild(titulo_container)
    titulo_container.className += "titulo-container"

    let titulo = document.createElement("h1") //titulo
    document.querySelector(".titulo-container").appendChild(titulo)
    titulo.className += "titulo"
    titulo.innerHTML = "Canção do Exílio"

    // /*********** Display inputbox **************/
    let word_input_form = document.createElement("form") // div para caixa input
    document.querySelector("body").appendChild(word_input_form)
    //word_input_form.action = 'lista_palavras.html' //colocar url
    word_input_form.className += "input-container"

    let label_pesquisa_pal = document.createElement("label") // label para inut box
    document.querySelector(".input-container").appendChild(label_pesquisa_pal)
    label_pesquisa_pal.for = "word-search"
    label_pesquisa_pal.innerHTML= "Pesquisa por palavras:<br><br>"

    let input_pal = document.createElement("input") // input box
    document.querySelector(".input-container").appendChild(input_pal)
    input_pal.type = "search"
    input_pal.id = "word-search"
    input_pal.name = "q"
    input_pal.placeholder = "Palavras"

    let pre_pal = document.createElement("pre")
    document.querySelector(".input-container").appendChild(pre_pal)
    pre_pal.id = "log"

    let bt_pesquisa_pal = document.createElement("button") //bt para pesquisa
    document.querySelector(".input-container").appendChild(bt_pesquisa_pal)
    bt_pesquisa_pal.type = "submit"
    bt_pesquisa_pal.innerText = "Search"

    let feedback = document.createElement("div")
    document.querySelector("body").appendChild(feedback)
    feedback.className += "respostas"

    // let val
    
    // bt_pesquisa_pal.addEventListener(".input-container", (event) => {
    //     val = input_pal.value

    // })

    // oninput = (event) => {feedback.innerHTML += "la "}
    //     word_input_form.action = `lista_palavras.html?palavras=${val}`

    input_pal.addEventListener("keyup", () => {
        pre_pal.innerText = `Palavra: ${pre_pal.value}`
    })



}