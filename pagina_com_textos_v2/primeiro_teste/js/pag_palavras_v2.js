

// leitura de ficheiros json: https://www.geeksforgeeks.org/read-json-file-using-javascript/

/*___________________PAG_palavra______________________*/

/*Coisas que faz (até agora):
    -> Possibilidade de clicar no texto e ir para a página de texto
    -> Enviar informacao sobre id do texto para fazer display desse texto

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
    -> "./Dict_lemas_palavras_v0002.json": dicionáro de lemas (info: lema, palavras)
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
            return fetch("./Dict_lemas_palavras_v0002.json")
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

    






    //___PERCORRE O DICT PALAVRAS PARA ENCONTRAR PALAVRA__//

    //com a palavra selecionada, descobrir o id
    let idpalavra = null
    //wordParam = "Pinheiro"
    console.log(`Palavra: ${wordParam}`)


    for (let i = 0; i < wordData.palavras.length; i++){
        const dictWord = wordData.palavras[i].palavra
        const queryWord = wordParam.toLowerCase()
        
        if(dictWord === queryWord){ 
            idpalavra = wordData.palavras[i-1].id //n percebo o i-1
            break; // quebra o ciclo assim que encontra
        }
    } // isto deve funcionar... o problema deve ser a ler os textos

   if(idpalavra != null){
    console.log("id = " + idpalavra)
   } else {
    console.log("Palavra não encontrada")
    document.querySelector("body").innerHTML = "Palavra Nula"
   }
    

    id_word = idpalavra

/* Testes de funcionamento palavras_lemas e textos
    // testando acesso a dados (console.log)
    // palavra com id= 500; dispor: palavra,frequência e array de textos
    console.log("O objeto: " + wordData.palavras[id_word]) // funciona
    console.log("O ID palavra: " + wordData.palavras[id_word].id) //id palavra
    console.log("A palavra: " + wordData.palavras[id_word].palavra) //palavra
    console.log("Frequencia: " + wordData.palavras[id_word].frequencia) //frequência
    //sobre textos
    console.log("Array de textos: " + wordData.palavras[id_word].textos[1].id_text) //array de textos (posso ter de ver quantos objetos tem antes)
    console.log("Aceder primeiro texto: " + wordData.palavras[id_word].textos[0].id_text)// primeioro texto
    console.log("Quantidade de textos: " + wordData.palavras[id_word].textos.length) // quantidade de textos


    //1º: poema com id = 500, titulo, data de publicacao e autor
    console.log("")
    console.log("Acedendo a json dos textos:")
    console.log("Id do texto: " + wordData.palavras[id_word].textos[1].id_text + " Freq: " + wordData.palavras[id_word].textos[0].frequencia) //título do primeiro texto com a palavra
    // id de texto + título
    console.log(`Título de texto ${textData[(wordData.palavras[id_word].textos[0].id_text)-1].id} : ` + textData[wordData.palavras[id_word].textos[0].id_text-1].title + " Freq:" + wordData.palavras[id_word].textos[0].frequencia) // funciona!!

    //display de todos os textos que contêm a palavra
    for(let i = 0; i < wordData.palavras[id_word].textos.length; i++){
        console.log(`Título (${textData[wordData.palavras[id_word].textos[i].id_text-1].id}): ${textData[wordData.palavras[id_word].textos[i].id_text-1].title} Freq: ${wordData.palavras[id_word].textos[i].frequencia}`)
    }
*/
    //tudo funciona!!

// Testes de funcionamento lemas_palavras
   console.log(`Lema: ${lemmasData.lemas[10].lema}`) // acesso ao lema
   console.log(`Palavras: ${lemmasData.lemas[10].palavras}`) // acesso as palavras


   // em vez de ser a id word é wordParam
//acesso ao lema através de uma palavra
 //lema = "sem lema"

// console.log(`Lema = ${lema}`)
// console.log(`palavra = ${wordParam}`) //isto está correto
// console.log(`Exemplo de palavra: ${lemmasData.lemas[400].palavras[0]}`)
// console.log(`Testando: ${lemmasData.lemas.length}`)
// console.log(`Testando: ${lemmasData.lemas[1].palavras.length}`)

// console.log(`Testando: ${lemmasData.lemas[1].palavras[20]}`)
//console.log(`Testando: ${lemmasData.lemas[1].palavras.length}`)


//____________________________________________________________________//
/////////////  Testando a extrair mais do que um lema  /////////////////

