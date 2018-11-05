import SceneManager from './SceneManager'

const createCanvas = (document, container) => {
    const canvas = document.createElement('canvas')

    container.appendChild(canvas)

    return canvas
}

const resizeCanvas = config => {
    const { canvas, sceneManager } = config

    canvas.style.width = '100%'
    canvas.style.height = '100%'

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    sceneManager.onWindowResize()
}

const bindEventListeners = config => {
    resizeCanvas.bind(null, config)

    window.onresize = resizeCanvas

    resizeCanvas()
}

const render = ({ sceneManager }) => {
    requestAnimationFrame(render)

    sceneManager.update()
}

const threeEntryPoint = container => {
    const canvas = createCanvas(document, container)
    const sceneManager = new SceneManager(canvas)

    const config = { canvas, sceneManager }

    bindEventListeners(config)
    render(config)
}

export default threeEntryPoint
