

// const map = L.map('map', {
//     center: [-29.50, 145],
//     zoom: 3.5
//   });
  
//   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);
  
//   // pequeno teste com dados do ficheiro
//   const marker1 = L.marker([-37.699450, 176.279420]).addTo(map);




function fetchData(){

  let textData

  fetch("./json/textos_coordenadas_geograficas.json")
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
  const marker2 = L.marker([39.6621648, -8.1353519]).addTo(map); // com coordenada "normal" funciona!!
  const marker3 = L.marker(textData[4-1].coordenadas_geograficas[1].replace("(", "[").replace(")","]")).addTo(map); //n funciona!!

  //teste para id = 19-1

  const marker = []
  const marca = []

  console.log(textData[19-1].coordenadas_geograficas[0]) // funcionaa!!
  console.log(textData[19-1].coordenadas_geograficas[0].replace("(", "[").replace(")","]")) // funcionaaa!!!

  // for (i=0; i< textData[19-1].coordenadas_geograficas.length; i++){
  //   //n funcional:
  //   //marca[i] = textData[19-1].coordenadas_geograficas[i].replace("(", "[").replace(")","]")
  //   //marker[i] = L.marker(marca[i]).addTo(map);

  //   //console.log(textData[21-1].coordenadas_geograficas)
  //   //console.log(textData[19-1].coordenadas_geograficas[i].replace("(", "[").replace(")","]"))// funcionall

  // }

    //   // /*********** Display coordenada **************/
    // let cord_container = document.createElement("div")
    // document.querySelector("body").appendChild(cord_container)
    // cord_container.className += "cord-container"
    // cord_container.innerHTML = `<p>${textData[20].id}</p> <p></p>`


    //funcionaa!!
    //console.log( `O id: ${textData[20].id}, coordenadas:  ${textData[5].coordenadas_geograficas[1]}`)

}

