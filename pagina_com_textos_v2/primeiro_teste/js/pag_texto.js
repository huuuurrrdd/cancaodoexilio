
/**************** Página do texto selecionado!! *****************/

/*coisas a fazer:
-> Display de título e textp (1º) - feitooo!!!
-> Cada palavra deve ter um link para a página das palavras - feito
    - COMOOO???
    - tentar primeiro com os lemas! Guardar cada palavra como id (nao esta a alterar para token!!)
-> Guardar versao lematizada da palavra como id (ainda n esta a acontecer)

A fazer:
-> Remocao de pontuacao na query

COISAS INTERESSANTES A ACRESCENTAR:
- Destaque na palavra que foi pesquisada nos próprios textos!!

*/

console.clear;

//funcao para obter o id do url
function getQueryParam(param){
    let urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(param) // return id
}


//obtém id de url
let textId = getQueryParam("id")

console.log(textId) // funciona!!

/*
    json e ficheiros que está a utilizar:
    -> "./Dict_palavras_lemas_v0004.json": um dicionário de palavras (info: palavra, id, frequência, id_textos + frequência por cada texto)
    -> "./Dict_lemas_palavras_v0001.json": um dicionário de lemas (info: lema, palavra)
    -> "./textos_coordenadas_geograficas.json": lista de todos os textos (info: titulo, id, data, autor, texto completo, lemas) - podiam tbm ter os tokens??
    -> "./stopwords/portuguese": lista de stopwords (para não incluir o seu link nos textos!!)
*/

