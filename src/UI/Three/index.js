import React, { Component } from 'react'

import threeEntryPoint from 'Three/threeEntryPoint'

class ThreeContainer extends Component {
    componentDidMount() {
        threeEntryPoint(this.threeRootContainer)
    }

    setRef = element => (this.threeRootContainer = element)

    render() {
        return <div ref={this.setRef} />
    }
}

export default ThreeContainer
