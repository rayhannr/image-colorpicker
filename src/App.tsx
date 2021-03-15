import React, { useCallback, useState, useEffect } from 'react'

import { RGB, TailwindColor } from './constants/colors'
import { getClosestTailwindColor, getHexFromColor } from './util/colors'
import './tailwind.css'

import ImageUpload from './components/ImageUpload'
import CanvasContainer from './components/CanvasContainer'
import ColorBox from './components/ColorBox'
import LinkToRepo from './components/LinkToRepo'
import Heading from './components/Heading'

const App: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>('')
  const [pickedColor, setPickedColor] = useState<RGB>()
  const [tailwindColor, setTailwindColor] = useState<TailwindColor>()

  useEffect(() => {
    if (pickedColor) {
      const closestTailwindColor = getClosestTailwindColor(pickedColor)
      setTailwindColor(closestTailwindColor)
    }
  }, [pickedColor])

  const readFileUrl = useCallback((fileUrl: string) => {
    setImageUrl(fileUrl)
  }, [])

  const readPickedColor = (color: RGB) => {
    setPickedColor(color)
  }

  return (
    <>
      <LinkToRepo />
      <div className="p-8 pt-16 md:p-14 md:pt-20 lg:p-16">
        <Heading />

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-center lg:h-32">
          <div className="lg:w-5/12 xl:max-w-lg">
            <ImageUpload
              onUpload={readFileUrl}
              className="w-full mb-4 lg:mb-0 h-full bg-white" />

            {pickedColor && tailwindColor &&
              <div className="my-4 flex flex-row justify-between">
                <ColorBox
                  color={getHexFromColor(pickedColor)}
                  title="Picked color"
                  caption={getHexFromColor(pickedColor)} />

                <ColorBox
                  color={tailwindColor.value}
                  title="Closest Tailwind color"
                  caption={`${tailwindColor.key}: ${tailwindColor.value}`} />
              </div>
            }
          </div>

          {imageUrl && <CanvasContainer imageUrl={imageUrl} onPickColor={readPickedColor} />}
        </div>
      </div>
    </>
  )
}

export default App