function fetchData(){
    let wordData, textData, stoplist, lemmasData

    //dicionario json
    fetch("./Dict_palavras_lemas_v0004.json")
        .then(response => {
            if(!response.ok){ // menssagem de erro
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json() // return data
        })
        .then(data => {
            wordData = data; //Guarda dict_pal em wordData
            return fetch("./t2_textos_loc_fauna_flora.json") // fetch json dos textos
        })
        .then(response => { // mensagem de erro
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json() // return data
        })
        .then(data => {
            textData = data // info dos textos a conter as coordenadas geográficas
            return fetch("./Dict_lemas_palavras_v0002.json")
        })
        .then(response => {
                if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json() // return data
        })
        .then(data => {
            lemmasData = data; // guarda json dos lemas
            return fetch("./stopwords/portuguese")
        })
        .then(response =>{
            if(!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.text() // return stopwords text
        })
        .then(data => {
            stoplist = data
            .split('\n')
            .map(s_word => s_word.trim())
            .filter(s_word => s_word.length > 0)

            //funcao com os 3 dados dos 3 ficheiros
            displayData(wordData, textData, stoplist, lemmasData)
        })
        .catch(error => console.error('Failed to fetch data', error))


}

fetchData()

//let id_word = 1120 -1 // possivel testar com outros ids
let id_word = 1930 -1

function displayData(wordData, textData, stoplist, lemmasData){ // parece funcionar



    //console.log(stoplist)

    /********** DISPLAY TEXTO ***********/
    let texto_conteiner = document.createElement("div") //------- Contentor de texto geral (inclui categorias)
    document.querySelector("body").appendChild(texto_conteiner)
    texto_conteiner.className += "texto-container"

    let titulo_texto = document.createElement("h1")    //-------- Título do texto!!
    document.querySelector(".texto-container").appendChild(titulo_texto)
    titulo_texto.className += "titulo"
    titulo_texto.innerHTML = `${textData[textId-1].title} <br> <br>`

    let texto_conteudo = document.createElement("div")  //------- Contentor de texto + autor e data
    document.querySelector(".texto-container").appendChild(texto_conteudo)
    texto_conteudo.className += "texto-conteudo"

    let texto_completo = document.createElement("div")  //------- Texto completo!!
    document.querySelector(".texto-conteudo").appendChild(texto_completo)
    texto_completo.className += "texto-completo"
    //texto_completo.innerText = textData[textId-1].texto_completo //funcionaa!!
    //texto_completo.innerText = textData[textId-1].lemmas

    let autor_data = document.createElement("div")    //-------- Nome de autor e data
    document.querySelector(".texto-conteudo").appendChild(autor_data)
    autor_data.className += "autor-data"
    autor_data.innerHTML = `${textData[textId-1].author}, ${textData[textId-1].date_of_publication}<br>`

    // let teste_com_lemas = document.createElement("div")//------ Teste com lemas (conteúdo não exibido)
    // document.querySelector("body").appendChild(teste_com_lemas)
    // teste_com_lemas.className += "teste-com-lemas"


    /********** Display CATEGORIAS PALAVARS ***********/

    let categorias_container = document.createElement("div") //-------- Contantor categorias
    document.querySelector(".texto-container").appendChild(categorias_container)
    categorias_container.className += "categorias-palavras categorias-palavras-ct"

    let locais_ct = document.createElement("div") //-------- Contantores categoria (locais, fauna e flora)
    document.querySelector(".categorias-palavras-ct").appendChild(locais_ct)
    locais_ct.className += "categoria-palavra locais-ct"

    let fauna_ct = document.createElement("div")
    document.querySelector(".categorias-palavras-ct").appendChild(fauna_ct)
    fauna_ct.className += "categoria-palavra fauna-ct"

    let flora_ct = document.createElement("div")
    document.querySelector(".categorias-palavras-ct").appendChild(flora_ct)
    flora_ct.className += "categoria-palavra flora-ct"

    let locais_h = document.createElement("h2") //-------- Título categoria
    document.querySelector(".locais-ct").appendChild(locais_h)
    locais_h.className += "locais-h categoria-h"

    let fauna_h = document.createElement("h2") 
    document.querySelector(".fauna-ct").appendChild(fauna_h)
    fauna_h.className += "fauna-h categoria-h"

    let flora_h = document.createElement("h2") 
    document.querySelector(".flora-ct").appendChild(flora_h)
    flora_h.className += "flora-h categoria-h"

    let locais_conteudo = document.createElement("div") //-------- conteúdo categoria
    document.querySelector(".locais-ct").appendChild(locais_conteudo)
    locais_conteudo.className += "locais-conteudo categoria-conteudo"

    let fauna_conteudo = document.createElement("div") 
    document.querySelector(".fauna-ct").appendChild(fauna_conteudo)
    fauna_conteudo.className += "fauna-conteudo categoria-conteudo"

    let flora_conteudo = document.createElement("div") 
    document.querySelector(".flora-ct").appendChild(flora_conteudo)
    flora_conteudo.className += "flora-conteudo categoria-conteudo"


    // //tentando fazer split das palavras (os numeros t2,t3... corresponde ao n do passo)
    let t = textData[textId-1].texto_completo // string para texto
    // LEMAS ANTIGOS
    let l = textData[textId-1].lemmas // string para lemas (a colocar no link)

    // LEMAS ANTIGOS
    l2 = removePont(l) // (remove pontuacao) é um array tem de ser um a um

    let t2Br = nToBr(t) // tansforma \n em <br>
    let l3Br = nToBr(l2) 

    let t3Html = stringHtml(t2Br, stoplist, wordData) // cria a sting de html (com os links das palavas e removendo as stopwords)
    let l4Html = stringHtml(l3Br, stoplist, wordData) 

    let t4Join = joinString(t3Html) // junta todas as stings (o array passa a 1 string)
    let l5Join = joinString(l4Html)

    
    //let l5 = removePont(l4Join)





    texto_completo.innerHTML = t4Join // acrescenta ao html o resultado final

    // //Display de input pesquisa:
    // pesquisa_livre()

    //teste_com_lemas.innerHTML = `<br> <br> <br> Versão lematizada: <br><br> ${l5Join} ` // n esta a funcionar n sei pq


    console.log(`Length t3: ${t3Html.length}`)
    //console.log(`Length l3 ${l4.length}`) //funcionou
    
    //console.log(l4)


    console.log("Listaaa:::" + stoplist)


}

function nToBr(string){// converter n em br -------- Conversão de espaços
    let nstring = string.match(/\S+|\r?\n/g)
    //console.log (`teste 1: ${nstring}`) //funciona!!

    let convertedn = nstring.map(item =>
        item === "\n"
        ? "<br>"
        : item
    )

    //console.log(`Teste 2: ${convertedn}`) //funciona

        /*  Explicação:
        - item =>   (o mesmo que: "function(item) {...}")
        - item ===  "\n" (comparacao dos elementos)
        - ? "<br>"  (se sim, "<br>")
        - : item    (se não, item como estava antes)
    */
return convertedn

}


// Neste adiciona link a tudo o que não é stopword
function stringHtml(converted, stoplist, wordData) { // retorna a string em formato html, mantendo quebras e links

    const palavrasLista = wordData.palavras.map(obj => obj.palavra.toLowerCase()) // pedir para explicar melhor este 
    

    let nstring = converted.map(item =>
        item === "<br>"
            ? "<br>"
            : stoplist.includes(item.toLowerCase())
                ? item
                : palavrasLista.includes(item.toLowerCase().replace(/[^\p{L}\p{N}]/gu, ""))
                    ? `<a class="palavra" href = "./lista_palavras.html?palavra=${item.replace(/[^\p{L}\p{N}]/gu, "")}">${item.replace(/[^\p{L}\p{N}]/gu, "")}</a>${item.replace(/[\p{L}\p{N}_]/gu, "")}` // aqui queria definir 2 items de strings diferentes
                    : item

        /* PROBLEMAS:
            - Falta remover a pontuação (na verificação e link) e colocar como item no texto (FEITOO!!)
            - 2 versões do "item"
                -> Com pontuação
                    - [\p{L}\p{N}_] is Unicode-aware:
                        -> \p{L} = all letters (including accents)
                        -> \p{N} = all numbers
                        -> Add u flag to treat input as Unicode

                -> Sem pontuação:
                    - [^\p{L}\p{N}] → Negated class: remove everything that is not a Letter or Number

                ---> Falta definir uma string para pontuação antes do texto e pontuação depois do textoo!! <---

        */

    )

    console.log("palavrasLista:", palavrasLista.slice(0, 10)); // check the first 10
    console.log("nstring:", nstring.slice(0, 10)); // check output
    
    for(let i = 0; i< nstring.length; i++){
        console.log(nstring[i])
    }
    
    return nstring
}


//funcao para juntar tudo e fazer display
function joinString(string){
    let final = string.join(' ')
    return final
}




//funcao para pontuacao
 function removePont(string){
    const punct = /[\.,?!"]/g
    let novoTexto = []

    for(let i = 0; i < string.length; i++){
        novoTexto[i] = string[i].replace(punct, "")
    }

    
    let final = novoTexto.join('')
    console.log(`Sem pobntuacao: ${final}`)
    

    return final

 }





   