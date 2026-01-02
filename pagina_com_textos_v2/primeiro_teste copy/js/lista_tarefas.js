/*  Coisas a avançar nesta página [PÁGINA CATEGORIA ESPECÍFICA]:
        Palavra:
            - (feito!!) Verificar o problema do espaço nos autores na página especifica 
            - (feito!) Verificar se existem eventualemte outros problemas com palavras
            - (feito!) Ajustar a info da wikipédia para não ficar tão extensa

        Gráfico:
            - (feito!) Array com anos (exemplo de pág palavras e pág categorias)
            - (feito!) Array com frequencia em cada ano (da palavra) - apenas existe uma por texto em que ocorre
            - (feito!!)Colocar funcional para locais, anos e autores -> neste momento n está funcional!!!
            - Pode ser necessário colocar em opacidade baixa, as ocorrencias totais da categoria (para comparação)
            - (ESTE!!)Possibilidade de selecionar um elemento do gráfico e aceder a ele

        Textos que mencionam (manter a lista dos ids dos textos)
            - (Feito!!) Manter a lista dos ids dos textos que mencionam para colocar na tabela
            - (Feito!!) Alterar o título da tabela conforme o nome da categoria (se autor, escrito por, se ano...)
            - (ESTE!) Perceber pq brasil tem freq de 249 numa página e aqui tem 200
            - (ESTE!) Colocar links para os textos na lista de textos (o msmo na pág das palavras)

        Depois:
            - (feito!!) Página das palavras: colocar os resultados das palavras populares em logaritmos
            - (feito!!) Colocar links nas páginas de texto para as categorias e palavras específicas
    
        CSS:(vou avançar aqui!!)
            - Assim que tiver avançado, posso colocar css em todas as páginas das categorias [indica que estão mais prontas]
                -> Inspirar nas páginas de palavras (colocar margens, definir tabelas e colocar graficos a preto)

        Ainda na PÁGINA DAS PALAVRAS:
            - (feito!!)Ordenar os resultados das palavras (ordem alfabética, frequencia, e titulo de textos) (https://www.youtube.com/watch?v=hkCOsr4xyIc)
            - (feito!!)Apresentar resultados do array de resultados (tem lá todos os valores)
            - (feito!!)Chamar eventlistner click para reordenar resultados (está a ser complicado!!)
                -> (feito!)Eliminar as funções a mais e tornar mais eficientes as que estão
                -> (feito!)Colocar o filtro da frequencia a funcionar
                -> (feito!)Colocar o filtro dos titulos alfabeticamente a funcionar vs cronologicamente
            - (feito!)Colocar todos os resultados (limitando o nº de resultados que aparecem por página (umas 50 por página))
                -> Falta colocar indices em 'inline'
                -> colocar '...' agrupando os que estão a ocupar muito espaço ->talvez um array de 3?  (n sei como se faz!!)
            - (EM PROCESSO...) Acrescentar pesquisa livre de PALAVRAS:
                -> (feito!)Colocar input html
                -> (feito!)Pesquisa pelo valor do input
                -> (feito!)Aparecer os resultados na tabela da plataforma
                    -> (feito!)Colocar resultados ordenados conforme as primeiras letras do input.value
                    -> (feito!)Permitir pesquisa ignorando pontuação
                    -> (feito!)Atualizar numero de páginas conforme a numeração dos resultados
                    -> Atualizar eventListner dos indices das páginas (provavlmente n estão compatíveis, mas uma questão de analizar os arrays)
            - Acrescentar pesquisar palavras por titulo
                -> Criar uma inputbox em html
                -> Testar como ordenar os resultados usando o filter()
                -> Display dos resultados na tabela da plataforma
                    -> Todos os passos da tarefa anterior

            - (feito!) Colocar links nas PALAVRAS para poder aceder à sua página e TEXTOS
            - Acrescentar possibilidade de ocultar/ mostrar os textos quando são muitos (ou) mostrar mais/menos (quando maior que 3)
            - REPETIR OS FILTROS PARA AS OUTRAS PÁGINAS (depois da pesquisa livre!!)
        
            Gráfico:
            - Criar versão de gráfico sem stopwords (testar com apenas frequencia, ou com TFIDF, ou com palavras/n de palavras total)

        Em PESQUISA DE TEXTOS:
            - (feito!)Colocar como default o modo amostra
            - (feito!)Acrescentar mapa no modo mapa
            - (feito!)Colocar resultados em forma de grid (está em forma de flex)
            - Melhorar a parte da pontuação do modo amostra (verificar como foi feito na página inicial de textos)
            - Colocar os resultados todos em modo tabela (os da amostra e da tabela) - com CSS
            - (feito!)Acrescentar o mapa com os locais e os textos (associá-los)
            - Colocar filtros de pesquisa em "amostra" e "tabela"
                -> (feito!)Ordenar por ano (crescente e decrescente) -> inspirar nas funções das palavras
                -> (feito!)Ordenar por título alfabeticamente (e reverse())
                -> (feito!) Ordenar por autor alfabeticamente (e reverse())
                -> Verificar erros e apontar para futura melhoria!!

        Em PÁGINA DE TEXTO:
            - (feito) Colocar link de palavra nas categorias e ainda link de categorias nos nomes (n importa o estilo)

        Em MENU DE NAVEGAÇÃO:
            - Refazer menu com base em algum template
            - Enquadrar a ferramenta de pesquisa
            - Caixa de opções à medida que vai escrevendo (ou não...)
            - Perceber qual o problema de acesso ao link

        Ainda:
        - Ver discussões e apontamentos da reunião e formular tarefas de correção e outras baseado na reunião
            -> Criar página sobre (mesmo que mal)
            -> Variedade de gráficos: 3 gráficos diferentes lado a lado, o que representam e significado do que representam
            -> Avançar a estética do website o mais rápido possível!! (especialmente a página de textos e de palavras)
            -> Corrigir as categorias de palavras (ver como isso será integrado no código e na base de dados)
                -> Criar um script em que se remova tudo o que não é aqueles nomes que de facto representam aquelas categorias


******************************************************************
    Coisas a fazer para ter o site funcional
        Geral:
        - Substituir "Categorias de palavras" por pesquisa de textos por temas
        - Ver se é possível colocar o gráfico a adaptar-se ao tamanho da pág
        
        HOME:
        - (feito [+/-]) Colocar corretamente a formatação de CSS
        - (feito!!) Adicionar links para autor e ano [na página de ano e autor]
        - Texto de contextualização:
            -> Acrescentar algum contexto ao lado do poema (o da página sobre)
            -> Um resumo de como interagir (um parágrafo pequeno + instruções básicas)
            -> Links do autor ou do poema (ex: wikipedia)

        Correção de texto:
        -> Colocar os quadrados como texto corretamente (verificar quais são os simbolos que estão em quadrados):
            - travessões
        -> Quando a pontuação se trata de parêntesis, colocar "(" antes e ")" depois da palavra(ver pq isso está mal)
        -> remover espaço antes de ";"
        ->Título:
            - Criar função para criar o título: caso tenha a frase separada por 2* /n, considerar, caso contrário, ir buscar o título
            - Caso tenha título, remover o título do texto (posso criar variável para isso)



        PÁGINA DE PALAVRA:
        - (feito - primeira página!) Criar um container para a parte de cima e diminuir a margem do contentor geral (o mesmo para todas as páginas)
        - Em cada palavra, colocar um texto descritivo sobre a palavra.
            -> Ex(Palavra "canção" aparece em x textos de x autores diferentes. 
            O texto/ ano que aparece mais vezes...)
        - Colocar a formatação em cima igual ao das categorias: "Palavra:"
        -> Colocar filtros de ordenação
        -> Colocar filtros de pesquisa 
        -> Colocar link em anos e autores
        -> Refazer a tabela
        -> Pensar num mecanismo para reduzir a carga(colocar os números por baixo)

        (Extra: Possibilidade de adicionar uma palavra ou um tema de categoria para filtrar os dois em conjunto)
            - Para isso era preciso ver quais as palavras que tbm contêm canção 
                -> comparando os textos que contêm canção e os textos que contêm palavra x, os que forem em comum, apresentar!
                -> Poderia ser a quantidade de textos
                    -> Quanto a frequencia, teria de colocar um e outro em simultêneo [podia ser uma dropbox com as possibilidades]


        SOBRE:
        - seria uma descrição mais detalhada
        - Acesso a link do livro
        - O sobre atual, estaria na página "home"
        - As "categorias" seriam o conceito mais importante do site [subcategorias dos textos]

        PÁGINA LISTA DE TEXTOS:
        - Ter filtros funcionais;
        - Filtros de pesquisa [input] funcional
        - Os botões de amostra e tabela estarem ao nivel do cabeçalho da tabela
        - Os números em baixo funcionais (usar inline block ou flex como em cima!!)
        - Mapa:
            - Ser possível expandir; 
            - Ser possível clicar para aceder aos textos
            - Ser possível filtrar por fauna e flora e outros temas (pode ficar na página dos temas)
            - Uma descrição de para que serve a página (talvez num I ou ?)
        - (feito!)Links:
            - Em amostra 
                -> div do conteúdo: texto
                -> Autor e ano para as respetivas páginas
            - Tabela
                -> Links para texto, ano e autor
        - Pensar em fazer apenas a versão tabela (a acrescentar/ocultar o texto)



        PÁGINA LISTA DE PALAVRAS:
        - Colocar ordem default (de maior frequencia para menor)
        - Links
            - Colocar link para palavra
            - Links para textos

        PÁGINA DE CATEGORIAS:
        - (feito) Colocar gráficos com flex ou numa grelha!! (optei pela grelha - inspirado em cats)
        - (feito) Colocar todos os gráficos com cor preta (ou verde, ver e decidir as cores principais e tipografia)
        - Colocar info da wikipédia (como na página específica)

        PÁGINA DE CATEGORIA ESPECÍFICA:
        - Colocar as barras em representação da frequencia

        PÁGINA DE ELEMENTO DE CATEGORIA:
        - (feito) Colocar o resumo da wikipédia menor
        - (ESTE) Garantir que ao clicar, consigo aceder à wikipédia
        - (se necessário) colocar filtro de pesquisa [consoante a quantidade de resultados]- ex: em sabiá é necessário
        - Colocar botão "voltar"
        - Colocar representação da evolução dos textos ao longo do tempo (para se poder comparar) -> pode ser necessário ver se há uma forma melhor


        Para os filtros no geral:
        - (feito!!)Ignorar [] e passar à proxima letra
        - (feito!!)Anos funcionammm!!!!
        - Colocar filtros na páginas em falta!
        - Números em baixo:
            -> (feito!) Alinhados
            -> Funcionais
            -> Com destaque no número atualmente selecionado
            -> Ver como acrescentar (...)
        - Nas palavras, ordenar por ordem de frequencia
        - Ocultar textos até certo número
        - Na pág de palavra e página de palavras falta colocar como default a frequencia maior primeiro

        Listagem de nomes de categorias: 
            -> Criar nova versão (manualmente) para cada categoria -> colocar nomes iguais [podia colocar uma espécie de tradução geral ()]

        No geral:
        - (feito!)Colocar sticky na navegação e nos topos de tabela!!!
        - Pág palavras: 
            -> só colocar alguns numeros a aparecerem! (de forma a só se ver uma linha) - ou colocar com barra de deslizar
                - (até podia estar stiky)
            ->(isto!) ocultar/mostrar poemas:
                - Poemas, 
                - headers de uma célula (mostrar/ocultar o input de pesquisa - preciso de manter um icone [uma setinha!!] para isso)
            -> Falta o filtro input dos títulos + filtro de frequencias
        - Falta colocar a pesquisa geral de palavras funcional!!
            -> colocar algo por baixo do mapa
        página de palavra:
            - Falta os inputs de pesquisa funcionais;
            - Colocar: palavra selecionada em cima (como nas categorias)
        - Na ordenação de ano considerar os '?' como os mais recentes



        //::::::::::::::::::::::::: Nova lista ::::::::::::::::::::::::://

        P_categoias_palavras:
        - Acrescentar 
            textos + 
            palavras

        - Remover info wiki
            - Substituir com info geral sobre o pequeno gráfico
        
        - Mudar a vista de tabela: 
        item: título | info sobre tabela (ex: palavras mais usadas são...) | gráfico
            textos: textos com mais palavras? | textos com mais palavras diferentes? (por ano?) -> deve ter um gráfico na pág texto!!
        - palavras: palavras diferentes por ano

        - Cat-sections:
            
        .cat-section{
            grid-column: span 3; /* Each item spans 3 columns }
        .cat-section:nth-child(3n+1){ /* 1st, 4th, 7th items 
            grid-column: 3 / 6;}
        .cat-section:nth-child(3n+2){ /* 2nd, 5th, 8th items 
            grid-column: 6 / 9;}
        .cat-section:nth-child(3n) { /* 3rd, 6th, 9th items 
            grid-column: 9 / 12;}


        
        ================================================================
        lista_todas_palavras:

        - Gráfico
            - Construir um gráfico com as "palavras diferentes" em cada ano 
            (ter um set[.length] para cada ano com as palavras)

        - Criar destaque para as barras que contêm a palavra selecionada
        - (em mouseOver criar texto explicativo sobre o "conceito de palavra")

        - Possibilidade de alternar gráfico com mapa


    */



