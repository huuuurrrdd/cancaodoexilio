function fetchData(){
    let wordData, textData, stoplist

    //dicionario json
    fetch("./Dict_palavras_lemas_v0004.json")
        .then(response => {
            if(!response.ok){ // menssagem de erro
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json()
        })
        .then(data => {
            wordData = data;
            return fetch("./t4_textos_loc_fauna_flora.json") // fetch json dos textos
        })
        .then(response => { // mwensagem de erro
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json()
        })
         .then((data) => {
            textData = data; // guarda json dos lemas
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
            displayData(wordData, textData, stoplist) //funcao com os 2 jsons
        })
        .catch(error => console.error('Failed to fetch data', error))

}

fetchData()

function displayData(wordData, textData, stoplist){

    /******************  Contentor geral  *******************/
    let textos_container = document.createElement("div")
    document.querySelector("body").appendChild(textos_container)
    textos_container.className = "textos-container"

    let margem_ct = document.createElement("div");
    textos_container.appendChild(margem_ct);
    margem_ct.className = "margem-ct"

    /****************  Título de página  ******************/
    page_title = document.createElement("h1")
    margem_ct.appendChild(page_title)
    page_title.className += "page-title pesquisa-textos-h"
    page_title.innerHTML = "Mapa"

    div_textos = document.createElement("div")
    textos_container.appendChild(div_textos)
    div_textos.className += "div-textos div-textos-display"

    function displayMapa(){
        div_textos.innerHTML = ""
        //div_textos.innerText = "click!! Mapa"

        //div para mapa
        let divMap = document.createElement("div")
        div_textos.appendChild(divMap)
        divMap.id = "map"

        const map = L.map("map", {
            center: [22.5, -20,5],
            zoom: 2.5,
        });


        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        



        ///////////////  Array de coordenadas  ////////////////
        const objListaCoord = []
        const coordMap = new Map() // array: [(coord, nomes: [array de nomes]), (...)]
        /*
        Objeto mapa:
        -> key-value pairs 
        -> remembers the original insertion order of the keys
        */

        //iteração sobre cada item 
        textData.forEach(item => {
            const id = item.id
            const locais = item.categorias.locais.locais_limpos
            const coords = item.categorias.locais.coordenadas_geograficas


            // iteração sobre cada localização e coordenada correspondente
            locais.forEach((local, index) => {
                const coord = coords[index]
                const coordKey = JSON.stringify(coord) // usa string key para mapa

                // se coordenada não existe, cria
                if(!coordMap.has(coordKey)){ // 
                    coordMap.set(coordKey, {
                        coordenada: coord,
                        nomes: []
                    })
                }

                //descobre se este 'nome' já existe para a coordenada
                const coordObj = coordMap.get(coordKey)
                let nomeObj = coordObj.nomes.find(n => n.nome === local)

                // se nome não existe, cria
                if(!nomeObj){
                    nomeObj = {
                        nome: local,
                        textos: []
                    }
                    coordObj.nomes.push(nomeObj)
                }

                // adiciona id ao array de textos se não estiver la
                if(!nomeObj.textos.includes(id)){
                    nomeObj.textos.push(id)
                }
            })
        })

        // Converte mapa para array
        coordMap.forEach(value => {

            // ordena nomes (primeiro por nTextos (des) depois AZ)
            value.nomes.sort((a, b) => {
                if(b.textos.length !== a.textos.length){
                return b.textos.length - a.textos.length // desc por numero de textos
                } 
                return a.nome.localeCompare(b.nome) // alfabetica se igual
            })

            // Calcula o total de textos para a coordenada
            const uniqueTextos = new Set()
            value.nomes.forEach(nomeObj => {
                nomeObj.textos.forEach(id => uniqueTextos.add(id))
            })
            value.nTextos = uniqueTextos.size

            objListaCoord.push(value)
        })

        //console.log(objListaCoord) // funciona!!
///////////////////////////////////////////////////////////////////////////////////////

        //*******  Escala do mapa  ********/        
        L.control.scale({ // adicioa a escala em baixo
            metric: true,
            imperial: false
        }).addTo(map)

        //*******  Div para display de informações  ********/  
        const InfoControl = L.Control.extend({
            onAdd: function(map) {
                const div = L.DomUtil.create('div', 'info-control')
                div.innerHTML = '<div class = "info-content-map">Clica sobre um icon</div>'
                div.style.backgroundColor = "white"
                div.style.padding = "20px"
                div.style.display = "block"
                L.DomEvent.disableClickPropagation(div);
                L.DomEvent.disableScrollPropagation(div);
                return div
            }
        })

        //adiciona control ao mapa
        const infoControl = new InfoControl({position: 'topright'})
        infoControl.addTo(map)


        /*********  ICON DO MAPA  **********/
        var leafletIcon = L.icon ({
            iconUrl: './imagens/m2.svg',
            shadowUrl:'./imagens/s6.png',
            iconSize: [25, 35],
            iconAnchor: [12.5,35],
            // shadowAnchor:[150/2, 171/2], // icon lateral
            // shadowSize:[341/2, 312/2]
            shadowAnchor:[7, 30], // icon svg
            shadowSize:[40/1.5, 43/1.5],
            popupAnchor: [2, -30]
        })

        // com marker
        const marker = [];
        const circ = []
        for(let i = 0; i < objListaCoord.length; i++){
          // coordenadas
          let lat = get_latitude(objListaCoord[i].coordenada)
          let lon = get_longitude(objListaCoord[i].coordenada)

          let nome_original = objListaCoord[i].nomes[0].nome
          let nome = titleCase(nome_original, stoplist)

          // info textos:
          let infoTextos = []
       

          // para cada nome
          for(let j = 0; j < objListaCoord[i].nomes.length; j++){
            let nome_original = objListaCoord[i].nomes[j].nome // nome atual
            let nome = titleCase(nome_original, stoplist)
            let id_textospnome = objListaCoord[i].nomes[j].textos // array de ids

            let infoTextpnome = []

            //percorre cada textos do nome
            for(let l = 0; l < objListaCoord[i].nomes[j].textos.length; l++){
                let id = id_textospnome[l]
                let titulo = textData.find(x => x.id === id).title
                let autor = textData.find(x => x.id === id).author
                let ano = textData.find(x => x.id === id).date_of_publication

                infoTextpnome.push({
                    id: id,
                    titulo: titulo,
                    autor: autor,
                    ano: ano
                })
            }

            infoTextos.push({
                nome_original:nome_original,
                nome:nome,
                textos: infoTextpnome
            })
          }

          /************************  Opção marker  ******************************/
          marker[i] = L.marker([lat, lon], {
            icon:leafletIcon,
            title: nome,
        })
            .bindPopup(
            `<a href="p_categoria_especifica.html?categoria=Locais&especifica=${nome_original}">${nome}</a>  (${objListaCoord[i].nTextos})`
            )

           marker[i].on("click", () => {
                textosLocais()
            })

          /************************  Opção circulos  ******************************/
            let nTextos = objListaCoord[i].nTextos + 2

            circ[i] = L.circle([lat, lon], {
                color: "#223F29",
                fillColor: '#223f29a4',
                fillOpacity: 1,
                radius: 9000*nTextos,
                title: 'lala',
            })
                .bindPopup(`<a href="p_categoria_especifica.html?categoria=Locais&especifica=${nome_original}">${nome}</a> (${objListaCoord[i].nTextos})`)


            circ[i].on("click", () => {
                textosLocais()
            })


            function textosLocais() {
                const controlDiv = document.querySelector(".info-control")
                controlDiv.style.display = 'block'
                let nTextos = objListaCoord[i].nTextos + 2

                //gerar html para todos os nomes e seus textos
                let htmlContent = ''

                infoTextos.forEach(nomeObj => {
                    htmlContent += `<h3><a href="p_categoria_especifica.html?categoria=Locais&especifica=${nome_original}">${nomeObj.nome}</a></h3>`

                    htmlContent+= `<div class = "scrollable scrollable-${nomeObj.nome_original.replace(" ", "-")}">`

                    nomeObj.textos.forEach(texto => {
                        htmlContent += `<p> <a href= 'index.html?id=${texto.id}'> ${texto.titulo} </a>, 
                                            <a href= 'p_categoria_especifica.html?categoria=Autores&especifica=${texto.autor}'> ${texto.autor} </a>, 
                                            <a href= 'p_categoria_especifica.html?categoria=Anos&especifica=${texto.ano}'> ${texto.ano} </a></p>`
                    })

                    htmlContent+= `</div>`
                })

                document.querySelector(".info-content-map").innerHTML = htmlContent
            }

        }

        /************************  Criar grupo de layers  ******************************/
        let GMarker = L.layerGroup(marker)
        let GCirc = L.layerGroup(circ)

        let overlayMaps = {
            "Icones" : GMarker,
            "Circulos": GCirc
        }

        L.control.layers(null, overlayMaps).addTo(map)
        GMarker.addTo(map)


        function get_latitude(element) {
            elemento_limpo = element.replace("(", "").replace(")", "");
            latitude = elemento_limpo.split(", ")[0];
            return latitude;
        }

        function get_longitude(element) {
            elemento_limpo = element.replace("(", "").replace(")", "");
            longitude = elemento_limpo.split(", ")[1];
            return longitude;
        }
    }

    displayMapa()

}