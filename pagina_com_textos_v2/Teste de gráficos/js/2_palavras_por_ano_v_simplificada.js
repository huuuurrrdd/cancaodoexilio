/*************  variaveis globais  ****************/
let globalWordData, globalTextData, globalStoplist;

//configuração simplificada - apenas o que é necessário
const config = {
    timeRange: {start: 1846, end: 2025},
    timeGrouping: 'year' // ou 'decade'
}


//*************  Acesso a dados  ****************/
function fetchData() {
  //dicionario json
  fetch("./Dict_palavras_lemas_v0004.json")
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json(); 
    })
    .then(data => {
      globalWordData = data; 
      return fetch("./t4_textos_loc_fauna_flora.json");
    })
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json();
    })
    .then(data => {
      globalTextData = data;
      return fetch("./stopwords/portuguese");
    })
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return response.text();
    })
    .then(data => {
      globalStoplist = data
        .split("\n")
        .map((s_word) => s_word.trim())
        .filter((s_word) => s_word.length > 0);

      displayData(globalWordData, globalTextData, globalStoplist);
      criaBotoesControlo()
      console.log('Dados carregados! Use os botões para mudar a visualização')
    })
    .catch(error => console.error("Failed to fetch data", error));
}

//*************  Aplica funcoes de display  ****************/
function displayData(wordData, textData, stoplist) {
    const exclusionSet = createExclusionSet(wordData, stoplist)
    const wordFrequencies = buildWordFrequencies(wordData, textData, config.timeRange)
    const aggregatedData = aggregateByTimePeriod(wordFrequencies, wordData, exclusionSet, config)
    
    renderChart(aggregatedData, config)
}

//*************  funções auxiliares  ****************/

//cria dados de frequencia para cada palavra ao longo de todos os anos
function buildWordFrequencies(wordData, textData, timeRange){
    return wordData.palavras.map(word => buildWordYearData(word, textData, timeRange))
}

// criar dados ano por ano para cada palavra
function buildWordYearData(wordObj, textData, timeRange){
    const yearData = {}

    // inicia todos os anos
    for(let year = timeRange.start; year <= timeRange.end; year++){
        yearData[year] = { hasWord: false }
    }

    // marca anos onde a palavra aparece
    wordObj.textos.forEach(t => {
        const year = textData[t.id_text - 1].date_of_publication
        if(yearData[year] && t.frequencia > 0){
            yearData[year].hasWord = true
        }
    })

    return yearData
}

// Cria set de indices de stopwords para excluir
function createExclusionSet(wordData, stopList){
    const stopSet = new Set(stopList)
    const exclusionSet = new Set()

    wordData.palavras.forEach((word, idx) => {
        if(stopSet.has(word.palavra)){
            exclusionSet.add(idx)
        }
    })

    return exclusionSet
}

// Agrupa anos em periodos (anos ou decadas)
function getTimePeriod(year, grouping){
    if(grouping === 'decade'){
        return Math.floor(year/10) * 10
    }
    return year
}

// Conta palavras únicas por periodo
function aggregateByTimePeriod(wordFrequencies, wordData, exclusionSet, config){
    const periods = new Map()

    // cria todos os periodos
    for(let year = config.timeRange.start; year <= config.timeRange.end; year++){
        const period = getTimePeriod(year, config.timeGrouping)
        if(!periods.has(period)){
            periods.set(period, { uniqueWordCount: 0, uniqueWords: [] })
        }
    }

    // conta palavras unicas para cada periodo 
    for(let wordIdx = 0; wordIdx < wordData.palavras.length; wordIdx++){
        if(exclusionSet.has(wordIdx)) continue

        const wordByPeriod = new Map()

        // verifica em que periodos a palavra aparece
        for(let year = config.timeRange.start; year <= config.timeRange.end; year++){
            const yearData = wordFrequencies[wordIdx][year]
            if(yearData.hasWord){
                const period = getTimePeriod(year, config.timeGrouping)
                wordByPeriod.set(period, true)
            }
        }

        // adiciona a palavra aos periodos onde aparece
        wordByPeriod.forEach((_, period) => {
            const periodData = periods.get(period)
            periodData.uniqueWordCount++
            periodData.uniqueWords.push(wordData.palavras[wordIdx].palavra)
        })
    }

    return periods
}

