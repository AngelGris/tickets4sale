import React from 'react'
import PropTypes from 'prop-types'

function SellButton(props) {
    const { onClick, show } = props

    if (!show) {
        return null
    }

    return (
        <button className="btn" onClick={onClick}>Sell</button>
    )
}

SellButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    show: PropTypes.bool
}

SellButton.defaultProps = {
    show: true
}

export default SellButton