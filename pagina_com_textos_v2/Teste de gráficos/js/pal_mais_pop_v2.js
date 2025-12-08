//const { useCallback } = require("react");

/*************  variaveis globais  ****************/
let globalWordData, globalTextData, globalStoplist, globalLemmasData;

// configuração do objeto para análise flexivel
const Config = {
    timeRange: { start: 1846, end: 2025},
    timeGrouping: 'year', // ou decada
    frequencyMetric: 'perText', // 'perText', 'perTotalWords', or 'raw'
    excludeGroups: ['stopwords', 'original'], // qualquer combinação
    useLog: false // aplica ou não logaritmo
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
      return response.json(); // return data
    })
    .then(data => {
      globalTextData = data; // info dos textos a conter as coordenadas geográficas
      return fetch("./Dict_lemas_palavras_v0002.json");
    })
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json(); // return data
    })
    .then(data => {
      globalLemmasData = data; // guarda json dos lemas
      return fetch("./stopwords/portuguese");
    })
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return response.text(); // return stopwords text
    })
    .then(data => {
      globalStoplist = data
        .split("\n")
        .map((s_word) => s_word.trim())
        .filter((s_word) => s_word.length > 0);

      displayData(globalWordData, globalTextData, globalStoplist, globalLemmasData);
      criaBotoesControlo()
      console.log('Dados carregados! Use os botões para mudar a viualização')
    })
    .catch(error => console.error("Failed to fetch data", error));
}


//*************  Main Display Function  ****************/
function displayData(wordData, textData, stoplist, lemmasData) {
    
    const originalWords = extractOriginalWords(textData[0].texto_completo) // palavras do original
    const wordFrequencies = buildWordFrequencies(wordData, textData, Config.timeRange)
    const totalWordsPerYear = calculateTotalWordsPerYear(textData, Config.timeRange)
    const exclusionSets = createExclusionSets(wordData, stoplist, originalWords, Config.excludeGroups)
    const aggregatedData = aggregateByTimePeriod(wordFrequencies, wordData, exclusionSets, Config, totalWordsPerYear)

    // renderizar gráfico
    renderChart(aggregatedData, Config)
}

//*************  funções auxiliares  ****************/
//extrair e limpar palavras do texto original
function extractOriginalWords(text) {
    const cleaned = text
        .replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~–]/g, '')
        .replace(/[\r\n]+/gm, ' ')

    return new Set(cleaned.split(' ').filter(w => w.length > 0).map(w => w.toLowerCase()))
}

//criar dados de frequencia para cada palavra ao longo de todos os anos
function buildWordFrequencies(wordData, textData, timeRange){
    return wordData.palavras.map(word => buildWordYearData(word, textData, timeRange))
}

// criar dados ano por ano para cada palavra
function buildWordYearData(wordObj, textData, timeRange){
    const yearData = {}

    //Inicia toddos os anos com 0 ////Porquê
    for(let year = timeRange.start; year <= timeRange.end; year++){
        yearData[year] = { freq:0, nTexts:0, nome:wordObj.palavra } // para reiniciar limpo?
    }

    //colocar os dados
    const textsById = {}
    wordObj.textos.forEach(t => { //percorre cada texto
        const year = textData[t.id_text - 1].date_of_publication

        if(!textsById[year]) textsById[year] = new Set() // se n existe mais textos daquele ano, cria novo set
        textsById[year].add(t.id_text) //adiciona o texto atual

        if(yearData[year]){ /// esta n percebo mt bem
            yearData[year].freq += t.frequencia
        }
    })

    //Definir contagem de texto
    Object.keys(textsById).forEach(year => {
        if(yearData[year]) {
            yearData[year].nTexts = textsById[year].size
        }
    })
    return yearData
}

//calcula total de palavras por ano por todos os textos
function calculateTotalWordsPerYear(textData, timeRange){
    const totalWords = {}
    
    //inicia todos os anos
    for(let year = timeRange.start; year <= timeRange.end; year++){
        totalWords[year] = 0
    }

    //soma contagem de palavras de todos os textos
    textData.forEach(text => {
        const year = text.date_of_publication
        if(totalWords[year] !== undefined && text.n_palavras){
            totalWords[year] += text.n_palavras
        }
    })

    return totalWords
}

