
let container = document.createElement("div")
document.querySelector("body").appendChild(container)
container.className = "texto-container"

let margem_ct = document.createElement("div");
container.appendChild(margem_ct);
margem_ct.className = "margem-ct"

let titulo = document.createElement("h1")
margem_ct.appendChild(titulo)
titulo.className += "titulo page-title"

let conteudo = document.createElement("div")
margem_ct.appendChild(conteudo)
conteudo.className = "texto-conteudo"

titulo.innerHTML = "Sobre"

conteudo.innerHTML = `<p>Em 1843, na cidade de Coimbra, o estudante brasileiro Antônio Gonçalves Dias compôs o poema <i>Canção do Exílio</i> como uma expressão de nostalgia pela sua pátria de origem.
                        Desde a sua publicação em 1846, a obra tem inspirado inúmeras interpretações na forma de pastiches e paródias.
                        Algumas dessas respostas enaltecem a cultura e a geografia do Brasil, outras criticam e expõem os problemas do país.
                        </p>
                        <p>Esta plataforma visa ser uma ferramenta de exploração do conjunto dos vários textos e palavras que foram escritos ao longo dos anos.</p>
                        <p><br>O ponto principal de ligação entre os poemas são as palavras que os compõem. É através das palavras que se procuram novos textos e novas palavras.</p>
                        <p>As categorias de palavras, pretendem agrupar determinadas palavras ou expressões encontradas nos textos e agrupá-las em temas específicos 
                        e compreender de que forma evolui a presença destas categorias nos textos ao longo do tempo. As categorias atualmente presentes são: locais, fauna, flora, anos e autores.</p>`