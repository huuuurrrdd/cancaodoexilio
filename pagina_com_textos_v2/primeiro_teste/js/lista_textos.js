
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
    let wordData, textData, stoplist

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
            return fetch("./t4_textos_loc_fauna_flora.json") // fetch json dos textos
        })
        .then(response => { // mwensagem de erro
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json()
        })
         .then((data) => {
            textData = data; // guarda json dos lemas
            return fetch("./stopwords/portuguese");
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text(); // return stopwords text
        })
        .then((data) => {
        stoplist = data
            .split("\n")
            .map((s_word) => s_word.trim())
            .filter((s_word) => s_word.length > 0);
            displayData(wordData, textData, stoplist) //funcao com os 2 jsons
        })
        .catch(error => console.error('Failed to fetch data', error))

}

fetchData()



function displayData(wordData, textData, stoplist){

    /******************  Funções de resultados  *******************/
    // valores default para ordenação de resultados
    let ordTit = "AZ" // o atual ---- titulo
    let ordTit_ = "ZA" // o q muda
    let ordAut = "AZ" // o atual ---- autor
    let ordAut_ = "ZA" // o q muda
    let ordDat = "asc" // o atual ---- ano
    let ordDat_ = "des"// o que muda


    /*:::::::::::  Resultados p/pagina  :::::::::::*/
    //obtendo divisão por 50, descobrir o resto
    let rPP = 50 // resultados por página
    let arrayResultados = [] // com indice de inicio e de fim (com ele incluido)

    const txtTotal = textData.length
    //console.log(textData.length)

    function resPPage(total, rPP){
      arrayResultados = []

      const divInteira = Math.floor(total / rPP) // aqui deveria ser resultado.length
      const resto = total % rPP

      if(total <= rPP){ // se há menos de 50 resultados, só uma página
        arrayResultados.push({ st:0, en: total})
      } else {
        // paginas completas
        for(let i = 0; i < divInteira; i++){
          const s = i > 0 ? i* rPP : 0
          const e = s + rPP

          arrayResultados.push({
            st: s,
            en: e
          })
        }
        // ultima pagina incompleta
        if(resto != 0) arrayResultados.push({
          st : divInteira * rPP,
          en: divInteira * rPP + resto
        })
      }
      // resultado a devolver: arrayResultados
    }

    resPPage(txtTotal, rPP)
    //console.log(arrayResultados) // 11 resultados!!

    // valor de indice da página
    let iP = 0

    /*:::::::::::  Array de obj com RESULTADOS  :::::::::::*/
    //let resultado = textData
    // console.log("textData")
    // console.log(textData)
    // console.log("resultado")
    // console.log(resultado)

    // // //Tentativa de search sem o input FUNCIONA!!
    // const valTit = "la"
    // const filteredResultado = textData.filter(item => item.title.toLowerCase().includes(valTit))
    // console.log(filteredResultado)

    

    /*:::::::::::  Ordem alfabética de titulos  :::::::::::*/
    function ordTitleTxt(ord, data){
        //console.log("ord Function")
        if(ord=="AZ"){
            data.sort((a,b) => a.title.localeCompare(b.title, 'pt'))
            ordTit_ = "ZA" // pronto para mudar
            ordTit = "AZ" // o atual
        } else if (ord=="ZA"){
            data.sort((a,b) => a.title.localeCompare(b.title, 'pt')).reverse()
            ordTit_ = "AZ" // pronto para mudar
            ordTit = "ZA" // o atual
        }
    }
    // ordTitleTxt("ZA", textData) // ordena tudo!!
    // console.log(textData)
    // console.log(resultado) // funciona com os 2 independentemente de ser textData ou resultado

    /*:::::::::::  Ordem alfabética de autores  :::::::::::*/
    function ordAutores(ord, data){
        //console.log("ord Function")
        if(ord=="AZ"){
            data.sort((a,b) => a.author.localeCompare(b.author, 'pt'))
            ordAut_ = "ZA" // pronto para mudar
            ordAut = "AZ" // o atual
        } else if (ord=="ZA"){
            data.sort((a,b) => a.author.localeCompare(b.author, 'pt')).reverse()
            ordAut_ = "AZ" // pronto para mudar
            ordAut = "ZA" // o atual
        }
    }
    // ordAutores("ZA", textData)
    // console.log(textData)

    /*:::::::::::  Ordem cronologica de textos  :::::::::::*/
    function ordData(ord, data){
        if(ord == "des"){
          data.sort((a,b) => a.date_of_publication < b.date_of_publication ? -1 : 1).reverse()
          ordDat_= "asc" // pronto para mudar
          ordDat = "des" // atual
        } else if (ord == "asc") {
          data.sort((a,b) => a.date_of_publication < b.date_of_publication ? -1 : 1)
          ordDat_= "des"
          ordDat = "asc"
        }
    }
    // ordData("des", textData)
    // console.log(textData)


    /*:::::::::::  Tratamento de texto  :::::::::::*/
    function tratamento_texto(texto){
        let nNs = 0
        let res = ''

        for(let i = 0; i < texto.length; i++){
            const char = texto[i] // char é array de todos os caracteres

            if(char ==='\n'){ // se caracter for nova linha, soma
                nNs++
                if(nNs > 6){ // se linha > 6 quebra
                    break
                }
                res += '<br>'
            } else if(char !== '\r'){ //n percebo esta parte
                res += char
            }
        }

        return res
    }
    //testando a funcao:
    //console.log(tratamento_texto(textData[1].texto_completo)) //funciona!!

    // //:::::: Teste para tratamento de texto :::::://
    // let texto_inicial = document.querySelector("div")
    // document.querySelector("body").appendChild(texto_inicial)
    // texto_inicial.innerHTML = textData[1].texto_completo + "<br> <br>"

    // let teste_texto = document.createElement("div")
    // document.querySelector("body").appendChild(teste_texto)
    // teste_texto.innerHTML = tratamento_texto(textData[1].texto_completo)

    /*:::::::::::  Normalizar string  :::::::::::*/
    function normalize(str){
        return str
            ?.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
    }

    /******************  Contentor geral  *******************/
    let textos_container = document.createElement("div")
    document.querySelector("body").appendChild(textos_container)
    textos_container.className = "textos-container"

    let margem_ct = document.createElement("div");
    textos_container.appendChild(margem_ct);
    margem_ct.className = "margem-ct"

    /****************  Título de página  ******************/
    page_title = document.createElement("h1")
    margem_ct.appendChild(page_title)
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

    bt_amostra.className = "bt-amostra bt-a"
    bt_tabela.className = "bt-tabela bt-a"
    bt_mapa.className = "bt-mapa bt-a"

    bt_amostra.innerHTML = "Amostra"
    bt_tabela.innerHTML = "Tabela"
    bt_mapa.innerHTML = "Mapa"

    //bt_tabela.style.backgroundColor = "red"

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
        ct_head_list.innerHTML = `  <div class = "ano header ano-o-head" id="ano-o-head">
                                        <h2 class = "ano-o-h">Ano</h2>
                                        <p id = "Ord-Dat">Ord: ${ordDat}</p>

                                        <div id = "year-search-bar">
                                            <input id="yeartxt-input" aria-label="ano?" type="number" class="year-search-bar__input" placeholder="ano?" autofocus required>
                                            <button id="yeartxt-submit" type="button" class="year-search-bar__button" aria-label=""search>GO</button>
                                        </div>
                                    </div>
                                    <div class = "titul header titul-head"><h2>Título</h2><p id = "Ord-Tit">Ord: ${ordTit}</p>
                                        <div id = "titultxt-search-bar">
                                            <input id="titultxt-input" aria-label="titulo?" type="text" class="titultxt-search-bar__input" placeholder="titulo?" autofocus required>
                                            <button id="titultxt-submit" type="button" class="titultxt-search-bar__button" aria-label=""search>GO</button>
                                        </div>
                                    </div>
                                    <div class = "author header autor-head"><h2>Autor</h2><p id = "Ord-Aut">Ord: ${ordAut}</p>
                                        <div id = "autortxt-search-bar">
                                            <input id="autortxt-input" aria-label="autor?" type="text" class="autortxt-search-bar__input" placeholder="autor?" autofocus required>
                                            <button id="autortxt-submit" type="button" class="autortxt-search-bar__button" aria-label=""search>GO</button>
                                        </div>
                                    </div>`
        
                                    // Add this to debug:
        console.log('Element exists:', document.getElementById('ano-o-head'));
        console.log('Computed display:', window.getComputedStyle(document.getElementById('ano-o-head')).display);
        ct_head_list.style.backgroundColor = "yellow"

        /*:::::  Botoes  :::::*/
        const yearSubmitButton = document.querySelector('#yeartxt-submit')
        const yearInput = document.querySelector('#yeartxt-input')

        const titulSubmitButton = document.querySelector('#titultxt-submit')
        const titulInput = document.querySelector('#titultxt-input')

        const autorSubmitButton = document.querySelector('#autortxt-submit')
        const autorInput = document.querySelector('#autortxt-input')


        // conteudo após header //////////////////////
        let container = document.createElement("div")
        document.querySelector(".lista-amostra").appendChild(container)
        container.className = "container container-a"

        //n funcional, pq n foi chamada!!! (resultado = textData)
        function displayResultadotxt(resultado, valor){ // n sei se isto funciona por ser o original!!
            //console.log(arrayResultados)

            /*:::::  Atualiza os headers  :::::*/
            document.querySelector('#Ord-Tit').textContent = `Ord: ${ordTit}`
            document.querySelector('#Ord-Aut').textContent = `Ord: ${ordAut}`
            document.querySelector('#Ord-Dat').textContent = `Ord: ${ordDat}`
            
            container.innerHTML = ""

            //let total = textData.length
            //iteração para display
            if(resultado == undefined || resultado == [] || resultado == ""){
                container.innerHTML = `<p>Não foram encontrados resultados para: "${valor}" </p><br><br>`
            } else {
                for(let i = arrayResultados[iP].st; i < arrayResultados[iP].en; i++){

                    //cria a div principal
                    let ct_item = document.createElement("a")
                    ct_item.className += "ct-item-amostra ct-item" + (i+1)
                    container.appendChild(ct_item)
                    // ct_item.href = `index.html?id=${resultado[i].id}`
                    ct_item.addEventListener('click', (e) => {
                        window.location.href =`index.html?id=${resultado[i].id}`
                    })

                    texto_tratado = tratamento_texto(resultado[i].texto_completo)

                    //elementos do item (Transformar n/n/ em parágrafo + reduzir a quantidade de texto!!)
                    ct_item.innerHTML = `<div class = "titul-a">${resultado[i].title}</div>
                                        <div class = "texto-a"><p>${texto_tratado}</p></div>
                                        <a href = "p_categoria_especifica.html?categoria=Autores&especifica=${resultado[i].author}" class = "author-a">${resultado[i].author}</a>
                                        <a href = "p_categoria_especifica.html?categoria=Anos&especifica=${resultado[i].date_of_publication}" class = "ano-a">${resultado[i].date_of_publication}</a> </br> </br>`
                    
                    
                }
            }

            /*:::::  Display de páginas de resultados  :::::*/
            // remove outro nPages que existam anteriormente em list_all_container
            const oldPages = list_all_container.querySelector('.n-page-ct')
            if(oldPages) oldPages.remove()

            // div com bts de exibir pag de resultados
            let nPages = document.createElement("div")
            list_all_container.appendChild(nPages)
            nPages.className += "n-page n-page-ct"
            //nPages.innerHTML = "ATCHUMMM"


            if(resultado == undefined || resultado == [] || resultado == ""){
                nPages.innerHTML = ""
            } else {
                nPages.innerHTML = ""
                for(let i = 0; i < arrayResultados.length; i++){ // isto atualiza-se, mas 
                    let nPage = document.createElement("div")
                    nPages.appendChild(nPage)
                    nPage.className += "n-page-i n-page" + i
                    nPage.id = `n-page${i}`
                    nPage.innerText = i+1

                    //   nPage.addEventListener('click', (e) =>{
                    //   console.log(`Click, page ${nPage.innerText}`)
                    //   iP = i // tem de ser chamado acima
                    // })
                }
            }
        }

        displayResultadotxt(textData)

        /*:::::::::::  ____________FILTROS____________  :::::::::::*/

        /***************** Ordem Alfabetica [titulo] ********************/
        document.querySelector('#Ord-Tit').addEventListener('click', (e) => { // filtros funcionais
            ordTitleTxt(ordTit_, textData) // dá erro aqui
            displayResultadotxt(textData)
            //console.log("click!!")
        })
        // document.querySelector('#Ord-Tit').style.backgroundColor = "white"

        /***************** Ordem Alfabetica [autor] ********************/
        document.querySelector('#Ord-Aut').addEventListener('click', (e) => {
            ordAutores(ordAut_, textData)
            displayResultadotxt(textData)
            console.log("click!!")
        })
        // document.querySelector('#Ord-Aut').style.backgroundColor = "white"

        /***************** Ordem cronologica ********************/
        document.querySelector('#Ord-Dat').addEventListener('click', (e) => {
            ordData(ordDat_, textData)
            displayResultadotxt(textData)
            console.log("click!!")
        })
        // document.querySelector('#Ord-Dat').style.backgroundColor = "white"

        /***************** Separadores page ********************/
        function sepPage(){
            for(let i = 0; i < arrayResultados.length; i++){ //funiona!! // deve ser por arrayResultados ter de se atualizar!!
                    document.querySelector('#n-page' + i).addEventListener('click', (e) => {
                    console.log(`Click, page ${document.querySelector('#n-page' + i).innerText}`)
                    iP = i
                    displayResultado(resultado)
                })
                document.querySelector('#n-page' + i).style.backgroundColor = "yellow" // após atualização dos filtros isto deixa de funcionar
            }
        }
        sepPage() // ainda preciso de perceber!!



        /*:::::::::::  __Pesquisa livre__  :::::::::::*/
        // pode ser criada uma funcao a parte adaptada para os valores e nomes de variaveis!!
        /***************** Year pesquisa ********************/
        //este está complicado!!
        // yearInput.addEventListener('input', (e) =>{ // n pode ser com local compare
        //     let value = e.target.value

        //     if(value && value.trim().length > 0){
        //         value = value.trim().toLowerCase()

        //         const filteredResultado = textData // ver como se faz para numeros
        //             .filter(item => {
        //                 const year = item?.date_of_publication || "" // n sei se o titulo foi bem recolhido
        //                 const val = value
        //                 return year.includes(val)
        //             })
        //             .sort((a,b) => { // ordem numerica dos valores

        //                 a.date_of_publication < b.date_of_publication ? -1 : 1
        //             })

        //         resPPage(filteredResultado.length, rPP)

        //         displayResultadotxt(filteredResultado, value)

        //     } else {
        //         resPPage(textData.length, rPP)
        //         displayResultadotxt(textData, value)
        //     }
        // })

        /***************** Title pesquisa ********************/
        titulInput.addEventListener('input', (e) =>{ // n sei se normalize está
            let value = e.target.value

            if(value && value.trim().length > 0){
                value = value.trim().toLowerCase()

                const filteredResultado = textData
                    .filter(item => {
                        const title = normalize(item?.title || "") // n sei se o titulo foi bem recolhido
                        const val = normalize(value)
                        return title.includes(val)
                    })
                    .sort((a,b) => { // ordem alfabetica com os valores dos resultados normalizados
                        const aTit = normalize(a.title)
                        const bTit = normalize(b.title)
                        const val = normalize(value) // input-value normalizado

                        const aStarts = aTit.startsWith(val) // compara se começa com o valor versao normalizada
                        const bStarts = bTit.startsWith(val)

                        if(aStarts && !bStarts) return -1
                        if(!aStarts && bStarts) return 1

                        return aTit.localeCompare(bTit, 'pt', { sensitivity: 'base' })
                    })

                resPPage(filteredResultado.length, rPP)

                displayResultadotxt(filteredResultado, value)

            } else {
                resPPage(textData.length, rPP)
                displayResultadotxt(textData, value)
            }
        })

        /***************** autor pesquisa ********************/
        //funcionaaaa
        autorInput.addEventListener('input', (e) =>{ // n sei se normalize está
            let value = e.target.value

            if(value && value.trim().length > 0){
                value = value.trim().toLowerCase()

                const filteredResultado = textData
                    .filter(item => {
                        const author = normalize(item?.author || "") // n sei se o titulo foi bem recolhido
                        const val = normalize(value)
                        return author.includes(val)
                    })
                    .sort((a,b) => { // ordem alfabetica com os valores dos resultados normalizados
                        const aAut = normalize(a.author)
                        const bAut = normalize(b.author)
                        const val = normalize(value) // input-value normalizado

                        const aStarts = aAut.startsWith(val) // compara se começa com o valor versao normalizada
                        const bStarts = bAut.startsWith(val)

                        if(aStarts && !bStarts) return -1
                        if(!aStarts && bStarts) return 1

                        return aAut.localeCompare(bAut, 'pt', { sensitivity: 'base' })
                    })

                resPPage(filteredResultado.length, rPP)

                displayResultadotxt(filteredResultado, value)

            } else {
                resPPage(textData.length, rPP)
                displayResultadotxt(textData, value)
            }
        })

        
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
        ct_head_list.innerHTML = `  <div class = "ano header ano-header">
                                        <h2 class = "ano-o-h">Ano</h2>
                                        <p id = "Ord-Dat">Ord: ${ordDat}</p>
                                        <div id = "year-search-bar">
                                            <input id="yeartxt-input" class="input-h" aria-label="ano?" type="number" class="year-search-bar__input" placeholder="ano?" min="1846" autofocus required>
                                            <input id="yeartxt-submit" type="image" class="year-search-bar__button bt-h" src='./imagens/lupa.svg' aria-label=""search>
                                        </div>
                                    </div>

                                    <div class = "titul header titul-header">
                                        <h2 class = "titul-o-h">Título</h2>
                                        <p id = "Ord-Tit">Ord: ${ordTit}</p>
                                        <div id = "titultxt-search-bar">
                                            <input id="titultxt-input" class="input-h" aria-label="titulo?" type="text" class="titultxt-search-bar__input" placeholder="titulo?" autofocus required>
                                            <input id="titultxt-submit" type="image" class="titultxt-search-bar__button bt-h" src='./imagens/lupa.svg' aria-label=""search>
                                        </div>
                                    </div>

                                    <div class = "author header author-header">
                                        <h2 class = "aut-o-h">Autor</h2>
                                        <p id = "Ord-Aut">Ord: ${ordAut}</p>
                                        <div id = "autortxt-search-bar">
                                            <input id="autortxt-input" class="input-h" aria-label="autor?" type="text" class="autortxt-search-bar__input" placeholder="autor?" autofocus required>
                                            <input id="autortxt-submit" type="image" class="autortxt-search-bar__button bt-h" src='./imagens/lupa.svg' aria-label=""search>
                                        </div>
                                    </div>`
        
        ct_head_list.style.backgroundColor = "yellow"

        /*:::::  Botoes  :::::*/
        const yearSubmitButton = document.querySelector('#yeartxt-submit')
        const yearInput = document.querySelector('#yeartxt-input')

        const titulSubmitButton = document.querySelector('#titultxt-submit')
        const titulInput = document.querySelector('#titultxt-input')

        const autorSubmitButton = document.querySelector('#autortxt-submit')
        const autorInput = document.querySelector('#autortxt-input')


        // conteudo após header //////////////////////
        let container = document.createElement("div")
        document.querySelector(".list-all-container").appendChild(container)
        container.className = "container"

        function displayResultadotab(resultado, valor){
            // console.log(arrayResultados)

            /*:::::  Atualiza os headers  :::::*/
            document.querySelector('#Ord-Tit').textContent = `Ord: ${ordTit}`
            document.querySelector('#Ord-Aut').textContent = `Ord: ${ordAut}`
            document.querySelector('#Ord-Dat').textContent = `Ord: ${ordDat}`

            container.innerHTML = ""

            //let total = textData.length
            //iteração para display
            if(resultado == undefined || resultado == [] || resultado == ""){
                container.innerHTML = `<p>Não foram encontrados resultados para: "${valor}" </p><br><br>`
            } else{
                for(let i = arrayResultados[iP].st; i < arrayResultados[iP].en; i++){
                    //cria a div principal
                    let ct_item = document.createElement("div")
                    ct_item.className += "ct-item ct-item" + (i+1)
                    container.appendChild(ct_item)

                    ct_item.innerHTML = `<a class = "ano" href="p_categoria_especifica.html?categoria=Anos&especifica=${resultado[i].date_of_publication}">${resultado[i].date_of_publication}</a>
                                        <a class = "titul" href="index.html?id=${resultado[i].id}">${resultado[i].title}</a>
                                        <a class = "author" href="p_categoria_especifica.html?categoria=Autores&especifica=${resultado[i].author}">${resultado[i].author}</a>`
                }
            }

            /*:::::  Display de páginas de resultados  :::::*/
            // remove outro nPages que existam anteriormente em list_all_container
            const oldPages = list_all_container.querySelector('.n-page-ct')
            if(oldPages) oldPages.remove()

            // div com bts de exibir pag de resultados
            let nPages = document.createElement("div")
            list_all_container.appendChild(nPages)
            nPages.className += "n-page n-page-ct"

            if(resultado == undefined || resultado == [] || resultado == ""){
                nPages.innerHTML = ""
            } else {
                nPages.innerHTML = ""
                for(let i = 0; i < arrayResultados.length; i++){ // isto atualiza-se, mas 
                    let nPage = document.createElement("a")
                    nPages.appendChild(nPage)
                    nPage.className += "n-page-i n-page" + i
                    nPage.id = `n-page${i}`
                    nPage.innerText = i+1
                    //nPage.href = `#n-page${i}`

                      nPage.addEventListener('click', (e) =>{
                        console.log(`Click, page ${nPage.innerText}`)
                        iP = i // tem de ser chamado acima
                    })
                }
            }

            //console.log(`Resultado atualizado: ${arrayResultados.length}`)
            sepPage()
            document.querySelector('#n-page' + iP).style.backgroundColor = "#223F29"
            document.querySelector('#n-page' + iP).style.color = "#FFFEF2"
        }

        displayResultadotab(textData)

        /*:::::::::::  ____________FILTROS____________  :::::::::::*/

        /***************** Ordem Alfabetica [titulo] ********************/
        document.querySelector('#Ord-Tit').addEventListener('click', (e) => { // filtros funcionais
            ordTitleTxt(ordTit_, textData) // dá erro aqui
            displayResultadotab(textData)
            //console.log("click!!")
        })
        // document.querySelector('#Ord-Tit').style.backgroundColor = "white"

        /***************** Ordem Alfabetica [autor] ********************/
        document.querySelector('#Ord-Aut').addEventListener('click', (e) => {
            ordAutores(ordAut_, textData)
            displayResultadotab(textData)
            console.log("click!!")
        })
        // document.querySelector('#Ord-Aut').style.backgroundColor = "white"

        /***************** Ordem cronologica ********************/
        document.querySelector('#Ord-Dat').addEventListener('click', (e) => {
            ordData(ordDat_, textData)
            displayResultadotab(textData)
            console.log("click!!")
        })
        // document.querySelector('#Ord-Dat').style.backgroundColor = "white"

        /***************** Separadores page ********************/
        function sepPage(){
            for(let i = 0; i < arrayResultados.length; i++){ //funiona!! // deve ser por arrayResultados ter de se atualizar!!
                    document.querySelector('#n-page' + i).addEventListener('click', (e) => {
                    console.log(`Click, page ${document.querySelector('#n-page' + i).innerText}`)
                    iP = i
                    displayResultadotab(textData)
                })
                document.querySelector('#n-page' + i).innerHTML += `<style> #n-page${i}:hover{background-color:#223F29; cursor:pointer; color:#FFFEF2}</style>`
            }
        }
        //sepPage() // ainda preciso de perceber!!



        /*:::::::::::  __Pesquisa livre__  :::::::::::*/
        // Todos eles estão mal !!
        /***************** Year pesquisa ********************/
        //este está complicado!!
        yearInput.addEventListener('input', (e) => { // n pode ser com local compare
            let value = String(e.target.value).trim()

            // //reset pages every filter
            // arrayResultados = []

            if(value.length > 0){
     
                const filteredResultado = textData // ver como se faz para numeros
                    .filter(item => {
                        const year = String(item?.date_of_publication ?? "")
                        return year.startsWith(value)
                    })
                    .sort((a,b) => {
                        const na = Number(a.date_of_publication)
                        const nb = Number(b.date_of_publication)
                        return (Number.isNaN(na) ? Infinity : na) - (Number.isNaN(nb) ? Infinity : nb)
                    })

                resPPage(filteredResultado.length, rPP)
                displayResultadotab(filteredResultado, value)

            } else {
                resPPage(textData.length, rPP)
                displayResultadotab(textData, value)
            }
        })

        /***************** Title pesquisa ********************/
        titulInput.addEventListener('input', (e) =>{ // n sei se normalize está
            let value = e.target.value

            if(value && value.trim().length > 0){
                value = value.trim().toLowerCase()

                const filteredResultado = textData
                    .filter(item => {
                        const title = normalize(item?.title || "") // n sei se o titulo foi bem recolhido
                        const val = normalize(value)
                        return title.includes(val)
                    })
                    .sort((a,b) => { // ordem alfabetica com os valores dos resultados normalizados
                        const aTit = normalize(a.title)
                        const bTit = normalize(b.title)
                        const val = normalize(value) // input-value normalizado

                        // const aStarts = aTit.startsWith(val) // compara se começa com o valor versao normalizada
                        // const bStarts = bTit.startsWith(val)

                        
                        let aStarts, bStarts

                        if(aTit.startsWith("[")){
                            aStarts = aTit.startsWith(val,1)
                        } else{
                            aStarts = aTit.startsWith(val) // compara se começa com o valor versao normalizada
                        }

                        if(bTit.startsWith("[")){
                            bStarts = bTit.startsWith(val,1)
                        } else{
                            bStarts = bTit.startsWith(val)
                        }

                        
                        

                        if(aStarts && !bStarts) return -1
                        if(!aStarts && bStarts) return 1

                        return aTit.localeCompare(bTit, 'pt', { sensitivity: 'base' })
                    })

                resPPage(filteredResultado.length, rPP)
                displayResultadotab(filteredResultado, value)

            } else {
                resPPage(textData.length, rPP)
                displayResultadotab(textData, value)
            }
        })

        /***************** autor pesquisa ********************/
        autorInput.addEventListener('input', (e) =>{ // n está confiavel!!
            let value = e.target.value

            if(value && value.trim().length > 0){
                value = value.trim().toLowerCase()

                const filteredResultado = textData
                    .filter(item => {
                        const author = normalize(item?.author || "") // n sei se o autor foi bem recolhido
                        const val = normalize(value)
                        return author.includes(val)
                    })
                    .sort((a,b) => { // ordem alfabetica com os valores dos resultados normalizados
                        const aAut = normalize(a.author)
                        const bAut = normalize(b.author)
                        const val = normalize(value) // input-value normalizado

                        const aStarts = aAut.startsWith(val) // compara se começa com o valor versao normalizada
                        const bStarts = bAut.startsWith(val)

                        if(aStarts && !bStarts) return -1
                        if(!aStarts && bStarts) return 1

                        return aAut.localeCompare(bAut, 'pt', { sensitivity: 'base' })
                    })

                resPPage(filteredResultado.length, rPP)

                displayResultadotab(filteredResultado, value)

            } else {
                resPPage(textData.length, rPP)
                displayResultadotab(textData, value)
            }
        })

    }

    function displayMapa(){
        div_textos.innerHTML = ""
        //div_textos.innerText = "click!! Mapa"

        //div para mapa
        let divMap = document.createElement("div")
        div_textos.appendChild(divMap)
        divMap.id = "map"

        const map = L.map("map", {
            center: [33.5, -23,5],
            zoom: 1.5,
        });


        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        



        ///////////////  Array de coordenadas  ////////////////
        const objListaCoord = []
        const coordMap = new Map() // array: [(coord, nomes: [array de nomes]), (...)]
        /*
        Objeto mapa:
        -> key-value pairs 
        -> remembers the original insertion order of the keys
        */

        //iteração sobre cada item 
        textData.forEach(item => {
            const id = item.id
            const locais = item.categorias.locais.locais_limpos
            const coords = item.categorias.locais.coordenadas_geograficas


            // iteração sobre cada localização e coordenada correspondente
            locais.forEach((local, index) => {
                const coord = coords[index]
                const coordKey = JSON.stringify(coord) // usa string key para mapa

                // se coordenada não existe, cria
                if(!coordMap.has(coordKey)){ // 
                    coordMap.set(coordKey, {
                        coordenada: coord,
                        nomes: []
                    })
                }

                //descobre se este 'nome' já existe para a coordenada
                const coordObj = coordMap.get(coordKey)
                let nomeObj = coordObj.nomes.find(n => n.nome === local)

                // se nome não existe, cria
                if(!nomeObj){
                    nomeObj = {
                        nome: local,
                        textos: []
                    }
                    coordObj.nomes.push(nomeObj)
                }

                // adiciona id ao array de textos se não estiver la
                if(!nomeObj.textos.includes(id)){
                    nomeObj.textos.push(id)
                }
            })
        })

        // Converte mapa para array
        coordMap.forEach(value => {

            // ordena nomes (primeiro por nTextos (des) depois AZ)
            value.nomes.sort((a, b) => {
                if(b.textos.length !== a.textos.length){
                return b.textos.length - a.textos.length // desc por numero de textos
                } 
                return a.nome.localeCompare(b.nome) // alfabetica se igual
            })

            // Calcula o total de textos para a coordenada
            const uniqueTextos = new Set()
            value.nomes.forEach(nomeObj => {
                nomeObj.textos.forEach(id => uniqueTextos.add(id))
            })
            value.nTextos = uniqueTextos.size

            objListaCoord.push(value)
        })

        console.log(objListaCoord) // funciona!!
///////////////////////////////////////////////////////////////////////////////////////

        //*******  Escala do mapa  ********/        
        L.control.scale({ // adicioa a escala em baixo
            metric: true,
            imperial: false
        }).addTo(map)

        //*******  Div para display de informações  ********/  
        const InfoControl = L.Control.extend({
            onAdd: function(map) {
                const div = L.DomUtil.create('div', 'info-control')
                div.innerHTML = '<div class = "info-content-map">Clica sobre um icon</div>'
                div.style.backgroundColor = "white"
                div.style.padding = "20px"
                div.style.display = "block"
                return div
            }
        })

        //adiciona control ao mapa
        const infoControl = new InfoControl({position: 'topright'})
        infoControl.addTo(map)


        /*********  ICON DO MAPA  **********/
        var leafletIcon = L.icon ({
            iconUrl: './imagens/m2.svg',
            shadowUrl:'./imagens/s6.png',
            iconSize: [25, 35],
            iconAnchor: [12.5,35],
            // shadowAnchor:[150/2, 171/2], // icon lateral
            // shadowSize:[341/2, 312/2]
            shadowAnchor:[7, 30], // icon svg
            shadowSize:[40/1.5, 43/1.5],
            popupAnchor: [2, -30]
        })

        // com marker
        const marker = [];
        for(let i = 0; i < objListaCoord.length; i++){
          // coordenadas
          let lat = get_latitude(objListaCoord[i].coordenada)
          let lon = get_longitude(objListaCoord[i].coordenada)

          let nome_original = objListaCoord[i].nomes[0].nome
          let nome = titleCase(nome_original, stoplist)

          // info textos:
          let infoTextos = []
       

          // para cada nome
          for(let j = 0; j < objListaCoord[i].nomes.length; j++){
            let nome_original = objListaCoord[i].nomes[j].nome // nome atual
            let nome = titleCase(nome_original, stoplist)
            let id_textospnome = objListaCoord[i].nomes[j].textos // array de ids

            let infoTextpnome = []

            //percorre cada textos do nome
            for(let l = 0; l < objListaCoord[i].nomes[j].textos.length; l++){
                let id = id_textospnome[l]
                let titulo = textData.find(x => x.id === id).title
                let autor = textData.find(x => x.id === id).author
                let ano = textData.find(x => x.id === id).date_of_publication

                infoTextpnome.push({
                    id: id,
                    titulo: titulo,
                    autor: autor,
                    ano: ano
                })
            }

            infoTextos.push({
                nome_original:nome_original,
                nome:nome,
                textos: infoTextpnome
            })
          }


          marker[i] = L.marker([lat, lon], {
            icon:leafletIcon,
            title: nome,
        })
            .addTo(map)
            .bindPopup(
            `<a href="p_categoria_especifica.html?categoria=Locais&especifica=${nome_original}">${nome}</a>`
            )

           marker[i].on("click", function(e){
                const controlDiv = document.querySelector(".info-control")
                controlDiv.style.display = 'block'

                //gerar html para todos os nomes e seus textos
                let htmlContent = ''

                infoTextos.forEach(nomeObj => {
                    htmlContent += `<h3>${nomeObj.nome}</h3>`

                    htmlContent+= `<div class = "scrollable scrollable-${nomeObj.nome_original.replace(" ", "-")}">`

                    nomeObj.textos.forEach(texto => {
                        htmlContent += `<p> <a href= ''> ${texto.titulo} </a>, 
                                            <a href= ''> ${texto.autor} </a>, 
                                            <a href= ''> ${texto.ano} </a></p>`
                    })

                    htmlContent+= `</div>`

                    // let scroll = document.querySelector(`.scrollable`)
                    // if(nomeObj.textos.length > 6){
                    //     scroll.style.overflow = "auto"
                    // }
                })


                document.querySelector(".info-content-map").innerHTML = htmlContent
            })
          //teste de display com circulos (raio correspondente a n de textos) + popup com frequencia
        }

        const circ = []
        for(let i = 0; i < objListaCoord.length; i++){
            let lat = get_latitude(objListaCoord[i].coordenada)
            let lon = get_longitude(objListaCoord[i].coordenada)

            let nome_original = objListaCoord[i].nomes[0].nome
            let nome = titleCase(nome_original, stoplist)
            let nTextos = objListaCoord[i].nTextos + 2

            circ[i] = L.circle([lat, lon], {
                color: "#223F29",
                fillColor: '#223f29a4',
                fillOpacity: 1,
                radius: 9000*nTextos,
                title: 'lala',
            }).addTo(map)
                .bindPopup(`<a href="p_categoria_especifica.html?categoria=Locais&especifica=${nome_original}">${nome}</a>, nTextos: ${objListaCoord[i].nTextos}`)

            circ[i].on("click", function(e){
                const controlDiv = document.querySelector(".info-control")
                controlDiv.style.display = 'block'
                document.querySelector(".info-content-map").innerHTML = `
                    <h3>Nome ${nome}</h3>
                    <p>Detalhes</p>
                `
            })
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

    displayMapa()
    //displayAmostra() // display amostra como default (n tem problema com acumulação)
    //displayTabela()


    /***********  Display das funções  ***********/


}



