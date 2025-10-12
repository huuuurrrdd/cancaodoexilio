/*

    Script para pág de categoria

*/

//*************  Buscar parametro de categoria  ****************/
function getQueryParam(param){
    let urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(param)
}

//obter nome de categoria
let categoria = getQueryParam("categoria")

console.log(categoria) // funciona!!


//*************  Acesso a dados  ****************/
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
            return fetch("./t2_textos_loc_fauna_flora.json") // fetch json dos textos
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



function displayData(wordData, textData){

    let categoria_container = document.createElement("div")
    document.querySelector("body").appendChild(categoria_container)
    categoria_container.className += "categoria-container"

    let subtitulo = document.createElement("p")
    document.querySelector(".categoria-container").appendChild(subtitulo)
    subtitulo.className += "subtitulo"
    subtitulo.innerText = "Categoria de palavras:"

    //titulo (Nome de categoria)
    let categoria_palavras_h = document.createElement("h1")
    document.querySelector(".categoria-container").appendChild(categoria_palavras_h)
    categoria_palavras_h.className += "categoria-palavras-h page-title"
    categoria_palavras_h.innerText = categoria

    //grafico 
    let grafico_ct = document.createElement("div")
    document.querySelector(".categoria-container").appendChild(grafico_ct)
    grafico_ct.className += "grafico-ct"
    
    let canvas = document.createElement("canvas")
    document.querySelector(".grafico-ct").appendChild(canvas)
    canvas.className += "grafico-categoria"
    
    const GP = document.querySelector(".grafico-categoria")

    //*********** Gráfico inicial **********/
    // neste gráfico é importante poder comparar o nº de textos total com o nº que mencionam
    new Chart(GP, {
        type: "bar",
        data: {
            labels: ["A", "B", "C", "D"],
            datasets:[{
                label: `${categoria} ao longo do tempo`,
                data: [10, 20, 40, 10],
                borderWidth: 1
            }]
        },
        options:{
            scales:{
                y:{
                    beginAtZero: true
                }
            }
        }
    })

    // Lista de todos os nomes de categorias existentes 
    // (vai ser necessário colocá-los por ordem de frequencia)
    let list_all_container = document.createElement("div")
    document.querySelector(".categoria-container").appendChild(list_all_container)
    list_all_container.className += "list-all-container"

    let ct_head_list = document.createElement("div")
    document.querySelector(".list-all-container").appendChild(ct_head_list)
    ct_head_list.className += "ct-head-list"

    ct_head_list.innerHTML = `  <div class = "palavras header">Palavra</div>
                                <div class = "texto header">Textos</div>
                                <div class = "frequencia header">Freq</div>`
    
    ct_head_list.style.backgroundColor = "yellow"


    let container = document.createElement("div")
    document.querySelector(".list-all-container").appendChild(container)
    container.className += "container"


    //iteracao para display



}