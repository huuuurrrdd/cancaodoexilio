/*

    Script para pág de categoria

*/

//*************  Buscar parametro de categoria  ****************/
function getQueryParam(param) {
  let urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

//obter nome de categoria
let categoria = getQueryParam("categoria");
let especifica

console.log(categoria); // funciona!!

//*************  Acesso a dados  ****************/
function fetchData() {
  let wordData, textData, stoplist, lemmasData, wikiData;

  //dicionario json
  fetch("./Dict_palavras_lemas_v0004.json")
    .then((response) => {
      if (!response.ok) {
        // menssagem de erro
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      wordData = data;
      return fetch("./Dict_lemas_palavras_v0002.json");
    })
    .then((response) => {
      if (!response.ok) {
        // menssagem de erro
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      lemmasData = data;
      return fetch("./t4_textos_loc_fauna_flora.json"); // fetch json dos textos
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
    .then((data) => {
        wikiData = data; // guarda json dos lemas
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
        displayData(wordData, textData,stoplist, lemmasData, wikiData) //funcao com os 2 jsons
    })
    .catch(error => console.error('Failed to fetch data', error))
}

fetchData();

function displayData(wordData, textData, stoplist) {
  //pode ser util ver as palavras associadas

  /* Passos para o gráfico:
        -> Informações a obter: 
            Gráfico:
            - (feito!) array com anos (já tenho pág palavras??)
            - (feito!) array com frequencia em cada ano (da categoria no geral)

            - (feito!) Falta outras categorias: locais, anos e autores!!
            - Se tiver tempo, colocar em dácadas (fazer um pequeno teste)

            Palavras:
            - (feito!) Colocar lista de palavras pertencentes à categoria (já feito na página anterior)
            - (feito! em numero)Colocar a frequencia na div de barra de frequencia (primeiro em número, depois descobro como colocar a barra)
            - (feito, mas problema com autores com espaço) Link de acesso à página da palavra (já feito anteriormente)
            - Verificar o problema do espaço nos autores na página especifica 

            (Depois avançar para a página específica e fazer o mesmo para a palavra específica selecionada)
            (-> No fim, ver como posso, nas palavras populares, colocar os resultados em logaritmo 
                - (pesquisar isso!!)
                - Fazer!! e ver se resultou bem!)

            - Depois!! Fazer CSS de algumas páginas (para ficar mais arrumadinho)
                -> A barra na parte das palavras faz parte disso!!
    
    */

  //Acedendo a dados de número de "categoria" por ano
  // para a categoria: array para idTexto, freq, ano
  id_textos = []; // para cada texto, o n de vezes
  frequencia = [];
  anos_cat = [];

  let nomeCat;

  if (categoria.toLowerCase() == "anos") {
    nomeCat = "date_of_publication";
  } else if (categoria.toLowerCase() == "autores") {
    nomeCat = "author";
  } else {
    nomeCat = categoria.toLowerCase();
  }

  let anos_grafico = [];
  let freq_grafico = [];
  // podia criar um array multidimencional para os ids!!
  let ids_final = [];

  if (nomeCat === "fauna" || nomeCat === "flora") {
    // funcionaa!!
    //console.log("é categoria") funciona!!

    // Tentando fazer de outra forma: (para cada texto, associa uma frequencia)
    for (let i = 0; i < textData.length; i++) {
      // isto é igual
      if (textData[i].categorias[nomeCat].length > 0) {
        // muda isto
        id_textos.push(textData[i].id);
        frequencia.push(textData[i].categorias[nomeCat].length); // muda isto
        anos_cat.push(textData[i].date_of_publication);
      }
    }
  } else if (nomeCat === "locais") {
    for (let i = 0; i < textData.length; i++) {
      if (textData[i].categorias[nomeCat].locais_limpos.length > 0) {
        id_textos.push(textData[i].id);
        frequencia.push(textData[i].categorias[nomeCat].locais_limpos.length);
        anos_cat.push(textData[i].date_of_publication);
      }
    }
  } else {
    // author e date_of_publication (são iguais pq todos os textos têm um autor e uma data de publicao)

    for (let i = 0; i < textData.length; i++) {
      const valor = textData[i]?.[nomeCat];
      if (valor !== undefined && valor !== null && valor !== "") {
        id_textos.push(textData[i].id);
        frequencia.push(1);
        anos_cat.push(textData[i].date_of_publication);
      }
    }
  }

  //console.log(`Lugares ${textData[20].categorias.locais.locais_limpos[2]}`)
  //console.log(`Nome cat: ${nomeCat}`)
  //console.log(`id_textos: ${id_textos}, frequencia: ${frequencia}, anos_cat: ${anos_cat}`)

  // CRIAÇÃO DE ARRAY MULTIDIMENCIONAL COM OS ANOS, IDs E FREQUENCIAS
  const ag_anos = []; // array de (array de anos)
  let gAtual_anos = []; // array atual de anos

  const ag_freq = [];
  let gAtual_freq = [];

  const ag_id = [];
  let gAtual_id = [];

  //junta os anos iguais (ao mesmo tempo que junta a frequencia e os ids)
  for (let i = 0; i < anos_cat.length; i++) {
    if (i === 0 || anos_cat[i] == anos_cat[i - 1]) {
      gAtual_anos.push(anos_cat[i]); //igual ao anterior, adiciona

      gAtual_freq.push(frequencia[i]);
      gAtual_id.push(id_textos[i]);
    } else {
      ag_anos.push(gAtual_anos); // push grupo finalizado
      gAtual_anos = [anos_cat[i]]; // começa novo grupo

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
  //console.log(`Variável ag_freq[30][2]: ${ag_freq[30][0]}`) // funciona!!

  //TRANSFORMAR ARRAYS MULTIDIMENSIONAIS DOS ANOS E FREQ EM ARRAYS UNIDIMENSIONAIS
  const ag_anos_unidimensional = []; // transformar cada conjunto de anos ex(1847, 1847) em 1847
  const ag_freq_p_ano = []; // juntar todas as frequencias em uma só ex(2, 1) em 3
  // falta o id dos textos (acrescentar algo vazio quando n há)

  for (let i = 0; i < ag_anos.length; i++) {
    let soma_freq = 0;
    for (let j = 0; j < ag_anos[i].length; j++) {
      soma_freq += ag_freq[i][j]; // percorre em cada ano cada frequencia de cada texto e soma
    }
    ag_freq_p_ano.push(soma_freq);
    ag_anos_unidimensional.push(ag_anos[i][0]); // escolhe o primeiro, pq são todos iguais
  }

  //   console.log("Freq e anos respetivamente:")
  //   console.log(ag_anos_unidimensional) //sem valores repetidos
  //   console.log(ag_freq_p_ano) // funcionou!!

  //TENTATIVA DE CONTAR TODOS OS ANOS E IGUALAR A 0 OS ANOS SEM REPRESENTAÇÃO
  const val_anos = ag_anos_unidimensional;
  const val_freq = ag_freq_p_ano; // apenas os anos em que freq > 0
  // ainda multidimensional
  const val_id = ag_id;

  const start = 1846;
  const end = 2025; // podia colocar o ano atual

  for (let y = start; y <= end; y++) {
    anos_grafico.push(y); // adiciona anos normalmente

    const idx = val_anos.indexOf(y); // obtém o indice do valor y (o ano selecionado) -> se n existir indice para esse valor, idx = -1
    if (idx !== -1) {
      // caso exista um índice com esse valor
      freq_grafico.push(val_freq[idx]); // adiciona o valor
      ids_final.push(val_id[idx]); // espero que adicione todos os valores
    } else {
      freq_grafico.push(0); // se n tiver, adiciona 0
      ids_final.push(0);
    }
  }

  console.log("Valores para anos e frq no gráfico:");
  // console.log(anos_grafico)
  // console.log(freq_grafico)
  // console.log(ids_final)
  //console.log(`anos ${anos_grafico.length}, freq: ${freq_grafico.length}, ids ${ids_final.length}`) // tudo 180, tudo funciona!!!

  // funcao para obter aray de palavras
  function arrayPalavrasCat(textData, categoria) {
    let all_entries = []; // array of objects { nome, textId }

    if (categoria === "locais") {
      for (let i = 0; i < textData.length; i++) {
        if (textData[i].categorias.locais.locais_limpos.length > 0) {
          for (
            let j = 0;
            j < textData[i].categorias.locais.locais_limpos.length;
            j++
          ) {
            all_entries.push({
              nome: textData[i].categorias.locais.locais_limpos[j],
              textId: textData[i].id,
            });
          }
        }
      }
    } else if (categoria === "date_of_publication" || categoria === "author") {
      for (let i = 0; i < textData.length; i++) {
        const valor = textData[i]?.[categoria];
        if (valor !== undefined && valor !== null && valor !== "") {
          all_entries.push({
            nome: textData[i]?.[categoria],
            textId: textData[i].id,
          });
        }
      }
    } else {
      for (let i = 0; i < textData.length; i++) {
        if (textData[i].categorias[categoria].length > 0) {
          for (let j = 0; j < textData[i].categorias[categoria].length; j++) {
            if (textData[i].categorias[categoria][j] != "") {
              all_entries.push({
                nome: textData[i].categorias[categoria][j],
                textId: textData[i].id,
              });
            }
          }
        }
      }
    }

    //Now group by nome
    let categoryMap = new Map();

    for (let item of all_entries) {
      if (!categoryMap.has(item.nome)) {
        categoryMap.set(item.nome, []);
      }
      categoryMap.get(item.nome).push(item.textId);
    }

    // convert to array of objects
    let result = Array.from(categoryMap, ([nome, ids]) => ({
      nome,
      textos_menc: ids,
    }));

    return result;
  }

  // objeto de nome específico + frequencia (pode ser necessário acrescentar ano na pxox pagina)
  let arraynomeCat = arrayPalavrasCat(textData, nomeCat); // funciona (para fauna!!)

  //lista ordenada por frequencia
  let nomeCatOrd = arraynomeCat.sort(
    (a, b) => b.textos_menc.length - a.textos_menc.length
  );

  //console.log(nomeCatOrd[0]) //funciona

  for (let i = 0; i < 10; i++) {
    console.log(`${nomeCatOrd[i].nome}, ${nomeCatOrd[i].textos_menc.length}`);
  }

  // quantidade de nomes no geral:
  //console.log("Total de nomes = " + nomeCatOrd.length) // 531 no caso de fauna

  /////////////////////////////////////////////////////////////////
  /***************** Display de elementos HTML *******************/
  /////////////////////////////////////////////////////////////////
  let categoria_container = document.createElement("div");
  document.querySelector("body").appendChild(categoria_container);
  categoria_container.className += "categoria-container";

  let margem_ct = document.createElement("div");
  categoria_container.appendChild(margem_ct);
  margem_ct.className = "margem-ct";

  //subtitulo
  let subtitulo = document.createElement("p");
  margem_ct.appendChild(subtitulo);
  subtitulo.className += "subtitulo";
  subtitulo.innerText = "Categoria de palavras:";

  //*************  Titulo de página (Nome de categoria) ****************/
  let categoria_palavras_h = document.createElement("h1");
  margem_ct.appendChild(categoria_palavras_h);
  categoria_palavras_h.className += "categoria-palavras-h page-title";
  categoria_palavras_h.innerText = categoria;

  //*************  Gráfico geral  ****************/
  let grafico_ct = document.createElement("div");
  margem_ct.appendChild(grafico_ct);
  grafico_ct.className += "grafico-ct";

  let canvas = document.createElement("canvas");
  document.querySelector(".grafico-ct").appendChild(canvas);
  canvas.className += "grafico-categoria";

  const GP = document.querySelector(".grafico-categoria");

  //*********** Gráfico inicial **********/
  // neste gráfico é importante poder comparar o nº de textos total com o nº que mencionam
  new Chart(GP, {
    type: "bar",
    data: {
      labels: anos_grafico,
      datasets: [
        {
          label: `${categoria} ao longo do tempo`,
          data: freq_grafico,
          borderWidth: 0,
          backgroundColor: "#223F29",
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
  let div_textos = document.createElement("div");
  categoria_container.appendChild(div_textos);
  div_textos.className += "div-textos div-textos-display";

  /******************  Funções para display  *******************/
  // valores default para ordenação de resultados
  let ordAlf = "AZ"; // o atual
  let ordAlf_ = "ZA"; // o q muda
  let ordFre = "asc"; // o atual
  let ordFre_ = "des"; // o que muda

  /*:::::::::::  Resultados p/pagina  :::::::::::*/
  let rPP = 50; // resultados por página
  let arrayResultados = [];

  const total = nomeCatOrd.length;

  function resPPage(total, rPP) {
    arrayResultados = [];

    const divInteira = Math.floor(total / rPP); // aqui deveria ser resultado.length
    const resto = total % rPP;

    if (total <= rPP) {
      // se há menos de 50 resultados, só uma página
      arrayResultados.push({ st: 0, en: total });
    } else {
      // paginas completas
      for (let i = 0; i < divInteira; i++) {
        const s = i > 0 ? i * rPP : 0;
        const e = s + rPP;

        arrayResultados.push({
          st: s,
          en: e,
        });
      }
      // ultima pagina incompleta
      if (resto != 0)
        arrayResultados.push({
          st: divInteira * rPP,
          en: divInteira * rPP + resto,
        });
    }

    // resultado a devolver: arrayResultados
  }

  resPPage(total, rPP);

  let iP = 0;

  /*:::::::::::  Array de obj com RESULTADOS  :::::::::::*/
  let resultado = [];

  for (let i = 0; i < nomeCatOrd.length; i++) {
    // objeto dos textos
    let textos = [];
    // cria objeto de textos do elemento
    for (let j = 0; j < nomeCatOrd[i].textos_menc.length; j++) {
      const id = nomeCatOrd[i].textos_menc[j];
      const metadata = textData[id - 1];
      const titulo = metadata.id;
      const ano = metadata.date_of_publication;
      const autor = metadata.author;

      textos.push({
        // a frequencia é textos.length
        id: id,
        titulo: titulo,
        ano: ano,
        autor: autor,
      });
    }

    resultado.push({
      nomeCat: nomeCat,
      palavra: nomeCatOrd[i].nome,
      textos: textos,
      freq: textos.length,
    });
  }

  /*:::::::::::  Ordem alfabética de PALAVRAS  :::::::::::*/
  function ordPal(ord) {
    console.log("Ord Function");
    if (ord == "AZ") {
      resultado.sort((a, b) => a.palavra.localeCompare(b.palavra, "pt")); // funciona!!
      ordAlf_ = "ZA"; // pronto para mudar
      ordAlf = "AZ"; // o atual
    } else if (ord == "ZA") {
      resultado
        .sort((a, b) => a.palavra.localeCompare(b.palavra, "pt"))
        .reverse();
      ordAlf_ = "AZ"; // pronto para mudar
      ordAlf = "ZA"; // o atual
    }
  }
  //console.log(ordPal("ZA"))//funciona!!
  //ordPal("ZA")

  /*::::::::::: Ordem PALAVRAS por frequencia :::::::::::*/
  function ordFreq(ord) {
    if (ord == "des") {
      resultado.sort((a, b) => (a.freq < b.freq ? -1 : 1)).reverse();
      ordFre_ = "asc"; // pronto para mudar
      ordFre = "des"; // atual
    } else if (ord == "asc") {
      resultado.sort((a, b) => (a.freq < b.freq ? -1 : 1));
      ordFre_ = "des";
      ordFre = "asc";
    }
  }
  //console.log(ordFreq("des")) //funciona!!
  //ordFreq("asc")




  // Lista de todos os nomes de categorias existentes (por ordem de frequencia)
  let list_all_container = document.createElement("div");
  div_textos.appendChild(list_all_container);
  list_all_container.className += "list-all-container";

  let ct_head_list = document.createElement("div");
  document.querySelector(".list-all-container").appendChild(ct_head_list);
  ct_head_list.className += "ct-head-list";

  ct_head_list.innerHTML = `  <div class = "palavras header palavras-header">
                                    <h2 class = "pal-o-h">Palavra</h2>
                                    <p id="Ord-Alfa">Ord:${ordAlf} </p>
                                    <div id="pal-search-bar">
                                        <input id="pal-input" class="input-h" aria-label="palavra?" type="text" class="pal-search-bar__input" placeholder="Palavra?" autofocus required>
                                        <input id="pal-submit" type="image" class="pal-search-bar_button bt-h" src='./imagens/lupa.svg' aria-label="search">
                                    </div>
                                </div>

                                <div class = "texto header texto-header">
                                    <h2 class = "texto-o-h">Textos</h2>
                                    <p id="Ord-Tit">Ord: </p>
                                    <div id="tit-search-bar">
                                        <input id="tit-input" class="input-h" aria-label="titulo?" type="text" class="tit-search-bar__input" placeholder="titulo?" autofocus required>
                                        <input id="tit-submit" type="image" class="tit-search-bar_button bt-h" src='./imagens/lupa.svg' aria-label="search">
                                    </div>
                                </div>

                                <div class = "frequencia header frequencia-header">
                                    <h2 class = "fre-o-h">Freq</h2>
                                    <p id="Ord-Freq">Ord:${ordFre} </p>
                                    <div id = "freq-search-bar">
                                        <input id="freq-input" class="input-h" aria-label="autor?" type="text" class="freq-search-bar__input" placeholder="frequencia?" autofocus required>
                                        <input id="freq-submit" type="image" class="freq-search-bar__button bt-h" src='./imagens/lupa.svg' aria-label=""search>
                                    </div>
                                </div>`;

  ct_head_list.style.backgroundColor = "yellow";

  /*:::::  Botoes  :::::*/
  const palSubmitButton = document.querySelector("#pal-submit");
  const palInput = document.querySelector("#pal-input");

  const freqSubmitButton = document.querySelector("freq-submit");
  const freqInput = document.querySelector("#freq-input");

  // conteudo após header //////////////////////
  let container = document.createElement("div");
  document.querySelector(".list-all-container").appendChild(container);
  container.className += "container";

  function displayResultado(resultado, valor) {
    /*:::::  Atualiza os headers  :::::*/
    document.querySelector("#Ord-Alfa").textContent = `Ord: ${ordAlf}`; // funciona!!
    document.querySelector("#Ord-Freq").textContent = `Ord: ${ordFre}`;

    container.innerHTML = "";

    if (resultado == undefined || resultado == [] || resultado == "") {
      container.innerHTML = `<p>Não foram encontrados resultados para: "${valor}" </p><br><br>`;
    } else {
      for (let i = arrayResultados[iP].st; i < arrayResultados[iP].en; i++) {
        let ct_item = document.createElement("div");
        ct_item.className += "ct-item ct-item" + i;
        container.appendChild(ct_item);

        let link_palavra_cat = document.createElement("a");
        document.querySelector(".ct-item" + i).appendChild(link_palavra_cat);
        link_palavra_cat.className +=
          "palavras link-palavra-cat link-palavra-cat" + i;
        link_palavra_cat.href =
          "./p_categoria_especifica.html?categoria=" +
          categoria +
          "&especifica=" +
          resultado[i].palavra;

        //let palavraDisplay = resultado[i].palavra.charAt(0).toUpperCase() + resultado[i].palavra.slice(1)
        let palavraDisplay = titleCase(resultado[i].palavra, stoplist)

        let palavra = document.createElement("div");
        document.querySelector(".link-palavra-cat" + i).appendChild(palavra);
        palavra.className += "palavra";
        palavra.innerHTML = palavraDisplay;

        let barra_frequencia = document.createElement("div");
        document.querySelector(".ct-item" + i).appendChild(barra_frequencia);
        barra_frequencia.className += "barra-frequencia";
        //barra_frequencia.innerHTML = nomeCatOrd[i].textos_menc.length

        barra_frequencia.addEventListener("click", () => {
          window.location.href =
            "./p_categoria_especifica.html?categoria=" +
            categoria +
            "&especifica=" +
            resultado[i].palavra;
        });

        let barra_interior = document.createElement("div");
        barra_frequencia.appendChild(barra_interior);
        barra_interior.className += "barra-interior";

        let barra_valor = document.createElement("div");
        barra_interior.appendChild(barra_valor);
        barra_valor.className = "barra-valor";
        barra_valor.innerHTML = resultado[i].freq;

        barra_interior.style.backgroundColor = "#223F29";

        let f1 = nomeCatOrd[0].textos_menc.length;
        let f2 = resultado[i].freq;
        barra_interior.style.width = `calc(${f2 / f1}*100%)`;
      }
    }

    /*:::::  Display de páginas de resultados  :::::*/
    // remove outro nPages que existam anteriormente em list_container
    const oldPages = list_all_container.querySelector(".n-page-ct");
    if (oldPages) oldPages.remove();

    if(arrayResultados.length > 1){
      // div com bts de exibir pag de resultados
      let nPages = document.createElement("div");
      list_all_container.appendChild(nPages);
      nPages.className += "n-page n-page-ct";

      if (resultado == undefined || resultado == [] || resultado == "") {
        nPages.innerHTML = "";
      } else {
        nPages.innerHTML = "";
        for (let i = 0; i < arrayResultados.length; i++) {
          // isto atualiza-se, mas
          let nPage = document.createElement("a");
          nPages.appendChild(nPage);
          nPage.className += "n-page-i n-page" + i;
          nPage.id = `n-page${i}`;
          nPage.innerText = i + 1;

            nPage.addEventListener('click', (e) =>{
            console.log(`Click, page ${nPage.innerText}`)
            iP = i // tem de ser chamado acima
          })
        }
      }

      sepPage()
          document.querySelector('#n-page' + iP).style.backgroundColor = "#223F29"
          document.querySelector('#n-page' + iP).style.color = "#FFFEF2"
    }   
  }

  displayResultado(resultado);

  /*:::::::::::  ____________FILTROS____________  :::::::::::*/

  /***************** Ordem Alfabetica ********************/
  document.querySelector("#Ord-Alfa").addEventListener("click", (e) => {
    ordPal(ordAlf_);
    displayResultado(resultado);
    console.log("Click!!");
  });

  /***************** Ordem Freq ********************/
  document.querySelector("#Ord-Freq").addEventListener("click", (e) => {
    ordFreq(ordFre_); // falta o valor
    displayResultado(resultado);
    console.log("Click!!");
  });

  /***************** Separadores page ********************/
  function sepPage() {
    for (let i = 0; i < arrayResultados.length; i++) {
      //funiona!! // deve ser por arrayResultados ter de se atualizar!!
      document.querySelector("#n-page" + i).addEventListener("click", (e) => {
        console.log(
          `Click, page ${document.querySelector("#n-page" + i).innerText}`
        );
        iP = i;
        displayResultado(resultado);
      });
      document.querySelector('#n-page' + i).innerHTML += `<style> #n-page${i}:hover{background-color:#223F29; cursor:pointer; color:#FFFEF2}</style>`
    }
  }
  //sepPage();

  /*:::::::::::  __Pesquisa livre__  :::::::::::*/

  /***************** Pesquisa palavras ********************/
  palInput.addEventListener("input", (e) => {
    let value = e.target.value;

    if (value && value.trim().length > 0) {
      value = value.trim().toLowerCase();

      const filteredResultado = resultado
        .filter((item) => {
          // que compara a palavra com o valor normalizado
          const palavra = normalize(item?.palavra || "");
          const val = normalize(value); // input-value normalizado
          return palavra.includes(val);
        })
        .sort((a, b) => {
          // ordem alfabetica com os valores dos resultados normalizados
          const aPal = normalize(a.palavra);
          const bPal = normalize(b.palavra);
          const val = normalize(value); // input-value normalizado

          const aStarts = aPal.startsWith(val); // compara se começa com o valor versao normalizada
          const bStarts = bPal.startsWith(val);

          if (aStarts && !bStarts) return -1;
          if (!aStarts && bStarts) return 1;

          return aPal.localeCompare(bPal, "pt", { sensitivity: "base" });
        });

      // if(filteredResultado == undefined){
      //   filteredResultado = ""
      // }
      resPPage(filteredResultado.length, rPP); // still error
      //console.log(filteredResultado.length)
      //console.log(filteredResultado)
      displayResultado(filteredResultado, value); // tem erro no undefined (preciso de diplay quando n há resultados)
    } else {
      resPPage(resultado.length, rPP);
      displayResultado(resultado, value);
    }
  });


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
                displayResultado(filteredResultado, value)

            } else {
                resPPage(resultado.length, rPP)
                displayResultado(resultado, value)
            }
    })
}

function normalize(str) {
  return str
    ?.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
