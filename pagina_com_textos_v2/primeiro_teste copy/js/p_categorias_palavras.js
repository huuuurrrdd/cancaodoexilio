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
        function arrayPalavrasCat (textData, wordData, stoplist, categoria){

            let all_entries = [] // array of objects { nome, textId }
            let all_texts = [] // versao para os textos
            

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

                    //verifica condições incluindo estado de checkbox
                    if(valor !== undefined && valor !== null && valor !== "" && !stoplist.includes(valor)){

                        // apenas exclui se checkbox isChecked
                        if(isChecked_original && palavrasOriginal.has(valor)){
                            continue; // passa palavra à frente
                        }

                        for(let j = 0; j < wordData.palavras[i].textos.length; j++){
                            all_entries.push({
                                nome: wordData.palavras[i].palavra,
                                textId: wordData.palavras[i].textos[j].id_text  //é um array de objetos (id_text + frequencia)
                            })
                        }    
                    }
                }
            
            }else if (categoria === "texto"){

                for(let i = 0; i < textData.length; i++){
                    all_texts.push({
                        text: textData[i].id,
                        titu: textData[i].title,
                        palavr_diff: extractOriginalWords(textData[i].texto_completo).size
                    })
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

            //console.log(all_entries)
            console.log(all_texts)

            if(categoria !== "texto"){
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
            } else {
                return all_texts
            }

            //console.log(categoryArray.length)//.textos_menc.length) (532 entradas)
        }

        // obter array de objetos para cada uma das categorias
        let arrayTexto = arrayPalavrasCat (textData, wordData, stoplist, "texto")
        let arrayPalav = arrayPalavrasCat (textData, wordData, stoplist, "palavra")
        let arrayFauna = arrayPalavrasCat (textData, wordData, stoplist, "fauna")
        let arrayFlora = arrayPalavrasCat (textData, wordData, stoplist, "flora")
        let arrayLocal = arrayPalavrasCat (textData, wordData, stoplist, "locais")
        let array__Ano = arrayPalavrasCat (textData, wordData, stoplist, "date_of_publication")
        let arrayAutor = arrayPalavrasCat (textData, wordData, stoplist, "author")

        //console.log(arrayAutor[0]) //funcioona
        //console.log(array__Ano[4].nome) //n funciona (provavelmente por ser um nº)

        // obter lista ordenada por frequencia, em cada categoria
        let textoOrd = arrayTexto.sort((a, b) => b.palavr_diff - a.palavr_diff)
        let palavOrd = arrayPalav.sort((a, b) => b.textos_menc.length - a.textos_menc.length)
        let faunaOrd = arrayFauna.sort((a, b) => b.textos_menc.length - a.textos_menc.length)
        let floraOrd = arrayFlora.sort((a, b) => b.textos_menc.length - a.textos_menc.length)
        let localOrd = arrayLocal.sort((a, b) => b.textos_menc.length - a.textos_menc.length)
        let ano__Ord = array__Ano.sort((a, b) => b.textos_menc.length - a.textos_menc.length)
        let autorOrd = arrayAutor.sort((a, b) => b.textos_menc.length - a.textos_menc.length)
        //console.log(ano__Ord[0]) //funciona

        // obter 6 palavras mais frequentes de cada categoria
        let l = 6
        let textoSeis = textoOrd.slice(0, l) // os 6 textos com maior variedade de palavras
        let palavSeis = palavOrd.slice(0, l)
        let faunaSeis = faunaOrd.slice(0, l)
        let floraSeis = floraOrd.slice(0, l)
        let localSeis = localOrd.slice(0, l)
        let ano__Seis = ano__Ord.slice(0, l)
        let autorSeis = autorOrd.slice(0, l)

        //array de nomes e array de valores
        let textoStitu = []
        let palavSNome = []
        let faunaSNome = []
        let floraSNome = []
        let localSNome = []
        let ano__SNome = []
        let autorSNome = []
        
        let textoSval = []
        let palavSval = []
        let faunaSVal = []
        let floraSVal = []
        let localSVal = []
        let ano__SVal = []
        let autorSVal = []

        for(let i = 0; i < 6; i++){
            textoStitu.push(textoSeis[i].titu)
            palavSNome.push(palavSeis[i].nome)
            faunaSNome.push(faunaSeis[i].nome)
            floraSNome.push(floraSeis[i].nome)
            localSNome.push(localSeis[i].nome)
            ano__SNome.push(ano__Seis[i].nome)
            autorSNome.push(autorSeis[i].nome)

            textoSval.push(textoSeis[i].palavr_diff)
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
                labels_cat: textoStitu,
                labels_cat_value: textoSval,
                mais_frequente: titleCase(textoStitu[0], stoplist), //
                nome:textoStitu[0],
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

        // categoria[1].labels_cat.forEach(label => {
        //     console.log(label)
        // }) // estranho serem nomes de aves maioitariamente


        function displaySections(cat, labels, values, i, mais_frequente, nome){

            let cat_section = document.createElement("div")
            document.querySelector(".categorias-sections").appendChild(cat_section)
            cat_section.className += "cat-section cat-section-" + cat

            //******  dentro de cat-section  ******/
            //link para categoria:
            let link_categoria = document.createElement("a")
            document.querySelector(".cat-section-" + cat).appendChild(link_categoria)
            link_categoria.className += "cat-link cat-link-" + cat
            // if(cat != 'Palavras'){
            //     link_categoria.href = "./p_categoria.html?categoria=" + cat
            // }

            //titulo
            let cat_header = document.createElement("h2")
            document.querySelector(".cat-link-" + cat).appendChild(cat_header)
            cat_header.className += "cat-header"
            if(cat === "Palavras"){
                cat_header.innerHTML = `<a href="./lista_todas_palavras.html">${cat}</a>`
            } else if(cat === "Textos"){
                cat_header.innerHTML = `<a href= "./lista_textos.html">${cat}</a>`
            } else {
                cat_header.innerHTML = `<a href= "./p_categoria.html?categoria=${cat}">${cat}</a>`
            }

            // texto descritivo do gráfico
            let info_grafico_cat = document.createElement("div")
            document.querySelector (".cat-link-" + cat).appendChild(info_grafico_cat)
            info_grafico_cat.className = "info-grafico-cat"

            if(cat !== "Textos"){
                if(cat === "Autores" || cat === "Anos"){
                    info_grafico_cat.innerHTML =  `<p>O elemento de ${cat} mais frequente é <strong>${categoria[i].labels_cat[0]}</strong> com ${categoria[i].labels_cat_value[0]} textos (${formatPercentage(categoria[i].labels_cat_value[0], textData.length)}).</p> 
                                                                                <p>Segue-se <strong>${categoria[i].labels_cat[1]}</strong> com ${categoria[i].labels_cat_value[1]} textos (${formatPercentage(categoria[i].labels_cat_value[1], textData.length)}); 
                                                                                            <strong>${categoria[i].labels_cat[2]}</strong> com ${categoria[i].labels_cat_value[2]} textos (${formatPercentage(categoria[i].labels_cat_value[2], textData.length)});
                                                                                            <strong>${categoria[i].labels_cat[3]}</strong> com ${categoria[i].labels_cat_value[3]} textos (${formatPercentage(categoria[i].labels_cat_value[3], textData.length)});
                                                                                            <strong>${categoria[i].labels_cat[4]}</strong> com ${categoria[i].labels_cat_value[4]} textos (${formatPercentage(categoria[i].labels_cat_value[4], textData.length)});
                                                                                          e <strong>${categoria[i].labels_cat[5]}</strong> com ${categoria[i].labels_cat_value[5]} textos (${formatPercentage(categoria[i].labels_cat_value[5], textData.length)}).</p>`
                } else{
                    info_grafico_cat.innerHTML =  `<p>O elemento de ${cat} mais frequente é <strong>${categoria[i].labels_cat[0]}</strong>, mencionado em ${categoria[i].labels_cat_value[0]} textos (${formatPercentage(categoria[i].labels_cat_value[0], textData.length)}).</p> 
                                                                                <p>Segue-se <strong>${categoria[i].labels_cat[1]}</strong>, mencionado em ${categoria[i].labels_cat_value[1]} textos (${formatPercentage(categoria[i].labels_cat_value[1], textData.length)}); 
                                                                                            <strong>${categoria[i].labels_cat[2]}</strong>, mencionado em ${categoria[i].labels_cat_value[2]} textos (${formatPercentage(categoria[i].labels_cat_value[2], textData.length)});
                                                                                            <strong>${categoria[i].labels_cat[3]}</strong>, mencionado em ${categoria[i].labels_cat_value[3]} textos (${formatPercentage(categoria[i].labels_cat_value[3], textData.length)});
                                                                                            <strong>${categoria[i].labels_cat[4]}</strong>, mencionado em ${categoria[i].labels_cat_value[4]} textos (${formatPercentage(categoria[i].labels_cat_value[4], textData.length)});
                                                                                          e <strong>${categoria[i].labels_cat[5]}</strong>, mencionado em ${categoria[i].labels_cat_value[5]} textos (${formatPercentage(categoria[i].labels_cat_value[5], textData.length)}).</p>`
                } 
            } else {
                info_grafico_cat.innerHTML =  `<p>O texto com maior variedade de palavras é <strong>${categoria[i].labels_cat[0]}</strong> com ${categoria[i].labels_cat_value[0]} palavras diferentes (${formatPercentage(categoria[i].labels_cat_value[0], textData.length)}).</p> 
                                                                                             <p>Segue-se <strong>${categoria[i].labels_cat[1]}</strong> com ${categoria[i].labels_cat_value[1]} palavras diferentes; 
                                                                                                         <strong>${categoria[i].labels_cat[2]}</strong> com ${categoria[i].labels_cat_value[2]} palavras diferentes;
                                                                                                         <strong>${categoria[i].labels_cat[3]}</strong> com ${categoria[i].labels_cat_value[3]} palavras diferentes;
                                                                                                         <strong>${categoria[i].labels_cat[4]}</strong> com ${categoria[i].labels_cat_value[4]} palavras diferentes;
                                                                                                       e <strong>${categoria[i].labels_cat[5]}</strong> com ${categoria[i].labels_cat_value[5]} palavras diferentes.</p>`
            }
                

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
                    label: (cat !== "Textos"? `${cat} mais frequentes` : `Palavras`),
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
                            display:false,
                            drawTicks: false
                        },
                        ticks: {
                            display:false // garantir a escala (o numero maior igual em todos os graficos)
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
            //adicionar uma caixa extra
            let checkboxContainer = document.createElement('div')
            checkboxContainer.className = 'checkbox-container'
            document.querySelector (".cat-link-" + cat).appendChild(checkboxContainer)

            let checkboxPalav = document.createElement('input')
            checkboxPalav.type = "checkbox"
            checkboxPalav.id = "checkbox-pal-original"
            checkboxPalav.name = "exclui_palavras_original"
            checkboxPalav.checked = isChecked_original // Set checkbox state

            let label = document.createElement('label')
            label.htmlFor = "exclui_palavras_original"
            label.innerText = " Excluir palavras do texto original"
            //label.style.cursor = "pointer"
            
            checkboxContainer.appendChild(checkboxPalav)
            checkboxContainer.appendChild(label)

            // Add event listener
            checkboxPalav.addEventListener('change', function(e) {
                isChecked_original = e.target.checked
                renderCategories() // Re-render everything
            })
        }
    }

        //display de todas as categorias
        for(let i = 0; i < categoria.length; i++){
            let categ = categoria[i].categoria
            let labell = categoria[i].labels_cat
            let labell_value = categoria[i].labels_cat_value

            let mais_frequente = categoria[i].mais_frequente
            //let info_mais_frequente = categoria[i].info_mais_frequente
            let nome = categoria[i].nome


            displaySections(categ, labell, labell_value, i, mais_frequente, nome)
        }
    }//fim de função de renderizar categorias

    
    //render inicial
    renderCategories()

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

} 



