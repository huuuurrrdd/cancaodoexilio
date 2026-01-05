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

    function cria_textos_por_ano(textData, startYear, endYear){

        let textos_por_ano = []

        //inicializa todos os anos
        for (let year = startYear; year <= endYear; year++) {
            textos_por_ano.push({
                year: year,
                texts: [],
                textCount: 0
            });
        }

        // Group texts by year
        textData.forEach(text => {
            const year = text.date_of_publication;
            const yearIndex = year - startYear;
            
            if (yearIndex >= 0 && yearIndex < textos_por_ano.length) {
                textos_por_ano[yearIndex].texts.push(text);
                textos_por_ano[yearIndex].textCount++
            }
        });
        
        return textos_por_ano;

    } 

    let textos_por_ano = cria_textos_por_ano(textData, 1846, 2025)
    let lista_anos = textos_por_ano.map(item => item.year)
    let lista_ntextos = textos_por_ano.map(item => item.textCount)

    
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


    //calcula maxAno 
    const validYears = textData
    .map(r => r.date_of_publication)
    .filter(year => typeof year === 'number' && !isNaN(year))
    const maxAno = validYears.length > 0 ? Math.max(...validYears) : 2025
    console.log(`Ano máximo: ${maxAno}`)

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

    /******************  Cria grafico  *******************/    
    let grafico_ct = document.createElement("div")
    margem_ct.appendChild(grafico_ct)
    grafico_ct.className = "grafico-ct"

    canvas = document.createElement("canvas")
    grafico_ct.append(canvas)
    canvas.className = "grafico-textos-p-ano"

    const ctx = canvas

    //*********** Teste com gráfico de barra **********/
    new Chart(ctx, {
        type: "bar",
        data: {
        labels: lista_anos,
        datasets: [
            {
            label: "Numero de textos em cada ano",
            data: lista_ntextos,
            borderWidth: 0,
            //borderColor: '#223F29',
            backgroundColor: '#223F29'
            },
        ],
        },
        options: {
        plugins: {
            tooltip: {
            callbacks: {
                label: function (context) {
                return `Textos: ${context.parsed.y}`;
                },
            },
            },
        },
        responsive: true,
        scales: {
            y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Número de textos'
            }
            },
            x: {
            title: {
                display: true,
                text: 'Ano'
            }
            }
        },
        },
    });
    
    
    //div para display dos resultados
    div_textos = document.createElement("div")
    textos_container.appendChild(div_textos)
    div_textos.className += "div-textos div-textos-display"
    //div_textos.innerHTML = "lala"


    function displayTabela(){
        div_textos.innerHTML = ""

        // Store current results to use across all operations
        let currentResults = textData

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
                                        <h2 class = "ano-o-h"><a href = './p_categoria.html?categoria=Anos'>Ano</a></h2>
                                        <p id = "Ord-Dat">Ord: ${ordDat}</p>
                                        <div id = "caixa-ano"> 
                                            <div id="ano-search-slider" class="ano-input-container">
                                                <div class="slider">
                                                    <div class="ano-slider"></div>
                                                </div>
                                                <div class="range-input">
                                                    <span class="value-tooltip min-tooltip"></span>
                                                    <span class="value-tooltip max-tooltip"></span>
                                                    <input type="range" class="min-range" min="1846" max="${maxAno}" value="1846" step="1">
                                                    <input type="range" class="max-range" min="1846" max="${maxAno}" value="${maxAno}" step="1">
                                                </div>
                                                <!--<div class = "ano-input-field">
                                                    <div class = "ano-field">
                                                        <input type="number" class = "min-input" id="ano-min-input" value="1">
                                                    </div>
                                                    <div class = "ano-field">
                                                        <input type="number" class = "max-input" id="ano-max-input" value="${maxAno}">
                                                    </div>
                                                </div>-->
                                            </div>
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
                                        <h2 class = "aut-o-h"><a href = './p_categoria.html?categoria=Autores'>Autor</a></h2>
                                        <p id = "Ord-Aut">Ord: ${ordAut}</p>
                                        <div id = "autortxt-search-bar">
                                            <input id="autortxt-input" class="input-h" aria-label="autor?" type="text" class="autortxt-search-bar__input" placeholder="autor?" autofocus required>
                                            <input id="autortxt-submit" type="image" class="autortxt-search-bar__button bt-h" src='./imagens/lupa.svg' aria-label=""search>
                                        </div>
                                    </div>`
                  

        /*:::::  Botoes  :::::*/
        const titulSubmitButton = document.querySelector('#titultxt-submit')
        const titulInput = document.querySelector('#titultxt-input')
        const autorSubmitButton = document.querySelector('#autortxt-submit')
        const autorInput = document.querySelector('#autortxt-input')

        //ano sliders
        const anoRangeValue = document.querySelector(".slider .ano-slider")
        const anoRangeInputValue = document.querySelectorAll(".ano-input-container .range-input input")
        const anoMinToolTip = document.querySelector(".ano-input-container .min-tooltip")
        const anoMaxToolTip = document.querySelector(".ano-input-container .max-tooltip")

        let anoGap = 1
        let anoMinTimeOut, anoMaxTimeOut

        /*::::::::::::::::::  Year Slider Helper Functions  ::::::::::::::::::*/
        function updateAnoSlider(){
            let minVal = parseInt(anoRangeInputValue[0].value)
            let maxVal = parseInt(anoRangeInputValue[1].value)
            let maxRange = parseInt(anoRangeInputValue[0].max)
            let minRange = parseInt(anoRangeInputValue[0].min)

            let leftPercent = ((minVal - minRange) / (maxRange - minRange)) * 100
            let rightPercent = 100 - ((maxVal - minRange) / (maxRange - minRange)) * 100

            anoRangeValue.style.left = `${leftPercent}%`
            anoRangeValue.style.right = `${rightPercent}%`

            updateAnoTooltipPosition(anoMinToolTip, minVal, maxRange, minRange)
            updateAnoTooltipPosition(anoMaxToolTip, maxVal, maxRange, minRange)

            anoMinToolTip.textContent = minVal
            anoMaxToolTip.textContent = maxVal
        }

        function updateAnoTooltipPosition(tooltip, value, max, min){
            const percentage = ((value-min) / (max-min)) * 100
            tooltip.style.left = `${percentage}%`
        }

        function showAnoTooltip(tooltip){
            clearTimeout(tooltip === anoMinToolTip ? anoMinTimeOut : anoMaxTimeOut)
            tooltip.classList.add('show')
        }


        function hideAnoTooltip(tooltip){
            if(tooltip === anoMinToolTip){
                anoMinTimeOut = setTimeout(() => tooltip.classList.remove('show'), 1000)
            } else {
                anoMaxTimeOut = setTimeout(() => tooltip.classList.remove('show'), 1000)
            }
        }

        // conteudo após header //////////////////////
        let container = document.createElement("div")
        document.querySelector(".list-all-container").appendChild(container)
        container.className = "container"

        function displayResultadotab(resultado, valor){

            // Update currentResults whenever displaying
            currentResults = resultado || textData
            // console.log(arrayResultados)

            /*:::::  Atualiza os headers  :::::*/
            document.querySelector('#Ord-Tit').textContent = `Ord: ${ordTit}`
            document.querySelector('#Ord-Aut').textContent = `Ord: ${ordAut}`
            document.querySelector('#Ord-Dat').textContent = `Ord: ${ordDat}`

            container.innerHTML = ""

            //let total = textData.length
            //iteração para display
            if(!resultado || resultado.length === 0){
                container.innerHTML = `<p>Não foram encontrados resultados para: "${valor}" </p><br><br>`
            } else{
                for(let i = arrayResultados[iP].st; i < arrayResultados[iP].en; i++){
                    //cria a div principal
                    let ct_item = document.createElement("div")
                    ct_item.className += "ct-item ct-item" + (i+1)
                    container.appendChild(ct_item)

                    ct_item.innerHTML = `<a class = "ano" href="p_categoria_especifica.html?categoria=Anos&especifica=${resultado[i].date_of_publication}"><span>${resultado[i].date_of_publication}</span></a>
                                        <a class = "titul" href="index.html?id=${resultado[i].id}"><span>${resultado[i].title}</span></a>
                                        <a class = "author" href="p_categoria_especifica.html?categoria=Autores&especifica=${resultado[i].author}"><span>${resultado[i].author}</span></a>`
                }
            }

            /*:::::  Display de páginas de resultados  :::::*/
            const oldPages = list_all_container.querySelector('.n-page-ct')
            if(oldPages) oldPages.remove()

            let nPages = document.createElement("div")
            list_all_container.appendChild(nPages)
            nPages.className += "n-page n-page-ct"

            if(resultado && resultado.length > 0){
                for(let i = 0; i < arrayResultados.length; i++){
                    let nPage = document.createElement("a")
                    nPages.appendChild(nPage)
                    nPage.className += "n-page-i n-page" + i
                    nPage.id = `n-page${i}`
                    nPage.innerText = i+1
                    nPage.addEventListener('click', (e) =>{
                        iP = i
                        displayResultadotab(resultado, valor)
                    })
                    nPage.innerHTML += `<style> #n-page${i}:hover{background-color:#223F29; cursor:pointer; color:#FFFEF2}</style>`
                }
            }

            const currentPage = document.querySelector('#n-page' + iP)
            if(currentPage){
                currentPage.style.backgroundColor = "#223F29"
                currentPage.style.color = "#FFFEF2"
            }
        }

        // Initialize slider
        updateAnoSlider()

        displayResultadotab(textData)


        /*:::::::::::  ____________FILTROS____________  :::::::::::*/

        /***************** Ordem Alfabetica [titulo] ********************/
        document.querySelector('#Ord-Tit').addEventListener('click', (e) => { // filtros funcionais
            ordTitleTxt(ordTit_, currentResults) // Use currentResults
            iP = 0
            resPPage(currentResults.length, rPP)
            displayResultadotab(currentResults)
        })

        /***************** Ordem Alfabetica [autor] ********************/
        document.querySelector('#Ord-Aut').addEventListener('click', (e) => {
            ordAutores(ordAut_, currentResults) // Use currentResults
            iP = 0
            resPPage(currentResults.length, rPP)
            displayResultadotab(currentResults)
        })

        /***************** Ordem cronologica ********************/
        document.querySelector('#Ord-Dat').addEventListener('click', (e) => {
            ordData(ordDat_, currentResults) // Use currentResults
            iP = 0
            resPPage(currentResults.length, rPP)
            displayResultadotab(currentResults)
        })

        /*:::::::::::  __Pesquisa livre__  :::::::::::*/

        /***************** Title pesquisa ********************/
        titulInput.addEventListener('input', (e) =>{
            let value = e.target.value
            if(value && value.trim().length > 0){
                value = value.trim().toLowerCase()
                const filteredResultado = textData
                    .filter(item => {
                        const title = normalize(item?.title || "")
                        const val = normalize(value)
                        return title.includes(val)
                    })
                    .sort((a,b) => {
                        const aTit = normalize(a.title)
                        const bTit = normalize(b.title)
                        const val = normalize(value)

                        let aStarts = aTit.startsWith("[") ? aTit.startsWith(val,1) : aTit.startsWith(val)
                        let bStarts = bTit.startsWith("[") ? bTit.startsWith(val,1) : bTit.startsWith(val)

                        if(aStarts && !bStarts) return -1
                        if(!aStarts && bStarts) return 1

                        return aTit.localeCompare(bTit, 'pt', { sensitivity: 'base' })
                    })

                iP = 0
                resPPage(filteredResultado.length, rPP)
                displayResultadotab(filteredResultado, value)

            } else {
                iP = 0
                resPPage(textData.length, rPP)
                displayResultadotab(textData)
            }
        })

        /***************** autor pesquisa ********************/
        autorInput.addEventListener('input', (e) =>{
            let value = e.target.value
            if(value && value.trim().length > 0){
                value = value.trim().toLowerCase()
                const filteredResultado = textData
                    .filter(item => {
                        const author = normalize(item?.author || "")
                        const val = normalize(value)
                        return author.includes(val)
                    })
                    .sort((a,b) => {
                        const aAut = normalize(a.author)
                        const bAut = normalize(b.author)
                        const val = normalize(value)
                        const aStarts = aAut.startsWith(val)
                        const bStarts = bAut.startsWith(val)

                        if(aStarts && !bStarts) return -1
                        if(!aStarts && bStarts) return 1

                        return aAut.localeCompare(bAut, 'pt', { sensitivity: 'base' })
                    })

                iP = 0
                resPPage(filteredResultado.length, rPP)
                displayResultadotab(filteredResultado, value)

            } else {
                iP = 0
                resPPage(textData.length, rPP)
                displayResultadotab(textData)
            }
        })

         /*:::::::: Event listeners for year slider ::::::::*/
        anoRangeInputValue[0].addEventListener("mousedown", () => showAnoTooltip(anoMinToolTip))
        anoRangeInputValue[0].addEventListener("touchstart", () => showAnoTooltip(anoMinToolTip))
        anoRangeInputValue[1].addEventListener("mousedown", () => showAnoTooltip(anoMaxToolTip))
        anoRangeInputValue[1].addEventListener("touchstart", () => showAnoTooltip(anoMaxToolTip))

        for (let i = 0; i < anoRangeInputValue.length; i++) {
            anoRangeInputValue[i].addEventListener("input", e => {
                let minVal = parseInt(anoRangeInputValue[0].value)
                let maxVal = parseInt(anoRangeInputValue[1].value)
                let diff = maxVal - minVal

                if(e.target.className === "min-range"){
                    showAnoTooltip(anoMinToolTip)
                } else {
                    showAnoTooltip(anoMaxToolTip)
                }

                if(diff < anoGap){
                    if(e.target.className === "min-range"){
                        anoRangeInputValue[0].value = maxVal - anoGap
                        minVal = maxVal - anoGap
                    } else {
                        anoRangeInputValue[1].value = minVal + anoGap
                        maxVal = minVal + anoGap
                    }
                }

                updateAnoSlider()

                // Filter results by year
                const filteredResultado = textData.filter(item => {
                    const year = item.date_of_publication
                    return year >= minVal && year <= maxVal
                })

                // Sort by year (ascending)
                filteredResultado.sort((a, b) => a.date_of_publication - b.date_of_publication)

                iP = 0
                resPPage(filteredResultado.length, rPP)
                displayResultadotab(filteredResultado, `ano: ${minVal}-${maxVal}`)
            })

            anoRangeInputValue[i].addEventListener("mouseup", (e) => {
                if(e.target.className === "min-range"){
                    hideAnoTooltip(anoMinToolTip)
                } else {
                    hideAnoTooltip(anoMaxToolTip)
                }
            })

            anoRangeInputValue[i].addEventListener("touchend", (e) => {
                if(e.target.className === "min-range"){
                    hideAnoTooltip(anoMinToolTip)
                } else {
                    hideAnoTooltip(anoMaxToolTip)
                }
            })
        }

    }

    displayTabela()

}



