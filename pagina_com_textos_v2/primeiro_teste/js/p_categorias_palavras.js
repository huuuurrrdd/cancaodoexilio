/*

    Script para pág de categorias de palavras

*/


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


    
    //DISPLAY de elementos//

    /**********************  Contentor geral  ****************************/
    let categorias_container = document.createElement("div")
    document.querySelector("body").appendChild(categorias_container)
    categorias_container.className += "categorias-container"

    //****************  Título de página  ******************/
    let title_h = document.createElement("h1")
    document.querySelector(".categorias-container").appendChild(title_h)
    title_h.className += "categoria-palavras-h page-title"
    title_h.innerText = `Categorias de palavras`

    //****************  Seccao locais  ******************/
    let locais_section = document.createElement("div")
    document.querySelector(".categorias-container").appendChild(locais_section)
    locais_section.className += "locais-section"

    //titulo
    let locais_h = document.createElement("h2")
    document.querySelector(".locais-section").appendChild(locais_h)
    locais_h.className += "locais-header"

    //div grafico
    let grafico_locais_ct = document.createElement("div")
    document.querySelector(".locais-section").appendChild(grafico_locais_ct)
    grafico_locais_ct.className += "grafico-locais-ct"

    let canvas_locais = document.createElement("canvas") //---- canvas
    document.querySelector(".grafico-locais-ct").appendChild(canvas_locais)
    canvas_locais.className += "grafico-locais-populares grafico-categorias"

    let legenda_locais = document.createElement("p") //---- legenda
    document.querySelector(".grafico-locais-ct").appendChild(legenda_locais)
    legenda_locais.className += "legenda-locais legenda-categorias"

    //div imagem ligação locais (ter uma funcao aqui)
    let bt_locais = document.createElement("div")
    document.querySelector(".locais-section").appendChild(bt_locais)
    bt_locais.className += "bt-locais"


    //div local mais frequente
    let local_mais_frequente_ct = document.createElement("div")//---- seria uma imagem
    document.querySelector(".locais-section").appendChild(local_mais_frequente_ct)
    local_mais_frequente_ct.className += "local-mais-frequente-ct"

    let img_o_local = document.createElement("div")
    document.querySelector(".local-mais-frequente-ct").appendChild(img_o_local)
    img_o_local.className += "img-o-local"

    let legenda_o_local = document.createElement("p")
    document.querySelector(".img-o-local").appendChild(legenda_o_local)
    legenda_o_local.className += "legenda-o-local"

    let info_o_local = document.createElement("div")
    document.querySelector(".local-mais-frequente-ct").appendChild(info_o_local)
    info_o_local.className += "info-o-local"






//****************  Seccao fauna  ******************/
    let fauna_section = document.createElement("div")
    document.querySelector(".categorias-container").appendChild(fauna_section)
    fauna_section.className += "fauna-section"

    //titulo
    let fauna_h = document.createElement("h2")
    document.querySelector(".fauna-section").appendChild(fauna_h)
    fauna_h.className += "fauna-header"

    //div grafico
    let grafico_fauna_ct = document.createElement("div")
    document.querySelector(".fauna-section").appendChild(grafico_fauna_ct)
    grafico_fauna_ct.className += "grafico-fauna-ct"

    let canvas_fauna = document.createElement("canvas") //---- canvas
    document.querySelector(".grafico-fauna-ct").appendChild(canvas_fauna)
    canvas_fauna.className += "grafico-fauna-populares grafico-categorias"

    let legenda_fauna = document.createElement("p") //---- legenda
    document.querySelector(".grafico-fauna-ct").appendChild(legenda_fauna)
    legenda_fauna.className += "legenda-fauna legenda-categorias"

    //div imagem ligação fauna
    let bt_fauna = document.createElement("div")
    document.querySelector(".fauna-section").appendChild(bt_fauna)
    bt_fauna.className += "bt-fauna"


    //div fauna mais frequente
    let fauna_mais_frequente_ct = document.createElement("div")//---- seria uma imagem
    document.querySelector(".fauna-section").appendChild(fauna_mais_frequente_ct)
    fauna_mais_frequente_ct.className += "fauna-mais-frequente-ct"

    let img_a_fauna = document.createElement("div")
    document.querySelector(".fauna-mais-frequente-ct").appendChild(img_a_fauna)
    img_a_fauna.className += "img-a-fauna"

    let legenda_a_fauna = document.createElement("p")
    document.querySelector(".img-a-fauna").appendChild(legenda_a_fauna)
    legenda_a_fauna.className += "legenda-a-fauna"

    let info_a_fauna = document.createElement("div")
    document.querySelector(".fauna-mais-frequente-ct").appendChild(info_a_fauna)
    info_a_fauna.className += "info-a-fauna"


    //****************  Seccao flora  ******************/
    let flora_section = document.createElement("div")
    document.querySelector(".categorias-container").appendChild(flora_section)
    flora_section.className += "flora-section"

    //titulo
    let flora_h = document.createElement("h2")
    document.querySelector(".flora-section").appendChild(flora_h)
    flora_h.className += "flora-header"

    //div grafico
    let grafico_flora_ct = document.createElement("div")
    document.querySelector(".flora-section").appendChild(grafico_flora_ct)
    grafico_flora_ct.className += "grafico-flora-ct"

    let canvas_flora = document.createElement("canvas") //---- canvas
    document.querySelector(".grafico-flora-ct").appendChild(canvas_flora)
    canvas_flora.className += "grafico-flora-populares grafico-categorias"

    let legenda_flora = document.createElement("p") //---- legenda
    document.querySelector(".grafico-flora-ct").appendChild(legenda_flora)
    legenda_flora.className += "legenda-flora legenda-categorias"

    //div imagem ligação flora
    let bt_flora = document.createElement("div")
    document.querySelector(".flora-section").appendChild(bt_flora)
    bt_flora.className += "bt-flora"


    //div flora mais frequente
    let flora_mais_frequente_ct = document.createElement("div")//---- seria uma imagem
    document.querySelector(".flora-section").appendChild(flora_mais_frequente_ct)
    flora_mais_frequente_ct.className += "flora-mais-frequente-ct"

    let img_a_flora = document.createElement("div")
    document.querySelector(".flora-mais-frequente-ct").appendChild(img_a_flora)
    img_a_flora.className += "img-a-flora"

    let legenda_a_flora = document.createElement("p")
    document.querySelector(".img-a-flora").appendChild(legenda_a_flora)
    legenda_a_flora.className += "legenda-a-flora"

    let info_a_flora = document.createElement("div")
    document.querySelector(".flora-mais-frequente-ct").appendChild(info_a_flora)
    info_a_flora.className += "info-a-flora"

    //displayLocais()


}