// código da página de palavras (incompleto) - vou em "Event listners"

function displayData(wordData, textData, stoplist) {
 
  function frequencia_por_anos(Idx_Palavra) { // este IdPalavra deve ser um indice
    id_textos = [];
    frequencia = [];
    anos_pal = [];

    for (let i = 0; i < wordData.palavras[Idx_Palavra].textos.length; i++) {
      id_textos.push(wordData.palavras[Idx_Palavra].textos[i].id_text);
      frequencia.push(wordData.palavras[Idx_Palavra].textos[i].frequencia);
    }

    for (let i = 0; i < id_textos.length; i++) {
      anos_pal.push(textData[id_textos[i] - 1].date_of_publication);
    }

    const ag_anos = [];
    let gAtual_anos = [];

    const ag_freq = [];
    let gAtual_freq = [];

    const ag_id = [];
    let gAtual_id = [];

    for (let i = 0; i < anos_pal.length; i++) {
      if (i === 0 || anos_pal[i] == anos_pal[i - 1]) {
        gAtual_anos.push(anos_pal[i]); 

        gAtual_freq.push(frequencia[i]); 
        gAtual_id.push(id_textos[i]);
      } else {
        ag_anos.push(gAtual_anos); 
        gAtual_anos = [anos_pal[i]]; 

        ag_freq.push(gAtual_freq);
        gAtual_freq = [frequencia[i]];

        ag_id.push(gAtual_id);
        gAtual_id = [id_textos[i]];
      }
    }

    if (gAtual_anos.length) ag_anos.push(gAtual_anos);
    if (gAtual_freq.length) ag_freq.push(gAtual_freq);
    if (gAtual_id.length) ag_id.push(gAtual_id);

    const ag_anos_unidimensional = [];
    const ag_freq_p_ano = [];

    for (let i = 0; i < ag_anos.length; i++) {
      let soma_freq = 0;
      for (let j = 0; j < ag_anos[i].length; j++) {
        soma_freq += ag_freq[i][j];
      }
      ag_freq_p_ano.push(soma_freq);
      ag_anos_unidimensional.push(ag_anos[i][0]); 
    }

    const val_anos = ag_anos_unidimensional;
    const val_freq = ag_freq_p_ano;
    const val_id = ag_id 

    const start = 1846;
    const end = 2025;

    let anos_grafico = [];
    let freq_grafico = [];
    let ids_final = []
    let textosPAno = []

    for (let y = start; y <= end; y++) {
      anos_grafico.push(y); 

      const idx = val_anos.indexOf(y); 
      if (idx !== -1) {
        freq_grafico.push(val_freq[idx]); 
        ids_final.push(val_id[idx])
        textosPAno.push(val_id[idx].length)
      } else {
        freq_grafico.push(0); 
        ids_final.push(0)
        textosPAno.push(0)
      }
    }

    const itemPalavra = {};
    anos_grafico.forEach((key, index) => {
      itemPalavra[key] = freq_grafico[index];
    });

    const itemPalavra_ = {};
    anos_grafico.forEach((key, index) => { 
      itemPalavra[key] = {
        nome: wordData.palavras[Idx_Palavra].palavra,
        freq: freq_grafico[index],
        nTextos: textosPAno [index]
      }
    });

    return itemPalavra;
  }

  let arrayTodosOBJpalavras = [];
  for (let i = 0; i < wordData.palavras.length; i++) {
    arrayTodosOBJpalavras[i] = frequencia_por_anos(i); 
  }

  const stopSet = new Set(stoplist);
  const stopListOBJ = []; 
  for (let i = 0; i < wordData.palavras.length; i++) {
    const palavra = wordData.palavras[i].palavra;
    if (stopSet.has(palavra)) {
      stopListOBJ.push({
        indice: i,
        palavra: palavra,
      });
    }
  }

  const stopIndices = new Set(stopListOBJ.map((obj) => obj.indice)); 
  const start = 1846;
  const end = 2025;

  let n_palavras;
  let todosOBJpalavrasSStopwords;
  let anos_grafico = [];
  let todas_as_palavrasFreq_p_ano = [];
  for (let y = start; y <= end; y++) {
    anos_grafico.push(y);
    let lista_combinada_s_stopwords = []; 

    for (let i = 0; i < wordData.palavras.length; i++) {
      if (!stopIndices.has(i)) {
        lista_combinada_s_stopwords.push({
          indice: i,
          freq: arrayTodosOBJpalavras[i][y].freq || 0,
          nTextos: arrayTodosOBJpalavras[i][y].nTextos || 0,
          logFreqPTexto: ((arrayTodosOBJpalavras[i][y].freq)/(arrayTodosOBJpalavras[i][y].nTextos)||0)
        });
      }
    }

    console.log( Math.log(2))

    todosOBJpalavrasSStopwords = lista_combinada_s_stopwords;
    n_palavras = lista_combinada_s_stopwords.length;

    lista_combinada_s_stopwords.sort((a, b) => b.logFreqPTexto - a.logFreqPTexto);
    let maior_frequencia_do_ano = lista_combinada_s_stopwords[0]?.logFreqPTexto || 0;

    let lista_indices_com_maior_frequencia = lista_combinada_s_stopwords
      .filter((obj) => obj.logFreqPTexto === maior_frequencia_do_ano)
      .map((obj) => obj.indice); 

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

  for (let i = 0; i < todas_as_palavrasFreq_p_ano.length; i++) {
    const anoData = todas_as_palavrasFreq_p_ano[i];
    freq_grafico.push(anoData.maior_freq);

    if (anoData.indices_palavras_maior_freq.length != 0) {
      let idx = anoData.indices_palavras_maior_freq[0];
      let grupo = [];
      for (let j = 0; j < anoData.indices_palavras_maior_freq.length; j++) {
        let idxj = anoData.indices_palavras_maior_freq[j];
        grupo.push(wordData.palavras[idxj].palavra);
      }
      palavras_grafico.push(grupo.join(", "));
    } else {
      palavras_grafico.push("");
    }
  }

  let words_container = document.createElement("div");
  document.querySelector("body").appendChild(words_container);
  words_container.className += "words-container";

  let margem_ct = document.createElement("div");
  words_container.appendChild(margem_ct);
  margem_ct.className = "margem-ct"

  let title_h = document.createElement("h1");
  margem_ct.appendChild(title_h);
  title_h.className += "pesquisa-palavras-h page-title";
  title_h.innerText = `Pesquisa de palavras`;

  grafico_ct = document.createElement("div");
  margem_ct.appendChild(grafico_ct);
  grafico_ct.className = "grafico-ct";

  canvas = document.createElement("canvas");
  document.querySelector(".grafico-ct").appendChild(canvas);
  canvas.className = "grafico-palavras-populares";

  const ctx = document.querySelector(".grafico-palavras-populares");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: anos_grafico,
      datasets: [
        {
          label: "Palavras com maior frequencia em cada ano",
          data: freq_grafico,
          borderWidth: 0,
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


}

