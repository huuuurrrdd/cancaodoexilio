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



function displayData(wordData, textData,stoplist, lemmasData){


    
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

    // Criar objeto de categorias (com)
    /*  Criar objeto de categorias, para cada categoria:
        categoria{
            locais{
                { "local": nome1,
                 "textos_mencionam": id1, id2, id3
            }
            }
        }
    
    
    */
    // let total_categorias = []

    // for(let i = 0; i < textData.length; i++){
    //     const categorias  = textData[i].categorias

    //     //percorre as chaves de categorias (locais, fauna, flora)
    //     for(let cat in categorias){
    //         total_categorias.push({
    //             categorias: cat,
    //             dados: categorias[cat]
    //         })
    //     }
    // }

    // console.log("cat" + total_categorias)

    // funcao para array de objetos de palavras para uma categoria (sem contar com excecao)
    function arrayPalavrasCat (textData, categoria){

        let all_entries = [] // array of objects { nome, textId }

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
        }else if(categoria === "palavra"){
    
            for(let i = 0; i < wordData.length; i++){
                const valor = wordData.palavras[i].palavra
                if(valor !== undefined && valor !== null && valor !== ""){
                    //n sei como contabilizar...
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



        //Now group by nome
        let categoryMap = new Map()

        for(let item of all_entries){
            if(
                !categoryMap.has(item.nome)) {
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
    let arrayFauna = arrayPalavrasCat (textData, "fauna")
    let arrayFlora = arrayPalavrasCat (textData, "flora")
    let arrayLocal = arrayPalavrasCat (textData, "locais")
    let array__Ano = arrayPalavrasCat (textData, "date_of_publication")
    let arrayAutor = arrayPalavrasCat (textData, "author")

    //console.log(arrayAutor[0]) //funcioona
    //console.log(array__Ano[4].nome) //n funciona (provavelmente por ser um nº)

    // obter lista ordenada por frequencia, em cada categoria (falta ano e autores)
    let faunaOrd = arrayFauna.sort((a, b) => b.textos_menc.length - a.textos_menc.length)
    let floraOrd = arrayFlora.sort((a, b) => b.textos_menc.length - a.textos_menc.length)
    let localOrd = arrayLocal.sort((a, b) => b.textos_menc.length - a.textos_menc.length)
    let ano__Ord = array__Ano.sort((a, b) => b.textos_menc.length - a.textos_menc.length)
    let autorOrd = arrayAutor.sort((a, b) => b.textos_menc.length - a.textos_menc.length)
    //console.log(ano__Ord[0]) //funciona

    // obter 6 palavras mais frequentes de cada categoria
    let l = 6
    let faunaSeis = faunaOrd.slice(0, l)
    let floraSeis = floraOrd.slice(0, l)
    let localSeis = localOrd.slice(0, l)
    let ano__Seis = ano__Ord.slice(0, l)
    let autorSeis = autorOrd.slice(0, l)

    //array de nomes e array de valores
    let faunaSNome = []
    let floraSNome = []
    let localSNome = []
    let ano__SNome = []
    let autorSNome = []
    
    let faunaSVal = []
    let floraSVal = []
    let localSVal = []
    let ano__SVal = []
    let autorSVal = []

    for(let i = 0; i < 6; i++){
        faunaSNome.push(faunaSeis[i].nome)
        floraSNome.push(floraSeis[i].nome)
        localSNome.push(localSeis[i].nome)
        ano__SNome.push(ano__Seis[i].nome)
        autorSNome.push(autorSeis[i].nome)

        faunaSVal.push(faunaSeis[i].textos_menc.length)
        floraSVal.push(floraSeis[i].textos_menc.length)
        localSVal.push(localSeis[i].textos_menc.length)
        ano__SVal.push(ano__Seis[i].textos_menc.length)
        autorSVal.push(autorSeis[i].textos_menc.length)
    }
    




    //Objeto com informações das categorias (para que este objeto seja editável)
    let categoria = [
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


/*     //Pode fazer sentido criar um objeto
    let cate = ["Locais", "Fauna", "Flora", "Autores", "Anos"]
    let graf = []
    let labels_cat = ["Pernambuco", "Baía", "Maranhão", "Sertão", "Minas Gerais", "Corrientes"]
    let labels_cat_value = [12, 19, 3, 5, 2, 3]
    //calcular elementos mais frequentes das categorias

    //console.log(categoria[0].categoria.toLowerCase()) */


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
        info_grafico_cat.innerHTML = "Versão de testee"

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
                    beginAtZero: true,
                    grid:{
                        drawTicks: false
                    },
                    ticks: {
                        stepSize: 20,
                        padding: 10,
                        font:{
                            size: 10
                        }
                    }
                }
            }
        }
    });

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



