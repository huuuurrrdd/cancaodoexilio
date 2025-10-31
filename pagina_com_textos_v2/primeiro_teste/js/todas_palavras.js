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
      return fetch("./t3_textos_loc_fauna_flora.json"); // fetch json dos textos
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

  //****************  Título de página  ******************/
  let title_h = document.createElement("h1");
  document.querySelector(".words-container").appendChild(title_h);
  title_h.className += "pesquisa-palavras-h page-title";
  title_h.innerText = `Pesquisa de palavras`;

  //*********  Display gráfico de frequencias  ***********/
  grafico_ct = document.createElement("div");
  document.querySelector(".words-container").appendChild(grafico_ct);
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

  //*********  Botões (todas as palavras + palavras populares)  ********************/
  //container
  bts_visualizacao = document.createElement("div");
  document.querySelector(".words-container").appendChild(bts_visualizacao);
  bts_visualizacao.className = "bts-visualizacao";

  bt_todas_palavras = document.createElement("div");
  bt_palavras_pop = document.createElement("div");

  document.querySelector(".bts-visualizacao").appendChild(bt_todas_palavras);
  document.querySelector(".bts-visualizacao").appendChild(bt_palavras_pop);

  bt_todas_palavras.className = "bt-todas-palavras";
  bt_palavras_pop.className = "bt-palavras-pop";  

  bt_todas_palavras.innerHTML = "Todas as palavras";
  bt_palavras_pop.innerHTML = "Palavras populares";

  //** div para display **//
  div_display = document.createElement("div");
  document.querySelector(".bts-visualizacao").appendChild(div_display);
  div_display.className = "div-display";



  // decidir o intervalo de resultados (neste caso, 20 p página)
  function displayTodasPalavras(){

  //*********  Funções para display [ todas palavras]  *******************/
    // Testar com os arrays de palavras
    // let indexPal = todosOBJpalavrasSStopwords[i].indice; -> Determina os indices dos resultados
    // devia ser mais especifico para cada botao (total de resultados é o indexPal) 
    // Total seria: todosOBJpalavrasSStopwords.length
    div_display.innerHTML = "";

    // valores default para ordenação de resultados
    let ordAlf = "AZ" // o atual
    let ordAlf_ = "ZA" // o q muda
    let ordFre = "asc" // o atual
    let ordFre_ = "des"// o que muda
    let ordTit = "cro"
    let ordTit_ = "alf"
    //console.log(todosOBJpalavrasSStopwords.length)
    //console.log(wordData.palavras.length) // tem mais palavras


    /*:::::::::::  Resultados p/pagina  :::::::::::*/
    // obtendo a divisão por 50, descobrir o resto
    let rPP = 50 // resuktados por página
    let arrayResultados = [] // com indice de inicio e de fim (com ele incluido)

    const total = todosOBJpalavrasSStopwords.length // colocar isto dinamico!!


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

    resPPage(total, rPP)



    // valor de indice da página
    let iP = 0 //funciona!!



    /*:::::::::::  Array de obj com RESULTADOS  :::::::::::*/
      let resultado = []

      for( let i = 0; i < todosOBJpalavrasSStopwords.length; i++){
        let indexPal = todosOBJpalavrasSStopwords[i].indice
        let palavraObj = wordData.palavras[indexPal] // busca todas as palavras

        // junta junta os textos associados
        let titulos = palavraObj.textos.map(t =>
          textData[t.id_text -1].title
        )
          resultado.push({
            palavra: palavraObj.palavra,
            indice: indexPal,
            textos: palavraObj.textos, // id dos textos (pode dar para ordenar az nos titulos)
            titulo: titulos, // está funcional
            freq: palavraObj.frequencia // pode ser util ter um array com titulos dos textos
          })
      }
      //console.log(textData[12-1].title) // funciona

      //Tentativa de search sem o input ///////////////// aaaaa funciona!!
      const valPalavra = "lala"
      const filteredResultado = resultado.filter(resultado => resultado.palavra.toLowerCase().includes(valPalavra))
      console.log(filteredResultado) // resulta
      //console.log(resultado) // funciona a mesma
      //let initResultado = resultado // guarda o resultado inicial


      /*:::::::::::  Ordem alfabética de PALAVRAS  :::::::::::*/
      function ordPal(ord) {
        console.log("Ord Function")
        if(ord == "AZ"){
          resultado.sort((a,b) => a.palavra.localeCompare(b.palavra, 'pt')) // funciona!!
          ordAlf_ = "ZA" // pronto para mudar
          ordAlf = "AZ" // o atual
        } else if(ord == "ZA"){
          resultado.sort((a,b) => a.palavra.localeCompare(b.palavra, 'pt')).reverse()
          ordAlf_ = "AZ" // pronto para mudar
          ordAlf = "ZA" // o atual
        }
      }
      //console.log(ordPal("ZA"))//funciona!!
      //ordPal("ZA")

      /*::::::::::: Ordem PALAVRAS por frequencia :::::::::::*/
      function ordFreq(ord){
        if(ord == "des"){
          resultado.sort((a,b) => a.freq < b.freq ? -1 : 1).reverse()
          ordFre_= "asc" // pronto para mudar
          ordFre = "des" // atual
        } else if (ord == "asc") {
          resultado.sort((a,b) => a.freq < b.freq ? -1 : 1)
          ordFre_= "des"
          ordFre = "asc"
        }
      }
      //console.log(ordFreq("des")) //funciona!!
      //ordFreq("asc")


      /*::::::::::: Ordem alfabética ou cronologica do título de textos :::::::::::*/
      function ordTitle(ord){ // percorre cada palavra??

        if(ord === "alf"){
          // em cada palavra, ordenar o array de textos e de títulos
          ordTit_ = "cro"
          ordTit = "alf"

          resultado = resultado.map(item => {
            if(Array.isArray(item.textos)){ // verifica se .titulo é array
              //combina-os temporariamente
              const combinados = item.textos.map((texto, i) => {
                const titleFromData = (textData?.[texto.id_text - 1]?.title) ?? "" // vai buscar titulo ao original
                const titleFromItem = (Array.isArray(item.titulo) ? item.titulo[i] : undefined)
                const titulo = titleFromData || titleFromItem || ""
                return { texto, titulo }              
            })

              //sort by title
              combinados.sort((a,b) => 
                (a.titulo ?? "").toString().localeCompare((b.titulo ?? "").toString(), 'pt', { sensitivity: 'base' })
              )  // case insensitive

              //separa-os novamente
              item.titulo = combinados.map(el => el.titulo)
              item.textos = combinados.map(el => el.texto)
            }
            return item
          })

          return resultado
          
        } else if (ord === "cro") { // cronológica - ordem original de id
          // em cada palavra, ordenar o array de textos e de títulos
          ordTit_ = "alf"
          ordTit = "cro"

          resultado = resultado.map(item => {
            if(Array.isArray(item.textos)){ // verifica se .titulo é array
              //combina-os temporariamente
              const combinados = item.textos.map((texto, i) => {
                const titleFromData = (textData?.[texto.id_text - 1]?.title) ?? ""
                const titleFromItem = (Array.isArray(item.titulo) ? item.titulo[i] : undefined)
                const titulo = titleFromData || titleFromItem || ""
                return { texto, titulo }
              })

              //sort by id_text
              combinados.sort((a,b) => (a.texto?.id_text ?? 0) - (b.texto?.id_text ?? 0))

              //separa-os novamente
              item.textos = combinados.map(el => el.texto)
              item.titulo = combinados.map(el => el.titulo)
            }
            return item
          })
          
          return resultado
        }
      }
      //console.log(ordTitle("alf")) // funciona!!
      //console.log(ordTitle('cro')) // funciona!! 

    // pesquisa por palavra e pesquisa pelo título (pesquisa do objeto [resultado] pelo título)
    /*Precisaria de uma input box*/

    //**************** [todas palavras]  *******************/





      //** baseada na tabela de display em palavra selecionada **
      let list_all_container = document.createElement("div");
      document.querySelector(".div-display").appendChild(list_all_container);
      list_all_container.className += "list-all-container";

      //Header!!
      let ct_head_list = document.createElement("div");
      document.querySelector(".list-all-container").appendChild(ct_head_list);
      ct_head_list.className += "list ct-head-list";

      // conteudo do header!! (adicionar funções para ordenação de elementos)
      ct_head_list.innerHTML = `  <div class = "palavras header"><h2>Palavra</h2><p id="Ord-Alfa">Ord: ${ordAlf}</p>
                                              <div id="pal-search-bar">
                                                <input id="pal-input" aria-label="palavra?" type="text" class="pal-search-bar__input" placeholder="Palavra?" autofocus required>
                                                <button id="pal-submit" type="button" class="pal-search-bar_button" aria-label="search">Go</button>
                                              </div>
                                      </div>
                                      <div class = "texto header"><h2>Textos</h2><p id="Ord-Tit">Ord: ${ordTit}</p>
                                              <div id="pal-search-bar">
                                                <input id="tit-input" aria-label="titulo?" type="text" class="tit-search-bar__input" placeholder="titulo?" autofocus required>
                                                <button id="tit-submit" type="button" class="tit-search-bar_button" aria-label="search">Go</button>
                                              </div>
                                      </div>
                                      <div class = "frequencia header"><h2>Freq</h2><p id="Ord-Freq">Ord: ${ordFre}</p></div>`;

      ct_head_list.style.backgroundColor = "yellow";

      /*:::::  Botoes  :::::*/
      const palSubmitButton = document.querySelector("#pal-submit")
      const palInput = document.querySelector('#pal-input')


      // conteudo após header //////////////////////
      let container = document.createElement("div");
      document.querySelector(".list-all-container").appendChild(container);
      container.className = "container";



    function displayResultado(resultado, valor){
    //console.log(arrayResultados) // funcionou

    // console.log(todosOBJpalavrasSStopwords.length % rPP) // total é 9100%20 = 10 (se resto != 0, acrescenta 1 pagina)
    // console.log(Math.floor(todosOBJpalavrasSStopwords.length / rPP)) // resultou!! + 1

      /*:::::  Atualiza os headers  :::::*/
      document.querySelector('#Ord-Alfa').textContent = `Ord: ${ordAlf}` // funciona!!
      document.querySelector('#Ord-Freq').textContent = `Ord: ${ordFre}`
      document.querySelector('#Ord-Tit').textContent = `Ord: ${ordTit}`

      container.innerHTML = ""
      //iteração para display

      if(resultado == undefined || resultado == [] || resultado == ""){
        container.innerHTML = `<p>Não foram encontrados resultados para: "${valor}" </p><br><br>`
      } else {
        for (let i = arrayResultados[iP].st; i < arrayResultados[iP].en; i++) { // fazer display de x resultados por pagina


          //cria a div principal
          let ct_item = document.createElement("div");
          ct_item.className += "ct-item ct-item" + (i + 1);
          container.appendChild(ct_item);


          //let indexPal = todosOBJpalavrasSStopwords[i].indice; // busca apenas os indices das palavras sem stopwords


          //divs dentro da div principal
          let item_palavra = document.createElement("div");
          document.querySelector(`.ct-item${i + 1}`).appendChild(item_palavra);
          item_palavra.className += "item-palavra palavras";
          item_palavra.innerHTML = `${resultado[i].palavra} `//${resultado[i].indice}`;//`${wordData.palavras[indexPal].palavra}`;

          let item_textos = document.createElement("div");
          document.querySelector(`.ct-item${i + 1}`).appendChild(item_textos);
          item_textos.className += "item-textos texto";

          for (let j = 0; j < resultado[i].textos.length; j++) {
            // item a colocar dentro de "item_textos"
            let texto_de_palavra = document.createElement("div");
            //document.querySelector(".item-textos").appendChild(texto_de_palavra)
            texto_de_palavra.className = "item-texto";
            texto_de_palavra.innerHTML = `${resultado[i].textos[j].id_text}  ${resultado[i].titulo[j]} `; // em vez do id, colocar o número
            item_textos.appendChild(texto_de_palavra);
          }

          let item_frequencia = document.createElement("div");
          document.querySelector(`.ct-item${i + 1}`).appendChild(item_frequencia);
          item_frequencia.className += "item-frequencia freq";
          item_frequencia.innerHTML = `${resultado[i].freq}x`; //`${wordData.palavras[indexPal].frequencia}x`;
        }
      }

      // remove outro nPages que existam anteriormente em list_all_container
      const oldPages = list_all_container.querySelector('.n-page-ct')
      if(oldPages) oldPages.remove()
      

      // div com bt de exibir pág de resuktados
      let nPages = document.createElement("div")
      list_all_container.appendChild(nPages)
      nPages.className += "n-page n-page-ct"
      //nPages.innerHTML = "ATCHUMMM"

      if(resultado == undefined || resultado == [] || resultado == ""){
        nPages.innerHTML = ""
      } else {
         nPages.innerHTML = ""
        for(let i = 0; i < arrayResultados.length; i++){ // isto atualiza-se, mas 
          let nPage = document.createElement("div")
          nPages.appendChild(nPage)
          nPage.className += "n-page n-page" + i
          nPage.id = `n-page${i}`
          nPage.innerText = i+1

      //   nPage.addEventListener('click', (e) =>{
      //   console.log(`Click, page ${nPage.innerText}`)
      //   iP = i // tem de ser chamado acima
      // })
        }
      }
    }

    displayResultado(resultado)

   //FILTROS______________________________________________________//
  

    /***************** Ordem Alfabetica ********************/
    // Não chamar diretamente a função - usar arrow function ou função vazia!!
     document.querySelector('#Ord-Alfa').addEventListener('click', (e) =>{
      ordPal(ordAlf_)
      displayResultado(resultado) // funcionouu!!!
      console.log("Click!!") // funciona!!
    }) // talvez n esteje destacado
     document.querySelector('#Ord-Alfa').style.backgroundColor = "blue"


    /***************** Ordem Freq ********************/
    document.querySelector('#Ord-Freq').addEventListener('click', (e) =>{
      ordFreq(ordFre_) // falta o valor
      displayResultado(resultado) 
      console.log("Click!!")
    })
    document.querySelector('#Ord-Freq').style.backgroundColor = "blue"

    /***************** Ordem Tit ********************/
    document.querySelector('#Ord-Tit').addEventListener('click', (e) =>{
      ordTitle(ordTit_)
      displayResultado(resultado) 
      console.log("Click!!") // funciona
      console.log(ordTit_) // está a alterar
    })
    document.querySelector('#Ord-Tit').style.backgroundColor = "blue"

    /***************** Separadores page ********************/
    function sepPage(){
        for(let i = 0; i < arrayResultados.length; i++){ //funiona!! // deve ser por arrayResultados ter de se atualizar!!
        document.querySelector('#n-page' + i).addEventListener('click', (e) => {
          console.log(`Click, page ${document.querySelector('#n-page' + i).innerText}`)
          iP = i
          displayResultado(resultado)
        })
        document.querySelector('#n-page' + i).style.backgroundColor = "yellow" // após atualização dos filtros isto deixa de funcionar
      }
    }
    sepPage() // ainda preciso de perceber!!

     /***************** Pesquisa de palavras ********************/
    palInput.addEventListener('input', (e) =>{
      let value = e.target.value

      if(value && value.trim().length > 0){
        value = value.trim().toLowerCase()
        
        const filteredResultado = resultado
          .filter(item =>{ // que compara a palavra com o valor normalizado
            const palavra = normalize(item?.palavra || "")
            const val = normalize(value) // input-value normalizado
            return palavra.includes(val)
          })
          .sort((a,b) => { // ordem alfabetica com os valores dos resultados normalizados
              const aPal = normalize(a.palavra)
              const bPal = normalize(b.palavra)
              const val = normalize(value) // input-value normalizado

              const aStarts = aPal.startsWith(val) // compara se começa com o valor versao normalizada
              const bStarts = bPal.startsWith(val)

              if(aStarts && !bStarts) return -1
              if(!aStarts && bStarts) return 1

              return aPal.localeCompare(bPal, 'pt', { sensitivity: 'base' })

          })


        // if(filteredResultado == undefined){
        //   filteredResultado = ""
        // }
        resPPage(filteredResultado.length, rPP) // still error
        //console.log(filteredResultado.length)
        //console.log(filteredResultado)
        displayResultado(filteredResultado, value) // tem erro no undefined (preciso de diplay quando n há resultados)
      } else{
        resPPage(resultado.length, rPP)
        displayResultado(resultado, value)
      }
    })


  }




  // indexPal parece funcionar segundo estes parametros
  // for(let i = 0; i < todosOBJpalavrasSStopwords.length; i++){
  //   let indexPal = todosOBJpalavrasSStopwords[i].indice;
  //   console.log(`${i-indexPal}`)
  // }




  



  //---------  Display palavras-pop  ----------/ ----------------------------> AINDA POR FAZER!!!
  function displayPalavrasPop() {
    // Primeira versão com display das mais populares por ano

    div_display.innerHTML = "";

    //** baseada na tabela de display em palavra selecionada **
    let list_all_container = document.createElement("div");
    document.querySelector(".div-display").appendChild(list_all_container);
    list_all_container.className += "list-all-container";

    //Header!!
    let ct_head_list = document.createElement("div");
    document.querySelector(".list-all-container").appendChild(ct_head_list);
    ct_head_list.className += "list ct-head-list";

    // conteudo do header!!
    ct_head_list.innerHTML = `  <div class = "palavras header">Palavra</div>
                                    <div class = "texto header">Textos</div>
                                    <div class = "frequencia header">Freq</div>`;

    ct_head_list.style.backgroundColor = "yellow";

    // conteudo após header //////////////////////
    let container = document.createElement("div");
    document.querySelector(".list-all-container").appendChild(container);
    container.className = "container";

    //iteração para display
    for (let i = 0; i < todas_as_palavrasFreq_p_ano.length; i++) {
      // teste das primeiras 3 palavras

      //cria a div principal
      let ct_item = document.createElement("div");
      ct_item.className += "ct-item ct-item" + (i + 1);
      container.appendChild(ct_item);

      //divs dentro da div principal
      let item_palavra = document.createElement("div");
      document.querySelector(`.ct-item${i + 1}`).appendChild(item_palavra);
      item_palavra.className = "item-palavra";
      item_palavra.innerHTML = `<br> Palavra: ${palavras_grafico[
        i
      ].toUpperCase()}`;

      let item_textos = document.createElement("div");
      document.querySelector(`.ct-item${i + 1}`).appendChild(item_textos);
      item_textos.className = "item-textos";

      for (let j = 0; j < wordData.palavras[indexPal].textos.length; j++) {
        // item a colocar dentro de "item_textos"
        let texto_de_palavra = document.createElement("div");
        //document.querySelector(".item-textos").appendChild(texto_de_palavra)
        texto_de_palavra.className = "item-texto";
        texto_de_palavra.innerHTML = `${wordData.palavras[indexPal].palavra}: ${wordData.palavras[indexPal].textos[j].id_text}`;
        item_textos.appendChild(texto_de_palavra);
      }

      let item_frequencia = document.createElement("div");
      document.querySelector(`.ct-item${i + 1}`).appendChild(item_frequencia);
      item_frequencia.className = "item-frequencia";
      item_frequencia.innerHTML = `Frequencia:${wordData.palavras[indexPal].frequencia}<br>`;
    }
  };


  //Colocar todos assim para ser mais fácil de testar
  displayTodasPalavras() // a dar por default
  bt_todas_palavras.addEventListener("click", displayTodasPalavras)
  //displayPalavrasPop()
  bt_palavras_pop.addEventListener("click", displayPalavrasPop)

}


function normalize(str){
  return str
    ?.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}
