
/*
    Esta página deve incluir:
    v 1. Título
    2. 3 botões (amostra, tabela, mapa)
        a) amostra (3º)
        b) tabela (1º)
        c) mapa (2º)

    3. 1 div onde se exibe o a), b) e c)


*/


function fetchData(){
    let wordData, textData

    //dicionario json
    fetch("./Dict_palavras_lemas_v0004.json")
        .then(response => {
            if(!response.ok){ // menssagem de erro
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json()
        })
        .then(data => {
            wordData = data;
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
            displayData(wordData, textData) //funcao com os 2 jsons
        })
        .catch(error => console.error('Failed to fetch data', error))

}

fetchData()



function displayData(wordData, textData){



    /******************  Contentor geral  *******************/
    let textos_container = document.createElement("div")
    document.querySelector("body").appendChild(textos_container)
    textos_container.className = "textos-container"

    //**  Título de página  ******************/
    page_title = document.createElement("h1")
    document.querySelector(".textos-container").appendChild(page_title)
    page_title.className += "page-title pesquisa-textos-h"
    page_title.innerHTML = "Pesquisa de textos"

    //**********  Pequeno teste  *************/
    ////Funcioonaaa ////
    // conteudo_teste = document.createElement("div")
    // body.appendChild(conteudo_teste)
    // conteudo_teste.innerHTML = `<p> Número de palavras = ${wordData.palavras.length} </p>
    //                             <p> Número de textos = ${textData.length}`



    //**********  Botões para formas de display  *************/
    //container
    bts_visualização = document.createElement("div")
    document.querySelector(".textos-container").appendChild(bts_visualização)
    bts_visualização.className += "bts-visualização"

    bt_amostra = document.createElement("div")
    bt_tabela = document.createElement("div")
    bt_mapa = document.createElement("div")

    document.querySelector(".bts-visualização").appendChild(bt_amostra)
    document.querySelector(".bts-visualização").appendChild(bt_tabela)
    document.querySelector(".bts-visualização").appendChild(bt_mapa)

    bt_amostra.classname = "bt-amostra"
    bt_tabela.classname = "bt-tabela"
    bt_mapa.classname = "bt-mapa"

    bt_amostra.innerHTML = "Amostra"
    bt_tabela.innerHTML = "Tabela"
    bt_mapa.innerHTML = "Mapa"

    bt_tabela.style.backgroundColor = "red"

    //div para display
    div_textos = document.createElement("div")
    document.querySelector("body").appendChild(div_textos)
    div_textos.className += "div-textos div-textos-display"
    //div_textos.innerHTML = "lala"

    //**********  Display amostra  ***********/
    bt_amostra.addEventListener("click", function (e){
        div_textos.innerHTML = ""
        //div_textos.innerText = "click!! Amostra"

        //** baseada na tabela de display em palavra selecionada **
        let list_all_container = document.createElement("div")
        document.querySelector(".div-textos").appendChild(list_all_container)
        list_all_container.className += "list-all-container"

        //Header!!
        let ct_head_list = document.createElement("div")
        document.querySelector(".list-all-container").appendChild(ct_head_list)
        ct_head_list.className += "list ct-head-list"

        // conteudo do header!!
        ct_head_list.innerHTML = `  <div class = "ano header">Data publicação</div>
                                    <div class = "titul header">Título</div>
                                    <div class = "author header">Autor</div>`
        
        ct_head_list.style.backgroundColor = "yellow"

        let container = document.createElement("div")
        document.querySelector(".list-all-container").appendChild(container)
        container.className = "container"


        //iteração para display
        for(let i = 0; i < textData.length; i++){
            
            //cria a div principal
            let ct_item = document.createElement("div")
            ct_item.className += "ct-item ct-item" + (i+1)

            texto_tratado = tratamento_texto(textData[i].texto_completo)

            //elementos do item (Transformar n/n/ em parágrafo + reduzir a quantidade de texto!!)
            ct_item.innerHTML = `<div class = "titul">${textData[i].title}</div>
                                 <div class = "texto"><p>${texto_tratado}</p></div>
                                 <div class = "author">${textData[i].author}</div>
                                 <div class = "ano">${textData[i].date_of_publication}</div> </br> </br>`
            
            container.appendChild(ct_item)

        }


        function tratamento_texto(texto){ // falta refinar
            //n/n/ to <br>
            let nstring = texto.match(/\S+|\r?\n/g)
            //console.log (`teste 1: ${nstring}`) //funciona!!

            // limitar... ao fim de 8 n/ não devolve
            let nNs = 0

            let convertedn = nstring.map(item => {
                if(nNs >= 8){
                    return null; //para de produzir output ao 8º "n"
                }
                if(item === "\n"){
                    nNs++
                    if(nNs > 5){
                        return null
                    }else{
                        return "<br>"
                    }
                    
                }return item
            }).filter(x => x !== null)

            return convertedn

        }

    })

    //**********  Display tabela  ***********/
    bt_tabela.addEventListener("click", function (e){
        div_textos.innerHTML = ""

        //** baseada na tabela de display em palavra selecionada **
        let list_all_container = document.createElement("div")
        document.querySelector(".div-textos").appendChild(list_all_container)
        list_all_container.className += "list-all-container"

        //Header!!
        let ct_head_list = document.createElement("div")
        document.querySelector(".list-all-container").appendChild(ct_head_list)
        ct_head_list.className += "list ct-head-list"

        // conteudo do header!!
        ct_head_list.innerHTML = `  <div class = "ano header">Data publicação</div>
                                    <div class = "titul header">Título</div>
                                    <div class = "author header">Autor</div>`
        
        ct_head_list.style.backgroundColor = "yellow"

        let container = document.createElement("div")
        document.querySelector(".list-all-container").appendChild(container)
        container.className = "container"


        //iteração para display
        for(let i = 0; i < textData.length; i++){
            
            //cria a div principal
            let ct_item = document.createElement("div")
            ct_item.className += "ct-item ct-item" + (i+1)

            //elementos do item
            ct_item.innerHTML = `<div class = "ano">${textData[i].date_of_publication}</div>
                                 <div class = "titul">${textData[i].title}</div>
                                 <div class = "author">${textData[i].author}</div>`
            
            container.appendChild(ct_item)

        }

        


    })

    //**********  Display mapa  ***********/
    bt_mapa.addEventListener("click", function (e){
        div_textos.innerHTML = ""
        div_textos.innerText = "click!! Mapa"

    })

    // for(let i=0; i<textData.length; i++){
    //     if(textData[i].date_of_publication <= )
    // }

    //sort_text = textData.date_of_publication.sort((a, b) => a - b)


    /***********  Display das funções  ***********/


}



