/*************  variaveis globais  ****************/
let globalWordData, globalTextData, globalStoplist, globalLemmasData;

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

function displayData(wordData, textData, stoplist, lemmasData){


    //****************  Categorias-sections  ******************/
    let categorias_sections = document.createElement("div")
    document.querySelector("body").appendChild(categorias_sections)
    categorias_sections.className += "categorias-sections"

    //funcao para array de objetos de palavras para uma categoria
    function arrayPalavrasCat(textData, wordData, categoria){
        let all_entries = [] // array de objetos {nome, textID}

        if(categoria === "palavra"){

            for(let i = 0; i < wordData.palavras.length; i++){
                const valor = wordData.palavras[i].palavra
                if(valor !== undefined && valor !== null && valor !== ""){
                    for(let j = 0; j < wordData.palavras[i].textos.length; j++){
                        all_entries.push({
                            nome: wordData.palavras[i].palavra,
                            textId: wordData.palavras[i].textos[j].id_text  //é um array de objetos (id_text + frequencia)
                        })
                    }    
                }
            }

        }

        let categoryMap = new Map()

        for(let item of all_entries){
            if(!categoryMap.has(item.nome)){
                categoryMap.set(item.nome, [])
            }
            categoryMap.get(item.nome).push(item.textId)
        }

        //converte em array de objetos
        let result = Array.from(categoryMap, ([nome, ids]) => ({
            nome,
            textos_menc: ids
        }))

        return result

    }

    // obter array de objeto para a categoria "palavras"
    let arrayPalav = arrayPalavrasCat (textData, wordData, "palavra")

    //obter lista ordenada por frequencia em cada categoria
    let palavOrd = arrayPalav.sort((a, b) => b.textos_menc.length - a.textos_menc.length)

    // obter 6 palavras mais frequentes de cada categoria
    let l = 6
    let palavSeis = palavOrd.slice(0, l)

    //arrays de nomes e arrays de valores
    let palavSNome = []

    let palavSval = []

   // descobri o erro 
}
