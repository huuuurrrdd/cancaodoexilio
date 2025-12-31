/*

    Documento para script de página de todas as palavras!!


*/


//*************  Acesso a dados  ****************/
function fetchData() {
  //stopList para poder não incluir stopwords nas palavras mais populares
  let wordData, textData, stoplist, lemmasData;

  //dicionario json
  fetch("./Dict_palavras_lemas_v0004.json")
    .then((response) => {
      if (!response.ok) {
        // menssagem de erro
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // return data
    })
    .then((data) => {
      wordData = data; //Guarda dict_pal em wordData
      return fetch("./t4_textos_loc_fauna_flora.json"); // fetch json dos textos
    })
    .then((response) => {
      // mensagem de erro
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // return data
    })
    .then((data) => {
      textData = data; // info dos textos a conter as coordenadas geográficas
      return fetch("./Dict_lemas_palavras_v0002.json");
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // return data
    })
    .then((data) => {
      lemmasData = data; // guarda json dos lemas
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

      //funcao com os 3 dados dos 3 ficheiros
      displayData(wordData, textData, stoplist, lemmasData);
    })
    .catch((error) => console.error("Failed to fetch data", error));
}

fetchData();

function displayData(wordData, textData, stoplist) {
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /****************************  FUNÇÃO QUE DEVOLVE UM "OBJ PALAVRA (ano(key): freq(value))"  *******************************/
  //         - Esta função tbm pode devolver:
  //            -> ano(key): freq(value) //+ nºTextosPano + freq/nºTextosPano
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function frequencia_por_anos(Idx_Palavra) { // este IdPalavra deve ser um indice
    //ACEDENDO DADOS DE NUMERO DE PALAVRAS POR ANO
    //para a palavra: array para: idTexto, freq, ano
    id_textos = [];
    frequencia = [];
    anos_pal = [];

    for (let i = 0; i < wordData.palavras[Idx_Palavra].textos.length; i++) {
      id_textos.push(wordData.palavras[Idx_Palavra].textos[i].id_text);
      frequencia.push(wordData.palavras[Idx_Palavra].textos[i].frequencia);
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

    const ag_id = [];
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
    const ag_anos_unidimensional = [];
    const ag_freq_p_ano = [];

    for (let i = 0; i < ag_anos.length; i++) {
      let soma_freq = 0;
      for (let j = 0; j < ag_anos[i].length; j++) {
        soma_freq += ag_freq[i][j];
      }
      ag_freq_p_ano.push(soma_freq);
      ag_anos_unidimensional.push(ag_anos[i][0]); // escolhe o primeiro, pq são todos iguais
    }
    //   console.log("Freq e anos respetivamente:")
    //   console.log(ag_freq_p_ano)
    //   console.log(ag_anos_unidimensional) //sem valores repetidos

    //TENTATIVA DE CONTAR TODOS OS ANOS E IGUALAR A 0 OS ANOS SEM REPRESENTAÇÃO
    const val_anos = ag_anos_unidimensional;
    const val_freq = ag_freq_p_ano;
    // ainda multidimensional
    const val_id = ag_id // para unidimensional, descobre n de textos p ano

    const start = 1846;
    const end = 2025;

    let anos_grafico = [];
    let freq_grafico = [];
    let ids_final = []
    let textosPAno = []

    for (let y = start; y <= end; y++) {
      anos_grafico.push(y); // adiciona os anos normalmente

      const idx = val_anos.indexOf(y); //tenta saber o indice do valor y (o ano atualmente selecionado)
      if (idx !== -1) {
        //-1 deve ser o valor de quando n encontra índice
        freq_grafico.push(val_freq[idx]); // se tiver o valor adiciona
        ids_final.push(val_id[idx])
        textosPAno.push(val_id[idx].length)
      } else {
        freq_grafico.push(0); // se n tiver, adiciona 0
        ids_final.push(0)
        textosPAno.push(0)
      }
    }

    //console.log(`Textos p ano ${textosPAno}`)// algo eu n percebo ou esta errado

    //TENTATIVA DE CRIAR UM OBJETO (ano(key): freq(value))
    const itemPalavra = {};
    anos_grafico.forEach((key, index) => {
      itemPalavra[key] = freq_grafico[index];
    });

    const itemPalavra_ = {};
    anos_grafico.forEach((key, index) => { // key = ano; index = array
      itemPalavra[key] = {
        nome: wordData.palavras[Idx_Palavra].palavra,
        freq: freq_grafico[index],
        nTextos: textosPAno [index]
        // posso colocar aqui a lista de ids se necessário
      }
    });

    return itemPalavra;


    // console.log("Valores para anos e frq no gráfico:")
    // console.log(anos_grafico)
    // console.log(freq_grafico)
  }
  /*----------------  ACABA FUNÇÃO QUE DEVOLVE UM "OBJ PALAVRA (ano(key): freq(value))"  ----------------*/

  //**************** acesso a objeto de palavra ****************//

  // FAZER AQUI TESTES DE ACESSO (PELO ID)
  let motivo = frequencia_por_anos(5762) // palavra motivo
  // console.log(`motivo ${motivo[5762].nome}`) // n funciona!!
  console.log(`motivo ${motivo[1846].nome}`) // funciona
  console.log(`motivo ${motivo[2015].freq}`) // funciona
  console.log(`motivo ${motivo[2015].nTextos}`) // funciona

  // array com ARRAY COM TODOS OS OBJETOS DE PALAVRAS (com todos os anos associados à respetiva frequência)
  let arrayTodosOBJpalavras = [];

  //array com todas as palavras (SAO MUIITASS) -> SÃO APENAS TODAS AS PALAVRAS
  for (let i = 0; i < wordData.palavras.length; i++) {
    arrayTodosOBJpalavras[i] = frequencia_por_anos(i); //iguala cada item do array ao objeto resultante da funcao
  }

  //FUNCIONA: ordenação de frequencia de palavras conforme o ano
  /**********************  Preparação de dados para gráfico  ************************/

  // criar objeto de stopWordList (index: valor; palavra: valor)
  // com set para ser mais rapido e eficiente
  const stopSet = new Set(stoplist);
  const stopListOBJ = []; // ARRAY DE OBJETO DE TODAS AS PALAVRAS COM RESPETIVO INDEX
  for (let i = 0; i < wordData.palavras.length; i++) {
    const palavra = wordData.palavras[i].palavra;
    if (stopSet.has(palavra)) {
      stopListOBJ.push({
        indice: i,
        palavra: palavra,
      });
    }
  }

  const stopIndices = new Set(stopListOBJ.map((obj) => obj.indice)); // JUNTA NUM SET OS INDEX DAS PALAVRAS QUE SÃO STOPWORDS
  ////****************  Até aqui parece ok  ************** */

  // JUNTANDO TUDO NUM ARRAY DE ANOS
  // ---->>> testar agora com todos os anos (de 1846 a 2025)
  const start = 1846;
  const end = 2025;

  let n_palavras;
  let todosOBJpalavrasSStopwords;
  let anos_grafico = [];
  //Criando um array de anos
  let todas_as_palavrasFreq_p_ano = [];
  for (let y = start; y <= end; y++) {
    anos_grafico.push(y);
    let lista_combinada_s_stopwords = []; // OBJETO COM TODAS AS PALAVRAS E FREQUENCIAS NUM ANO

    for (let i = 0; i < wordData.palavras.length; i++) {
      if (!stopIndices.has(i)) {
        // se não tem indice i
        lista_combinada_s_stopwords.push({
          indice: i,
          freq: arrayTodosOBJpalavras[i][y].freq || 0,
          nTextos: arrayTodosOBJpalavras[i][y].nTextos || 0,
          logFreqPTexto: ((arrayTodosOBJpalavras[i][y].freq)/(arrayTodosOBJpalavras[i][y].nTextos)||0)//Math.log((arrayTodosOBJpalavras[i][y].freq)/(arrayTodosOBJpalavras[i][y].nTextos) || 0)
          //valor do logaritmo da divisao
        });
      }
    }

    console.log( Math.log(2)) // parece correto

    todosOBJpalavrasSStopwords = lista_combinada_s_stopwords;
    n_palavras = lista_combinada_s_stopwords.length;

    // // 2º ordena (n percebo a logica desta ordenacao...)
    // lista_combinada_s_stopwords.sort((a, b) => b.freq - a.freq);
    // let maior_frequencia_do_ano = lista_combinada_s_stopwords[0]?.freq || 0;

    // versao nova (pode estar mal)
    lista_combinada_s_stopwords.sort((a, b) => b.logFreqPTexto - a.logFreqPTexto);
    let maior_frequencia_do_ano = lista_combinada_s_stopwords[0]?.logFreqPTexto || 0;

  //   let lista_indices_com_maior_frequencia = lista_combinada_s_stopwords
  //     // itera sobre todos os elementos do array, mantendo apenas os objetos em que a condição é verdadeira
  //     .filter((obj) => obj.freq === maior_frequencia_do_ano)
  //     .map((obj) => obj.indice); // percorre cada elemento do array e transforma em algo diferente, devolvendo um array

  //   if (lista_indices_com_maior_frequencia.length != n_palavras) {
  //     todas_as_palavrasFreq_p_ano.push({
  //       ano: y,
  //       lista: lista_combinada_s_stopwords,
  //       maior_freq: maior_frequencia_do_ano,
  //       indices_palavras_maior_freq: lista_indices_com_maior_frequencia,
  //     });
  //   } else {
  //     todas_as_palavrasFreq_p_ano.push({
  //       ano: y,
  //       lista: lista_combinada_s_stopwords,
  //       maior_freq: "",
  //       indices_palavras_maior_freq: "",
  //     });
  //   }
  // }

  // versao nova (pode estar mal)
    let lista_indices_com_maior_frequencia = lista_combinada_s_stopwords
      // itera sobre todos os elementos do array, mantendo apenas os objetos em que a condição é verdadeira
      .filter((obj) => obj.logFreqPTexto === maior_frequencia_do_ano)
      .map((obj) => obj.indice); // percorre cada elemento do array e transforma em algo diferente, devolvendo um array

    if (lista_indices_com_maior_frequencia.length != n_palavras) {
      todas_as_palavrasFreq_p_ano.push({
        ano: y,
        lista: lista_combinada_s_stopwords,
        maior_freq: maior_frequencia_do_ano,
        indices_palavras_maior_freq: lista_indices_com_maior_frequencia,
      });
    } else {
      todas_as_palavrasFreq_p_ano.push({
        ano: y,
        lista: lista_combinada_s_stopwords,
        maior_freq: "",
        indices_palavras_maior_freq: "",
      });
    }
  }


  let freq_grafico = [];
  let palavras_grafico = [];
  //let indices_grafico = []

  for (let i = 0; i < todas_as_palavrasFreq_p_ano.length; i++) {
    const anoData = todas_as_palavrasFreq_p_ano[i];
    freq_grafico.push(anoData.maior_freq);

    if (anoData.indices_palavras_maior_freq.length != 0) {
      // aqui criar uma string com todas as palavras com maior freq. + opção de random!!
      let idx = anoData.indices_palavras_maior_freq[0];
      //palavras_grafico.push(wordData.palavras[idx].palavra) //começa com a primeira palavra, depois escolhe random
      let grupo = [];
      for (let j = 0; j < anoData.indices_palavras_maior_freq.length; j++) {
        let idxj = anoData.indices_palavras_maior_freq[j];
        grupo.push(wordData.palavras[idxj].palavra);
      }
      palavras_grafico.push(grupo.join(", "));
    } else {
      palavras_grafico.push("");
    }
    //console.log(`Ano: ${anoData.ano}, Length: ${anoData.indices_palavras_maior_freq.length}`)
  }

  // console.log(`${n_palavras}`) // n total de palavras!!
  // console.log(`${todas_as_palavrasFreq_p_ano.length}`) //180
  // console.log(`${anos_grafico.length}`) // 180
  // console.log(`${freq_grafico.length}`) // 180
  // console.log(`${palavras_grafico.length}`) // 180

  //dados necessários para o gráfico:
  // Array de anos : anos_grafico
  // Array de maiores frequencias p ano : freq_grafico
  // Array de labels (uma palavra para cada ano): palavras_grafico

  //DISPLAY de elementos//

  /**********************  Contentor geral  ****************************/
  let words_container = document.createElement("div");
  document.querySelector("body").appendChild(words_container);
  words_container.className += "words-container";

  let margem_ct = document.createElement("div");
  words_container.appendChild(margem_ct);
  margem_ct.className = "margem-ct"

  //****************  Título de página  ******************/
  let title_h = document.createElement("h1");
  margem_ct.appendChild(title_h);
  title_h.className += "pesquisa-palavras-h page-title";
  title_h.innerText = `Pesquisa de palavras`;

  //*********  Display gráfico de frequencias  ***********/
  grafico_ct = document.createElement("div");
  margem_ct.appendChild(grafico_ct);
  grafico_ct.className = "grafico-ct";

  canvas = document.createElement("canvas");
  document.querySelector(".grafico-ct").appendChild(canvas);
  canvas.className = "grafico-palavras-populares";

  const ctx = document.querySelector(".grafico-palavras-populares");

  //*********** Teste com gráfico de barra **********/

  //Poderia colocar o plugin, mas saber como colocar o texto alinhado com o gráfico??
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: anos_grafico,
      datasets: [
        {
          label: "Palavras com maior frequencia em cada ano",
          data: freq_grafico,
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
              const i = context.dataIndex;
              const palavra = palavras_grafico[i];
              const freq = freq_grafico[i];
              return `${palavra}: ${freq}`;
            },
          },
        },
      },
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  //*********  Botões (todas as palavras + palavras populares)  ********************/
  //container
  bts_visualizacao = document.createElement("div");
  document.querySelector(".words-container").appendChild(bts_visualizacao);
  bts_visualizacao.className = "bts-visualizacao";

  // bt_todas_palavras = document.createElement("div");
  // bt_palavras_pop = document.createElement("div");

  // document.querySelector(".bts-visualizacao").appendChild(bt_todas_palavras);
  // document.querySelector(".bts-visualizacao").appendChild(bt_palavras_pop);

  // bt_todas_palavras.className = "bt-todas-palavras";
  // bt_palavras_pop.className = "bt-palavras-pop";  

  // bt_todas_palavras.innerHTML = "Todas as palavras";
  // bt_palavras_pop.innerHTML = "Palavras populares";

  //** div para display **//
  div_display = document.createElement("div");
  document.querySelector(".bts-visualizacao").appendChild(div_display);
  div_display.className = "div-display";



  // decidir o intervalo de resultados (neste caso, 20 p página)
function displayTodasPalavras(){
  div_display.innerHTML = "";

  // valores default para ordenação de resultados
  let ordAlf = "AZ"
  let ordAlf_ = "ZA"
  let ordFre = "des" // Start with descending (most frequent first)
  let ordFre_ = "asc"
  let ordTit = "cro"
  let ordTit_ = "alf"

  /*:::::::::::  Resultados p/pagina  :::::::::::*/
  let rPP = 50
  let arrayResultados = []
  let iP = 0

  function resPPage(total, rPP){
    arrayResultados = []
    const divInteira = Math.floor(total / rPP)
    const resto = total % rPP

    if(total <= rPP){
      arrayResultados.push({ st:0, en: total})
    } else {
      for(let i = 0; i < divInteira; i++){
        const s = i * rPP
        const e = s + rPP
        arrayResultados.push({ st: s, en: e })
      }
      if(resto != 0) {
        arrayResultados.push({
          st : divInteira * rPP,
          en: divInteira * rPP + resto
        })
      }
    }
  }

  /*:::::::::::  Array de obj com RESULTADOS  :::::::::::*/
  let resultado = []
  
  for(let i = 0; i < todosOBJpalavrasSStopwords.length; i++){
    let indexPal = todosOBJpalavrasSStopwords[i].indice
    let palavraObj = wordData.palavras[indexPal]
    
    let titulos = palavraObj.textos.map(t => textData[t.id_text -1].title)
    
    resultado.push({
      palavra: palavraObj.palavra,
      indice: indexPal,
      textos: palavraObj.textos,
      titulo: titulos,
      freq: palavraObj.frequencia
    })
  }

  // Calculate max frequency AFTER creating resultado array
  const maxFreq = Math.max(...resultado.map(r => r.freq))
  console.log(`Frequência máxima: ${maxFreq}`)

  // Initial sort by frequency (descending)
  resultado.sort((a, b) => b.freq - a.freq)

  // Initialize pagination
  resPPage(resultado.length, rPP)

  /*:::::::::::  Ordem alfabética de PALAVRAS  :::::::::::*/
  function ordPal(ord) {
    if(ord == "AZ"){
      resultado.sort((a,b) => a.palavra.localeCompare(b.palavra, 'pt'))
      ordAlf_ = "ZA"
      ordAlf = "AZ"
    } else if(ord == "ZA"){
      resultado.sort((a,b) => b.palavra.localeCompare(a.palavra, 'pt'))
      ordAlf_ = "AZ"
      ordAlf = "ZA"
    }
  }

  /*::::::::::: Ordem PALAVRAS por frequencia :::::::::::*/
  function ordFreq(ord){
    if(ord == "des"){
      resultado.sort((a,b) => b.freq - a.freq)
      ordFre_ = "asc"
      ordFre = "des"
    } else if (ord == "asc") {
      resultado.sort((a,b) => a.freq - b.freq)
      ordFre_ = "des"
      ordFre = "asc"
    }
  }

  /*::::::::::: Ordem alfabética ou cronologica do título de textos :::::::::::*/
  function ordTitle(ord){
    if(ord === "alf"){
      ordTit_ = "cro"
      ordTit = "alf"
      
      resultado = resultado.map(item => {
        if(Array.isArray(item.textos)){
          const combinados = item.textos.map((texto, i) => {
            const titleFromData = (textData?.[texto.id_text - 1]?.title) ?? ""
            const titleFromItem = (Array.isArray(item.titulo) ? item.titulo[i] : undefined)
            const titulo = titleFromData || titleFromItem || ""
            return { texto, titulo }              
          })
          
          combinados.sort((a,b) => 
            (a.titulo ?? "").toString().localeCompare((b.titulo ?? "").toString(), 'pt', { sensitivity: 'base' })
          )
          
          item.titulo = combinados.map(el => el.titulo)
          item.textos = combinados.map(el => el.texto)
        }
        return item
      })
      return resultado
      
    } else if (ord === "cro") {
      ordTit_ = "alf"
      ordTit = "cro"
      
      resultado = resultado.map(item => {
        if(Array.isArray(item.textos)){
          const combinados = item.textos.map((texto, i) => {
            const titleFromData = (textData?.[texto.id_text - 1]?.title) ?? ""
            const titleFromItem = (Array.isArray(item.titulo) ? item.titulo[i] : undefined)
            const titulo = titleFromData || titleFromItem || ""
            return { texto, titulo }
          })
          
          combinados.sort((a,b) => (a.texto?.id_text ?? 0) - (b.texto?.id_text ?? 0))
          
          item.textos = combinados.map(el => el.texto)
          item.titulo = combinados.map(el => el.titulo)
        }
        return item
      })
      
      return resultado
    }
  }

  //**************** HTML STRUCTURE *******************/
  let list_all_container = document.createElement("div");
  document.querySelector(".div-display").appendChild(list_all_container);
  list_all_container.className = "list-all-container";

  //Header!!
  let ct_head_list = document.createElement("div");
  list_all_container.appendChild(ct_head_list);
  ct_head_list.className = "list ct-head-list";

  // HTML header content
  ct_head_list.innerHTML = `
    <div class="palavras header palavras-header">
      <h2 class="pal-o-h">Palavra</h2>
      <p id="Ord-Alfa">Ord: ${ordAlf}</p>
      <div id="pal-search-bar">
        <input id="pal-input" class="input-h" aria-label="palavra?" type="text" placeholder="Palavra?" autofocus>
        <input id="pal-submit" type="image" class="bt-h" src='./imagens/lupa.svg' aria-label="search">
      </div>
    </div>
    <div class="texto header texto-header">
      <h2 class="texto-o-h"><a href='./lista_textos.html'>Textos</a></h2>
      <p id="Ord-Tit">Ord: ${ordTit}</p>
      <div id="tit-search-bar">
        <input id="tit-input" class="input-h" aria-label="titulo?" type="text" placeholder="titulo?">
        <input id="tit-submit" type="image" class="bt-h" src='./imagens/lupa.svg' aria-label="search">
      </div>
    </div>
    <div class="freq header freq-header">
      <h2 class="fre-o-h">Freq.</h2>
      <p id="Ord-Freq">Ord: ${ordFre}</p>
      <div id="caixa-frequencia">
        <div id="freq-search-slider" class="freq-input-container"> 
          <div class="slider">
            <div class="freq-slider"></div>
          </div>
          <div class="range-input">
            <span class="value-tooltip min-tooltip"></span>
            <span class="value-tooltip max-tooltip"></span>
            <input type="range" class="min-range" min="1" max="${maxFreq}" value="1" step="1">
            <input type="range" class="max-range" min="1" max="${maxFreq}" value="${maxFreq}" step="1">
          </div>
           <!--<div class = "freq-input-field">
              <div class = "freq-field">
                  <input type="number" class = "min-input" id="freq-min-input" value="1">
              </div>
              <div class = "freq-field">
                  <input type="number" class = "max-input" id="freq-max-input" value="1300">
              </div>
          </div>-->
        </div>
      </div>
    </div>`;

  // Container for results
  let container = document.createElement("div");
  list_all_container.appendChild(container);
  container.className = "container";

  /*:::::  Get DOM elements AFTER creating HTML  :::::*/
  const palInput = document.querySelector('#pal-input')
  const titInput = document.querySelector("#tit-input")
  
  const freqRangeValue = document.querySelector(".slider .freq-slider")
  const freqRangeInputValue = document.querySelectorAll(".range-input input")
  const freqMinToolTip = document.querySelector(".min-tooltip")
  const freqMaxToolTip = document.querySelector(".max-tooltip")

  let freqGap = 10
  let freqMinTimeOut, freqMaxTimeOut

  /*::::::::::::::::::  Helper Functions  ::::::::::::::::::*/
  function updateFreqSlider(){
    let minVal = parseInt(freqRangeInputValue[0].value)
    let maxVal = parseInt(freqRangeInputValue[1].value)
    let maxRange = parseInt(freqRangeInputValue[0].max)

    let leftPercent = (minVal / maxRange) * 100
    let rightPercent = 100 - (maxVal / maxRange) * 100

    freqRangeValue.style.left = `${leftPercent}%`
    freqRangeValue.style.right = `${rightPercent}%`

    updateFreqTooltipPosition(freqMinToolTip, minVal, maxRange)
    updateFreqTooltipPosition(freqMaxToolTip, maxVal, maxRange)

    freqMinToolTip.textContent = minVal
    freqMaxToolTip.textContent = maxVal
  }

  function updateFreqTooltipPosition(tooltip, value, max){
    const percentage = (value / max) * 100
    tooltip.style.left = `${percentage}%`
  }

  function showFreqTooltip(tooltip){
    clearTimeout(tooltip === freqMinToolTip ? freqMinTimeOut : freqMaxTimeOut)
    tooltip.classList.add('show')
  }

  function hideFreqTooltip(tooltip){
    if(tooltip === freqMinToolTip){
      freqMinTimeOut = setTimeout(() => tooltip.classList.remove('show'), 1000)
    } else {
      freqMaxTimeOut = setTimeout(() => tooltip.classList.remove('show'), 1000)
    }
  }

  function sepPage(){
    for(let i = 0; i < arrayResultados.length; i++){
      const pageEl = document.querySelector('#n-page' + i)
      if(pageEl){
        pageEl.addEventListener('click', (e) => {
          iP = i
          displayResultado(resultado)
        })
        pageEl.innerHTML += `<style> #n-page${i}:hover{background-color:#223F29; cursor:pointer; color:#FFFEF2}</style>`
      }
    }
  }

  /*:::::::::::  DISPLAY FUNCTION  :::::::::::*/
  function displayResultado(resultadoToShow, valor){
    document.querySelector('#Ord-Alfa').textContent = `Ord: ${ordAlf}`
    document.querySelector('#Ord-Freq').textContent = `Ord: ${ordFre}`
    document.querySelector('#Ord-Tit').textContent = `Ord: ${ordTit}`

    container.innerHTML = ""

    if(!resultadoToShow || resultadoToShow.length === 0){
      container.innerHTML = `<p>Não foram encontrados resultados${valor ? ` para: "${valor}"` : ''}</p><br><br>`
    } else {
      for (let i = arrayResultados[iP].st; i < arrayResultados[iP].en; i++) {
        let ct_item = document.createElement("div");
        ct_item.className = "ct-item ct-item" + (i + 1);
        container.appendChild(ct_item);

        // Palavra
        let item_palavra = document.createElement("a");
        ct_item.appendChild(item_palavra);
        item_palavra.className = "item-palavra palavras";
        item_palavra.innerHTML = `${resultadoToShow[i].palavra}`;
        item_palavra.href = `lista_palavras.html?palavra=${resultadoToShow[i].palavra}`

        // Textos
        let item_textos = document.createElement("div");
        ct_item.appendChild(item_textos);
        item_textos.className = "item-textos texto";

        if(resultadoToShow[i].textos.length <= 3){
          for (let j = 0; j < resultadoToShow[i].textos.length; j++) {
            let texto_de_palavra = document.createElement("a");
            texto_de_palavra.className = "item-texto";
            texto_de_palavra.innerHTML = `${resultadoToShow[i].titulo[j]} <br><br>`;
            item_textos.appendChild(texto_de_palavra);
            texto_de_palavra.href = `index.html?id=${resultadoToShow[i].textos[j].id_text}`
          }
        } else {
          const renderInitialState = () =>{
            item_textos.innerHTML = ''
            
            for (let j = 0; j < 3; j++) {
              let texto_de_palavra = document.createElement("a");
              texto_de_palavra.className = "item-texto";
              texto_de_palavra.innerHTML = `${resultadoToShow[i].titulo[j]} <br><br>`;
              item_textos.appendChild(texto_de_palavra);
              texto_de_palavra.href = `index.html?id=${resultadoToShow[i].textos[j].id_text}`
            }

            if(resultadoToShow[i].textos.length > 3){
              let item_textosv1 = document.createElement("div")
              item_textos.appendChild(item_textosv1)
              item_textosv1.className = "item-texto mais"
              item_textosv1.innerHTML = "<span>Mais...</span>"

              item_textosv1.addEventListener("click", (e) =>{
                item_textos.innerHTML = ''
                const itemsToShow = Math.min(resultadoToShow[i].textos.length, 8);

                for (let j = 0; j < itemsToShow; j++) {
                  let texto_de_palavra = document.createElement("a");
                  texto_de_palavra.className = "item-texto";
                  texto_de_palavra.innerHTML = `${resultadoToShow[i].titulo[j]} <br><br>`;
                  item_textos.appendChild(texto_de_palavra);
                  texto_de_palavra.href = `index.html?id=${resultadoToShow[i].textos[j].id_text}`
                }

                let menos = document.createElement("div")
                item_textos.appendChild(menos)
                menos.className = "item-texto menos"
                menos.innerHTML = "<span>Menos</span>"

                if(resultadoToShow[i].textos.length > 8){
                  let item_textosv2 = document.createElement("div")
                  item_textos.appendChild(item_textosv2)
                  item_textosv2.className = "item-texto ver-todos"
                  item_textosv2.innerHTML = "<span>Ver todos</span>"

                  item_textosv2.addEventListener("click", (e) =>{
                    window.location.href=(`lista_palavras.html?palavra=${resultadoToShow[i].palavra}`);
                  })
                }
                
                menos.addEventListener('click', (e) =>{
                  renderInitialState();
                })
              })
            } 
          }
          renderInitialState();
        }

        // Frequência
        let item_frequencia = document.createElement("div");
        ct_item.appendChild(item_frequencia);
        item_frequencia.className = "item-frequencia freq";
        item_frequencia.innerHTML = `${resultadoToShow[i].freq}x`;
      }
    }

    // Pagination display
    const oldPages = list_all_container.querySelector('.n-page-ct')
    if(oldPages) oldPages.remove()
    
    let nPages = document.createElement("div")
    list_all_container.appendChild(nPages)
    nPages.className = "n-page n-page-ct"

    nPages.addEventListener('wheel', (e) => {
      e.preventDefault()
      nPages.scrollLeft += e.deltaY * 5
    })

    if(resultadoToShow && resultadoToShow.length > 0){
      for(let i = 0; i < arrayResultados.length; i++){
        let nPage = document.createElement("a")
        nPages.appendChild(nPage)
        nPage.className = "n-page n-page-i n-page" + i
        nPage.id = `n-page${i}`
        nPage.innerText = i + 1
        nPage.href = `#n-page${i}`
        
        nPage.addEventListener('click', (e) =>{
          iP = i
          displayResultado(resultadoToShow, valor)
        })
      }
      
      sepPage()
      const currentPage = document.querySelector('#n-page' + iP)
      if(currentPage){
        currentPage.style.backgroundColor = "#223F29"
        currentPage.style.color = "#FFFEF2"
      }
    }
  }

  // Initialize slider
  updateFreqSlider()

  // Initial display
  displayResultado(resultado)

  /*:::::::::::  EVENT LISTENERS  :::::::::::*/
  
  /***************** Ordem Alfabetica ********************/
  document.querySelector('#Ord-Alfa').addEventListener('click', (e) =>{
    ordPal(ordAlf_)
    iP = 0
    resPPage(resultado.length, rPP)
    displayResultado(resultado)
  })

  /***************** Ordem Freq ********************/
  document.querySelector('#Ord-Freq').addEventListener('click', (e) =>{
    ordFreq(ordFre_)
    iP = 0
    resPPage(resultado.length, rPP)
    displayResultado(resultado)
  })

  /***************** Ordem Tit ********************/
  document.querySelector('#Ord-Tit').addEventListener('click', (e) =>{
    ordTitle(ordTit_)
    iP = 0
    resPPage(resultado.length, rPP)
    displayResultado(resultado)
  })

  /***************** Pesquisa palavras ********************/
  palInput.addEventListener('input', (e) =>{
    let value = e.target.value

    if(value && value.trim().length > 0){
      value = value.trim().toLowerCase()
      
      const filteredResultado = resultado
        .filter(item =>{
          const palavra = normalize(item?.palavra || "")
          const val = normalize(value)
          return palavra.includes(val)
        })
        .sort((a,b) => {
          const aPal = normalize(a.palavra)
          const bPal = normalize(b.palavra)
          const val = normalize(value)

          const aStarts = aPal.startsWith(val)
          const bStarts = bPal.startsWith(val)

          if(aStarts && !bStarts) return -1
          if(!aStarts && bStarts) return 1

          return aPal.localeCompare(bPal, 'pt', { sensitivity: 'base' })
        })

      iP = 0
      resPPage(filteredResultado.length, rPP)
      displayResultado(filteredResultado, value)
    } else{
      iP = 0
      resPPage(resultado.length, rPP)
      displayResultado(resultado)
    }
  })

  /***************** Titulo pesquisa ********************/
  titInput.addEventListener('input', (e) => {
    let value = e.target.value

    if(value && value.trim().length > 0){
      value = value.trim().toLowerCase()

      const filteredResultado = resultado
        .map(item =>{
          const val = normalize(value)
          const mainTitle = normalize(item?.title || "")

          if(mainTitle.includes(val)){
            return item
          }

          if(Array.isArray(item.textos)){
            const filteredPairs = []

            item.textos.forEach((texto, i) => {
              const titulo = normalize(textData?.[texto.id_text-1]?.title || "")

              if(titulo.includes(val)){
                filteredPairs.push({
                  texto: texto,
                  titulo: Array.isArray(item.titulo) ? item.titulo[i] : undefined,
                  normalizedTitle: titulo
                })
              }
            })

            if(filteredPairs.length > 0){
              filteredPairs.sort((a,b) => {
                const aTitle = a.normalizedTitle
                const bTitle = b.normalizedTitle

                let aStarts = aTitle.startsWith("[") ? aTitle.startsWith(val, 1) : aTitle.startsWith(val)
                let bStarts = bTitle.startsWith("[") ? bTitle.startsWith(val, 1) : bTitle.startsWith(val)

                if(aStarts && !bStarts) return -1
                if(!aStarts && bStarts) return 1

                return aTitle.localeCompare(bTitle, 'pt', { sensitivity: 'base' })
              })

              return {
                ...item,
                textos: filteredPairs.map(p => p.texto),
                titulo: filteredPairs.map(p => p.titulo).filter(t => t !== undefined)
              }
            }
          }

          return null
        })
        .filter(item => item !== null)
        .sort((a, b) => {
          const val = normalize(value)

          const getBestMatch = (item) => {
            const mainTitle = normalize(item?.title || "")
            if(mainTitle.includes(val)) return mainTitle

            if(Array.isArray(item.textos) && item.textos.length > 0){
              const texto = item.textos[0]
              const titulo = normalize(textData?.[texto.id_text-1]?.title || "")
              if(titulo.includes(val)) return titulo
            }
            return mainTitle
          }

          const aTit = getBestMatch(a)
          const bTit = getBestMatch(b)

          let aStarts = aTit.startsWith("[") ? aTit.startsWith(val, 1) : aTit.startsWith(val)
          let bStarts = bTit.startsWith("[") ? bTit.startsWith(val, 1) : bTit.startsWith(val)

          if(aStarts && !bStarts) return -1
          if(!aStarts && bStarts) return 1

          return aTit.localeCompare(bTit, 'pt', { sensitivity: 'base' })
        })

      iP = 0
      resPPage(filteredResultado.length, rPP)
      displayResultado(filteredResultado, value)
    
    }else{
      iP = 0
      resPPage(resultado.length, rPP)
      displayResultado(resultado)
    }
  })

  /*:::::::: Event listeners para sliders de frequencia ::::::::*/
  freqRangeInputValue[0].addEventListener("mousedown", () => showFreqTooltip(freqMinToolTip))
  freqRangeInputValue[0].addEventListener("touchstart", () => showFreqTooltip(freqMinToolTip))
  freqRangeInputValue[1].addEventListener("mousedown", () => showFreqTooltip(freqMaxToolTip))
  freqRangeInputValue[1].addEventListener("touchstart", () => showFreqTooltip(freqMaxToolTip))

  for (let i = 0; i < freqRangeInputValue.length; i++) {
    freqRangeInputValue[i].addEventListener("input", e => {
      let minVal = parseInt(freqRangeInputValue[0].value)
      let maxVal = parseInt(freqRangeInputValue[1].value)
      let diff = maxVal - minVal

      if(e.target.className === "min-range"){
        showFreqTooltip(freqMinToolTip)
      } else {
        showFreqTooltip(freqMaxToolTip)
      }

      if(diff < freqGap){
        if(e.target.className === "min-range"){
          freqRangeInputValue[0].value = maxVal - freqGap
          minVal = maxVal - freqGap
        } else {
          freqRangeInputValue[1].value = minVal + freqGap
          maxVal = minVal + freqGap
        }
      }

      updateFreqSlider()

      // Filter results by frequency
      const filteredResultado = resultado.filter(item => {
        const freq = item.freq
        return freq >= minVal && freq <= maxVal
      })

      // Sort filtered results by frequency (descending)
      filteredResultado.sort((a, b) => b.freq - a.freq)

      iP = 0
      resPPage(filteredResultado.length, rPP)
      displayResultado(filteredResultado, `freq: ${minVal}-${maxVal}`)
    })

    freqRangeInputValue[i].addEventListener("mouseup", (e) => {
      if(e.target.className === "min-range"){
        hideFreqTooltip(freqMinToolTip)
      } else {
        hideFreqTooltip(freqMaxToolTip)
      }
    })

    freqRangeInputValue[i].addEventListener("touchend", (e) => {
      if(e.target.className === "min-range"){
        hideFreqTooltip(freqMinToolTip)
      } else {
        hideFreqTooltip(freqMaxToolTip)
      }
    })
  }
}


  //Colocar todos assim para ser mais fácil de testar
  displayTodasPalavras() // a dar por default
  // bt_todas_palavras.addEventListener("click", displayTodasPalavras)

}


function normalize(str){
  return str
    ?.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}
