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
            return fetch("./t3_textos_loc_fauna_flora.json") // fetch json dos textos
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

    /* Passos para o gráfico:
        -> Informações a obter: 
            - array com anos (já tenho)
            - array com frequencia em cada ano
        
    
    
    
    
    
    
    */


        let cate = [
        {
            categoria: "Locais",
            labels_cat: ["Pernambuco", "Bahia", "Maranhão", "Sertão", "Minas Gerais", "Corrientes"],
            labels_cat_value: [12, 19, 3, 5, 2, 3],
            mais_frequente: "Bahia",
            info_mais_frequente: "Bahia é Bahia"
        },

        {
            categoria: "Fauna",
            labels_cat: ["Sabiá", "Roxinol", "Bem-te-vi", "Pomba", "Andorinha", "Canário"],
            labels_cat_value: [20, 19, 3, 5, 2, 3],
            mais_frequente: "Sabiá",
            info_mais_frequente: "Sabiá é Sabiá"
        },

        {
            categoria: "Flora",
            labels_cat: ["Palmeira", "Loureiros", "Mangabeiras", "Coco", "Bananeira", "Violeta"],
            labels_cat_value: [21, 19, 3, 5, 2, 3],
            mais_frequente: "Palmeira",
            info_mais_frequente: "Palmeira é Palmeira"
        },

        {
            categoria: "Autores",
            labels_cat: ["Jose Maia Ferreira", "Leandro de Castilho", "Casimiro de Abreu", "M A Pinto de Sampaio", "Pedro José Teixeira", "Miguel Marques"],
            labels_cat_value: [12, 19, 3, 5, 2, 3],
            mais_frequente: "Jose Maia Ferreira",
            info_mais_frequente: "Jose Maia Ferreira é Jose Maia Ferreira"
        },

        {
            categoria: "Anos",
            labels_cat: ["2009", "2012", "2020", "2015", "2008", "2006"],
            labels_cat_value: [20, 19, 3, 5, 2, 3],
            mais_frequente: "2009",
            info_mais_frequente: "2009 é 2009"
        },

    ]

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


    // descobrir index categoria
    let index_cate 

    for(let j = 0; j < cate.length; j++){
        if(cate[j].categoria == categoria){
            index_cate = j
        }
    }

    console.log("Index categoria =" + index_cate) //funciona!!

    //iteracao para display
    for(let i = 0; i < cate[index_cate].labels_cat.length; i++){
        
        let ct_item = document.createElement("div")
        document.querySelector(".container").appendChild(ct_item)
        ct_item.className += "ct-item ct-item" + i

        // colocar o link para a proxima página na palavra
        // funcionaaa!!!!
        let link_palavra_cat = document.createElement("a")
        document.querySelector(".ct-item" + i).appendChild(link_palavra_cat)
        link_palavra_cat.className += "link-palavra-cat link-palavra-cat" + i
        link_palavra_cat.href = "./p_categoria_especifica.html?categoria=" + categoria + "&especifica=" + cate[index_cate].labels_cat[i]

        let palavra = document.createElement("div")
        document.querySelector(".link-palavra-cat" + i).appendChild(palavra)
        palavra.className += "palavra"
        palavra.innerHTML = cate[index_cate].labels_cat[i]


        let barra_frequencia = document.createElement("div")
        document.querySelector(".ct-item" + i).appendChild(barra_frequencia)
        barra_frequencia.className += "barra-frequencia"
        barra_frequencia.innerHTML = cate[index_cate].labels_cat_value[i]

    }


}