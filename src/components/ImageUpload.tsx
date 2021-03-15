import React, { useState, useEffect, ChangeEvent } from 'react'

import UploadImage from './SVG/UploadImage'

interface Props {
    onUpload: (url: string) => void
    className: string
}

const ImageUpload: React.FC<Props> = props => {
    const [file, setFile] = useState<File>()
    const { onUpload } = props

    useEffect(() => {
        if (!file) {
            return
        }
        const fileReader: FileReader = new FileReader()
        let fileUrl: string = ''
        fileReader.onload = (event: Event) => {
            fileUrl = fileReader.result as string
            onUpload(fileUrl)
        }
        fileReader.readAsDataURL(file)
    }, [file, onUpload])

    const imagePicked = (event: ChangeEvent) => {
        let pickedFile
        const input = event.target as HTMLInputElement
        if (input.files?.length === 1) {
            pickedFile = input.files[0]
            setFile(pickedFile)
        }
    }

    const fileInput = (
        <>
            <UploadImage className="mx-auto h-12 w-12 text-light-blue-500" />
            <div className="text-sm text-center">
                <label className="relative cursor-pointer bg-transparent rounded-md font-medium focus-within:outline-none">
                    <span className="text-light-blue-500 hover:text-cyan-400">Upload Image</span>
                    <input
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept=".svg, .jpg, .jpeg, .png"
                        onChange={imagePicked} />
                </label>
            </div>
            <p className="text-xs text-gray-400">
                Please upload only .jpg, .jpeg, .png, or .svg file
            </p>
        </>
    )

    return (
        <div className={props.className}>
            <div className="flex justify-center items-center h-full border-2 border-gray-300 border-dashed rounded-md px-6 pt-5 pb-6">
                <div className="text-center relative">
                    {fileInput}
                </div>
            </div>
        </div>
    )
}

export default ImageUpload