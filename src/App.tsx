import React, { useCallback, useState, useEffect } from 'react'
import { tailwindColors, RGB } from './constants/colors'
import './tailwind.css'

import ImageUpload from './components/ImageUpload'
import CanvasContainer from './components/CanvasContainer'
import ColorBox from './components/ColorBox'

interface TailwindColor {
  key: string
  value: string
  output: string
}

const App: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>('')
  const [pickedColor, setPickedColor] = useState<RGB>()
  const [tailwindColor, setTailwindColor] = useState<TailwindColor>()

  const hexToRGB = (hex: string) => {
    const red = parseInt(hex.slice(1, 3), 16)
    const green = parseInt(hex.slice(3, 5), 16)
    const blue = parseInt(hex.slice(5, 7), 16)

    return [red, green, blue] as RGB
  }

  const getHexFromColor = (color: RGB) => {
    let hexColorCode: string = '#'
    for (const c of color) {
      hexColorCode += c.toString(16).padStart(2, '0')
    }
    return hexColorCode.toUpperCase()
  }

  const calculateColorDifference = (firstColor: RGB, secondColor: RGB) => {
    let difference: number = 0
    for (let i = 0; i < firstColor.length; i++) {
      difference += Math.abs(firstColor[i] - secondColor[i])
    }
    return difference
  }

  const getClosestTailwindColor = useCallback(() => {
    if (pickedColor) {
      let leastDifference = Number.MAX_SAFE_INTEGER
      let leastColorKey = ''
      let leastColor = ''

      for (const colorKey in tailwindColors) {
        let colorValue = hexToRGB(tailwindColors[colorKey])
        let colorDifference = calculateColorDifference(colorValue, pickedColor)

        if (colorDifference < leastDifference) {
          leastDifference = colorDifference
          leastColorKey = colorKey
          leastColor = getHexFromColor(colorValue)
        }
      }

      return { key: leastColorKey, value: leastColor, output: `${leastColorKey}: ${leastColor}` }
    }
  }, [pickedColor])

  useEffect(() => {
    if (pickedColor) {
      const closestTailwindColor = getClosestTailwindColor()
      setTailwindColor(closestTailwindColor)
    }
  }, [pickedColor, getClosestTailwindColor])

  const readFileUrl = useCallback((fileUrl: string) => {
    setImageUrl(fileUrl)
  }, [])

  const readPickedColor = (color: RGB) => {
    setPickedColor(color)
  }

  return (
    <div className="p-8 pt-16 md:p-14 md:pt-20 lg:p-16">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-center lg:h-32">
        <div className="lg:w-5/12 xl:max-w-lg">
          <ImageUpload
            onUpload={readFileUrl}
            className="w-full mb-4 lg:mb-0 h-full bg-white" />

          {pickedColor && tailwindColor &&
            <div className="mt-3 flex flex-row justify-between">
              <ColorBox
                color={getHexFromColor(pickedColor)}
                title="Picked color"
                caption={getHexFromColor(pickedColor)} />

              <ColorBox
                color={tailwindColor.value}
                title="Closest Tailwind color"
                caption={tailwindColor.output} />
            </div>
          }
        </div>

        <CanvasContainer imageUrl={imageUrl} onPickColor={readPickedColor} />
      </div>
    </div>
  )
}

export default App
