
// leitura de ficheiros json: https://www.geeksforgeeks.org/read-json-file-using-javascript/

/*___________________PAG_palavra______________________*/

console.clear()

//dicionariio de palavras
function fetchWordDict() {
    fetch("dict3.json")
        .then(response => {
            if(!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => displayword(data))
        .catch(error => console.error('Failed to fetch data:', error))
}
fetchWordDict(); //funciona!!!

//lista de textos
function fetchtexts() {
    fetch("textos_todos_v2.json")
        .then(response => {
            if(!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(datat => displaytexts(datat)) //funciona
        .catch(error => console.error('Failed to fetch data:', error))
}
fetchtexts(); //




let id = 500
let array_textos = []



// function displaytexts(texto, container){ // tenho de ver como fazer isto funcionar
//  container.innerText = texto[1].id
// }

function displayword(palavra) { // display de dicionario de palavras

/**************** apresentando resultados *****************/
// div para a palavra
let word_container = document.createElement("div")
document.querySelector("body").appendChild(word_container)
word_container.className += "word-container"

    //titulo dentro de word container
let word_h = document.createElement("h1")
document.querySelector(".word-container").appendChild(word_h)
word_h.className += "word-h"
word_h.innerText = palavra.palavras[id].palavra // conteúdo do json


//ul para lista de poemas (pode ser necessario colocar em tabela)
let list_container = document.createElement("ul")
document.querySelector("body").appendChild(list_container)
list_container.className += "list-container"


//teste para for loop (funciona)
for(let i = 0; i < palavra.palavras[id].texts.length; i++){
    //sub div para cada texto 
let tentry_container = document.createElement("li")
document.querySelector(".list-container").appendChild(tentry_container)
tentry_container.className += "tentry-container-" + (i+1)
tentry_container.innerText = palavra.palavras[id].texts[i]
//array_textos.push(palavra.palavras[id].texts[i])

// let info_container = document.createElement("li")
// document.querySelector(".tentry-container").appendChild(info_container)
// info_container.className += "info-texto-" + palavra.palavras[id].texts[i]

// //info_container.innerText = txtdata[1]

}





}



// display das infos dos poemas
function displaytexts(datat){
    console.log(datat.length) //funciona

    //fazer igual a cima
    let list_container = document.createElement("ul")
    document.querySelector("body").appendChild(list_container)
    list_container.className += "list-container"

    for(let i= 0; i < array_textos.length; i++){
        let tentry_container = document.createElement("li")
        document.querySelector(".list-container").appendChild(tentry_container)
        tentry_container.className += "tentry-container-" + (i+1)
        tentry_container.innerText = "lala"//datat.id[array_textos[i]].title
        //console.log(datat.id[array_textos[i]].title)
        console.log(array_textos.length) // n funciona
    }

}







// //h1 para título de lista (info principal: id e título- autor e ano tbm pode importar)
// let tentry_h = document.createElement("h1")
// document.querySelector(".tentry-container").appendChild(tentry_h)
// tentry_h.className += "tentry-h"

// //uma sub div para cada info (autor e ano)
// let author_container = document.createElement("div")
// document.querySelector(".tentry-container").appendChild(author_container);
// author_container.className += "author-container"

// let year_container = document.createElement("div")
// document.querySelector(".tentry-container").appendChild(year_container);
// year_container.className += "year-container"


//ao clicar sobre o título, abriria uma nova página







displayword()




function setList(id){

        for(let texto of data.palavras[id].texts){
            let texto_item = document.createElement("li")
            texto_item.className += "variacao " + data.palavras[id].texts[texto]
            let conteudo = document.createTextNode(data.palavras[id].texts[texto])
            texto_item.appendChild(conteudo)
            list_container.appendChild(texto_item)
        }


}

setList(id)


//enquanto tem filhos, remove o primeiro filho
function clearList(list_ct){
    while(list_ct.firstChild){
        list_ct.removeChild(list_ct.firstChild)
    }
}









// function displayword(data){
//     console.log(data.length)

// /**************** apresentando resultados *****************/
// // div para a palavra
// let word_container = document.createElement("div")
// document.querySelector("body").appendChild(word_container)
// word_container.className += "word-container"

//     //titulo dentro de word container
// let word_h = document.createElement("h1")
// document.querySelector(".word-container").appendChild(word_h)
// word_h.className += "word-h"


// //div para lista de poemas (pode ser necessario colocar em tabela)
// let list_container = document.createElement("div")
// document.querySelector("body").appendChild(list_container)
// list_container.className += "list-container"
 

//     //sub div para cada texto 
// let tentry_container = document.createElement("div")
// document.querySelector("body").appendChild(tentry_container)
// tentry_container.className += "tentry-container"

// //h1 para título de lista (info principal: id e título- autor e ano tbm pode importar)
// let tentry_h = document.createElement("h1")
// document.querySelector(".tentry-container").appendChild(tentry_h)
// tentry_h.className += "tentry-h"


// //uma sub div para cada info (autor e ano)
// let author_container = document.createElement("div")
// document.querySelector(".tentry-container").appendChild(author_container);
// author_container.className += "author-container"

// let year_container = document.createElement("div")
// document.querySelector(".tentry-container").appendChild(year_container);
// year_container.className += "year-container"


// //ao clicar sobre o título, abriria uma nova página





// }