function displayLocais(){
    body = document.querySelector("body")
    body.innerHTML = ""

    /**********************  Contentor geral  ****************************/
    let categorias_container = document.createElement("div")
    document.querySelector("body").appendChild(categorias_container)
    categorias_container.className += "categorias-container"

    //****************  Título de página  ******************/
    let title_h = document.createElement("h1")
    document.querySelector(".categorias-container").appendChild(title_h)
    title_h.className += "categoria-palavras-h page-title"
    title_h.innerText = `Categorias de palavras`

    //*****************  bts visualizacao  ******************/
    let bts_visualizacao_especifico = document.createElement("div")
    document.querySelector(".categorias-container").appendChild(bts_visualizacao_especifico)
    bts_visualizacao_especifico.className += "bts-visualizacao-especifico"

    let bt_locais_especifico = document.createElement("div")
    document.querySelector(".bts-visualizacao-especifico").appendChild(bt_locais_especifico)
    bt_locais_especifico.className += "bt-locais-especifico"

    let bt_fauna_especifico = document.createElement("div")
    document.querySelector(".bts-visualizacao-especifico").appendChild(bt_fauna_especifico)
    bt_fauna_especifico.className += "bt-fauna-especifico"

    let bt_flora_especifico = document.createElement("div")
    document.querySelector(".bts-visualizacao-especifico").appendChild(bt_flora_especifico)
    bt_flora_especifico.className += "bt-flora-especifico"

    //*****************  lista display  ******************/
    let div_locais_display = document.createElement("div")
    document.querySelector(".categorias-container").appendChild(div_locais_display)
    div_locais_display.className += "div-palavras-cat cat"

    let list_all_container = document.createElement("div")
    document.querySelector(".div-palavras-cat").appendChild(list_all_container)
    list_all_container.className += "list-all-container"

    let ct_head_list = document.createElement("div")
    document.querySelector(".list-all-container").appendChild(ct_head_list)
    ct_head_list.className += "ct-head-list"

    //header (conteudo)
    ct_head_list.innerHTML = `  <div class = "palavra header">Palavra</div>
                                <div class = "textos header">Textos</div>
                                <div class = "freq header">Frequência</div>`

    ct_head_list.style.backgroundColor = "yellow"
    
    let container = document.createElement("div")
    document.querySelector(".list-all-container").appendChild(container)
    container.className = "container"

    //iteracao para display
    for(let i = 0; i < 3; i++){ //3 = n_pal_cat.length

        //cria a div principal
        let ct_item = document.createElement("div")
        ct_item.className += "ct-item ct-item" + (i+1)

        //elementos do item
        ct_item.innerHTML = `<div class = "palavra">Palavra: ${i}</div>
                             <div class = "textos">Textos: ${i}</div>
                             <div class = "freq">Frequência: ${i}</div>`


        container.appendChild(ct_item)
    }
    

}