let lemmas = [] // podia tbm guardar o número do i
let indice_lemas = []
//wordParam = "tributo"

   for (let i = 0; i < lemmasData.lemas.length; i++){
        for(let j = 0; j < lemmasData.lemas[i].palavras.length; j++){ // percorre todas as palavras em cada objeto
            if(lemmasData.lemas[i].palavras[j] === wordParam.toLowerCase()){ 
                lemmas.push(lemmasData.lemas[i].lema)
                indice_lemas.push(i)
                break
            }
        }
        if(lemmas > 0) break
   }

   if(lemmas.length == 0){
    lemmas[0] = "sem lemas"
   }
console.log(`Lema = ${lemmas}`) // funcionaa!!
console.log(`Indices = ${indice_lemas}`) // funciona!!
//console.log(`WordParam: ${wordParam}`) // por alguma razão n funciona em cima

/* Alguns problemas que podem estar a acontecer aqui:
   -> várias palavras iguais estão associadas a lemas diferentes
   -> Nota: foi criada uma nova versão para incluir palavras com acentuação!!!


*/


/***************** Display dos elementos *******************/

    // /*********** Display palavra **************/
    let word_container = document.createElement("div")
    document.querySelector("body").appendChild(word_container)
    word_container.className += "word-container"

    let word_h = document.createElement("h1")
    document.querySelector(".word-container").appendChild(word_h)
    word_h.className += "word-h"
    word_h.innerText = `Palavra: ${wordData.palavras[id_word].palavra}` // funciona!!

   // /*********** Display gráfico de frequencias **************/----------- FALTA!!
   // (ver qual a melhor biblioteca para isso!!) 



    // /************** Display textos *************/
    let list_container = document.createElement("div")
    document.querySelector(".word-container").appendChild(list_container)
    list_container.className += "list-container"

    item_ordenar = []
    ordem_frequência = []

        /* Criando uma header (em nova div no topo!!)*/
        
            let tentry_header = document.createElement("div")
            document.querySelector(".list-container").appendChild(tentry_header)
            tentry_header.className += "tentry tentry-header"

            tentry_header.innerHTML = `<div class = "iteracao header">ord</div>
                                       <div class = "titul header">Título</div>
                                       <div class = "ano header">Data publicação</div>
                                       <div class = "author header">Autor</div>
                                       <div class = "freq header">frequência</div>`
        
     
        
        

// Teste de redirecionar info com apenas javaScript
/////////////////////////////////// Vai ser necessário reordenar os items!! ///////////////////////////
    
