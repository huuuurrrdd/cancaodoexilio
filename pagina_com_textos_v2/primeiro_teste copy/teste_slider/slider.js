
const rangevalue = document.querySelector(".slider .price-slider")
const rangeInputvalue = document.querySelectorAll(".range-input input")

//estabelece price gap
let priceGap = 500

//Adiciona event listners a elemetos de price-input
const priceInputvalue = document.querySelectorAll(".price-input input")

//funcao para atualizar a barra verde
function updateSlider(){
    let minVal = parseInt(rangeInputvalue[0].value)
    let maxVal = parseInt(rangeInputvalue[1].value)

    rangevalue.style.left = `${(minVal / rangeInputvalue[0].max) * 100}%`
    rangevalue.style.right = `${100 - (maxVal / rangeInputvalue[1].max) * 100}%`
}

//inicializa o slider
updateSlider()

for(let i = 0; i < priceInputvalue.length; i++){

    priceInputvalue[i].addEventListener("input", e => {

        //parse valores min e max do input range
        let minp = parseInt(priceInputvalue[0].value)
        let maxp = parseInt(priceInputvalue[1].value)
        let diff = maxp - minp

        if(minp < 0){
            alert("minimo tem de ser maior de 0")
            priceInputvalue[0].value = 0
            minp = 0
        }

        //valida os valores de input
        if(maxp > 10000){
            alert("valor maximo é menor que 10000")
            priceInputvalue[1].value = 10000
            maxp = 10000
        }

        if(minp > maxp - priceGap){
            priceInputvalue[0].value = maxp - priceGap
            minp = maxp - priceGap

            if(minp < 0){
                priceInputvalue[0].value = 0
                minp = 0
            }
        }

        //verifica se "price gap" é atingido e max está dentro da range
        if(diff >= priceGap && maxp <= rangeInputvalue[1].max){
            if(e.target.className === "min-input"){
                rangeInputvalue[0].value = minp;
            } else {
                rangeInputvalue[1].value = maxp
            }
            updateSlider()
        }
    })

    // adiciona event listners a elementos input range
    for(let i = 0; i < rangeInputvalue.length; i++){ //aquuii a vw
        rangeInputvalue[i].addEventListener("input", e => {
            let minVal = parseInt(rangeInputvalue[0].value)
            let maxVal = parseInt(rangeInputvalue[1].value)

            let diff = maxVal - minVal

            // verifica se "price gap" excedeu
            if(diff < priceGap){
                //verifica se input está em min range
                if(e.target.className === "min-range"){
                    rangeInputvalue[0].value = maxVal - priceGap
                } else {
                    rangeInputvalue[1].value = minVal + priceGap
                }
            } else {
                //atualiza inputs de preço e progresso de range
                priceInputvalue[0].value = minVal
                priceInputvalue[1].value = maxVal
                updateSlider()
            }
        })
    }
}