// Cria sets de indices de palavras para excluir
function createExclusionSets(wordData, stopList, originalWords, excludeGroups) { // aqui parece que n tem escolha :( )
    const sets = { // sets a excluir (e se n quiser excluir as do original??)
        stopwords: new Set(),
        original: new Set()
    }

    const stopSet = new Set(stopList)

    wordData.palavras.forEach((word, idx) => {
        const wordLower = word.palavra.toLowerCase()

        if(stopSet.has(word.palavra)){
            sets.stopwords.add(idx)
        }

        if(originalWords.has(wordLower)){
            sets.original.add(idx)
        }
    })

    //combina sets para exclusão baseado na configuração
    const combined = new Set()
    excludeGroups.forEach(group => { // group é baseado na configuração?
        if(sets[group]){
            sets[group].forEach(idx => combined.add(idx))
        }
    })

    return combined
}

// Agrupa anos em periodos de tempo (anos ou decadas)
function getTimePeriod(year, grouping){ // aqui parece fazer sentido a escolha
    if(grouping === 'decade') {
        return Math.floor(year / 10) * 10 
    }
    return year
}

// Calcula a metrica da frequência baseado na configuração
function calculateMetric(freq, nTexts, totalWords, config){
    let value = 0

    switch (config.frequencyMetric){
        case 'perText':
            value = nTexts > 0 ? freq / nTexts : 0 //divide pelos textos
            break
        case 'perTotalWords':
            value = totalWords > 0 ? freq / totalWords : 0 //divide pelas palavras (total de palavras naquele periodo?)
            break
        case 'raw':
        default:
            value = freq // o valor da frequencia puro
            break
    }

    return config.useLog && value > 0 ? Math.log(value) : value // uso de logaritmo ou não
}

// Junta frequencias de palavras com base em periodo de tempo (anos ou decadas)
function aggregateByTimePeriod(wordFrequencies, wordData, exclusionSet, config, totalWordsPerYear){
    const periods = new Map()

    // Obtém cada um dos periodos
    for(let year = config.timeRange.start; year <= config.timeRange.end; year++){
        const period = getTimePeriod(year, config.timeGrouping) // decide o ano ou decada em que o texto faz parte baseado no ano
        if(!periods.has(period)){
            periods.set(period, []) // se n estiver no periodo
        }
    }

    // junta dados para cada periodo // o _ representa o valor n usado
    periods.forEach((_, period) => {
        const wordStats = []

        for(let wordIdx = 0; wordIdx < wordData.palavras.length; wordIdx++) {
            if(exclusionSet.has(wordIdx)) continue

            let totalFreq = 0
            let totalTexts = 0
            let totalWords = 0 // pode ser calculado por textData se necessário (pode tbm ser calculado a soma total)

            // junta todos os anos neste periodo
            for(let year = config.timeRange.start; year <= config.timeRange.end; year++){
                    if(getTimePeriod(year, config.timeGrouping) === period){
                    const yearData = wordFrequencies[wordIdx][year]
                    totalFreq += yearData.freq
                    totalTexts += yearData.nTexts
                    totalWords += totalWordsPerYear[year] || 0
                }
            }

            const metric = calculateMetric(totalFreq, totalTexts, totalWords, config)

            wordStats.push({
                indice: wordIdx,
                palavra: wordData.palavras[wordIdx].palavra,
                freq: totalFreq,
                nTexts: totalTexts,
                totalWords: totalWords,
                metric: metric
            })
            
        }

        //ordena por metrica e encontra as palavras no topo
        wordStats.sort((a, b) => b.metric - a.metric)

        const maxMetric = wordStats[0]?.metric || 0
        const topWords = wordStats
            .filter(w => w.metric === maxMetric)
            .map(w => w.palavra)
            .join(', ')

        periods.set(period, {
            wordStats,
            maxMetric,
            topWords
        })
    })

    return periods
}

