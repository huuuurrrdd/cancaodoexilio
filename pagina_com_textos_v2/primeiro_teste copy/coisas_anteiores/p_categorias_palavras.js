/*

    Script para pág de categorias de palavras

*/



//*************  Acesso a dados  ****************/
function fetchData(){
    let wordData, textData, stoplist, lemmasData

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
            displayData(wordData, textData,stoplist, lemmasData) //funcao com os 2 jsons
        })
        .catch(error => console.error('Failed to fetch data', error))
}

fetchData()



function displayData(wordData, textData, stoplist, lemmasData){

    let isChecked_original = false
    let palavrasOriginal = extractOriginalWords(textData[0].texto_completo)
    
    // função para renderizar tudo - dentro de função para que possa ser chamado outra vez
    function renderCategories() {
        //limpa conteudo existente ao re-renderizar
        const seccoesExistentes = document.querySelector(".categorias-sections")
        if(seccoesExistentes){
            seccoesExistentes.innerHTML= ""
        } else {
            //DISPLAY de elementos//

            /**********************  Contentor geral  ****************************/
            let categorias_container = document.createElement("div")
            document.querySelector("body").appendChild(categorias_container)
            categorias_container.className += "categorias-container"

            let margem_ct = document.createElement("div");
            categorias_container.appendChild(margem_ct);
            margem_ct.className = "margem-ct"

            //****************  Título de página  ******************/
            let title_h = document.createElement("h1")
            margem_ct.appendChild(title_h)
            title_h.className += "categoria-palavras-h page-title"
            title_h.innerText = `Categorias`

            //****************  Categorias-sections  ******************/
            let categorias_sections = document.createElement("div")
            document.querySelector(".categorias-container").appendChild(categorias_sections)
            categorias_sections.className += "categorias-sections"
            
        }

        // funcao para array de objetos de palavras para uma categoria (sem contar com excecao)
        function arrayPalavrasCat (textData, wordData, stoplist, categoria, excluiOriginal = false){

            let all_entries = [] // array of objects { nome, textId }
            let all_entries_ = []

            if(categoria === "locais"){

                for(let i = 0; i < textData.length; i++){
                    if(textData[i].categorias.locais.locais_limpos.length > 0){
                        for(let j = 0; j < textData[i].categorias.locais.locais_limpos.length; j++){
                            all_entries.push({
                                nome: textData[i].categorias.locais.locais_limpos[j], 
                                textId: textData[i].id
                            })
                        }
                    }
                }

            }else if(categoria === "date_of_publication" || categoria === "author" || categoria === "title"){ // acrescenta titulos

                for(let i = 0; i < textData.length; i++){
                    const valor = textData[i]?.[categoria]
                    if(valor !== undefined && valor !== null && valor !== ""){
                            all_entries.push({
                                nome: textData[i]?.[categoria], 
                                textId: textData[i].id 
                            })
                        
                    }
                }

            //tentar com palavra
            }else if(categoria === "palavra"){ //FALTA ELIMINAR STOP WORDS E PALAVRAS DO ORIGINAL
        
                for(let i = 0; i < wordData.palavras.length; i++){ // pensar melhor na logica!!!
                    const valor = wordData.palavras[i].palavra

                    //verifica se palavra deve ser excluida
                    const deveExcluir = excluiOriginal && palavrasOriginal.has(valor)

                    if(valor !== undefined && valor !== null && valor !== "" && !stoplist.includes(valor) && !deveExcluir){
                        for(let j = 0; j < wordData.palavras[i].textos.length; j++){
                            all_entries.push({
                                nome: wordData.palavras[i].palavra,
                                textId: wordData.palavras[i].textos[j].id_text  //é um array de objetos (id_text + frequencia)
                            })
                        }    
                    }
                }
            
            }else{

                for(let i = 0; i < textData.length; i++){
                    if(textData[i].categorias[categoria].length > 0){
                        for(let j = 0; j < textData[i].categorias[categoria].length; j++){
                            if(textData[i].categorias[categoria][j] != ""){
                                    all_entries.push({
                                    nome: textData[i].categorias[categoria][j], 
                                    textId: textData[i].id 
                                })
                            }
                        }
                    }
                }
            }

            console.log(all_entries)


            //Now group by nome
            let categoryMap = new Map()

            for(let item of all_entries){
                if(!categoryMap.has(item.nome)) {
                    categoryMap.set(item.nome, [])
                }
                categoryMap.get(item.nome).push(item.textId)
            }

            // convert to array of objects
            let result = Array.from(categoryMap, ([nome, ids]) => ({
                nome,
                textos_menc: ids
            }))

            return result

            //console.log(categoryArray.length)//.textos_menc.length) (532 entradas)
        }

        // obter array de objetos para cada uma das categorias
        let arrayPalav = arrayPalavrasCat (textData, wordData, stoplist, "palavra")
        let arrayFauna = arrayPalavrasCat (textData, wordData, stoplist, "fauna")
        let arrayFlora = arrayPalavrasCat (textData, wordData, stoplist, "flora")
        let arrayLocal = arrayPalavrasCat (textData, wordData, stoplist, "locais")
        let array__Ano = arrayPalavrasCat (textData, wordData, stoplist, "date_of_publication")
        let arrayAutor = arrayPalavrasCat (textData, wordData, stoplist, "author")

        //console.log(arrayAutor[0]) //funcioona
        //console.log(array__Ano[4].nome) //n funciona (provavelmente por ser um nº)

        // obter lista ordenada por frequencia, em cada categoria (falta ano e autores)
        let palavOrd = arrayPalav.sort((a, b) => b.textos_menc.length - a.textos_menc.length)
        let faunaOrd = arrayFauna.sort((a, b) => b.textos_menc.length - a.textos_menc.length)
        let floraOrd = arrayFlora.sort((a, b) => b.textos_menc.length - a.textos_menc.length)
        let localOrd = arrayLocal.sort((a, b) => b.textos_menc.length - a.textos_menc.length)
        let ano__Ord = array__Ano.sort((a, b) => b.textos_menc.length - a.textos_menc.length)
        let autorOrd = arrayAutor.sort((a, b) => b.textos_menc.length - a.textos_menc.length)
        //console.log(ano__Ord[0]) //funciona

        // obter 6 palavras mais frequentes de cada categoria
        let l = 6
        let palavSeis = palavOrd.slice(0, l)
        let faunaSeis = faunaOrd.slice(0, l)
        let floraSeis = floraOrd.slice(0, l)
        let localSeis = localOrd.slice(0, l)
        let ano__Seis = ano__Ord.slice(0, l)
        let autorSeis = autorOrd.slice(0, l)

        //array de nomes e array de valores
        let palavSNome = []
        let faunaSNome = []
        let floraSNome = []
        let localSNome = []
        let ano__SNome = []
        let autorSNome = []
        
        let palavSval = []
        let faunaSVal = []
        let floraSVal = []
        let localSVal = []
        let ano__SVal = []
        let autorSVal = []

        for(let i = 0; i < 6; i++){
            palavSNome.push(palavSeis[i].nome)
            faunaSNome.push(faunaSeis[i].nome)
            floraSNome.push(floraSeis[i].nome)
            localSNome.push(localSeis[i].nome)
            ano__SNome.push(ano__Seis[i].nome)
            autorSNome.push(autorSeis[i].nome)

            palavSval.push(palavSeis[i].textos_menc.length)
            faunaSVal.push(faunaSeis[i].textos_menc.length)
            floraSVal.push(floraSeis[i].textos_menc.length)
            localSVal.push(localSeis[i].textos_menc.length)
            ano__SVal.push(ano__Seis[i].textos_menc.length)
            autorSVal.push(autorSeis[i].textos_menc.length)
        }

        //1. Encontra min e max em todos os datasets
        function getGlobalMinMax(allDatasets) {
            let globalMin = Infinity
            let globalMax = -Infinity

            allDatasets.forEach(dataset => { // para cada um dos "datasets" descobre valor maior e menor
                dataset.forEach(value => {
                    if(value < globalMin) globalMin = value;
                    if(value > globalMax) globalMax = value
                })
            })

            //opcionalmente adiciona padding
            const padding = (globalMax - globalMax) * 0.1
            return{
                min: globalMin - padding,
                max: globalMax + padding
            }
        }

         //Objeto com informações das categorias (para que este objeto seja editável)
        let categoria = [
            {
                categoria: "Textos",
                labels_cat: localSNome,
                labels_cat_value: localSVal,
                mais_frequente: titleCase(localSNome[0], stoplist), //
                nome:localSNome[0],
                info_mais_frequente: ""
            },
            {
                categoria: "Palavras",
                labels_cat: palavSNome,
                labels_cat_value: palavSval,
                mais_frequente: titleCase(palavSNome[0], stoplist), //
                nome:palavSNome[0],
                info_mais_frequente: ""
            },
            {
                categoria: "Locais",
                labels_cat: localSNome,
                labels_cat_value: localSVal,
                mais_frequente: titleCase(localSNome[0], stoplist), //
                nome:localSNome[0],
                info_mais_frequente: ""
            },
            {
                categoria: "Fauna",
                labels_cat: faunaSNome,
                labels_cat_value: faunaSVal,
                mais_frequente: titleCase(faunaSNome[0], stoplist),
                nome: faunaSNome[0],
                info_mais_frequente: ""
            },
            {
                categoria: "Flora",
                labels_cat: floraSNome,
                labels_cat_value: floraSVal,
                mais_frequente: titleCase(floraSNome[0], stoplist),
                nome: floraSNome[0],
                info_mais_frequente: ""
            },
            {
                categoria: "Autores",
                labels_cat: autorSNome,
                labels_cat_value: autorSVal,
                mais_frequente: autorSNome[0],
                nome: autorSNome[0], 
                info_mais_frequente: ""
            },
            {
                categoria: "Anos",
                labels_cat: ano__SNome,
                labels_cat_value: ano__SVal,
                mais_frequente: ano__SNome[0],
                nome: ano__SNome[0],
                info_mais_frequente: ""
            },

        ]

        //2 Obter os dados
        let allData = []

        categoria.forEach(cat =>
            allData.push(cat.labels_cat_value)
        )

        const { min, max } = getGlobalMinMax(allData)

        categoria[1].labels_cat.forEach(label => {
            console.log(label)
        }) // estranho serem nomes de aves maioitariamente


        function displaySections(cat, labels, values, i, mais_frequente, nome){

            let cat_section = document.createElement("div")
            document.querySelector(".categorias-sections").appendChild(cat_section)
            cat_section.className += "cat-section cat-section-" + cat

            //******  dentro de cat-section  ******/
            //link para categoria:
            let link_categoria = document.createElement("a")
            document.querySelector(".cat-section-" + cat).appendChild(link_categoria)
            link_categoria.className += "cat-link cat-link-" + cat
            link_categoria.href = "./p_categoria.html?categoria=" + cat


            // //caixa para h2 e grafico (dentro do link)
            // let cat_section_ct = document.createElement("div")
            // document.querySelector(".cat-link-" + cat).appendChild(cat_section_ct)
            // cat_section_ct.className += "cat-section-ct cat-section-ct-" + cat

            //titulo
            let cat_header = document.createElement("h2")
            document.querySelector(".cat-link-" + cat).appendChild(cat_header)
            cat_header.className += "cat-header"
            cat_header.innerHTML = `${cat}`

            // texto descritivo do gráfico
            let info_grafico_cat = document.createElement("div")
            document.querySelector (".cat-link-" + cat).appendChild(info_grafico_cat)
            info_grafico_cat.className = "info-grafico-cat"

        
            info_grafico_cat.innerHTML = `<p>O elemento de ${cat} mais frequente é <strong>${categoria[i].labels_cat[0]}</strong>, mencionado em ${categoria[i].labels_cat_value[0]} textos (${formatPercentage(categoria[i].labels_cat_value[0], textData.length)}).</p> 
                                            <p>Segue-se <strong>${categoria[i].labels_cat[1]}</strong> mencionado em ${categoria[i].labels_cat_value[1]} textos (${formatPercentage(categoria[i].labels_cat_value[1], textData.length)}); 
                                                        <strong>${categoria[i].labels_cat[2]}</strong> mencionado em ${categoria[i].labels_cat_value[2]} textos (${formatPercentage(categoria[i].labels_cat_value[2], textData.length)});
                                                        <strong>${categoria[i].labels_cat[3]}</strong> mencionado em ${categoria[i].labels_cat_value[3]} textos (${formatPercentage(categoria[i].labels_cat_value[3], textData.length)});
                                                        <strong>${categoria[i].labels_cat[4]}</strong> mencionado em ${categoria[i].labels_cat_value[4]} textos (${formatPercentage(categoria[i].labels_cat_value[4], textData.length)});
                                                    e <strong>${categoria[i].labels_cat[5]}</strong> mencionado em ${categoria[i].labels_cat_value[5]} textos (${formatPercentage(categoria[i].labels_cat_value[5], textData.length)}).</p>`
        

            //grafico-mais-frequentes
            let grafico_cat_ct = document.createElement("div")
            document.querySelector(".cat-link-" + cat).appendChild(grafico_cat_ct)
            grafico_cat_ct.className += "grafico-cat-ct grafico-cat-ct-" + cat

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
                    backgroundColor: '#223F29'
                }]
            },
            options: {
                scales: {
                    x:{
                        grid:{
                            display: false
                        },
                        ticks:{
                            display: false
                        }
                    },
                    y: {
                        // min: min,
                        // max: max,
                        beginAtZero: true,
                        grid:{
                            display:false,
                            drawTicks: false
                        },
                        ticks: {
                            display:false // garantir a escala (o numero maior igual em todos os graficos)
                            // stepSize: 20,
                            // padding: 10,
                            // font:{
                            //     size: 10
                            // }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

        
        //Acrescenta checkbox se categoria for palavras
        if(cat == "Palavras"){
            let checkboxContainer = document.createElement('div')
            checkboxContainer.className = "checkbox-container" //pode-se alterar...
            checkboxContainer.style.cssText = "margin-top: 15px; padding: 10px; background-color: #f0f0f0; border-radius: 4px;"

            let checkboxPalav = document.createElement('input')
            checkboxPalav.type = "checkbox"
            checkboxPalav.id = "checkbox-pal-original"
            checkboxPalav.name = "exclui_palavras_original"
            checkboxPalav.value = "Excluir"

            let label = document.createElement('label')
            label.for = "exclui_palavras_original"
            label.innerText = "Excluir palavras do texto original"
            label.style.cssText = "margin-left: 8px; cursor: pointer;"

            checkboxContainer.appendChild(checkboxPalav)
            checkboxContainer.appendChild(label)
            document.querySelector (".cat-link-" + cat).appendChild(checkboxContainer)

            //teste anterior:
            //isChecked_original = document.querySelector('#checkbox-pal-original').checked

            //adicionar eventListener a checkbox!!!
            checkboxPalav.addEventListener('change', function(e) {
                isChecked_original = e.target.checked // e.target - verifica o valor??
                console.log("mudança de check:", isChecked_original)
                renderCategories() // Re-render everything
                //Regenerar dados de categoria
            })
        }




    /********************** Parte eliminada da wikipedia **********************/
            // //link para a caixa
            // let link_c_mais_frequente = document.createElement("a")
            // document.querySelector(`.cat-section-` + cat).appendChild(link_c_mais_frequente)
            // link_c_mais_frequente.className += "link-cat-freq-" + cat
            // link_c_mais_frequente.href = "./p_categoria_especifica.html?categoria=" + cat + "&especifica=" + nome

            // //outra caixa
            // let cat_mais_frequente = document.createElement("div")
            // document.querySelector(".link-cat-freq-" + cat).appendChild(cat_mais_frequente)
            // cat_mais_frequente.className += "cat-mais-frequente-ct" + cat

            // let cat_mais_frequente_header = document.createElement("h3")
            // document.querySelector(".cat-mais-frequente-ct" + cat).appendChild(cat_mais_frequente_header)
            // cat_mais_frequente_header.className += "cat-mais-frequente-header" + cat
            // cat_mais_frequente_header.innerHTML = mais_frequente

            // let cat_info_mais_frequente = document.createElement("div")
            // document.querySelector(".cat-mais-frequente-ct" + cat).appendChild(cat_info_mais_frequente)
            // cat_info_mais_frequente.className += "cat-info-mais-frequente" + cat
            // //cat_info_mais_frequente.innerHTML = info_mais_frequente

            // //console.log(nome)


            // const endpoint = 'https://pt.wikipedia.org/w/api.php?'
            // const params = {
            //     origin: '*', // non auhteticated requests
            //     format: 'json',
            //     action: 'query',
            //     prop: 'extracts',
            //     exchars: 200,
            //     exintro: true,
            //     explaintext: true,
            //     //exsentences: 1,
            //     generator: 'search',
            //     gsrlimit: 1

            // }

            // const clearPreviousResults = () => {
            //     cat_info_mais_frequente.innerHTML = ""
            // }

            // const isEspecificaEmpty = mais_frequente => {
            //     if(!mais_frequente || mais_frequente === '') return true
            //     return false
            // }

            // const showError = error => {
            //     cat_info_mais_frequente.innerHTML += `🚨 ${error} 🚨`
            // }

            // const showResults = results => {
            // results.forEach(result => {
            //     cat_info_mais_frequente.innerHTML += `
            //     <div class = "results__item"> 
            //         <a href = "https://pt.wikipedia.org/?curid=${result.pageId}" target="_blank" class= "card animated bounceInUp">
            //             <h2 class = "results__item__title">${result.title}</h2>
            //             <p class = "results__item__intro">${result.intro}</p>
            //         </a>
            //     </div>
            //     `
            // })}

            // const gatherData = pages => {
            //     const results = Object.values(pages).map(page =>({
            //         pageId: page.pageid,
            //         title: page.title,
            //         intro: page.extract
            //     }))

            //     showResults(results)
            // }

            // const getData = async() => {
            //     const nomeStr = String(nome || '')

            //     let nome_singular
            //     if(nomeStr.charAt(nome.length-1) == "s"){
            //         //console.log("Começa com s")
            //         nome_singular = nome.slice(0, -1)
            //     } else {
            //         nome_singular = nome
            //     }
            //     const palavra = nome_singular
            //     //let teste = nome.charAt(nome.length-1)
            //     //console.log(nome_singular)
            //     if(isEspecificaEmpty(palavra)) return

            //     params.gsrsearch = palavra
            //     clearPreviousResults()

            //     try {
            //         const { data } = await axios.get(endpoint, { params }) // data é o objeto gerado pela wikipedia API

            //         if(data.error) throw new Error(data.error.info)
            //         if (!data.query) throw new Error("Nenhum resultado encontrado.");

            //         gatherData(data.query.pages)

            //     } catch (error) {
            //         showError(error)
            //     }

            // }

            // getData()

        }

        for(let i = 0; i < categoria.length; i++){
            let categ = categoria[i].categoria
            let labell = categoria[i].labels_cat
            let labell_value = categoria[i].labels_cat_value

            let mais_frequente = categoria[i].mais_frequente
            //let info_mais_frequente = categoria[i].info_mais_frequente
            let nome = categoria[i].nome


            displaySections(categ, labell, labell_value, i, mais_frequente, nome)
        }

    }




/*     //Pode fazer sentido criar um objeto
    let cate = ["Locais", "Fauna", "Flora", "Autores", "Anos"]
    let graf = []
    let labels_cat = ["Pernambuco", "Baía", "Maranhão", "Sertão", "Minas Gerais", "Corrientes"]
    let labels_cat_value = [12, 19, 3, 5, 2, 3]
    //calcular elementos mais frequentes das categorias

    //console.log(categoria[0].categoria.toLowerCase()) */


    




 
    


}

/*::::::::::::::::  Funções auxiliares  ::::::::::::::::*/
//decide o numero de casas decimais conforme necessidade
function formatPercentage(value, total) {
    
    const percentage = (value / total) * 100;
    
    if (percentage === 0) {
        return "0%";
    }
    
    // If rounded to integer would be 0, show decimals
    if (Math.floor(percentage) === 0) {
        return percentage.toFixed(1) + "%";
    }
    
    return Math.floor(percentage) + "%";
}

//extrai set de palavras de um determinado texto
function extractOriginalWords(text) {
    const cleaned = text
        .replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~–]/g, '')
        .replace(/[\r\n]+/gm, ' ')

    return new Set(cleaned.split(' ').filter(w => w.length > 0).map(w => w.toLowerCase()))
}