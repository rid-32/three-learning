const animate = ({ animation, duration, timing }) => {
    let start = null

    requestAnimationFrame(function animate(timePassed) {
        if (!start) start = timePassed

        let timeFraction = timing((timePassed - start) / duration)

        if (timeFraction > 1) timeFraction = 1

        animation(timeFraction)

        if (timeFraction < 1) {
            requestAnimationFrame(animate)
        }
    })
}

export default animate