function ordenarTextos(id_word, wordData, textData, sortBy = "frequência", dir = "desc"){


for(let i = 0; i < wordData.palavras[id_word].textos.length; i++) {

        let container = document.querySelector(".list-container")
        container.innerHTML = "" // limpa conteúdo anterior

        

       
        /* Para link em cada caixa aaaa
            let a_tentry_container = document.createElement("a")
            document.querySelector(".list-container").appendChild(a_tentry_container)
            a_tentry_container.className += "titulo "
        
        */

        let tentry_container = document.createElement("div")
        document.querySelector(".list-container").appendChild(tentry_container)
        tentry_container.className += "tentry tentry-container tentry-container" + (i + 1)

        //criando elemento a para link

        //id funciona!!
        id_do_texto = textData[wordData.palavras[id_word].textos[i].id_text-1].id //id do texto
        titul = textData[wordData.palavras[id_word].textos[i].id_text-1].title
        data_pub = textData[wordData.palavras[id_word].textos[i].id_text-1].date_of_publication
        autor = textData[wordData.palavras[id_word].textos[i].id_text-1].author
        freq1 = wordData.palavras[id_word].textos[i].frequencia

        
        //guardar array de strings (organizar as frequencias - dicionário-> freq com string)
        //tentry_container.innerHTML = `<a class="titulo" href = "./index.html?id=${id_do_texto}">${titul} (${data_pub}) — ${autor} (${freq1}x)</a>`
        //tentry_container.innerHTML = `Título (${textData[wordData.palavras[id_word].texts[i]-1].id}): ${textData[wordData.palavras[id_word].texts[i]-1].title}`
        

        /************* Colocando o conteúdo em divs ***************/
        
            tentry_container.innerHTML = `
                                          <div class = "iteracao">${i+1}</div>
                                          <div class = "titul"><a class = "titulo" href = "./index.html?id=${id_do_texto}"> ${titul}</a></div>
                                          <div class = "ano">${data_pub}</div>
                                          <div class = "author">${autor}</div>
                                          <div class = "freq">${freq1}x</div> 
                                          `
        
            
    }

}










    // display de lemas
    let lemmas_container = document.createElement("div")
    document.querySelector("body").appendChild(lemmas_container)
    lemmas_container.className += "lemmas-container"

    let lemmas_h = document.createElement("h2")
    lemmas_container.appendChild(lemmas_h)
    lemmas_h.className += "lemmas-h"
    lemmas_h.innerText = `Lemas de ${wordData.palavras[id_word].palavra}`


    /************** Para os lemas: *************************/ 
    for(let i = 0; i < lemmas.length; i++){ // acesso a cada um dos lemas no array
        
        // let lem_ct = document.createElement("div") // contentor de cada lema
        // lemmas_container.appendChild(lem_ct)
        // lem_ct.className += "lem-ct" + (i + 1)

        // let lem_h = document.createElement("h3")
        // document.querySelector(`.lem-ct${i+1}`).appendChild(lem_h)
        // lem_h.className += `lem-h${i+1}`
        // //lem_h.innerHTML = `${lemmas[i]}`

        //indice_lemas- índice de cada lemai

        console.log(lemmasData.lemas[indice_lemas[i]].palavras.length)
        //resultados para encontro: 12 (encntrar) e 1 (encontro)



        // contentor para cada lema:
        let lem_ct = document.createElement("div")
        document.querySelector(".lemmas-container").appendChild(lem_ct)
        lem_ct.className += `lem-ct`

        // guarda h3 no seu contentor:
        let lem_h = document.createElement("h3")
        lem_ct.appendChild(lem_h)
        lem_h.innerText = `${lemmas[i]}`

        
        for(let j = 0; j < lemmasData.lemas[indice_lemas[i]].palavras.length; j++){

            let p_palavras = document.createElement("li")
            lem_ct.appendChild(p_palavras)
            

            // cria contentor (ordenado para colocar lista de poemas)
            let txt_pal_textos = document.createElement("div")
            lem_ct.appendChild(txt_pal_textos)
            txt_pal_textos.className += "s-list-container"

            //criar aqui header se necessário!

            let id_palavra_de_lema = null

            for(let k = 0; k < wordData.palavras.length; k++){
                const dictWord = wordData.palavras[k].palavra
                const original_word = lemmasData.lemas[indice_lemas[i]].palavras[j]

                if(dictWord === original_word){
                    id_palavra_de_lema = wordData.palavras[k-1].id
                    break
                }

            }

            n_results = wordData.palavras[id_palavra_de_lema].textos.length

            p_palavras.innerHTML = `<b>${lemmasData.lemas[indice_lemas[i]].palavras[j]} (${n_results})</b>`

            if(id_palavra_de_lema != null){
                console.log(`id = ${id_palavra_de_lema}`)
                //escreve a paravra no contentor, mas a do dicionário
                 //tá ok

                //escrever nº dos textos
                for(l = 0; l < wordData.palavras[id_palavra_de_lema].textos.length; l++){

                    let p_palavras_poemas = document.createElement("div")
                    txt_pal_textos.appendChild(p_palavras_poemas)
                    p_palavras_poemas.className += "s-list-container"

                    
                    //p_palavras_poemas.innerText = `${wordData.palavras[id_palavra_de_lema].textos[l].id_text}`

                    

                    text_id_value = wordData.palavras[id_palavra_de_lema].textos[l].id_text
                    titl = textData[text_id_value-1].title //id-1, uma vez que a iteração começa em 0 e id começa em 1
                    data_publ = textData[text_id_value-1].date_of_publication
                    autoor = textData[text_id_value-1].author
                    frequencia = wordData.palavras[id_palavra_de_lema].textos[l].frequencia
                    
                    //p_palavras_poemas.innerHTML = `<a class="titulo" href = "./index.html?id=${text_id_value}">${titl} (${data_publ}) — ${autoor} (${frequencia}x)</a>` //falta a frequência e o ano + colocar numa tabela

                    
                    
                    p_palavras_poemas.innerHTML = `
                                                    <div class = "s-iteracao">${l+1}</div>
                                                    <div class = "s-titul">${titl}</div>
                                                    <div class = "s-ano">${data_publ}</div>
                                                    <div class = "s-author">${autoor}</div>
                                                    <div class = "s-freq">${frequencia}</div>
                                                `
                    
                    
                    



                }

                /* Falta acrescentar:
                    -> Links para página dos textos
                    -> Links para os poemas associados
                    -> Possibilidade de esconder os poemas associados
                    -> Tabela css (fazer wireframes em figma - ter tbm o design !!)

                    NOTA: Se a palavra do lema for a representada, não precisa eibir os textos ou
                        - Escrever: outras palavras com o mesmo lema??
                        - Não incluir a palavra se for igual à inicialmente representada
                
                
                    - Vou ter de compreender bem o que ando a fazer!! (a parte de baixo não está bem!!)
                */



            } else{
                console.log("Palavra não encontrada")
                

            }


        }


    }




}


//função para normalizar o texto (n sei se é mesmo necessário!!!)
// talvez apenas remover a pontuação...
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

