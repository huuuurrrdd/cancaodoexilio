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
            - (ESTE!!) Colocar links nas páginas de texto para as categorias e palavras específicas
    
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

            - Colocar links nas PALAVRAS para poder aceder à sua página e TEXTOS
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
            - Acrescentar o mapa com os locais e os textos (associá-los)
            - Colocar filtros de pesquisa em "amostra" e "tabela"
                -> Ordenar por ano (crescente e decrescente) -> inspirar nas funções das palavras
                -> Ordenar por título alfabeticamente (e reverse())
                -> Ordenar por autor alfabeticamente (e reverse())

    
    */