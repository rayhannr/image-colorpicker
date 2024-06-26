import React from 'react'

const Heading: React.FC = () => (
  <>
    <h1 className="text-center bg-clip-text text-transparent bg-gradient-to-br from-cyan-400 to-sky-500 font-extrabold text-3xl md:text-4xl lg:text-6xl md:pb-2">
      Image Color Picker
    </h1>
    <h2 className="font-medium text-lg text-center text-gray-500 mt-2 w-4/5 sm:w-auto mx-auto">
      Pick a color from your image easily
    </h2>
    <h3 className="text-center text-sm xl:text-base text-gray-400 mt-1 mb-5 mx-auto w-full md:w-10/12 lg:w-8/12 xl:w-1/2">
      Upload an image from your device, click any pixel on the image to get its color and the closest{' '}
      <a
        className="text-sky-600 font-medium hover:text-gray-700"
        href="https://tailwindcss.com/docs/customizing-colors"
        target="_blank"
        rel="noreferrer"
      >
        Tailwind color
      </a>{' '}
      once it gets loaded.
    </h3>
  </>
)

export default Heading
