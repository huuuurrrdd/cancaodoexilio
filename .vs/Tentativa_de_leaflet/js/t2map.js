

const map = L.map('map', {
    center: [-29.50, 145],
    zoom: 3.5
  });
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);
  
  // pequeno teste com dados do ficheiro
  const marker1 = L.marker([-37.699450, 176.279420]).addTo(map);




function fetchData(){

  let textData

  fetch("./json/pagina_com_textos/primeiro_teste/textos_coordenadas_geograficas.json")
    .then(response => {
      if(!response.ok){ // mensagem de erro
        throw new Error(`HTTP error! Status ${response.status}`)
      }
      return response.json()
    })
    .then(data => {
      textData = data

      //funcao para aceder aos dados:
      displayData(textData)
    })
    .catch(error => console.error("Falha em fetch data", error))

}

fetchData()

function displayData(textData){



const map = L.map('map', {
    center: [-29.50, 145],
    zoom: 3.5
  });
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);
  
  // pequeno teste com dados do ficheiro
  const marker1 = L.marker([-37.699450, 176.279420]).addTo(map);

    //   // /*********** Display coordenada **************/
    // let cord_container = document.createElement("div")
    // document.querySelector("body").appendChild(cord_container)
    // cord_container.className += "cord-container"
    // cord_container.innerHTML = `<p>${textData[20].id}</p> <p></p>`
    console.log( `O id: ${textData[20].id}, coordenadas:  ${textData[20].coordenadas_geograficas}`)

}

