import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import Moment from 'moment'
import _ from 'lodash'
import PropTypes from 'prop-types'

class ModalSellTickets extends Component {
    constructor(props) {
        super(props)

        this.state = ({
            ticketsTotal: 0
        })

        this.handleChange = this.handleChange.bind(this)
        this.handleSell = this.handleSell.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ticketsTotal: 0
        })
    }


    handleChange() {
        this.setState({
            ticketsTotal: this.props.show.price * this.refs.tickets.value
        })
    }

    handleSell() {
        this.props.onSell(parseInt(this.refs.tickets.value, 10))
    }

    render () {
        const { show, showModal, onHide } = this.props
        const date = Moment(this.props.date).format('DD/MM/YYYY')
        const { ticketsTotal } = this.state
        if (show.title === undefined) {
            return null
        }

        return (
            <Modal show={showModal} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Sell tickets</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h2>{show.title}</h2>
                        <p>Date: {date}</p>
                        <p>Tickets available: {show.ticketsAvailable}</p>
                        <p>Price: {show.price} €</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="col-sm-6">
                        Tickets: <select ref='tickets' onChange={this.handleChange}>
                            {_.range(0, show.ticketsAvailable + 1).map(value => <option key={value} value={value}>{value}</option>)}
                        </select>
                    </div>
                    <div className="col-sm-6">
                        Total: {ticketsTotal} €
                        <button style={{ marginLeft: '20px' }} onClick={this.handleSell}>Sell tickets</button>
                    </div>
                </Modal.Footer>
            </Modal>
        )
    }
}

ModalSellTickets.propTypes = {
    date: PropTypes.string,
    onHide: PropTypes.func,
    onSell: PropTypes.func,
    show: PropTypes.object.isRequired,
    showModal: PropTypes.bool
}

ModalSellTickets.defaultProps = {
    date: Moment().format('YYYY-MM-DD'),
    onHide: () => {},
    onSell: () => {},
    showModal: false
}

export default ModalSellTickets