function displayFauna(){
    body = document.querySelector("body")
    body.innerHTML = ""

    /**********************  Contentor geral  ****************************/
    let categorias_container = document.createElement("div")
    document.querySelector("body").appendChild(categorias_container)
    categorias_container.className += "categorias-container"

    //****************  Título de página  ******************/
    let title_h = document.createElement("h1")
    document.querySelector(".categorias-container").appendChild(title_h)
    title_h.className += "categoria-palavras-h page-title"
    title_h.innerText = `Categorias de palavras`

    //*****************  bts visualizacao  ******************/
    let bts_visualizacao_especifico = document.createElement("div")
    document.querySelector(".categorias-container").appendChild(bts_visualizacao_especifico)
    bts_visualizacao_especifico.className += "bts-visualizacao-especifico"

    let bt_locais_especifico = document.createElement("div")
    document.querySelector(".bts-visualizacao-especifico").appendChild(bt_locais_especifico)
    bt_locais_especifico.className += "bt-locais-especifico"

    let bt_fauna_especifico = document.createElement("div")
    document.querySelector(".bts-visualizacao-especifico").appendChild(bt_fauna_especifico)
    bt_fauna_especifico.className += "bt-fauna-especifico"

    let bt_flora_especifico = document.createElement("div")
    document.querySelector(".bts-visualizacao-especifico").appendChild(bt_flora_especifico)
    bt_flora_especifico.className += "bt-flora-especifico"

        //*****************  lista display  ******************/
    let div_locais_display = document.createElement("div")
    document.querySelector(".categorias-container").appendChild(div_locais_display)
    div_locais_display.className += "div-palavras-cat cat"

    let list_all_container = document.createElement("div")
    document.querySelector(".div-palavras-cat").appendChild(list_all_container)
    list_all_container.className += "list-all-container"

    let ct_head_list = document.createElement("div")
    document.querySelector(".list-all-container").appendChild(ct_head_list)
    ct_head_list.className += "ct-head-list"

    //header (conteudo)
    ct_head_list.innerHTML = `  <div class = "palavra header">Palavra</div>
                                <div class = "textos header">Textos</div>
                                <div class = "freq header">Frequência</div>`

    ct_head_list.style.backgroundColor = "yellow"
    
    let container = document.createElement("div")
    document.querySelector(".list-all-container").appendChild(container)
    container.className = "container"

    //iteracao para display
    for(let i = 0; i < 3; i++){ //3 = n_pal_cat.length

        //cria a div principal
        let ct_item = document.createElement("div")
        ct_item.className += "ct-item ct-item" + (i+1)

        //elementos do item
        ct_item.innerHTML = `<div class = "palavra">Palavra: ${i}</div>
                             <div class = "textos">Textos: ${i}</div>
                             <div class = "freq">Frequência: ${i}</div>`


        container.appendChild(ct_item)
    }

}

function displayFlora(){
    body = document.querySelector("body")
    body.innerHTML = ""

    /**********************  Contentor geral  ****************************/
    let categorias_container = document.createElement("div")
    document.querySelector("body").appendChild(categorias_container)
    categorias_container.className += "categorias-container"

    //****************  Título de página  ******************/
    let title_h = document.createElement("h1")
    document.querySelector(".categorias-container").appendChild(title_h)
    title_h.className += "categoria-palavras-h page-title"
    title_h.innerText = `Categorias de palavras`

    //*****************  bts visualizacao  ******************/
    let bts_visualizacao_especifico = document.createElement("div")
    document.querySelector(".categorias-container").appendChild(bts_visualizacao_especifico)
    bts_visualizacao_especifico.className += "bts-visualizacao-especifico"

    let bt_locais_especifico = document.createElement("div")
    document.querySelector(".bts-visualizacao-especifico").appendChild(bt_locais_especifico)
    bt_locais_especifico.className += "bt-locais-especifico"

    let bt_fauna_especifico = document.createElement("div")
    document.querySelector(".bts-visualizacao-especifico").appendChild(bt_fauna_especifico)
    bt_fauna_especifico.className += "bt-fauna-especifico"

    let bt_flora_especifico = document.createElement("div")
    document.querySelector(".bts-visualizacao-especifico").appendChild(bt_flora_especifico)
    bt_flora_especifico.className += "bt-flora-especifico"

        //*****************  lista display  ******************/
    let div_locais_display = document.createElement("div")
    document.querySelector(".categorias-container").appendChild(div_locais_display)
    div_locais_display.className += "div-palavras-cat cat"

    let list_all_container = document.createElement("div")
    document.querySelector(".div-palavras-cat").appendChild(list_all_container)
    list_all_container.className += "list-all-container"

    let ct_head_list = document.createElement("div")
    document.querySelector(".list-all-container").appendChild(ct_head_list)
    ct_head_list.className += "ct-head-list"

    //header (conteudo)
    ct_head_list.innerHTML = `  <div class = "palavra header">Palavra</div>
                                <div class = "textos header">Textos</div>
                                <div class = "freq header">Frequência</div>`

    ct_head_list.style.backgroundColor = "yellow"
    
    let container = document.createElement("div")
    document.querySelector(".list-all-container").appendChild(container)
    container.className = "container"

    //iteracao para display
    for(let i = 0; i < 3; i++){ //3 = n_pal_cat.length

        //cria a div principal
        let ct_item = document.createElement("div")
        ct_item.className += "ct-item ct-item" + (i+1)

        //elementos do item
        ct_item.innerHTML = `<div class = "palavra">Palavra: ${i}</div>
                             <div class = "textos">Textos: ${i}</div>
                             <div class = "freq">Frequência: ${i}</div>`


        container.appendChild(ct_item)
    }   

}




