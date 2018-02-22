import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SellButton extends Component {
    render() {
        const { onClick, show } = this.props

        if (!show) {
            return null
        }

        return (
            <button className="btn" onClick={onClick}>Sell</button>
        )
    }
}

SellButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    show: PropTypes.bool
}

SellButton.defaultProps = {
    show: true
}

export default SellButton