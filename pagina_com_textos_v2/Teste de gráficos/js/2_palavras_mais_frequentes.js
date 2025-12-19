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
    function arrayPalavrasCat(textData, categoria){
        let all_entries = [] // array de objetos {nome, textID}

        if(categoria === "palavras"){

            for(let i = 0; i < wordData.length; i++){
                
            }

        }
    }
}