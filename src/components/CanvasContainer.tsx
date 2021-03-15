import React, { useEffect, useRef } from 'react'

import { RGB } from '../constants/colors'

interface Props {
    imageUrl: string
    onPickColor: (color: RGB) => void
}

const CanvasContainer: React.FC<Props> = props => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const imageRef = useRef<HTMLImageElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const { imageUrl } = props

    useEffect(() => {
        if (imageUrl) {
            const canvas: HTMLCanvasElement = canvasRef.current!
            const context: CanvasRenderingContext2D = canvas.getContext('2d')!
            
            const image: HTMLImageElement = imageRef.current!
            const aspectRatio: number = image.width / image.height
            const containerWidth: number = containerRef.current!.getBoundingClientRect().width

            canvas.width = Math.min(image.width, containerWidth)
            canvas.height = Math.min(image.height, containerWidth / aspectRatio)

            if (canvas.height > window.innerHeight) {
                canvas.height = window.innerHeight - 100
                canvas.width = canvas.height * aspectRatio
            }
            context.drawImage(image, 0, 0, canvas.width, canvas.height)
        }
    }, [imageUrl])

    const pickColor = (event: any) => {
        if (imageUrl) {
            const canvas: HTMLCanvasElement = canvasRef.current!
            const context: CanvasRenderingContext2D = canvas.getContext('2d')!

            const canvasBounding = canvas.getBoundingClientRect()
            const xCoord: number = Math.round(event.clientX - canvasBounding.left)
            const yCoord: number = Math.round(event.clientY - canvasBounding.top)

            const pickedColor: Uint8ClampedArray = context.getImageData(xCoord, yCoord, 1, 1).data
            const red: number = pickedColor[0]
            const green: number = pickedColor[1]
            const blue: number = pickedColor[2]
            const rgb: RGB = [red, green, blue]
            props.onPickColor(rgb)
        }
    }

    return (
        <div ref={containerRef} className="relative rounded-md lg:w-7/12 xl:max-w-4xl lg:ml-4 xl:ml-10">
            <canvas ref={canvasRef} className="mx-auto pb-10" style={{ cursor: imageUrl ? 'crosshair' : 'auto' }} onClick={pickColor}></canvas>
            <img src={props.imageUrl} className="hidden" ref={imageRef} alt="" />
        </div>
    )
}

export default CanvasContainer