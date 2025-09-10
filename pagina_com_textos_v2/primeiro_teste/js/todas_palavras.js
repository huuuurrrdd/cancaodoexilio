/*

    Documento para script de página de todas as palavras!!


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
    let words_container = document.createElement("div")
    document.querySelector("body").appendChild(words_container)
    words_container.className += "words-container"

    //****************  Título de página  ******************/
    let title_h = document.createElement("h1")
    document.querySelector(".words-container").appendChild(title_h)
    title_h.className += "pesquisa-palavras-h page-title"
    title_h.innerText = `Pesquisa de palavras`


    //*********  Display gráfico de frequencias  ***********/
    grafico_ct = document.createElement("div")
    document.querySelector(".words-container").appendChild(grafico_ct)
    grafico_ct.className = "grafico-ct"

    canvas = document.createElement("canvas")
    document.querySelector(".grafico-ct").appendChild(canvas)
    canvas.className = "grafico-palavras-populares"


    //*********  Botões (todas as palavras + palavras populares)  ***********/
    //container
    bts_visualizacao = document.createElement("div")
    document.querySelector(".words-container").appendChild(bts_visualizacao)
    bts_visualizacao.className = "bts-visualizacao"

    bt_palavras_pop = document.createElement("div")
    bt_todas_palavras = document.createElement("div")

    document.querySelector("body").appendChild(bt_palavras_pop)
    document.querySelector("body").appendChild(bt_todas_palavras)

    bt_palavras_pop.className = "bt-palavras-pop"
    bt_todas_palavras.className = "bt-todas-palavras"

    bt_palavras_pop.innerHTML = "Palavras populares"
    bt_todas_palavras.innerHTML = "Todas as palavras"

    //** div para display **//
    div_display = document.createElement("div")
    document.querySelector("body").appendChild(div_display)
    div_display.className = "div-display"

    //*********  Funções para display [palavras pop; todas palavras]  ***********/

    //**********  Display palavras-pop  ***********/
    bt_palavras_pop.addEventListener("click", function (e){
        div_display.innerHTML = "Click! Palavras populares"
    })

    

    //**********  Display todas-palavras  ***********/
    bt_todas_palavras.addEventListener("click", function (e){
        div_display.innerHTML = ""

        //** baseada na tabela de display em palavra selecionada **
        let list_all_container = document.createElement("div")
        document.querySelector(".div-display").appendChild(list_all_container)
        list_all_container.className += "list-all-container"

        //Header!!
        let ct_head_list = document.createElement("div")
        document.querySelector(".list-all-container").appendChild(ct_head_list)
        ct_head_list.className += "list ct-head-list"

        // conteudo do header!!
        ct_head_list.innerHTML = `  <div class = "palavras header">Palavra</div>
                                    <div class = "texto header">Textos</div>
                                    <div class = "frequencia header">Freq</div>`
        
        ct_head_list.style.backgroundColor = "yellow"


        // //teste para aceder a coisas -- FUNCIONA!!
        // let info = document.createElement('div')
        // document.querySelector("body").appendChild(info)
        // info.innerHTML = `  <p>Palavra 5242 (5241):</p>
        //                     <p>Palavra: ${wordData.palavras[5241].palavra}</p>
        //                     <p>Textos (apenas 1) ${wordData.palavras[5241].textos[0].id_text}</p>
        //                     <p>Frequencia: ${wordData.palavras[5241].frequencia}</p>`

        // conteudo após header //////////////////////
        let container = document.createElement("div")
        document.querySelector(".list-all-container").appendChild(container)
        container.className = "container"


        //iteração para display
        for(let i = 0; i < 3; i++){
            
            //cria a div principal
            let ct_item = document.createElement("div")
            ct_item.className += "ct-item ct-item" + (i+1)
            container.appendChild(ct_item)

            //**********  Primeira tentativa!!  ************//
            // //elementos do item (Transformar n/n/ em parágrafo + reduzir a quantidade de texto!!)
            // ct_item.innerHTML = `<div class = "palavra">${wordData.palavras[i].palavra}</div>
            //                      <div class = "textos"><p>${wordData.palavras[i].textos[0].id_text}</p></div>
            //                      <div class = "frequencia"><p>${wordData.palavras[i].frequencia}</p></div>
            //                      </br> </br>`
            
            // container.appendChild(ct_item)


            //Tentativa mais avançada (a incluir os textos)
            //divs dentro da div principal
            let item_palavra = document.createElement("div")
            document.querySelector(`.ct-item${i+1}`).appendChild(item_palavra)
            item_palavra.className = "item-palavra"
            item_palavra.innerHTML = `PALAVRA: ${wordData.palavras[i].palavra}`

            let item_textos = document.createElement("div")
            document.querySelector(`.ct-item${i+1}`).appendChild(item_textos)
            item_textos.className = "item-textos"

            for(let j = 0; j < wordData.palavras[i].textos.length; j++){
            // item a colocar dentro de "item_textos"
                let texto_de_palavra = document.createElement("div")
                //document.querySelector(".item-textos").appendChild(texto_de_palavra)
                texto_de_palavra.className = "item-texto"
                texto_de_palavra.innerHTML = `Id texto palavra ${wordData.palavras[i].palavra}: ${wordData.palavras[i].textos[j].id_text}`
                item_textos.appendChild(texto_de_palavra)
            }
            

            let item_frequencia = document.createElement("div")
            document.querySelector(`.ct-item${i+1}`).appendChild(item_frequencia)
            item_frequencia.className = "item-frequencia"
            item_frequencia.innerHTML = `FREQUENCIA:${wordData.palavras[i].frequencia}`




            


        }




    })


}
