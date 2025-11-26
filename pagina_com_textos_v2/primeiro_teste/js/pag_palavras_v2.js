
/* RECURSOS:
  - leitura de ficheiros json: https://www.geeksforgeeks.org/read-json-file-using-javascript/
  - Pode ajudar com os logaritmos: https://www.to.infn.it/~magnea/Edinburgh16.pdf


*/

/*___________________PAG_palavra______________________*/

/*Coisas que faz (até agora):
    -> Possibilidade de clicar no texto e ir para a página de texto
    -> Enviar informacao sobre id do texto para fazer display desse texto

*/

/************  Obtém o parametro no URL  ***********/
console.clear()

//let id_word = 1120 -1 // possivel testar com outros ids
let id_word = 1930 -1

//funcao para obter palavra do url
function getQueryParam(param){
    //procura o nome selecionado na barra de pesquisa
    let urlParams = new URLSearchParams (window.location.search)
    return urlParams.get(param)
}

// define o parametro a pesquisar (neste caso = ?palavra=)
let wordParam = getQueryParam("palavra") 

console.log(`Palavra é -${wordParam}-`)

/****************************************************/




/*
    json e ficheiros que está a utilizar:
    -> "./Dict_palavras_lemas_v0004.json": um dicionário de palavras (info: palavra, lema, frequência, id texto e respetiva frequencia)
    -> "./Dict_lemas_palavras_v0002.json": dicionáro de lemas (info: lema, palavras)
    -> "./textos_coordenadas_geograficas.json": lista de todos os textos (info: titulo, id, data, autor, texto completo, lemas) - podiam tbm ter os tokens??

*/

//*************  Acesso a dados  ****************/
function fetchData(){
    let wordData, textData, lemmasData

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
        .then(data => {
            textData = data
            displayData(wordData, textData, lemmasData) //funcao com os 2 jsons
        })
        .catch(error => console.error('Failed to fetch data', error))

}

fetchData()


//antes: tentar extrair a info da pág anterior se houver!!




