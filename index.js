'use strict'

const fireWidth = Math.floor(window.innerWidth / 10);
const fireHeight = 36

const colorPallet = [
  'transparent',
  "#070707",
  "#1f0707",
  "#2f0f07",
  "#470f07",
  "#571707",
  "#671f07",
  "#771f07",
  "#8f2707",
  "#9f2f07",
  "#af3f07",
  "#bf4707",
  "#c74707",
  "#df4f07",
  "#df5707",
  "#df5707",
  "#d75f07",
  "#d75f07",
  "#d7670f",
  "#cf6f0f",
  "#cf770f",
  "#cf7f0f",
  "#cf8717",
  "#c78717",
  "#c78f17",
  "#c7971f",
  "#bf9f1f",
  "#bf9f1f",
  "#bfa727",
  "#bfa727",
  "#bfaf2f",
  "#b7af2f",
  "#b7b72f",
  "#b7b737",
  "#cfcf6f",
  "#dfdf9f",
  "#efefc7",
  "#ffffff"
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