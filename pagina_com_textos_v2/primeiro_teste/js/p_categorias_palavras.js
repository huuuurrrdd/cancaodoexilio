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

    //****************  Categorias-sections  ******************/
    let categorias_sections = document.createElement("div")
    document.querySelector(".categorias-container").appendChild(categorias_sections)
    categorias_sections.className += "categorias-sections"

    //Objeto com informações das categorias (para que este objeto seja editável)
    let categoria = [
        {
            categoria: "Locais",
            labels_cat: ["Pernambuco", "Baía", "Maranhão", "Sertão", "Minas Gerais", "Corrientes"],
            labels_cat_value: [12, 19, 3, 5, 2, 3],
            mais_frequente: "Baía",
            info_mais_frequente: "Baía é Baía"
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


/*     //Pode fazer sentido criar um objeto
    let cate = ["Locais", "Fauna", "Flora", "Autores", "Anos"]
    let graf = []
    let labels_cat = ["Pernambuco", "Baía", "Maranhão", "Sertão", "Minas Gerais", "Corrientes"]
    let labels_cat_value = [12, 19, 3, 5, 2, 3]
    //calcular elementos mais frequentes das categorias

    //console.log(categoria[0].categoria.toLowerCase()) */


    function displaySections(cat, labels, values, i, mais_frequente, info_mais_frequente){


        
        let cat_section = document.createElement("div")
        document.querySelector(".categorias-sections").appendChild(cat_section)
        cat_section.className += "cat-section-" + cat

        //******  dentro de cat-section  ******/
        //link para categoria:
        let link_categoria = document.createElement("a")
        document.querySelector(".cat-section-" + cat).appendChild(link_categoria)
        link_categoria.className += "cat-link-" + cat
        link_categoria.href = "./p_categoria.html?categoria=" + cat


        //caixa para h2 e grafico (dentro do link)
        let cat_section_ct = document.createElement("div")
        document.querySelector(".cat-link-" + cat).appendChild(cat_section_ct)
        cat_section_ct.className += "cat-section-ct-" + cat

        //titulo
        let cat_header = document.createElement("h2")
        document.querySelector(".cat-section-ct-" + cat).appendChild(cat_header)
        cat_header.className += "cat-header"
        cat_header.innerHTML = `${cat}`

        //grafico-mais-frequentes
        let grafico_cat_ct = document.createElement("div")
        document.querySelector(".cat-section-ct-" + cat).appendChild(grafico_cat_ct)
        grafico_cat_ct.className += "grafico-cat-ct-" + cat

        let canvas_cat = document.createElement("canvas")
        document.querySelector(".grafico-cat-ct-"+ cat).appendChild(canvas_cat)
        canvas_cat.className += "canvas-cat"

       new Chart(canvas_cat, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: `${cat} mais frequentes`,
                data: values,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });


        //link para a caixa
        let link_c_mais_frequente = document.createElement("a")
        document.querySelector(`.cat-section-` + cat).appendChild(link_c_mais_frequente)
        link_c_mais_frequente.className += "link-cat-freq-" + cat
        link_c_mais_frequente.href = "./p_categoria_especifica.html?especifica=" + cat

        //outra caixa
        let cat_mais_frequente = document.createElement("div")
        document.querySelector(".link-cat-freq-" + cat).appendChild(cat_mais_frequente)
        cat_mais_frequente.className += "cat-mais-frequente-ct" + cat

        let cat_mais_frequente_header = document.createElement("h3")
        document.querySelector(".cat-mais-frequente-ct" + cat).appendChild(cat_mais_frequente_header)
        cat_mais_frequente_header.className += "cat-mais-frequente-header" + cat
        cat_mais_frequente_header.innerHTML = mais_frequente

        let cat_info_mais_frequente = document.createElement("div")
        document.querySelector(".cat-mais-frequente-ct" + cat).appendChild(cat_info_mais_frequente)
        cat_info_mais_frequente.className += "cat-info-mais-frequente" + cat
        cat_info_mais_frequente.innerHTML = info_mais_frequente

    }


    for(let i = 0; i < categoria.length; i++){
        let categ = categoria[i].categoria
        let labell = categoria[i].labels_cat
        let labell_value = categoria[i].labels_cat_value

        let mais_frequente = categoria[i].mais_frequente
        let info_mais_frequente = categoria[i].info_mais_frequente


        displaySections(categ, labell, labell_value, i, mais_frequente, info_mais_frequente)
    }






}


//***********************************************/

//        PARA NOVA PÁGINA!!

//***********************************************/
//Para uma outra página - usar parametros do url
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




