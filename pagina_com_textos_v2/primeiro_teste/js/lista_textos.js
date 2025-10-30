
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

    /****************  Título de página  ******************/
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
    //contentor dos botoes (amostra, tabela, mapa)
    bts_visualizacao = document.createElement("div")
    textos_container.appendChild(bts_visualizacao)
    bts_visualizacao.className += "bts-visualizacao"

    bt_amostra = document.createElement("div")
    bt_tabela = document.createElement("div")
    bt_mapa = document.createElement("div")

    document.querySelector(".bts-visualizacao").appendChild(bt_amostra)
    document.querySelector(".bts-visualizacao").appendChild(bt_tabela)
    document.querySelector(".bts-visualizacao").appendChild(bt_mapa)

    bt_amostra.classname = "bt-amostra"
    bt_tabela.classname = "bt-tabela"
    bt_mapa.classname = "bt-mapa"

    bt_amostra.innerHTML = "Amostra"
    bt_tabela.innerHTML = "Tabela"
    bt_mapa.innerHTML = "Mapa"

    bt_tabela.style.backgroundColor = "red"

    //div para display dos resultados
    div_textos = document.createElement("div")
    textos_container.appendChild(div_textos)
    div_textos.className += "div-textos div-textos-display"
    //div_textos.innerHTML = "lala"

    // funcoes de display amostra, tabela e mapa
    function displayAmostra(){
        div_textos.innerHTML = ""
        //div_textos.innerText = "click!! Amostra"

        //** baseada na tabela de display em palavra selecionada **
        let list_all_container = document.createElement("div")
        document.querySelector(".div-textos").appendChild(list_all_container)
        list_all_container.className += "list-all-container lista-amostra"

        //Header!!
        let ct_head_list = document.createElement("div")
        document.querySelector(".lista-amostra").appendChild(ct_head_list)
        ct_head_list.className += "list ct-head-list"

        // conteudo do header!!
        ct_head_list.innerHTML = `  <div class = "ano header">Data publicação</div>
                                    <div class = "titul header">Título</div>
                                    <div class = "author header">Autor</div>`
        
        ct_head_list.style.backgroundColor = "yellow"

        let container = document.createElement("div")
        document.querySelector(".lista-amostra").appendChild(container)
        container.className = "container container-a"


        //iteração para display
        for(let i = 0; i < textData.length; i++){
            
            //cria a div principal
            let ct_item = document.createElement("div")
            ct_item.className += "ct-item-amostra ct-item" + (i+1)

            texto_tratado = tratamento_texto(textData[i].texto_completo)

            //elementos do item (Transformar n/n/ em parágrafo + reduzir a quantidade de texto!!)
            ct_item.innerHTML = `<div class = "titul-a">${textData[i].title}</div>
                                 <div class = "texto-a"><p>${texto_tratado}</p></div>
                                 <div class = "author-a">${textData[i].author}</div>
                                 <div class = "ano-a">${textData[i].date_of_publication}</div> </br> </br>`
            
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
    }

    function displayTabela(){
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
    }

    function displayMapa(){
        div_textos.innerHTML = ""
        //div_textos.innerText = "click!! Mapa"

        //div para mapa
        let divMap = document.createElement("div")
        div_textos.appendChild(divMap)
        divMap.id = "map"

        // //teste de coordenadas
        // console.log(
        //     `Teste latitude:${get_latitude(
        //     textData[19 - 1].categorias.locais.coordenadas_geograficas[0]
        //     )}`
        // );
        // console.log(
        //     `Teste longitude:${get_longitude(
        //     textData[19 - 1].categorias.locais.coordenadas_geograficas[0]
        //     )}`
        // );

        const map = L.map("map", {
            center: [33.5, -23,5],
            zoom: 1.5,
        });

          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        
        const marker = [];
        // funciona, mas tem alguns erros
        for (t = 0; t < textData.length; t++) {
            for (i = 0; i < textData[t].categorias.locais.coordenadas_geograficas.length; i++) {
            //nota: pode ser necessário verificar se os textos apresentam ou nao coordenada!!
            marker[i] = L.marker([
                get_latitude(textData[t].categorias.locais.coordenadas_geograficas[i]),
                get_longitude(textData[t].categorias.locais.coordenadas_geograficas[i]),
            ])
                .addTo(map)
                .bindPopup(
                `${textData[t].categorias.locais.locais_limpos[i]}, TEXTO: ${textData[t].title}`
                );
            }
        }

        function get_latitude(element) {
            elemento_limpo = element.replace("(", "").replace(")", "");
            latitude = elemento_limpo.split(", ")[0];
            return latitude;
        }

        function get_longitude(element) {
            elemento_limpo = element.replace("(", "").replace(")", "");
            longitude = elemento_limpo.split(", ")[1];
            return longitude;
        }
    }

    

    //**********  Display amostra  ***********/
    bt_amostra.addEventListener("click", (e) =>{
        displayAmostra()
    })

    //**********  Display tabela  ***********/
    bt_tabela.addEventListener("click", (e) =>{
        displayTabela()
    })

    //**********  Display mapa  ***********/
    bt_mapa.addEventListener("click", function (e){
        displayMapa()
    })

    // for(let i=0; i<textData.length; i++){
    //     if(textData[i].date_of_publication <= )
    // }

    //sort_text = textData.date_of_publication.sort((a, b) => a - b)

    //displayMapa()
    displayAmostra() // display amostra como default (n tem problema com acumulação)


    /***********  Display das funções  ***********/


}