// renderizar o gráfico
function renderChart(aggregatedData, config){
    const container = document.createElement('div')
    container.className = 'words-container'
    document.body.appendChild(container)

    const title = document.createElement('h1')
    title.className = 'page-title'
    title.textContent = `Número de palavras únicas por ${config.timeGrouping === 'year' ? 'ano' : 'década'}`
    container.appendChild(title)

    //lista de palavras para criar destaque no grafico
    let lista_palavras = ['sabiá', 'palmeira', 'brasil', 'batata', 'revolução', 'animal']

    //contentor para as palavras
    const lista_palavrasContainer = document.createElement('div')
    lista_palavrasContainer.className = 'lista-palavras-container'
    lista_palavrasContainer.innerHTML = '<strong> Hover nas palavras</strong>'
    container.appendChild(lista_palavrasContainer)

    // lista_palavras.forEach(palavra => {
    //     let hover_palavra = document.createElement('span')
    //     hover_palavra.className = `hover-${palavra}`
    // })

    const graficoContainer = document.createElement('div')
    graficoContainer.className = 'grafico-container'
    container.appendChild(graficoContainer)

    const canvas = document.createElement('canvas')
    graficoContainer.appendChild(canvas)

    // preparar dados do gráfico
    const labels = Array.from(aggregatedData.keys()).sort((a, b) => a - b)
    const data = labels.map(period => aggregatedData.get(period).uniqueWordCount)

    new Chart(canvas, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Número de palavras únicas',
                data: data,
                borderWidth: 1,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)'
            }]
        },
        options:{
            plugins: {
                tooltip:{
                    callbacks:{
                        label: function(context) {
                            return `Palavras únicas: ${context.parsed.y}`
                        }
                    }
                }
            },
            responsive: true,
            scales: {
                y:{
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Número de palavras'
                    }
                },
                x: {
                    title:{
                        display: true,
                        text: config.timeGrouping === 'year' ? 'Ano' : 'Década'
                    }
                }
            }
        }
    })

    lista_palavras.forEach(palavra => {
        const palavra_span = document.createElement('span')
        palavra_span.className = 'hover-palavra'
        palavra_span.textContent = palavra

        lista_palavrasContainer.appendChild(palavra_span)

        // let hover_palavra = document.querySelector(`.hover-${palavra}`)
        // container.appendChild(hover_palavra)

        // hover_palavra.addEventListener('mouseover', () => {

        // } )

        //encontrar periodos em que palavra aparece
        const periodosComPalavra = new Set() /////////////FIQUEIIII AQUIIII!!!!!

        
    })

}

// atualizar configuração e re-renderizar
function updateConfig(newConfig){
    Object.assign(config, newConfig)
    
    document.querySelector('.words-container')?.remove()

    if(globalWordData && globalTextData && globalStoplist){
        displayData(globalWordData, globalTextData, globalStoplist)
    }
}

//*************  Controlos UI  ****************/
function criaGrupoBotoes(label, buttons){
    const div = document.createElement('div')
    div.className = 'button-group'
    div.innerHTML = `<strong>${label}:</strong>`

    buttons.forEach(btn => {
        const button = document.createElement('button')
        button.textContent = btn.text
        button.onclick = btn.action
        div.appendChild(button)
    })

    return div
}

function criaBotoesControlo(){
    const controlsContainer = document.createElement('div')
    controlsContainer.className = 'controls-container'

    document.body.insertBefore(controlsContainer, document.querySelector('.words-container'))

    const title = document.createElement('h2')
    title.textContent = 'Controlos de Análise'
    title.className = 'titulo'
    controlsContainer.appendChild(title)

    // Agrupamento temporal
    controlsContainer.appendChild(
        criaGrupoBotoes('Agrupamento', [
            { text: 'Por Ano', action: () => updateConfig({ timeGrouping: 'year' }) },
            { text: 'Por Década', action: () => updateConfig({ timeGrouping: 'decade' }) }
        ]))
}

// iniciar aplicação
fetchData()