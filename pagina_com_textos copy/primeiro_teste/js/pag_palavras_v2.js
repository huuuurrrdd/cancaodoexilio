

// leitura de ficheiros json: https://www.geeksforgeeks.org/read-json-file-using-javascript/

/*___________________PAG_palavra______________________*/

/*Coisas que faz (até agora):
    -> Possibilidade de clicar no texto e ir para a página de texto
    -> Enviar informacao sobre id do texto para fazer display desse texto

*/

/* Que preciso fazer:
    -> retirar a pontuacao da informacao que é enviada para a query

*/

/* à parte:
    -> Associar as palavras dos lemas ao id correspondente no dicionário? (pode não ser necessário criar novo json para isso)
        - (percorrer cada palavra dos lemas e procurar no dicionário uma palavra igual)


*/

console.clear()

//let id_word = 1120 -1 // possivel testar com outros ids
let id_word = 1930 -1

//funcao para obter palavra do url
function getQueryParam(param){
    //procura o nome selecionado na barra de pesquisa
    let urlParams = new URLSearchParams (window.location.search)
    return urlParams.get(param)
}

// define o parametro a pesquisar (neste caso = ?palavra=)
let wordParam = getQueryParam("palavra") 

console.log(`Palavra é -${wordParam}-`)


//decidir o parametro


/*
    json e ficheiros que está a utilizar:
    -> "./Dict_palavras_lemas_v0004.json": um dicionário de palavras (info: palavra, lema, frequência, id texto e respetiva frequencia)
    -> "./Dict_lemas_palavras_v0001.json": dicionáro de lemas (info: lema, palavras)
    -> "./textos_coordenadas_geograficas.json": lista de todos os textos (info: titulo, id, data, autor, texto completo, lemas) - podiam tbm ter os tokens??

*/


function fetchData(){
    let wordData, textData, lemmasData

    //dicionario json
    fetch("./Dict_palavras_lemas_v0004.json")
        .then(response => {
            if(!response.ok){ // menssagem de erro
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json()
        })
        .then(data =>{
            wordData = data;
            return fetch("./Dict_lemas_palavras_v0001.json")
        })
        .then(response => {
            if(!response.ok){ // menssagem de erro
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json()
        })
        .then(data => {
            lemmasData = data;
            return fetch("./textos_coordenadas_geograficas.json") // fetch json dos textos
        })
        .then(response => { // mwensagem de erro
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json()
        })
        .then(data => {
            textData = data
            displayData(wordData, textData, lemmasData) //funcao com os 2 jsons
        })
        .catch(error => console.error('Failed to fetch data', error))

}

fetchData()


//antes: tentar extrair a info da pág anterior se houver!!




function displayData(wordData, textData, lemmasData){

    
    //com a palavra selecionada, descobrir o id
    let idpalavra = null
    //wordParam = "Pinheiro"
    console.log(`Palavra: ${wordParam}`)

    for (let i = 0; i < wordData.palavras.length; i++){
        const dictWord = normalizarTexto(wordData.palavras[i].palavra)
        const queryWord = normalizarTexto(wordParam)
        
        if(dictWord === queryWord){ //palavras normalizadas
            idpalavra = wordData.palavras[i-1].id
            break; // quebra o ciclo assim que encontra
        }
    }

   if(idpalavra != null){
    console.log("id = " + idpalavra)
   } else {
    console.log("Palavra não encontrada")
    document.querySelector("body").innerHTML = "Palavra Nula"
   }
    

    id_word = idpalavra


    // testando acesso a dados (console.log)
    // palavra com id= 500; dispor: palavra,frequência e array de textos
    console.log("O objeto: " + wordData.palavras[id_word]) // funciona
    console.log("O ID palavra: " + wordData.palavras[id_word].id) //id palavra
    console.log("A palavra: " + wordData.palavras[id_word].palavra) //palavra
    console.log("Frequencia: " + wordData.palavras[id_word].frequencia) //frequência
    //sobre textos
    console.log("Array de textos: " + wordData.palavras[id_word].texts) //array de textos
    console.log("Aceder primeiro texto: " + wordData.palavras[id_word].textos[0].id_text)// primeioro texto
    console.log("Quantidade de textos: " + wordData.palavras[id_word].texts.length) // quantidade de textos


    //1º: poema com id = 500, titulo, data de publicacao e autor
    console.log("")
    console.log("Acedendo a json dos textos:")
    console.log("Id do texto: " + wordData.palavras[id_word].texts[0]) //título do primeiro texto com a palavra
    // id de texto + título
    console.log(`Título de texto ${textData[wordData.palavras[id_word].texts[0]-1].id} : ` + textData[wordData.palavras[id_word].texts[0]-1].title)

    //display de todos os textos que contêm a palavra
    for(let i = 0; i < wordData.palavras[id_word].texts.length; i++){
        console.log(`Título (${textData[wordData.palavras[id_word].texts[i]-1].id}): ${textData[wordData.palavras[id_word].texts[i]-1].title}`)
    }

    //tudo funciona!!


/***************** Display dos elementos *******************/

    // /*********** Display palavra **************/
    let word_container = document.createElement("div")
    document.querySelector("body").appendChild(word_container)
    word_container.className += "word-container"

    let word_h = document.createElement("h1")
    document.querySelector(".word-container").appendChild(word_h)
    word_h.className += "word-h"
    word_h.innerText = wordData.palavras[id_word].palavra

    // /************** Display textos *************/
    let list_container = document.createElement("ul")
    document.querySelector(".word-container").appendChild(list_container)
    list_container.className += "list-container"

// Teste de redirecionar info com apenas javaScript
    for(let i = 0; i < wordData.palavras[id_word].texts.length; i++) {
       
        let tentry_container = document.createElement("li")
        document.querySelector(".list-container").appendChild(tentry_container)
        tentry_container.className += "tentry-container" + (i + 1)
        //id funciona!!
        tentry_container.innerHTML = `<a class="titulo" href = "./index.html?id=${textData[wordData.palavras[id_word].texts[i]-1].id}">${textData[wordData.palavras[id_word].texts[i]-1].title} (${textData[wordData.palavras[id_word].texts[i]-1].date_of_publication})</a>`
        //tentry_container.innerHTML = `Título (${textData[wordData.palavras[id_word].texts[i]-1].id}): ${textData[wordData.palavras[id_word].texts[i]-1].title}`
        
    }



}


//função para normalizar o texto
function normalizarTexto(string){
    const punct = /[\.,?!"]/g
    let novoTexto = []

    string.normalize("NFD") // forma canónica, não percebo
    string.replace(/[\u0300-\u036f]/g, "") //remove acentos
    string.toLowerCase()

    for(let i = 0; i < string.length; i++){
        novoTexto[i] = string[i].replace(punct, "")
    }

    let final = novoTexto.join('')
    
    return final
}

