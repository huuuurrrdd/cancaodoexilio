/*

    Script para pág específica de categorias

    Info para testar acesso a wikipédia: 
    -> https://medium.com/free-code-camp/how-to-build-wikipedias-api-search-with-ramdajs-b3c1a069d7af

*/
//*************  Buscar parametro de categoria  ****************/
function getQueryParam(param){
    let urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(param)
}

//obter nome de categoria
let categoria = getQueryParam("categoria")
let especifica = getQueryParam("especifica")

console.log(categoria) // funciona!!
console.log(especifica) // funciona!!



//*************  Acesso a dados  ****************/
// testando acesso a info wikipedia
function fetchData(){
    let wordData, textData, lemmasData, wikiData

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
            return fetch("https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=" + especifica)
        })
        .then(response =>{
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json()
        })
        .then(data =>{
            wikiData = data
            displayData(wordData, textData, lemmasData, wikiData) //funcao com os 2 jsons
        })
        .catch(error => console.error('Failed to fetch data', error))

}

fetchData()

// testar ainda nesta pagina o funcionamento de wikipédia
function displayData(wordData, textData, lemmasData, wikiData){

    let elemento_container = document.createElement("div")
    document.querySelector("body").appendChild(elemento_container)
    elemento_container.className += "elemento-container page-title elemento-container-" + especifica

    //*************  Titulo de página  ****************/
    let elemento_h = document.createElement("h1")
    document.querySelector(".elemento-container-" + especifica).appendChild(elemento_h)
    elemento_h.className += "page-title elemento-h elemento-h-" + especifica
    elemento_h.innerHTML = especifica

    //*************  Gráfico geral  ****************/
    let elemento_grafico = document.createElement("div")
    document.querySelector(".elemento-container-" + especifica).appendChild(elemento_grafico)
    elemento_grafico.className += "elemento-grafico grafico-" + especifica

    let canvas = document.createElement("canvas")
    document.querySelector(".grafico-" + especifica).appendChild(canvas)
    canvas.className += "grafico-palavras-populares"
    
    // adicionar gráfico aleatorio
    const GP = document.querySelector(".grafico-palavras-populares")

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



    //*************  Info elemento(wikipedia)  ****************/
    let elemento_info = document.createElement("div")
    elemento_container.appendChild(elemento_info)
    elemento_info.className += "elemento-info ct-info-" + especifica

    let elemento_info_h = document.createElement("h2")
    elemento_info.appendChild(elemento_info_h)
    elemento_info_h.className += "elemento-info-h info-h-" + especifica
    elemento_info_h.innerHTML = "Sobre"

    let elemento_info_conteudo = document.createElement("div")
    elemento_info.appendChild(elemento_info_conteudo)
    elemento_info_conteudo.className += "elemento-info-conteudo info-conteudo-" + especifica
    //elemento_info_conteudo.innerHTML = wikiData[3][0] // acesso a página de desambiguacao

    /*
        Numa primeira tentativa, 
        colocar todos os resultados:
        - Query (what you searched for)
        - Array of result names
        - Array of summaries
        - Array of links to results
    
    */

    // objeto com os parametros para criar o url
    const endpoint = 'https://pt.wikipedia.org/w/api.php?'
    const params = {
        origin: '*', // non auhteticated requests
        format: 'json',
        action: 'query',
        prop: 'extracts',
        //exchars: 1200,
        exintro: true,
        explaintext: true,
        exsentences: 10,
        generator: 'search',
        gsrlimit: 1

    }

    const clearPreviousResults = () => {
        elemento_info_conteudo.innerHTML = ""
    }

    const isEspecificaEmpty = especifica => {
        if(!especifica || especifica === '') return true
        return false
    }

    const showError = error => {
        elemento_info_conteudo.innerHTML += `🚨 ${error} 🚨`
    }

    // dispoe os resultados no UI
    const showResults = results => {
    results.forEach(result => {
        elemento_info_conteudo.innerHTML += `
        <div class = "results__item"> 
            <a href = "https://en.wikipedia.org/?curid=${result.pageId}" target="_blank" class= "card animated bounceInUp">
                <h2 class = "results__item__title">${result.title}</h2>
                <p class = "results__item__intro">${result.intro}</p>
            </a>
        </div>
        `
    })}

    const gatherData = pages => {
        const results = Object.values(pages).map(page =>({
            pageId: page.pageid,
            title: page.title,
            intro: page.extract
        }))

        showResults(results)
    }

    const getData = async() => {
        const palavra = especifica
        if(isEspecificaEmpty(palavra)) return

        params.gsrsearch = palavra
        clearPreviousResults()

        try {
            const { data } = await axios.get(endpoint, { params }) // data é o objeto gerado pela wikipedia API

            if(data.error) throw new Error(data.error.info)
            if (!data.query) throw new Error("Nenhum resultado encontrado.");

            gatherData(data.query.pages)

        } catch (error) {
            showError(error)
        }

    }

    getData()








    //*************  Textos que mencionam  ****************/
    let textos_mencionam = document.createElement("div")
    document.querySelector(".elemento-container-" + especifica).appendChild(textos_mencionam)
    textos_mencionam.className += "textos-mencionam textos-mencionam-" + especifica
    
    //--titulo--
    let textos_mencionam_h = document.createElement("h2")
    document.querySelector(".textos-mencionam-" + especifica).appendChild(textos_mencionam_h)
    textos_mencionam_h.className += "textos-mencionam-h textos-mencionam-h-" + especifica
    textos_mencionam_h.innerHTML = "Textos que mencionam " + especifica
    
    //--tabela--
    let list_container = document.createElement("div")
    document.querySelector(".textos-mencionam-" + especifica).appendChild(list_container)
    list_container.className += "list-container"

    //header
    let tentry_header = document.createElement("div")
    document.querySelector(".list-container").appendChild(tentry_header)
    tentry_header.className += "tentry tentry-header"

    tentry_header.innerHTML =  `  <div class = "ano header">Ano</div>
                                  <div class = "titulo header">Titulo</div>
                                  <div class = "autor header">Autor</div>`

    tentry_header.style.backgroundColor = "yellow"


    let container = document.createElement("div")
    document.querySelector(".list-container").appendChild(container)
    container.className += "container"

    //iteracao para display (embora até já possa ser possivel obter os valores reais!!)
    for(let i = 0; i < 3; i++){ //3 = n_pal_cat.length

        //cria a div principal
        let tentry = document.createElement("div")
        tentry.className += "tentry tentry-container tentry-container" + (i+1)

        //elementos do item
        tentry.innerHTML = `<div class = "ano">Ano - ${i}</div>
                             <div class = "titulo">Titulo - ${i}</div>
                             <div class = "autor">Autor - ${i}</div>`


        container.appendChild(tentry)
    }



}