
/**************** Página do texto selecionado!! *****************/

/*coisas a fazer:
-> Display de título e textp (1º) - feitooo!!!
-> Cada palavra deve ter um link para a página das palavras - feito
    - COMOOO???
    - tentar primeiro com os lemas! Guardar cada palavra como id (nao esta a alterar para token!!)
-> Guardar versao lematizada da palavra como id (ainda n esta a acontecer)

A fazer:
-> Remocao de pontuacao na query

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
    -> "./dict3.json": um dicionário de palavras (info: palavra, id, frequência, textos onde está presente)
    -> "./textos_coordenadas_geograficas.json": lista de todos os textos (info: titulo, id, data, autor, texto completo, lemas) - podiam tbm ter os tokens??
    -> "./stopwords/portuguese": lista de stopwords (para não incluir o seu link nos textos!!)
*/

function fetchData(){
    let wordData, textData, stoplist

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
            return fetch("./stopwords/portuguese")
        })
        .then(response =>{
            if(!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.text()
        })
        .then(data => {
            stoplist = data
            .split('\n')
            .map(s_word => s_word.trim())
            .filter(s_word => s_word.length > 0)

            //funcao com os 3 dados dos 3 ficheiros
            displayData(wordData, textData, stoplist)
        })
        .catch(error => console.error('Failed to fetch data', error))



}

fetchData()

//let id_word = 1120 -1 // possivel testar com outros ids
let id_word = 1930 -1

function displayData(wordData, textData, stoplist){ // parece funcionar



    //console.log(stoplist)

    /********** Display texto ***********/
    let texto_conteiner = document.createElement("div")
    document.querySelector("body").appendChild(texto_conteiner)
    texto_conteiner.className += "texto-container"

    let titulo_texto = document.createElement("h1")
    document.querySelector(".texto-container").appendChild(titulo_texto)
    titulo_texto.className += "titulo"
    titulo_texto.innerHTML = `${textData[textId-1].title} <br> <br>`


    let texto_completo = document.createElement("div")
    document.querySelector(".texto-container").appendChild(texto_completo)
    texto_completo.className += "texto-completo"
    //texto_completo.innerText = textData[textId-1].texto_completo //funcionaa!!
    //texto_completo.innerText = textData[textId-1].lemmas

    let autor_data = document.createElement("div")
    document.querySelector(".texto-container").appendChild(autor_data)
    autor_data.className += "autor-data"
    autor_data.innerHTML = `${textData[textId-1].author}, ${textData[textId-1].date_of_publication}<br>`

    let teste_com_lemas = document.createElement("div")
    document.querySelector("body").appendChild(teste_com_lemas)
    teste_com_lemas.className += "teste-com-lemas"





    // //tentando fazer split das palavras (os numeros t2,t3... corresponde ao n do passo)
    let t = textData[textId-1].texto_completo // string para texto
    let l = textData[textId-1].lemmas // string para lemas (a colocar no link)

    l2 = removePont(l) // (remove pontuacao) é um array tem de ser um a um

    let t2Br = nToBr(t) // tansforma \n em <br>
    let l3Br = nToBr(l2) 

    let t3Html = stringHtml(t2Br, stoplist) // cria a sting de html (com os links das palavas e removendo as stopwords)
    let l4Html = stringHtml(l3Br, stoplist) 

    let t4Join = joinString(t3Html) // junta todas as stings (o array passa a 1 string)
    let l5Join = joinString(l4Html)

    
    //let l5 = removePont(l4Join)





    texto_completo.innerHTML = t4Join // acrescenta ao html o resultado final

    //Display de input pesquisa:
    pesquisa_livre()

    //teste_com_lemas.innerHTML = `<br> <br> <br> Versão lematizada: <br><br> ${l5Join} ` // n esta a funcionar n sei pq


    console.log(`Length t3: ${t3Html.length}`)
    console.log(`Length l3 ${l4.length}`) //funcionou
    
    //console.log(l4)


    console.log("Listaaa:::" + stoplist)


}

function nToBr(string){// converter n em br
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


function stringHtml(converted, stoplist) { // retorna a string em formato html, mantendo quebras e links

    let nstring = converted.map(item =>
        item === "<br>"
            ? "<br>"
            : stoplist.includes(item.toLowerCase())
                ? item
                : `<a class="palavra" href = "./lista_palavras.html?palavra=${item}">${item}</a>` // aqui queria definir 2 items de strings diferentes

    )
    
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


//para a ferramenta de pesquisa (uma função separada)
/*
    Para hoje:
    1º - Atualizar o calendário
    2º - Fazer o input de pesquisa funcional com o minimo possível     


    Coisas necessáias:
    1º- obter valor do input
    2º- simplificar o valor (lematizar e colocar em letras minusculas)



*/


function pesquisa_livre(){

    //desenhar o html
    /******** Caixa para o texto ********/
    let pl_ct = document.createElement("div")
    document.querySelector("body").appendChild(pl_ct)
    pl_ct.className += "pl-ct"
    
    /******** Form para pesquisa ********/ 
    let form = document.createElement("form")
    pl_ct.appendChild(form)
   

    /********** Input search ***********///está funcionall
    let input_search = document.createElement("input")
    form.appendChild(input_search)
    input_search.type = "text"
    input_search.placeholder = "pesquisa por palavra"
    input_search.name = "palavra" //importante!!

    /********* Button submit **************/ 
    let bt_search = document.createElement("input")
    form.appendChild(bt_search)
    bt_search.type = "submit"
    //bt_search.innerHTML = "🔎"
    bt_search.value = "🔎"

    form.addEventListener("submit", (e) => {
        e.preventDefault() // impde envio do formulario e controla o redirecionamento

        const palavra = input_search.value.trim() //remove espaços desnecessários ou outros
        

        if(palavra.length > 0) {
            //redirecionando url
            window.location.href = `./lista_palavras.html?palavra=${encodeURIComponent(palavra)}`// Encodes characters such as ?,=,/,&,:
        }
    })

    
}

   