import React, { Component } from 'react'

import './styles.scss'

const createDiagram = (canvas, data) => {
    const ctx = canvas.getContext('2d')

    canvas.width = 268
    canvas.height = 268

    ctx.beginPath()
    ctx.arc(134, 134, 114, 0, Math.PI * 2, true)
    ctx.shadowBlur = 20
    ctx.shadowColor = 'rgba(0, 0, 0, 0.1)'
    ctx.fillStyle = '#FFFFFF'
    ctx.fill()
    ctx.closePath()

    ctx.beginPath()
    ctx.arc(134, 134, 70, 0, Math.PI * 2, true)
    ctx.shadowBlur = 0
    ctx.shadowColor = 'transparent'
    ctx.lineWidth = 28
    ctx.strokeStyle = '#F2F2F2'
    ctx.stroke()
    ctx.closePath()

    data.reduce((acc, { sector, color }) => {
        const endAngle = sector * 2 * Math.PI + acc

        ctx.beginPath()
        ctx.strokeStyle = color
        ctx.arc(134, 134, 86, acc, endAngle, false)
        ctx.stroke()
        ctx.closePath()

        return endAngle
    }, (3 / 2) * Math.PI)
}

class App extends Component {
    static defaultProps = {
        data: [
            {
                sector: 2 / 32,
                color: '#ADE3FC',
            },
            {
                sector: 28 / 32,
                color: '#5AC6F8',
            },
        ],
    }

    setRef = element => (this.canvas = element)

    componentDidMount() {
        createDiagram(this.canvas, this.props.data)
    }

    render() {
        return <canvas ref={this.setRef}>Diagram</canvas>
    }
}

export default App
