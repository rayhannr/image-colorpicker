import React from 'react'

type Props = {
    color: string
    title: string
    caption: string
}

const ColorBox: React.FC<Props> = props => {
    return (
        <div className="inline-block">
            <p className="text-sm font-medium text-gray-900 text-center">{props.title}</p>
            <div
                style={{ backgroundColor: props.color }}
                className="w-14 h-14 rounded-md my-1 mx-auto shadow-lg border border-gray-300"></div>
            <p className="text-xs text-gray-900 text-center font-medium">{props.caption}</p>
        </div>
    )
}

export default ColorBox