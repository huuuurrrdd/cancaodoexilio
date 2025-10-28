/*

    Script para pág específica de categorias

    Info para testar acesso a wikipédia: 
    -> https://medium.com/free-code-camp/how-to-build-wikipedias-api-search-with-ramdajs-b3c1a069d7af

*/
//*************  Buscar parametro de categoria  ****************/
function getQueryParam(param){
    let urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(param)
}

//obter nome de categoria
let categoria = getQueryParam("categoria")
let especifica = getQueryParam("especifica")

console.log(categoria) // funciona!!
console.log(especifica) // funciona!!

// versao para CSS:
let classEsp = especifica.replaceAll(" ", "-")



//*************  Acesso a dados  ****************/
// testando acesso a info wikipedia
function fetchData(){
    let wordData, textData, lemmasData, wikiData

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
            return fetch("https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=" + especifica)
        })
        .then(response =>{
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json()
        })
        .then(data =>{
            wikiData = data
            displayData(wordData, textData, lemmasData, wikiData) //funcao com os 2 jsons
        })
        .catch(error => console.error('Failed to fetch data', error))

}

fetchData()

// testar ainda nesta pagina o funcionamento de wikipédia
function displayData(wordData, textData, lemmasData, wikiData){

    

    // Acedendo a dados de n de "especifica" por ano (igual a ano e autores em que conta 1 por texto se aparecer)
    // para específica: array para idTexto, freq, ano
    id_textos = []
    frequencia = []
    anos_esp = []

    let nomeCat

    if(categoria.toLowerCase() =="anos"){
        nomeCat = "date_of_publication"

    } else if(categoria.toLowerCase() =="autores"){
        nomeCat = "author"

    } else {
        nomeCat = categoria.toLowerCase() // caso de fauna e flora
    }

    console.log(`Nome categoria = ${nomeCat}`) // funciona (caso locais)
    // manter o nome original, pq é o da base de dados
    console.log(`Esp: ${especifica}`)

    let anos_grafico = []
    let freq_grafico = []
    // (array multidimencional para id?)
    let ids_final = [] // é um array com todos os ids de cada ano (se nenhum id[i] = 0)

    // antes de aceder à especifica, preciso da categoria

    if(nomeCat === "fauna" || nomeCat === "flora"){ // isto funciona!!
            // indexof() -> no caso de encontrar o resultado que procuro
        //The find() method returns the value of the first element that passes a test
        // ser ainda mais concreta de onde vou buscar
        for(let i = 0; i < textData.length; i++){
            if(textData[i].categorias[nomeCat].length > 0){ // find() é para filtrar por funcoes
                if(textData[i].categorias[nomeCat].includes(especifica) == true ){ // verifica se a categoria inclui a palavra especifica 
                    id_textos.push(textData[i].id)
                    frequencia.push(1)
                    anos_esp.push(textData[i].date_of_publication)
                }
            }
        }
    } else if (nomeCat === "locais"){

        for(let i = 0; i < textData.length; i++){
            if(textData[i].categorias[nomeCat].locais_limpos.length > 0){
                if(textData[i].categorias[nomeCat].locais_limpos.includes(especifica) == true){
                    id_textos.push(textData[i].id)
                    frequencia.push(1)
                    anos_esp.push(textData[i].date_of_publication)
                }
            }
        }
    } else { // author e date_of_publication

        if(nomeCat === "author"){
            for(let i = 0; i < textData.length; i++){
                const valor = textData[i]?.[nomeCat]
                if(valor !== undefined && valor!== null && valor !== ""){
                    if(textData[i]?.[nomeCat].includes(especifica)){
                        id_textos.push(textData[i].id)
                        frequencia.push(1)
                        anos_esp.push(textData[i].date_of_publication)
                    }
                }
            }

        } else if (nomeCat === "date_of_publication") {
            for(let i = 0; i < textData.length; i++){
                const valor = textData[i]?.[nomeCat]
                if(valor !== undefined && valor!== null && valor !== ""){
                    if(textData[i]?.[nomeCat] == especifica){
                        id_textos.push(textData[i].id)
                        frequencia.push(1)
                        anos_esp.push(textData[i].date_of_publication)
                    }
                }
            }
        }
    }

    

    // //Todas 192 - parece correto!! (em fauna e flora), locais = 200, autores = 3
    console.log(id_textos.length)
    console.log(frequencia.length)
    console.log(anos_esp.length)

    // CRIAÇÃO DE ARRAY MULTIDIMENCIONAL COM OS ANOS, IDs E FREQUENCIAS
    const ag_anos = []; // array de (array de anos)
    let gAtual_anos = []; // array atual de anos

    const ag_freq = [];
    let gAtual_freq = [];

    const ag_id = [];
    let gAtual_id = [];

    

    //junta os anos iguais (ao mesmo tempo que junta a frequencia e os ids)
    for(let i = 0; i < anos_esp.length; i++){
        if(i === 0 || anos_esp[i] == anos_esp[i-1]){
            gAtual_anos.push(anos_esp[i]) //igual ao anterior, adiciona

            gAtual_freq.push(frequencia[i])
            gAtual_id.push(id_textos[i])

        } else {

                ag_anos.push(gAtual_anos) // push grupo finalizado
                gAtual_anos = [anos_esp[i]] // começa novo grupo

                    //o mesmo para ids e frequencias
                ag_freq.push(gAtual_freq);
                gAtual_freq = [frequencia[i]];

                ag_id.push(gAtual_id);
                gAtual_id = [id_textos[i]];
            }
    }


    // push ultimo grupo
    // array de anos que n contém os anos sem elementos na categoria
    if (gAtual_anos.length) ag_anos.push(gAtual_anos); 
    //console.log(ag_anos); 

    if (gAtual_freq.length) ag_freq.push(gAtual_freq); // frequencia por cada texto
    //console.log(ag_freq);

    if (gAtual_id.length) ag_id.push(gAtual_id); // id de cada texto
    //console.log(ag_id);

    //Testes de funcionamento de variáveis
    //console.log(`Variável ag_freq[30][2]: ${ag_freq[5][1]}`) // parece funcionar!!
    

    //TRANSFORMAR ARRAYS MULTIDIMENSIONAIS DOS ANOS E FREQ EM ARRAYS UNIDIMENSIONAIS
    const ag_anos_unidimensional = [] // transformar cada conjunto de anos ex(1847, 1847) em 1847
    const ag_freq_p_ano = [] // juntar todas as frequencias em uma só ex(2, 1) em 3
    // falta o id dos textos (acrescentar algo vazio quando n há)

            for(let i = 0; i < ag_anos.length; i++){
            let soma_freq = 0
            for(let j = 0; j < ag_anos[i].length; j++){
                soma_freq += ag_freq[i][j] // percorre em cada ano cada frequencia de cada texto e soma
            }
            ag_freq_p_ano.push(soma_freq)
            ag_anos_unidimensional.push(ag_anos[i][0]) // escolhe o primeiro, pq são todos iguais

        }

    // falta testar aqui
        //   console.log("Freq e anos respetivamente:")
        //   console.log(ag_anos_unidimensional) //sem valores repetidos
        //   console.log(ag_freq_p_ano) // parece funcionar!!


    //TENTATIVA DE CONTAR TODOS OS ANOS E IGUALAR A 0 OS ANOS SEM REPRESENTAÇÃO
        const val_anos = ag_anos_unidimensional
        const val_freq = ag_freq_p_ano // apenas os anos em que freq > 0
        // ainda multidimensional
        const val_id = ag_id

        const start = 1846
        const end = 2025 // podia colocar o ano atual

        

        for(let y = start; y <= end; y++){
            anos_grafico.push(y) // adiciona anos normalmente

            const idx = val_anos.indexOf(y) // obtém o indice do valor y (o ano selecionado) -> se n existir indice para esse valor, idx = -1
            if(idx !== -1){ // caso exista um índice com esse valor
                freq_grafico.push(val_freq[idx]) // adiciona o valor
                ids_final.push(val_id[idx]) // espero que adicione todos os valores
            } else {
                freq_grafico.push(0) // se n tiver, adiciona 0
                ids_final.push(0)
            }
        }

        console.log("Valores para anos e frq no gráfico:")
        // console.log(anos_grafico)
        // console.log(freq_grafico)
        // console.log(ids_final) // todos os ids por ano (pode n ser necessário estar associado ao ano)
        //console.log(`anos ${anos_grafico.length}, freq: ${freq_grafico.length}, ids ${ids_final.length}`) // tudo 180, tudo funciona!!!


        // Obter lista de ids que mencionam a palavra (com o id, obtém-se as outras informacoes)
        //console.log(ids_final)
        //console.log(val_id) // este é mais direto!! - depois confirmar!!
        let idLista = []

        for(let i = 0; i < val_id.length; i++) {
            for(let j = 0; j < val_id[i].length; j++){
                idLista.push(val_id[i][j])
            }
        }

        //console.log(idLista) // length = 200, porque da diferente na pag de inicio
    
    
    

    /////////////////////////////////////////////////////////////////
    /***************** Display de elementos HTML *******************/
    /////////////////////////////////////////////////////////////////
    let elemento_container = document.createElement("div")
    document.querySelector("body").appendChild(elemento_container)
    elemento_container.className += "elemento-container elemento-container-" + classEsp

    //subtitulo
    let subtitulo = document.createElement('p')
    elemento_container.appendChild(subtitulo)
    subtitulo.className += "subtitulo"
    subtitulo.innerText = `Categoria: ${categoria.toLowerCase()}`

    //*************  Titulo de página  ****************/
    let elemento_h = document.createElement("h1")
    document.querySelector(".elemento-container-" + classEsp).appendChild(elemento_h)
    elemento_h.className += "page-title elemento-h elemento-h-" + classEsp
    elemento_h.innerHTML = especifica

    //*************  Gráfico geral  ****************/
    let elemento_grafico = document.createElement("div")
    document.querySelector(".elemento-container-" + classEsp).appendChild(elemento_grafico)
    elemento_grafico.className += "elemento-grafico grafico-" + classEsp

    let canvas = document.createElement("canvas")
    document.querySelector(".grafico-" + classEsp).appendChild(canvas)
    canvas.className += "grafico-palavras-populares"
    
    // adicionar gráfico aleatorio
    const GP = document.querySelector(".grafico-palavras-populares")

    //*********** Gráfico inicial **********/
    // neste gráfico é importante poder comparar o nº de textos total com o nº que mencionam
    new Chart(GP, {
        type: "line",
        data: {
            labels: anos_grafico,
            datasets:[{
                label: `${categoria} ao longo do tempo`,
                data: freq_grafico,
                borderWidth: 1
            }]
        },
        options:{
            scales:{
                y:{
                    beginAtZero: true
                }
            }
        }
    })



    //*************  Info elemento(wikipedia)  ****************/
    let elemento_info = document.createElement("div")
    elemento_container.appendChild(elemento_info)
    elemento_info.className += "elemento-info ct-info-" + classEsp

    let elemento_info_h = document.createElement("h2")
    elemento_info.appendChild(elemento_info_h)
    elemento_info_h.className += "elemento-info-h info-h-" + classEsp
    elemento_info_h.innerHTML = "Sobre"

    let elemento_info_conteudo = document.createElement("div")
    elemento_info.appendChild(elemento_info_conteudo)
    elemento_info_conteudo.className += "elemento-info-conteudo info-conteudo-" + classEsp
    //elemento_info_conteudo.innerHTML = wikiData[3][0] // acesso a página de desambiguacao

    /*
        Numa primeira tentativa, 
        colocar todos os resultados:
        - Query (what you searched for)
        - Array of result names
        - Array of summaries
        - Array of links to results
    
    */

    // objeto com os parametros para criar o url
    const endpoint = 'https://pt.wikipedia.org/w/api.php?'
    const params = {
        origin: '*', // non auhteticated requests
        format: 'json',
        action: 'query',
        prop: 'extracts',
        //exchars: 1200,
        exintro: true,
        explaintext: true,
        exsentences: 7,
        generator: 'search',
        gsrlimit: 1

    }

    const clearPreviousResults = () => {
        elemento_info_conteudo.innerHTML = ""
    }

    const isEspecificaEmpty = classEsp => {
        if(!classEsp || classEsp === '') return true
        return false
    }

    const showError = error => {
        elemento_info_conteudo.innerHTML += `🚨 ${error} 🚨`
    }

    // dispoe os resultados no UI
    const showResults = results => {
    results.forEach(result => {
        elemento_info_conteudo.innerHTML += `
        <div class = "results__item"> 
            <a href = "https://en.wikipedia.org/?curid=${result.pageId}" target="_blank" class= "card animated bounceInUp">
                <h2 class = "results__item__title">${result.title}</h2>
                <p class = "results__item__intro">${result.intro}</p>
            </a>
        </div>
        `
    })}

    const gatherData = pages => {
        const results = Object.values(pages).map(page =>({
            pageId: page.pageid,
            title: page.title,
            intro: page.extract
        }))

        showResults(results)
    }

    const getData = async() => {
        const palavra = classEsp
        if(isEspecificaEmpty(palavra)) return

        params.gsrsearch = palavra
        clearPreviousResults()

        try {
            const { data } = await axios.get(endpoint, { params }) // data é o objeto gerado pela wikipedia API

            if(data.error) throw new Error(data.error.info)
            if (!data.query) throw new Error("Nenhum resultado encontrado.");

            gatherData(data.query.pages)

        } catch (error) {
            showError(error)
        }

    }

    getData()








    //*************  Textos que mencionam  ****************/
    let textos_mencionam = document.createElement("div")
    document.querySelector(".elemento-container-" + classEsp).appendChild(textos_mencionam)
    textos_mencionam.className += "textos-mencionam textos-mencionam-" + classEsp
    
    //--titulo--
    let textos_mencionam_h = document.createElement("h2")
    document.querySelector(".textos-mencionam-" + classEsp).appendChild(textos_mencionam_h)
    textos_mencionam_h.className += "textos-mencionam-h textos-mencionam-h-" + classEsp
    if(nomeCat === "author" || nomeCat === "date_of_publication"){
        textos_mencionam_h.innerHTML = "Textos de " + especifica
    } else {
        textos_mencionam_h.innerHTML = "Textos que mencionam " + especifica
    }
    
    
    //--tabela--
    let list_container = document.createElement("div")
    document.querySelector(".textos-mencionam-" + classEsp).appendChild(list_container)
    list_container.className += "list-container"

    //header
    let tentry_header = document.createElement("div")
    document.querySelector(".list-container").appendChild(tentry_header)
    tentry_header.className += "tentry tentry-header"

    tentry_header.innerHTML =  `  <div class = "ano header">Ano</div>
                                  <div class = "titulo header">Titulo</div>
                                  <div class = "autor header">Autor</div>`

    tentry_header.style.backgroundColor = "yellow"


    let container = document.createElement("div")
    document.querySelector(".list-container").appendChild(container)
    container.className += "container"

    //iteracao para display (embora até já possa ser possivel obter os valores reais!!)
    for(let i = 0; i < idLista.length; i++){ //n sei se aguenta com 200

        //cria a div principal
        let tentry = document.createElement("div")
        tentry.className += "tentry tentry-container tentry-container" + (i+1)

        //elementos do item
        tentry.innerHTML = `<div class = "ano">Ano - ${textData[idLista[i]-1].date_of_publication}</div>
                             <div class = "titulo">Titulo - ${textData[idLista[i]-1].title}</div>
                             <div class = "autor">Autor - ${textData[idLista[i]-1].author}</div>`


        container.appendChild(tentry)
    }



}