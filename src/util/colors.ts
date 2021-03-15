import { RGB, tailwindColors } from '../constants/colors'

export const hexToRGB = (hex: string) => {
  const red = parseInt(hex.slice(1, 3), 16)
  const green = parseInt(hex.slice(3, 5), 16)
  const blue = parseInt(hex.slice(5, 7), 16)

  return [red, green, blue] as RGB
}

export const getHexFromColor = (color: RGB) => {
  let hexColorCode: string = '#'
  for (const c of color) {
    hexColorCode += c.toString(16).padStart(2, '0')
  }
  return hexColorCode.toUpperCase()
}

export const calculateColorDifference = (firstColor: RGB, secondColor: RGB) => {
  let difference: number = 0
  for (let i = 0; i < firstColor.length; i++) {
    difference += Math.abs(firstColor[i] - secondColor[i])
  }
  return difference
}

export const getClosestTailwindColor = (pickedColor: RGB) => {
  if (pickedColor) {
    let leastDifference = Number.MAX_SAFE_INTEGER
    let leastColorKey = ''
    let leastColorValue = ''

    for (const colorKey in tailwindColors) {
      let tailwindColor = hexToRGB(tailwindColors[colorKey])
      let colorDifference = calculateColorDifference(tailwindColor, pickedColor)

      if (colorDifference < leastDifference) {
        leastDifference = colorDifference
        leastColorKey = colorKey
        leastColorValue = getHexFromColor(tailwindColor)
      }
    }

    return { key: leastColorKey, value: leastColorValue, output: `${leastColorKey}: ${leastColorValue}` }
  }
}