function displayData(wordData, textData, lemmasData){
  //___PERCORRE O DICT PALAVRAS PARA ENCONTRAR PALAVRA__//

  //com a palavra selecionada, descobrir o id
  let idpalavra = null;
  //wordParam = "Pinheiro"
  //console.log(`Palavra: ${wordParam}`);

  for (let i = 0; i < wordData.palavras.length; i++) {
    const dictWord = wordData.palavras[i].palavra;
    const queryWord = wordParam.toLowerCase();

    if (dictWord === queryWord) {
      idpalavra = wordData.palavras[i - 1].id; //n percebo o i-1
      break; // quebra o ciclo assim que encontra
    }
  } // isto deve funcionar... o problema deve ser a ler os textos

  if (idpalavra != null) {
    console.log("id = " + idpalavra);
  } else {
    console.log("Palavra não encontrada");
    document.querySelector("body").innerHTML = "Palavra Nula";
  }

  id_word = idpalavra;

  /* Testes de funcionamento palavras_lemas e textos
    // testando acesso a dados (console.log)
    // palavra com id= 500; dispor: palavra,frequência e array de textos
    console.log("O objeto: " + wordData.palavras[id_word]) // funciona
    console.log("O ID palavra: " + wordData.palavras[id_word].id) //id palavra
    console.log("A palavra: " + wordData.palavras[id_word].palavra) //palavra
    console.log("Frequencia: " + wordData.palavras[id_word].frequencia) //frequência
    //sobre textos
    console.log("Array de textos: " + wordData.palavras[id_word].textos[1].id_text) //array de textos (posso ter de ver quantos objetos tem antes)
    console.log("Aceder primeiro texto: " + wordData.palavras[id_word].textos[0].id_text)// primeioro texto
    console.log("Quantidade de textos: " + wordData.palavras[id_word].textos.length) // quantidade de textos


    //1º: poema com id = 500, titulo, data de publicacao e autor
    console.log("")
    console.log("Acedendo a json dos textos:")
    console.log("Id do texto: " + wordData.palavras[id_word].textos[1].id_text + " Freq: " + wordData.palavras[id_word].textos[0].frequencia) //título do primeiro texto com a palavra
    // id de texto + título
    console.log(`Título de texto ${textData[(wordData.palavras[id_word].textos[0].id_text)-1].id} : ` + textData[wordData.palavras[id_word].textos[0].id_text-1].title + " Freq:" + wordData.palavras[id_word].textos[0].frequencia) // funciona!!

    //display de todos os textos que contêm a palavra
    for(let i = 0; i < wordData.palavras[id_word].textos.length; i++){
        console.log(`Título (${textData[wordData.palavras[id_word].textos[i].id_text-1].id}): ${textData[wordData.palavras[id_word].textos[i].id_text-1].title} Freq: ${wordData.palavras[id_word].textos[i].frequencia}`)
    }
*/
  //tudo funciona!!

  // Testes de funcionamento lemas_palavras
  // console.log(`Lema: ${lemmasData.lemas[10].lema}`); // acesso ao lema
  // console.log(`Palavras: ${lemmasData.lemas[10].palavras}`); // acesso as palavras

  // em vez de ser a id word é wordParam
  //acesso ao lema através de uma palavra
  //lema = "sem lema"

  // console.log(`Lema = ${lema}`)
  // console.log(`palavra = ${wordParam}`) //isto está correto
  // console.log(`Exemplo de palavra: ${lemmasData.lemas[400].palavras[0]}`)
  // console.log(`Testando: ${lemmasData.lemas.length}`)
  // console.log(`Testando: ${lemmasData.lemas[1].palavras.length}`)

  // console.log(`Testando: ${lemmasData.lemas[1].palavras[20]}`)
  //console.log(`Testando: ${lemmasData.lemas[1].palavras.length}`)

  //____________________________________________________________________//
  /////////////  Testando a extrair mais do que um lema  /////////////////

  let lemmas = []; // podia tbm guardar o número do i
  let indice_lemas = [];
  //wordParam = "tributo"

  for (let i = 0; i < lemmasData.lemas.length; i++) {
    for (let j = 0; j < lemmasData.lemas[i].palavras.length; j++) {
      // percorre todas as palavras em cada objeto
      if (lemmasData.lemas[i].palavras[j] === wordParam.toLowerCase()) {
        lemmas.push(lemmasData.lemas[i].lema);
        indice_lemas.push(i);
        break;
      }
    }
    if (lemmas > 0) break;
  }

  if (lemmas.length == 0) {
    lemmas[0] = "sem lemas";
  }
  console.log(`Lema = ${lemmas}`); // funcionaa!!
  console.log(`Indices = ${indice_lemas}`); // funciona!!
  //console.log(`WordParam: ${wordParam}`) // por alguma razão n funciona em cima

  /* Alguns problemas que podem estar a acontecer aqui:
   -> várias palavras iguais estão associadas a lemas diferentes
   -> Nota: foi criada uma nova versão para incluir palavras com acentuação!!!


*/

  /***************** Display dos elementos *******************/
  // antes de fazer o gráfico... obter os valores

  // Criar array com id dos textos de cada ano (179 entradas)
  //    let id_textos_p_ano = []

  //    for(let i = 0; i<textData.length; i++){
  //         //j = n de anos
  //         for(let j = 1846; j < 2025; j++){
  //             let ano = []
  //             if(textData[i].date_of_publication == j){
  //                 ano.push(textData[i].date_of_publication)
  //             }

  //         }

  //    } // só tenho de colocar a frequência da palavra ao longo dos anos!!!

  //ACEDENDO DADOS DE NUMERO DE PALAVRAS POR ANO
  //para a palavra: array para: idTexto, freq, ano
  let id_textos = [];
  let frequencia = [];
  let anos_pal = [];
  
  // na palavra selecionada, retira os textos que mencionam e a frequencia destes
  for (let i = 0; i < wordData.palavras[id_word].textos.length; i++) {
    id_textos.push(wordData.palavras[id_word].textos[i].id_text);
    frequencia.push(wordData.palavras[id_word].textos[i].frequencia);
  }

  for (let i = 0; i < id_textos.length; i++) {
    //array de anos
    anos_pal.push(textData[id_textos[i] - 1].date_of_publication); //acedendo ao ano pelo id
  }


  // CRIAÇÃO DE ARRAY MULTIDIMENCIONAL COM OS ANOS, IDs E FREQUENCIAS
  const ag_anos = [];
  let gAtual_anos = [];

  const ag_freq = [];
  let gAtual_freq = [];

  const ag_id = []; // os textos
  let gAtual_id = [];

  //ver este detalhe
  for (let i = 0; i < anos_pal.length; i++) {
    if (i === 0 || anos_pal[i] == anos_pal[i - 1]) {
      gAtual_anos.push(anos_pal[i]); //igual ao anterior, adiciona

      gAtual_freq.push(frequencia[i]); // adiciona para ids e frequencias
      gAtual_id.push(id_textos[i]);

    } else {
      ag_anos.push(gAtual_anos); // push grupo finalizado
      gAtual_anos = [anos_pal[i]]; // começa novo grupo

      //o mesmo para ids e frequencias
      ag_freq.push(gAtual_freq);
      gAtual_freq = [frequencia[i]];

      ag_id.push(gAtual_id);
      gAtual_id = [id_textos[i]];
    }
  }

  //push ultimo grupo (n percebo a parte do grupoatual.length)
  if (gAtual_anos.length) ag_anos.push(gAtual_anos);
  //console.log(`Anos: ${agrupado_anos}`);
  //console.log(ag_anos);

  if (gAtual_freq.length) ag_freq.push(gAtual_freq);
  //console.log(`Frequencias: ${ag_freq}`);
  //console.log(ag_freq);

  if (gAtual_id.length) ag_id.push(gAtual_id);
  //console.log(`IDs: ${ag_id}`);
  //console.log(ag_id);

  //Testes de funcionamento de variáveis
  //console.log(`Variável ag_freq[10][2]: ${ag_freq[10][1]}`) // funciona!!


  //TRANSFORMAR ARRAYS MULTIDIMENSIONAIS DOS ANOS E FREQ EM ARRAYS UNIDIMENSIONAIS
  const ag_anos_unidimensional = []
  const ag_freq_p_ano = []

  for(let i = 0; i < ag_anos.length; i++){
    let soma_freq = 0
    for(let j = 0; j < ag_anos[i].length; j++){
        soma_freq += ag_freq[i][j]
    }
    ag_freq_p_ano.push(soma_freq)
    ag_anos_unidimensional.push(ag_anos[i][0]) // escolhe o primeiro, pq são todos iguais
  }
//   console.log("Freq e anos respetivamente:")
//   console.log(ag_freq_p_ano)
//   console.log(ag_anos_unidimensional) //sem valores repetidos

  //TENTATIVA DE CONTAR TODOS OS ANOS E IGUALAR A 0 OS ANOS SEM REPRESENTAÇÃO
  const val_anos = ag_anos_unidimensional
  const val_freq = ag_freq_p_ano

  const start = 1846
  const end = 2025

  let anos_grafico = []
  let freq_grafico = []

  for(let y = start; y <= end; y++){
    anos_grafico.push(y) // adiciona os anos normalmente

    const idx = val_anos.indexOf(y) //tenta saber o indice do valor y (o ano atualmente selecionado)
    if(idx !== -1){ //-1 deve ser o valor de quando n encontra índice
        freq_grafico.push(val_freq[idx]) // se tiver o valor adiciona
    }else{
        freq_grafico.push(0) // se n tiver, adiciona 0
    }
  }


  // console.log("Valores para anos e frq no gráfico:")
  // console.log(anos_grafico)
  // console.log(freq_grafico)

  
//   console.log(val_anos)
//   console.log(val_freq)





  // /*********** Display palavra **************/
  let word_container = document.createElement("div")
  document.querySelector("body").appendChild(word_container)
  word_container.className += "word-container"

  let margem_ct = document.createElement("div")
  word_container.appendChild(margem_ct)
  margem_ct.className = "margem-ct"

  let word_h = document.createElement("h1")
  margem_ct.appendChild(word_h)
  word_h.className += "word-h"
  word_h.innerText = `Palavra: ${wordData.palavras[id_word].palavra}` // funciona!!

  // /*********** Display gráfico de frequencias **************/----------- FALTA!!
  // (ver qual a melhor biblioteca para isso!!)
  let grafico_ct = document.createElement("div")
  margem_ct.appendChild(grafico_ct)
  grafico_ct.className = "grafico-ct"

  let grafico_palavras = document.createElement("canvas")
  document.querySelector(".grafico-ct").appendChild(grafico_palavras)
  grafico_palavras.className = "grafico-palavras"

  const ctx = document.querySelector(".grafico-palavras")


  //*********** Teste com gráfico de linha **********/
  new Chart(ctx, {
    type: "line",
    data: {
      labels: anos_grafico,
      datasets: [
        {
          label: "frequencia de uso",
          data: freq_grafico,
          borderWidth: 1,
          borderColor: '#223F29',
          backgroundColor: '#223f29a4',
          pointBorderWidth: 1,
          pointRadius: 3
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  
  ///////////////////////////////////////////////////////////////////////////

  // /************** Display textos *************/
  let div_textos = document.createElement("div")
  word_container.appendChild(div_textos)
  div_textos.className += "div-textos div-textos-display"
  
  /******************  Funções para display  *******************/
  // valores default para ordenação de resultados
    let ordTit = "AZ" // o atual ---- titulo
    let ordTit_ = "ZA" // o q muda
    let ordAut = "AZ" // o atual ---- autor
    let ordAut_ = "ZA" // o q muda
    let ordDat = "asc" // o atual ---- ano
    let ordDat_ = "des"// o que muda
    let ordFre = "asc" // o atual ---- fre
    let ordFre_ = "des"// o que muda


    /*:::::::::::  Resultados p/pagina  :::::::::::*/
    //obtendo divisão por 50, descobrir o resto
    let rPP = 50 // resultados por página
    let arrayResultados = [] // com indice de inicio e de fim (com ele incluido)

    const txtTotal = wordData.palavras[id_word].textos.length

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
    //console.log(arrayResultados)

    // valor de indice da página
    let iP = 0

    /*:::::::::::  Array de obj com RESULTADOS  :::::::::::*/
    let resultado = [] 
    let textosResultado = wordData.palavras[id_word].textos.slice();

    for(let i = 0; i < textosResultado.length; i++){
      const texto = textosResultado[i] // percorre cada texto que contem a palavra (wordData)
      // testando a parte do metadata
      const metadata = textData[texto.id_text - 1]; // objeto com todas as infos do texto selecionado
      const id_do_texto = metadata.id; //id do texto
      const titul = metadata.title;
      const data_pub = metadata.date_of_publication;
      const autor = metadata.author;
      const freq1 = texto.frequencia; // busca em wordData

      resultado.push({
        id: id_do_texto,
        titulo: titul,
        ano: data_pub,
        autor: autor,
        freq: freq1
      })
    }
    //console.log(resultado[20].id, resultado[20].titulo, resultado[20].freq, resultado[20].ano)
    
    
    
    /*:::::::::::  Ordem alfabética de titulos  :::::::::::*/
    function ordTitleTxt(ord, data){
        //console.log("ord Function")
        if(ord=="AZ"){
            data.sort((a,b) => a.titulo.localeCompare(b.titulo, 'pt'))
            ordTit_ = "ZA" // pronto para mudar
            ordTit = "AZ" // o atual
        } else if (ord=="ZA"){
            data.sort((a,b) => a.titulo.localeCompare(b.titulo, 'pt')).reverse()
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
            data.sort((a,b) => a.autor.localeCompare(b.autor, 'pt'))
            ordAut_ = "ZA" // pronto para mudar
            ordAut = "AZ" // o atual
        } else if (ord=="ZA"){
            data.sort((a,b) => a.autor.localeCompare(b.autor, 'pt')).reverse()
            ordAut_ = "AZ" // pronto para mudar
            ordAut = "ZA" // o atual
        }
    }
    // ordAutores("ZA", textData)
    // console.log(textData)

    /*:::::::::::  Ordem cronologica de textos  :::::::::::*/
    function ordData(ord, data){
        if(ord == "des"){
          data.sort((a,b) => a.ano < b.ano ? -1 : 1).reverse()
          ordDat_= "asc" // pronto para mudar
          ordDat = "des" // atual
        } else if (ord == "asc") {
          data.sort((a,b) => a.ano < b.ano ? -1 : 1)
          ordDat_= "des"
          ordDat = "asc"
        }
    }
    // ordData("des", textData)
    // console.log(textData)

    /*:::::::::::  Ordem freq da id_word nos textos  :::::::::::*/
    function ordFreq(ord, data){
        if(ord == "des"){
          data.sort((a,b) => a.freq < b.freq ? -1 : 1).reverse()
          ordFre_= "asc" // pronto para mudar
          ordFre = "des" // atual
        } else if (ord == "asc") {
          data.sort((a,b) => a.freq < b.freq ? -1 : 1)
          ordFre_= "des"
          ordFre = "asc"
        }
    }
    // ordData("des", textData)
    // console.log(textData)


    /*:::::::::::  Excertos onde a palavra esta presente  :::::::::::*/
    function excertos(){
    }
    /*:::::::::::  Normalizar string  :::::::::::*/
    function normalize(str){
        return str
            ?.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
    }




  function displayTabela(){
    div_textos.innerHTML = ""

    let list_all_container = document.createElement("div")
    document.querySelector(".div-textos").appendChild(list_all_container)
    list_all_container.className += "list-all-container"

    // item_ordenar = [];
    // ordem_frequência = [];

    /* Criando uma header (em nova div no topo!!)*/

    //Header!!
    let tentry_header = document.createElement("div");
    list_all_container.appendChild(tentry_header);
    tentry_header.className += "tentry tentry-header";

    // conteudo do header!!
    tentry_header.innerHTML = ` <div class = "ano header ano-header"> 
                                  <h2 class = "ano-o-h">Ano</h2> 
                                  <p id="Ord-Dat">Ord:</p>
                                  <div id = "year-search-bar">
                                    <input id="yeartxt-input" class="input-h" aria-label="ano?" type="number" class="year-search-bar__input" placeholder="ano?" min="1846" autofocus required>
                                    <input id="yeartxt-submit" type="image" class="year-search-bar__button bt-h" src='./imagens/lupa.svg' aria-label=""search>
                                  </div>
                                </div>

                                <div class = "titul header titul-header">
                                  <h2 class = "titul-o-h">Título</h2> 
                                  <p id = "Ord-Tit">Ord: </p>
                                  <div id = "titul-search-bar">
                                    <input id="titultxt-input" class="input-h" aria-label="titulo?" type="text" class="titultxt-search-bar__input" placeholder="titulo?" autofocus required>
                                    <input id="titultxt-submit" type="image" class="titultxt-search-bar__button bt-h" src='./imagens/lupa.svg' aria-label=""search>
                                  </div>
                                </div>

                                <div class = "author header author-header">
                                  <h2 class = "aut-o-h">Autor</h2>
                                  <p id = "Ord-Aut">Ord: </p>
                                  <div id = "autor-search-bar">
                                    <input id="autortxt-input" class="input-h" aria-label="autor?" type="text" class="autortxt-search-bar__input" placeholder="autor?" autofocus required>
                                    <input id="autortxt-submit" type="image" class="autortxt-search-bar__button bt-h" src='./imagens/lupa.svg' aria-label=""search>
                                  </div>
                                </div>

                                <div class = "freq header freq-header">
                                  <h2 class = "freq-o-h">Freq</h2>
                                  <p id = "Ord-Freq">Ord: </p>
                                  <div id = "freq-search-bar">
                                    <input id="freqtxt-input" class="input-h" aria-label="freq?" type="text" class="freqtxt-search-bar__input" placeholder="freq?" autofocus required>
                                    <input id="freqtxt-submit" type="image" class="freqtxt-search-bar__button bt-h" src='./imagens/lupa.svg' aria-label=""search>
                                  </div>
                                </div>`;

    tentry_header.style.backgroundColor = "yellow"
    

    /*:::::  Botoes  :::::*/
    const yearSubmitButton = document.querySelector('#yeartxt-submit')
    const yearInput = document.querySelector('#yeartxt-input')

    const titulSubmitButton = document.querySelector('#titultxt-submit')
    const titulInput = document.querySelector('#titultxt-input')

    const autorSubmitButton = document.querySelector('#autortxt-submit')
    const autorInput = document.querySelector('#autortxt-input')

    const freqSubmitButton = document.querySelector('#freqtxt-submit')
    const freqInput = document.querySelector('#freqtxt-input')

      
      // conteudo após header //////////////////////
      let container = document.createElement("div")
      list_all_container.appendChild(container)
      container.className = "container conteiner-a"

      function displayResultadotxt(resultado, valor){

        /*:::::  Atualiza os headers  :::::*/
        document.querySelector('#Ord-Tit').textContent = `Ord: ${ordTit}`
        document.querySelector('#Ord-Aut').textContent = `Ord: ${ordAut}`
        document.querySelector('#Ord-Dat').textContent = `Ord: ${ordDat}`
        document.querySelector('#Ord-Freq').textContent = `Ord: ${ordFre}`

        container.innerHTML = ""


        //let total = textData.length
        //iteração para display
        if(resultado == undefined || resultado == [] || resultado == ""){
            container.innerHTML = `<p>Não foram encontrados resultados para: "${valor}" </p><br><br>`
        } else {
            for(let i = arrayResultados[iP].st; i < arrayResultados[iP].en; i++){
                //cria a div principal
                let ct_item = document.createElement("div")
                ct_item.className += "ct-item ct-item" + (i+1)
                container.appendChild(ct_item)

                ct_item.innerHTML = `<a class = "ano" href="p_categoria_especifica.html?categoria=Anos&especifica=${resultado[i].ano}">${resultado[i].ano}</a>
                                    <a class = "titul" href="index.html?id=${resultado[i].id}">${resultado[i].titulo}</a>
                                    <a class = "author" href="p_categoria_especifica.html?categoria=Autores&especifica=${resultado[i].autor}">${resultado[i].autor}</a>
                                    <a class = "freq">${resultado[i].freq}</a>`
            }
        }

        /*:::::  Display de páginas de resultados  :::::*/
        // remove outro nPages que existam anteriormente em list_container
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

        //console.log(`Resultado atualizado: ${arrayResultados.length}`)

      }
      displayResultadotxt(resultado)

      
  /*:::::::::::  ____________FILTROS____________  :::::::::::*/

        /***************** Ordem Alfabetica [titulo] ********************/
        document.querySelector('#Ord-Tit').addEventListener('click', (e) => { // filtros funcionais
            ordTitleTxt(ordTit_, resultado) // dá erro aqui
            displayResultadotxt(resultado)
            //console.log("click!!")
        })
        // document.querySelector('#Ord-Tit').style.backgroundColor = "white"

        /***************** Ordem Alfabetica [autor] ********************/
        document.querySelector('#Ord-Aut').addEventListener('click', (e) => {
            ordAutores(ordAut_, resultado)
            displayResultadotxt(resultado)
            console.log("click!!")
        })
        // document.querySelector('#Ord-Aut').style.backgroundColor = "white"

        /***************** Ordem cronologica ********************/
        document.querySelector('#Ord-Dat').addEventListener('click', (e) => {
            ordData(ordDat_, resultado)
            displayResultadotxt(resultado)
            console.log("click!!")
        })
        // document.querySelector('#Ord-Dat').style.backgroundColor = "white"

        /***************** Ordem frequencia ********************/
        document.querySelector('#Ord-Freq').addEventListener('click', (e) => {
            ordFreq(ordFre_, resultado)
            displayResultadotxt(resultado)
            console.log("click!!")
        })
        // document.querySelector('#Ord-Dat').style.backgroundColor = "white"

        /***************** Separadores page ********************/
        function sepPage(){
            for(let i = 0; i < arrayResultados.length; i++){ //funiona!! // deve ser por arrayResultados ter de se atualizar!!
                    document.querySelector('#n-page' + i).addEventListener('click', (e) => {
                    console.log(`Click, page ${document.querySelector('#n-page' + i).innerText}`)
                    iP = i
                    displayResultadotxt(resultado)
                })
                document.querySelector('#n-page' + i).style.backgroundColor = "yellow" // após atualização dos filtros isto deixa de funcionar
            }
        }
        sepPage() // ainda preciso de perceber!!



        /*:::::::::::  __Pesquisa livre__  :::::::::::*/

        /***************** Year pesquisa ********************/
        yearInput.addEventListener('input', (e) =>{
          let value = String(e.target.value).trim()

          if(value.length > 0){
            
            const filteredResultado = resultado
              .filter(item =>{
                  const year = String(item?.ano ?? "")
                  return year.startsWith(value)
              })
              .sort((a,b) => {
                const na = Number(a.ano)
                const nb = Number(b.ano)
                return(Number.isNaN(na) ? Infinity : na) - (Number.isNaN(nb) ? Infinity: nb)
              })
            resPPage(filteredResultado.length, rPP)
            displayResultadotxt(filteredResultado, value)
          } else {
            resPPage(resultado.length, rPP)
            displayResultadotxt(resultado, value)
          }
        })

        /***************** Title pesquisa ********************/
        titulInput.addEventListener('input', (e) =>{
          let value = e.target.value

          if(value && value.trim().length > 0){
            value = value.trim().toLowerCase()

            const filteredResultado = resultado
              .filter(item => {
                const title = normalize(item?.titulo || "")
                const val = normalize(value)
                return title.includes(val)
              })
              .sort((a,b) => {
                const aTit = normalize(a.titulo)
                const bTit = normalize(b.titulo)
                const val = normalize(value)

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
            displayResultadotxt(filteredResultado, value)

          } else{
            resPPage(resultado.length, rPP)
            displayResultadotxt(resultado, value)
          }
        })

        /***************** autor pesquisa ********************/
        autorInput.addEventListener('input', (e) =>{ // n está confiavel!!
            let value = e.target.value

            if(value && value.trim().length > 0){
                value = value.trim().toLowerCase()

                const filteredResultado = resultado
                    .filter(item => {
                        const author = normalize(item?.autor || "") // n sei se o autor foi bem recolhido
                        const val = normalize(value)
                        return author.includes(val)
                    })
                    .sort((a,b) => { // ordem alfabetica com os valores dos resultados normalizados
                        const aAut = normalize(a.autor)
                        const bAut = normalize(b.autor)
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
                resPPage(resultado.length, rPP)
                displayResultadotxt(resultado, value)
            }
        })

        /***************** freq pesquisa ********************/
        freqInput.addEventListener('input', (e) => {
          let value = String(e.target.value).trim()

            if(value.length > 0){
     
                const filteredResultado = resultado
                    .filter(item => {
                        const f = String(item?.freq ?? "")
                        return f.startsWith(value)
                    })
                    .sort((a,b) => {
                        const na = Number(a.freq)
                        const nb = Number(b.freq)
                        return (Number.isNaN(na) ? Infinity : na) - (Number.isNaN(nb) ? Infinity : nb)
                    })

                resPPage(filteredResultado.length, rPP)
                displayResultadotxt(filteredResultado, value)

            } else {
                resPPage(resultado.length, rPP)
                displayResultadotxt(resultado, value)
            }
        })

  }

  displayTabela()
  
  



        
    
   // Teste de redirecionar info com apenas javaScript
  /////////////////////////////////// Vai ser necessário reordenar os items!! ///////////////////////////

    // function ordenarTextos(id_word, wordData, textData, sortBy = "frequência", dir = "desc") {
    //   const container = document.createElement("div");
    //   document.querySelector(".list-container").appendChild(container);
    //   container.className += "container";

    //   container.innerHTML = ""; // garantir que contentor está limpo antes de atualizar os dados!!

  
    //   let textos = wordData.palavras[id_word].textos.slice(); //BUSCA CONJUNTO DE TEXTOS QUE CONTEM A PALAVRA

    //   //sort ased on criteria
    //   textos.sort((a, b) => { //SORT POR FREQUENCIA OU POR TITULO (N DINAMICO)
    //     let valA, valB;

    //     if (sortBy === "frequência") {
    //       // pega nos valores de frequência dos textos
    //       valA = a.frequencia;
    //       valB = b.frequencia;
    //     } else if (sortBy === "titulo") {
    //       valA = textData[a.id_text - 1].title.toLowerCase();
    //       valB = textData[a.id_text - 1].title.toLowerCase();
    //     }

    //     if (valA < valB) return dir === "asc" ? -1 : 1;
    //     if (valA > valB) return dir === "asc" ? 1 : -1;
    //     return 0;
    //   });

    //   // render sorted list:
    //   for (let i = 0; i < textos.length; i++) {
    //     const texto = textos[i];

    //     let tentry_container = document.createElement("div");
    //     //document.querySelector(".list-container").appendChild(tentry_container)
    //     tentry_container.className +=
    //       "tentry tentry-container tentry-container" + (i + 1);

    //     //criando elemento a para link

    //     //id funciona!!
    //     // testando a parte do matadata
    //     const metadata = textData[texto.id_text - 1];
    //     const id_do_texto = metadata.id; //id do texto
    //     const titul = metadata.title;
    //     const data_pub = metadata.date_of_publication;
    //     const autor = metadata.author;
    //     const freq1 = texto.frequencia;

    //     /************* Colocando o conteúdo em divs ***************/

    //     tentry_container.innerHTML = `
    //                                         <div class = "titul"><a class = "titulo" href = "./pag_de_texto.html?id=${id_do_texto}"> ${titul}</a></div>
    //                                         <div class = "ano"><a class = "ano-a" href ="p_categoria_especifica.html?categoria=Anos&especifica=${data_pub}">${data_pub}</a></div>
    //                                         <div class = "author"><a class = "author-a" href="p_categoria_especifica.html?categoria=Autores&especifica=${autor}">${autor}</a></div>
    //                                         <div class = "freq">${freq1}x</div> 
    //                                         `;

    //     container.appendChild(tentry_container);
    //   }
    // }

      //**** teste: chamar função: ****//

    //nota: tem muitos erros!! é melhor ver ao detalhe o que diferencia!!
    //ordenarTextos(id_word, wordData, textData, "frequência", "desc");

  





  /*
    NOTA: FUNCIONOU, mas retirou o header como já estava à esperaaa!!!


*/

  //********  CASO O DE CIMA NÃO FUNCIONE  *********/
  // for(let i = 0; i < wordData.palavras[id_word].textos.length; i++) {

  //     /* Para link em cada caixa aaaa
  //         let a_tentry_container = document.createElement("a")
  //         document.querySelector(".list-container").appendChild(a_tentry_container)
  //         a_tentry_container.className += "titulo "

  //     */

  //     let tentry_container = document.createElement("div")
  //     document.querySelector(".list-container").appendChild(tentry_container)
  //     tentry_container.className += "tentry tentry-container tentry-container" + (i + 1)

  //     //criando elemento a para link

  //     //id funciona!!
  //     id_do_texto = textData[wordData.palavras[id_word].textos[i].id_text-1].id //id do texto
  //     titul = textData[wordData.palavras[id_word].textos[i].id_text-1].title
  //     data_pub = textData[wordData.palavras[id_word].textos[i].id_text-1].date_of_publication
  //     autor = textData[wordData.palavras[id_word].textos[i].id_text-1].author
  //     freq1 = wordData.palavras[id_word].textos[i].frequencia

  //     //guardar array de strings (organizar as frequencias - dicionário-> freq com string)
  //     //tentry_container.innerHTML = `<a class="titulo" href = "./pag_de_texto.html?id=${id_do_texto}">${titul} (${data_pub}) — ${autor} (${freq1}x)</a>`
  //     //tentry_container.innerHTML = `Título (${textData[wordData.palavras[id_word].texts[i]-1].id}): ${textData[wordData.palavras[id_word].texts[i]-1].title}`

  //     /************* Colocando o conteúdo em divs ***************/

  //         tentry_container.innerHTML = `
  //                                       <div class = "iteracao">${i+1}</div>
  //                                       <div class = "titul"><a class = "titulo" href = "./pag_de_texto.html?id=${id_do_texto}"> ${titul}</a></div>
  //                                       <div class = "ano">${data_pub}</div>
  //                                       <div class = "author">${autor}</div>
  //                                       <div class = "freq">${freq1}x</div>
  //                                       `

  // }

///////////////////////// DISPLAY DE LEMAS (A ELIMINAR) ///////////////////////////
  // // display de lemas
  // let lemmas_container = document.createElement("div");
  // document.querySelector("body").appendChild(lemmas_container);
  // lemmas_container.className += "lemmas-container";

  // let lemmas_h = document.createElement("h2");
  // lemmas_container.appendChild(lemmas_h);
  // lemmas_h.className += "lemmas-h";
  // lemmas_h.innerText = `Lemas de ${wordData.palavras[id_word].palavra}`;

 /************** Para os lemas: *************************/
//   for (let i = 0; i < lemmas.length; i++) {
//     // acesso a cada um dos lemas no array

//     // let lem_ct = document.createElement("div") // contentor de cada lema
//     // lemmas_container.appendChild(lem_ct)
//     // lem_ct.className += "lem-ct" + (i + 1)

//     // let lem_h = document.createElement("h3")
//     // document.querySelector(`.lem-ct${i+1}`).appendChild(lem_h)
//     // lem_h.className += `lem-h${i+1}`
//     // //lem_h.innerHTML = `${lemmas[i]}`

//     //indice_lemas- índice de cada lemai

//     console.log(lemmasData.lemas[indice_lemas[i]].palavras.length);
//     //resultados para encontro: 12 (encntrar) e 1 (encontro)

//     // contentor para cada lema:
//     let lem_ct = document.createElement("div");
//     document.querySelector(".lemmas-container").appendChild(lem_ct);
//     lem_ct.className += `lem-ct`;

//     // guarda h3 no seu contentor:
//     let lem_h = document.createElement("h3");
//     lem_ct.appendChild(lem_h);
//     lem_h.innerText = `${lemmas[i]}`;

//     for (
//       let j = 0;
//       j < lemmasData.lemas[indice_lemas[i]].palavras.length;
//       j++
//     ) {
//       let p_palavras = document.createElement("li");
//       lem_ct.appendChild(p_palavras);

//       // cria contentor (ordenado para colocar lista de poemas)
//       let txt_pal_textos = document.createElement("div");
//       lem_ct.appendChild(txt_pal_textos);
//       txt_pal_textos.className += "s-list-container";

//       //criar aqui header se necessário!

//       let id_palavra_de_lema = null;

//       for (let k = 0; k < wordData.palavras.length; k++) {
//         const dictWord = wordData.palavras[k].palavra;
//         const original_word = lemmasData.lemas[indice_lemas[i]].palavras[j];

//         if (dictWord === original_word) {
//           id_palavra_de_lema = wordData.palavras[k - 1].id;
//           break;
//         }
//       }

//       n_results = wordData.palavras[id_palavra_de_lema].textos.length;

//       p_palavras.innerHTML = `<b>${
//         lemmasData.lemas[indice_lemas[i]].palavras[j]
//       } (${n_results})</b>`;

//       if (id_palavra_de_lema != null) {
//         console.log(`id = ${id_palavra_de_lema}`);
//         //escreve a paravra no contentor, mas a do dicionário
//         //tá ok

//         //escrever nº dos textos
//         for (
//           l = 0;
//           l < wordData.palavras[id_palavra_de_lema].textos.length;
//           l++
//         ) {
//           let p_palavras_poemas = document.createElement("div");
//           txt_pal_textos.appendChild(p_palavras_poemas);
//           p_palavras_poemas.className += "s-list-container";

//           //p_palavras_poemas.innerText = `${wordData.palavras[id_palavra_de_lema].textos[l].id_text}`

//           text_id_value =
//             wordData.palavras[id_palavra_de_lema].textos[l].id_text;
//           titl = textData[text_id_value - 1].title; //id-1, uma vez que a iteração começa em 0 e id começa em 1
//           data_publ = textData[text_id_value - 1].date_of_publication;
//           autoor = textData[text_id_value - 1].author;
//           frequencia =
//             wordData.palavras[id_palavra_de_lema].textos[l].frequencia;

//           //p_palavras_poemas.innerHTML = `<a class="titulo" href = "./pag_de_texto.html?id=${text_id_value}">${titl} (${data_publ}) — ${autoor} (${frequencia}x)</a>` //falta a frequência e o ano + colocar numa tabela

//           p_palavras_poemas.innerHTML = `
//                                                     <div class = "s-iteracao">${
//                                                       l + 1
//                                                     }</div>
//                                                     <div class = "s-titul">${titl}</div>
//                                                     <div class = "s-ano">${data_publ}</div>
//                                                     <div class = "s-author">${autoor}</div>
//                                                     <div class = "s-freq">${frequencia}</div>
//                                                 `;
//         }

//         /* Falta acrescentar:
//                     -> Links para página dos textos
//                     -> Links para os poemas associados
//                     -> Possibilidade de esconder os poemas associados
//                     -> Tabela css (fazer wireframes em figma - ter tbm o design !!)

//                     NOTA: Se a palavra do lema for a representada, não precisa eibir os textos ou
//                         - Escrever: outras palavras com o mesmo lema??
//                         - Não incluir a palavra se for igual à inicialmente representada
                
                
//                     - Vou ter de compreender bem o que ando a fazer!! (a parte de baixo não está bem!!)
//                 */
//       } else {
//         console.log("Palavra não encontrada");
//       }
//     }
//   }
///////////////////////// LEMAS ELIMINADOS ATÉ AQUI ///////////////////////////
}




//função para normalizar o texto (n sei se é mesmo necessário!!!)
// talvez apenas remover a pontuação...
function normalizarTexto(string){
    const punct = /[\.,?!"]/g
    let novoTexto = []

    string.normalize("NFD") // forma canónica, não percebo
    string.replace(/[\u0300-\u036f]/g, "") //remove acentos
    string.toLowerCase()

    for(let i = 0; i < string.length; i++){
        novoTexto[i] = string[i].replace(punct, "")
    }

    let final = novoTexto.join('')
    
    return final
}

