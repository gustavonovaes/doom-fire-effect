'use strict'

const fireWidth = 110;
const fireHeight = 13

const colorPallet = [
  '#040201',
  '#160803',
  '#270f05',
  '#381507',
  '#4a1c0a',
  '#5b220c',
  '#6c290e',
  '#7e2f11',
  '#8f3613',
  '#a03c15',
  '#b24317',
  '#c3491a',
  '#d5501c',
]

function start() {
  const dataStructure = createDataStructure(fireWidth, fireHeight)

  const lastColorPalletIndex = colorPallet.length - 1
  const incializedDataStructure = applyFireSource(dataStructure, fireWidth, fireHeight, lastColorPalletIndex)
  
  const canvas = document.querySelector("#canvas")

  const step = () => {
    const updatedDataStrucuture = calculateFirePropagation(incializedDataStructure, fireWidth, fireHeight)
    renderWithTable(canvas, updatedDataStrucuture, fireWidth, fireHeight)
    requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
}

function createDataStructure(fireWidth, fireHeight) {
  const totalSlots = fireWidth * fireHeight

  const arr = []
  for (let i = 0; i < totalSlots; i++) {
    arr[i] = 0
  }

  return arr
}

function applyFireSource(dataStructure, fireWidth, fireHeight, colorIndex) {
  const bottomFlameIndex = (fireWidth * fireHeight) - fireWidth

  for (let flameIndex = 0; flameIndex < fireWidth; flameIndex++) {
    dataStructure[flameIndex + bottomFlameIndex] = colorIndex
  }

  return dataStructure
}

function calculateFirePropagation(dataStructure, fireWidth, fireHeight) {
  const rowLimit = fireHeight - 1

  for (let row = 0; row < rowLimit; row++) {
    for (let column = 0; column < fireWidth; column++) {
      const flameIndex = column + (row * fireWidth)
      const belowFlameIndex = flameIndex + fireWidth
      const colorPalletIndex = dataStructure[belowFlameIndex]

      const flameDecay = Math.floor(Math.random() * 4)
      const newColorPalletIndex = colorPalletIndex - flameDecay

      const windSimulationDecay = Math.floor(Math.random() * 3)      
      const newFlameIndex = flameIndex - windSimulationDecay

      dataStructure[newFlameIndex] = newColorPalletIndex < 0 ? 0 : newColorPalletIndex
    }
  }

  return dataStructure
}

function renderWithTable(canvas, dataStructure, fireWidth, fireHeight) {
  let html = '<table cellpadding="0" cellspacing="0">'
  for (let row = 0; row < fireHeight; row++) {
    html += '<tr>'
    for (let column = 0; column < fireWidth; column++) {
      html += '<td>'

      const flameIndex = column + (row * fireWidth)
      const colorPalletIndex = dataStructure[flameIndex]

      const color = colorPallet[colorPalletIndex]

      html += `<div style="background-color: ${color}"></div>`
      // html += `<div/><span>${flameIndex}</span>${colorPalletIndex}</div>`

      html += '</td>'
    }
    html += '</tr>'
  }
  html += '</table>'

  canvas.innerHTML = html
}

document.addEventListener("DOMContentLoaded", start)