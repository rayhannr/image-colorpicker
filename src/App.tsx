import React, { useCallback, useState, useEffect, useRef } from 'react'

import { RGB, TailwindColor } from './constants/colors'
import { getClosestTailwindColor, getHexFromColor } from './util/colors'
import './tailwind.css'

import ImageUpload from './components/ImageUpload'
import CanvasContainer from './components/Canvas'
import ColorBox from './components/ColorBox'
import LinkToRepo from './components/LinkToRepo'
import Heading from './components/Heading'
import Spinner from './components/Spinner'

const App: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [pickedColor, setPickedColor] = useState<RGB>()
  const [tailwindColor, setTailwindColor] = useState<TailwindColor>()

  const containerRef = useRef<HTMLDivElement>(null)

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

  const readLoadingState = useCallback((loading: boolean) => {
    setIsLoading(loading)
  }, [])

  return (
    <>
      <LinkToRepo />
      <div className="p-8 pt-16 md:p-14 md:pt-20 lg:p-16">
        <Heading />

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-center lg:h-32">
          <div className="lg:w-5/12 xl:max-w-lg">
            <ImageUpload
              onUpload={readFileUrl}
              onLoading={readLoadingState}
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

          {imageUrl &&
            <div ref={containerRef} className="relative rounded-md lg:w-7/12 xl:max-w-4xl lg:ml-4 xl:ml-10 flex items-center justify-center">
              {isLoading ? <Spinner /> : <CanvasContainer container={containerRef} imageUrl={imageUrl} onPickColor={readPickedColor} />}
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default App
