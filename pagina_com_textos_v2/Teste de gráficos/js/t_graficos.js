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

    /***********************  SET PALAVRAS ORIGINAL  ****************************/
    //extraindo palavras do texto original //remover pontuação + /n ...
    let textoOriginal = textData[0].texto_completo.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~–]/g, '').replace(/[\r\n]+/gm, " ")
    //console.log(textoOriginal)
    let arrayPalavrasOriginal = textoOriginal.split(" ")
    //console.log(arrayPalavrasOriginal)
    const setPalOr = new Set(arrayPalavrasOriginal)
    console.log(setPalOr) // funciona!

    const setPalOr_final = new Set()
    const palavrasLista = wordData.palavras.map(obj => obj.palavra.toLowerCase())

    setPalOr.forEach(palavra => {
      if(!stoplist.includes(palavra.toLowerCase()) || palavrasLista.includes(palavra.toLowerCase())){
        setPalOr_final.add(palavra.toLowerCase())
      }
    })
    console.log(setPalOr_final) // set com palavras do original
    
    /*****************************************************************************/


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
  // setPalOr_final
  const stopSet = new Set(stoplist);
  const stopListOBJ = []; // ARRAY DE OBJETO DE TODAS AS PALAVRAS COM RESPETIVO INDEX
  const originOBJ = []

  for (let i = 0; i < wordData.palavras.length; i++) {
    const palavra = wordData.palavras[i].palavra;
    if (stopSet.has(palavra)) {
      stopListOBJ.push({
        indice: i,
        palavra: palavra,
      });
    }

    if(setPalOr_final.has(palavra)){
      originOBJ.push({
        indice: i,
        palavra: palavra,
      })
    }

  }
 
  const stopIndices = new Set(stopListOBJ.map((obj) => obj.indice)); // JUNTA NUM SET OS INDEX DAS PALAVRAS QUE SÃO STOPWORDS
  const origIndices = new Set(originOBJ.map((obj) => obj.indice))
    ////****************  Até aqui parece ok  ************** */

  // JUNTANDO TUDO NUM ARRAY DE ANOS
  // ---->>> testar agora com todos os anos (de 1846 a 2025)
  const start = 1846;
  const end = 2025;


  let n_palavras;
  let todosOBJpalavrasSStopwords; // versao stopwords

  let n_palavrasSorig;
  let todosOBJpalavrasSStopwordsEorig;// versao sem palavras original

  let anos_grafico = [];
  //Criando um array de anos
  let todas_as_palavrasFreq_p_ano = [];
  let todas_as_palavrasFreq_p_ano_orig = []; // versao sem palavras original

  for (let y = start; y <= end; y++) {
    anos_grafico.push(y);
    let lista_combinada_s_stopwords = []; // OBJETO COM TODAS AS PALAVRAS E FREQUENCIAS NUM ANO
    let lista_comb_sPalOriginal = [] // sem palavras do original

    for (let i = 0; i < wordData.palavras.length; i++) {
      if (!stopIndices.has(i)) {
        lista_combinada_s_stopwords.push({
          indice: i,
          freq: arrayTodosOBJpalavras[i][y].freq || 0,
          nTextos: arrayTodosOBJpalavras[i][y].nTextos || 0,
          logFreqPTexto: ((arrayTodosOBJpalavras[i][y].freq)/(arrayTodosOBJpalavras[i][y].nTextos)||0)//Math.log((arrayTodosOBJpalavras[i][y].freq)/(arrayTodosOBJpalavras[i][y].nTextos) || 0)
          //valor do logaritmo da divisao
        });
      }

      if (!stopIndices.has(i) && !origIndices.has(i)) {
        lista_comb_sPalOriginal.push({
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

    //versão sem palavras originais
    todosOBJpalavrasSStopwordsEorig = lista_comb_sPalOriginal // versão sem palavras do original
    n_palavrasSorig = lista_comb_sPalOriginal.length


    // versao nova (pode estar mal)
    lista_combinada_s_stopwords.sort((a, b) => b.logFreqPTexto - a.logFreqPTexto);
    let maior_frequencia_do_ano = lista_combinada_s_stopwords[0]?.logFreqPTexto || 0;

    //versão sem palavras do original
    lista_comb_sPalOriginal.sort((a, b)=> b.logFreqPTexto - a.logFreqPTexto)
    let maior_frequencia_do_anoSorig = lista_comb_sPalOriginal[0]?.logFreqPTexto || 0;


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

    
    let lista_indices_com_maior_frequencia_orig = lista_comb_sPalOriginal //sem palavras do original
      .filter((obj) => obj.logFreqPTexto === maior_frequencia_do_anoSorig)
      .map((obj) => obj.indice)


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


    if(lista_indices_com_maior_frequencia_orig.length != n_palavrasSorig) {  //sem palavras do original
      todas_as_palavrasFreq_p_ano_orig.push({
        ano: y,
        lista: lista_comb_sPalOriginal,
        maior_freq: maior_frequencia_do_anoSorig,
        indices_palavras_maior_freq: lista_indices_com_maior_frequencia_orig,
      })
    } else {
      todas_as_palavrasFreq_p_ano_orig.push({
        ano:y,
        lista: lista_comb_sPalOriginal,
        maior_freq: "",
        indices_palavras_maior_freq: "",
      })
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

  // versão sem palavras do original
  let freq_grafico_orig = []
  let palavras_grafico_orig = []

  for(let i = 0; i < todas_as_palavrasFreq_p_ano_orig.length; i++){
    const anoData = todas_as_palavrasFreq_p_ano_orig[i]
    freq_grafico_orig.push(anoData.maior_freq)

    if(anoData.indices_palavras_maior_freq.length != 0){
      // n coloco idx -> n foi utilizado

      let grupo = []

      for(let j = 0; j < anoData.indices_palavras_maior_freq.length; j++){
        let idxj = anoData.indices_palavras_maior_freq[j]
        grupo.push(wordData.palavras[idxj].palavra)
      }
      palavras_grafico_orig.push(grupo.join(", "))
    } else {
      palavras_grafico_orig.push("")
    }
    //console.log(`Ano: ${anoData.ano}, Length: ${anoData.indices_palavras_maior_freq.length}`)
  }

/**********************  Contentor geral  ****************************/
  let words_container = document.createElement("div");
  document.querySelector("body").appendChild(words_container);
  words_container.className += "words-container";

  //****************  Título de página  ******************/
  let title_h = document.createElement("h1");
  document.querySelector(".words-container").appendChild(title_h);
  title_h.className += "pesquisa-palavras-h page-title";
  title_h.innerText = `Teste de gráficos`;

 //*********  Contentor gráfico de Palavras mais populares por ano  ***********/
    let ct_PalPopulares = document.createElement("div")
    words_container.appendChild(ct_PalPopulares)
    ct_PalPopulares.className = "ct-pal-populares"

    //titulo
    let h2_PalPopulares = document.createElement("h2")
    ct_PalPopulares.appendChild(h2_PalPopulares)
    h2_PalPopulares.className = "h2-pal-populares"
    h2_PalPopulares.innerHTML = "Gráfico de palavras mais populares por ano"

 //*******  Versão 1  *********/
    let ct_popV1 = document.createElement("div")
    ct_PalPopulares.appendChild(ct_popV1)
    ct_popV1.className = "ct-palpop"

    //titulo
    let h3_popV1 = document.createElement("h3")
    ct_popV1.appendChild(h3_popV1)
    h3_popV1.className = "h3-palpop"
    h3_popV1.innerHTML = "Versão 1: frequencia de palavras/ nº de textos"


  //*********  Display gráfico de frequencias  ***********/
  let graV1_ct = document.createElement("div");
  ct_popV1.appendChild(graV1_ct);
  graV1_ct.className = "gra-v1-ct";

  let canv_popV1 = document.createElement("canvas");
  graV1_ct.appendChild(canv_popV1);
  canv_popV1.className = "grafico-palavras-populares-v1";

  const ctx_popV1 = document.querySelector(".grafico-palavras-populares-v1");

  //*********** Teste com gráfico de barra **********/

  //Poderia colocar o plugin, mas saber como colocar o texto alinhado com o gráfico??
  new Chart(ctx_popV1, {
    type: "bar",
    data: {
      labels: anos_grafico,
      datasets: [
        {
          label: "Palavras com maior frequencia em cada ano",
          data: freq_grafico,
          borderWidth: 1,
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



  //*******  Versão 2  *********/
    let ct_popV2 = document.createElement("div")
    ct_PalPopulares.appendChild(ct_popV2)
    ct_popV2.className = "ct-palpop"

    //titulo
    let h3_popV2 = document.createElement("h3")
    ct_popV2.appendChild(h3_popV2)
    h3_popV2.className = "h3-palpop"
    h3_popV2.innerHTML = "Versão 2: (sem palavras do texto original) frequencia de palavras/ nº de textos"


  //*********  Display gráfico de frequencias  ***********/
  let graV2_ct = document.createElement("div");
  ct_popV2.appendChild(graV2_ct);
  graV2_ct.className = "gra-v2-ct";

  let canv_popV2 = document.createElement("canvas");
  graV2_ct.appendChild(canv_popV2);
  canv_popV2.className = "grafico-palavras-populares-v2";

  const ctx_popV2 = document.querySelector(".grafico-palavras-populares-v2");

  //*********** Teste com gráfico de barra **********/

  //Poderia colocar o plugin, mas saber como colocar o texto alinhado com o gráfico??
  new Chart(ctx_popV2, {
    type: "bar",
    data: {
      labels: anos_grafico,
      datasets: [
        {
          label: "Palavras com maior frequencia em cada ano",
          data: freq_grafico_orig,
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              const i = context.dataIndex;
              const palavra = palavras_grafico_orig[i];
              const freq = freq_grafico_orig[i];
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


   //*******  Versão 3  *********/
    let ct_popV3 = document.createElement("div")
    ct_PalPopulares.appendChild(ct_popV3)
    ct_popV3.className = "ct-palpop"

    //titulo
    let h3_popV3 = document.createElement("h3")
    ct_popV3.appendChild(h3_popV3)
    h3_popV3.className = "h3-palpop"
    h3_popV3.innerHTML = "Versão 3: frequencia de palavras/ nº de palavras"


  //*********  Display gráfico de frequencias  ***********/
  let graV3_ct = document.createElement("div");
  ct_popV3.appendChild(graV3_ct);
  graV3_ct.className = "gra-v3-ct";

  let canv_popV3 = document.createElement("canvas");
  graV3_ct.appendChild(canv_popV3);
  canv_popV3.className = "grafico-palavras-populares-v3";

  const ctx_popV3 = document.querySelector(".grafico-palavras-populares-v3");

  //*********** Teste com gráfico de barra **********/

  //Poderia colocar o plugin, mas saber como colocar o texto alinhado com o gráfico??
  new Chart(ctx_popV3, {
    type: "bar",
    data: {
      labels: anos_grafico,
      datasets: [
        {
          label: "Palavras com maior frequencia em cada ano",
          data: freq_grafico,
          borderWidth: 1,
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

 //*******  Versão 4  *********/
    let ct_popV4 = document.createElement("div")
    ct_PalPopulares.appendChild(ct_popV4)
    ct_popV4.className = "ct-palpop"

    //titulo
    let h3_popV4 = document.createElement("h3")
    ct_popV4.appendChild(h3_popV4)
    h3_popV4.className = "h3-palpop"
    h3_popV4.innerHTML = "Versão 4: (sem palavras do texto original) frequencia de palavras/ nº de palavras"


  //*********  Display gráfico de frequencias  ***********/
  let graV4_ct = document.createElement("div");
  ct_popV4.appendChild(graV4_ct);
  graV4_ct.className = "gra-v4-ct";

  let canv_popV4 = document.createElement("canvas");
  graV4_ct.appendChild(canv_popV4);
  canv_popV4.className = "grafico-palavras-populares-v4";

  const ctx_popV4 = document.querySelector(".grafico-palavras-populares-v4");

  //*********** Teste com gráfico de barra **********/

  //Poderia colocar o plugin, mas saber como colocar o texto alinhado com o gráfico??
  new Chart(ctx_popV4, {
    type: "bar",
    data: {
      labels: anos_grafico,
      datasets: [
        {
          label: "Palavras com maior frequencia em cada ano",
          data: freq_grafico,
          borderWidth: 1,
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

}