// renderizar o gráfico com dados agrupados
function renderChart(aggregatedData, config) {
    const container = document.createElement('div') // contentor geral
    container.className = 'words-container';
    document.body.appendChild(container)

    const title = document.createElement('h1')
    title.className = 'page-title'
    title.textContent = 'Análise de frequencia de palavras'
    container.appendChild(title)

    const graficoContainer = document.createElement('div')
    graficoContainer.className = 'grafico-container'
    container.appendChild(graficoContainer)

    const subtitle = document.createElement('h3')
    subtitle.textContent = `Agrupamento: ${config.timeGrouping}, Métrica: ${config.frequencyMetric}, Exclusões: ${config.excludeGroups.join(', ')}`
    graficoContainer.appendChild(subtitle)

    const canvas = document.createElement('canvas')
    graficoContainer.appendChild(canvas)

    //Preparando dados do gráfico
    const labels = Array.from(aggregatedData.keys()).sort((a, b) => a - b)
    const data = labels.map(period => aggregatedData.get(period).maxMetric) ///preciso perceber isto
    const tooltipWords = labels.map(period => aggregatedData.get(period).topWords) // toWords ou stopWords

    new Chart(canvas, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Palavras com maior frequência',
                data: data,
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const words = tooltipWords[context.dataIndex]
                            const value = data[context.dataIndex]
                            return `${words}: ${value.toFixed(4)}`
                        }
                    }
                }
            },
            responsive: true,
            scales: {
                y:{ beginAtZero: true }
            }
        }
    })
}

//mudar configuração e voltar a correr
//função guardada globalmente

function updateConfig(newConfig){
    
    Object.assign(Config, newConfig)
    //limpa gráficos existentes e volta a renderizar
    document.querySelector('.words-container')?.remove()

    //usa variaveis globais
    if(globalWordData && globalTextData && globalStoplist){
        displayData(globalWordData, globalTextData, globalStoplist, globalLemmasData)
    } else {
        console.error('Dados ainda não foram carregados. Chamar fetchData() primeiro')
    }
}


//*************  Controlos UI - funções auxiliares ****************/
function criaGrupoBotoes(label, buttons) { // função para criar elementos html

    const div = document.createElement('div')
    div.className = 'button-group'
    div.innerHTML = `${label}`

    buttons.forEach(btn => {
        const button = document.createElement('button')
        button.textContent = btn.text
        button.onclick = btn.action
        div.appendChild(button)
    })

    return div
}
    

//*************  Controlos UI criação ****************/
// Exemplo de uso - cria controlo de botões após carregamento dos dados
function criaBotoesControlo(){

    const controlsContainer = document.createElement('div') ///contentor geral
    controlsContainer.className = 'controls-container'
    
    document.body.insertBefore(controlsContainer, document.querySelector('.words-container'))

    const title = document.createElement('h2')
    title.textContent = 'Controles de Análise'
    title.className = 'titulo'
    controlsContainer.appendChild(title)

    /********************  Agrupamento de tempo  ********************/
    controlsContainer.appendChild(
        criaGrupoBotoes('Agrupamento temporal', [
            { text: 'Por Ano', action: () => updateConfig({ timeGrouping: 'year' }) },
            { text: 'Por Década', action: () => updateConfig({ timeGrouping: 'decade' }) }
        ]))


    /********************  Metricas para frequencia  ********************/
    controlsContainer.appendChild(
        criaGrupoBotoes('Métrica para frequência', [
            { text: 'Por Texto', action: () => updateConfig({ frequencyMetric: 'perText' }) },
            { text: 'Por Palavras', action: () => updateConfig({ frequencyMetric: 'perTotalWords' }) }, // n está funcional
            { text: 'Frequencia apenas', action: () => updateConfig({ frequencyMetric: 'raw' }) }
        ]))


    /********************  Exclusão de palavras  ********************/    
    controlsContainer.appendChild(
        criaGrupoBotoes('Palavras do texto original', [
            { text: 'Excluir', action: () => updateConfig({ excludeGroups: ['stopwords', 'original'] }) },
            { text: 'Incluir', action: () => updateConfig({ excludeGroups: ['stopwords'] }) }
        ]))

    /********************  toogle logaritmo  ********************/ 
    controlsContainer.appendChild(
        criaGrupoBotoes('Escala logaritma:', [
            { text: 'Ativar', action: () => updateConfig({ useLog: true }) },
            { text: 'Desativar', action: () => updateConfig({ useLog: false }) }
        ]))


}


//inicia a aplicação
fetchData()
