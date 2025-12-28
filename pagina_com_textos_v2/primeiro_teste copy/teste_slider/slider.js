
const rangevalue = document.querySelector(".slider .price-slider")
const rangeInputvalue = document.querySelectorAll(".range-input input")
const minTooltip = document.querySelector(".min-tooltip")
const maxTooltip = document.querySelector(".max-tooltip")

//estabelece price gap
let priceGap = 500
let minTimeout, maxTimeout

//Adiciona event listners a elementos de price-input
const priceInputvalue = document.querySelectorAll(".price-input input")

//funcao para atualizar a barra verde
function updateSlider(){
    let minVal = parseInt(rangeInputvalue[0].value)
    let maxVal = parseInt(rangeInputvalue[1].value)

    rangevalue.style.left = `${(minVal / rangeInputvalue[0].max) * 100}%`
    rangevalue.style.right = `${100 - (maxVal / rangeInputvalue[1].max) * 100}%`

    //atualizar posicao e valor de tooltips
    updateTooltipPosition(minTooltip, minVal, rangeInputvalue[0].max)
    updateTooltipPosition(maxTooltip, maxVal, rangeInputvalue[1].max)
    
    minTooltip.textContent = minVal
    maxTooltip.textContent = maxVal
}

function updateTooltipPosition(tooltip, value, max){
    const percentage = (value / max) * 100
    tooltip.style.left = `${percentage}%`
}

//Mostrar tooltip
function showTooltip(tooltip){
    clearTimeout(tooltip === minTooltip ? minTimeout : maxTimeout)
    tooltip.classList.add('show')
}

//Esconder tooltip após delay
function hideTooltip(tooltip){  // ← CORRIGIDO: faltava o parâmetro
    if(tooltip === minTooltip){
        minTimeout = setTimeout(() => tooltip.classList.remove('show'), 1000)
    } else {
        maxTimeout = setTimeout(() => tooltip.classList.remove('show'), 1000)
    }
}

//inicializa o slider
updateSlider()

// event listeners para range inputs
rangeInputvalue[0].addEventListener("mousedown", () => showTooltip(minTooltip))
rangeInputvalue[0].addEventListener("touchstart", () => showTooltip(minTooltip))

rangeInputvalue[1].addEventListener("mousedown", () => showTooltip(maxTooltip))
rangeInputvalue[1].addEventListener("touchstart", () => showTooltip(maxTooltip))

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
            alert("valor maximo tem de ser menor que 10000")
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
                rangeInputvalue[0].value = minp
            } else {
                rangeInputvalue[1].value = maxp
            }
            updateSlider()
        }
    })
}  

// adiciona event listeners a elementos input range
for(let i = 0; i < rangeInputvalue.length; i++){
    rangeInputvalue[i].addEventListener("input", e => {
        let minVal = parseInt(rangeInputvalue[0].value)
        let maxVal = parseInt(rangeInputvalue[1].value)
        let diff = maxVal - minVal

        // Mostrar tooltip correspondente
        if(e.target.className === "min-range"){
            showTooltip(minTooltip)
        } else {
            showTooltip(maxTooltip)
        }

        // verifica se "price gap" excedeu
        if(diff < priceGap){
            //verifica se input está em min range
            if(e.target.className === "min-range"){
                rangeInputvalue[0].value = maxVal - priceGap
            } else {
                rangeInputvalue[1].value = minVal + priceGap
            }
        }
        
        //atualiza inputs de preço e progresso de range
        priceInputvalue[0].value = rangeInputvalue[0].value
        priceInputvalue[1].value = rangeInputvalue[1].value
        updateSlider()
    })

    // Esconder tooltip ao soltar
    rangeInputvalue[i].addEventListener("mouseup", (e) => {
        if(e.target.className === "min-range"){
            hideTooltip(minTooltip)
        } else {
            hideTooltip(maxTooltip)
        }
    })

    rangeInputvalue[i].addEventListener("touchend", (e) => {
        if(e.target.className === "min-range"){
            hideTooltip(minTooltip)
        } else {
            hideTooltip(maxTooltip)
        }
    })
}