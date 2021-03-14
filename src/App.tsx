import React, { useCallback, useState, useEffect } from 'react'
import './App.css'
import './tailwind.css'

import ImageUpload from './components/ImageUpload'
import CanvasContainer from './components/CanvasContainer'

const App: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>('')
  const [color, setColor] = useState<Uint8ClampedArray>()
  
  const readFileUrl = useCallback((fileUrl: string) => {
    setImageUrl(fileUrl)
  }, [])

  useEffect(() => {
    console.log(color)
  }, [color])

  return (
    <div className="p-8 pt-16 md:p-14 md:pt-20 lg:p-16">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-center lg:h-32">
        <ImageUpload
          onUpload={readFileUrl}
          className="lg:w-5/12 xl:max-w-lg mb-4 lg:mb-0 h-full bg-white" />

        <CanvasContainer imageUrl={imageUrl} onPickColor={(pickedColor: Uint8ClampedArray) => setColor(pickedColor)} />
      </div>
    </div>
  )
}

export default App
