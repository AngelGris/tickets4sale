import React, { Component } from 'react'
import ReactTable from 'react-table'
import Moment from 'moment'
import PropTypes from 'prop-types'

import 'react-table/react-table.css'
import ModalSellTickets from './ModalSellTickets'
import SellButton from './SellButton'
import './Shows.css'

class Shows extends Component {
    constructor(props) {
        super(props)

        this.state = ({
            showModal: false,
            currentShow: 0
        })

        this.handlePageChange = this.handlePageChange.bind(this)
        this.handleSell = this.handleSell.bind(this)
        this.hideSellModal = this.hideSellModal.bind(this)
        this.showSellModal = this.showSellModal.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.handlePageChange()
    }

    handlePageChange() {
        // Scroll list back to  top after loading new data
        const elements = document.getElementsByClassName('rt-tbody')
        if (elements.length > 0) {
            elements[0].scrollTop = 0
        }
    }

    handleSell(tickets) {
        this.props.onSell(this.state.currentShow, tickets)
        this.hideSellModal()
    }

    hideSellModal() {
        this.setState({
            showModal: false
        })
    }

    showSellModal(index) {
        this.setState({
            currentShow: index,
            showModal: true
        })
    }

    render() {
        const { shows, date, tablePadding } = this.props
        const { showModal, currentShow } = this.state
        let show = {}
        if (shows[currentShow] !== undefined) {
            show = shows[currentShow]
        }
        const columns = [{
            Header: 'Type',
            accessor: 'type',
            width: 100,
            filterable: true,
            Filter: ({ filter, onChange }) =>
                <select
                    onChange={event => onChange(event.target.value)}
                    style={{ width: "100%" }}
                    value={filter ? filter.value : "all"}
                >
                    <option value="">show all</option>
                    <option value="comedy">comedy</option>
                    <option value="drama">drama</option>
                    <option value="musical">musical</option>
                </select>
        }, {
            Header: 'Title',
            accessor: 'title'
        }, {
            Header: 'Tickets left',
            accessor: 'ticketsLeft',
            width: 100,
            style: { textAlign: 'right' }
        }, {
            Header: 'Tickets available',
            accessor: 'ticketsAvailable',
            width: 150,
            style: { textAlign: 'right' }
        }, {
            Header: 'Status',
            accessor: 'status',
            width: 150,
            style: { textAlign: 'center' }
        }, {
            Header: 'Price',
            accessor: 'price',
            width: 100,
            style: { textAlign: 'right' }
        }, {
            Header: 'Sell tickets',
            width: 100,
            Cell: row => (<SellButton onClick={() => this.showSellModal(row.index)} show={row.row.ticketsAvailable > 0} />)
        }]

        return (
            <div style={{ height: 'calc(100% - ' + tablePadding + 'px)'}}>
                <ReactTable data={shows} columns={columns} onPageChange={this.handlePageChange} />
                {shows !== undefined && <ModalSellTickets show={show} showModal={showModal} date={date} onSell={this.handleSell} onHide={this.hideSellModal} />}
            </div>
        )
    }
}

Shows.propTypes = {
    date: PropTypes.string,
    onSell: PropTypes.func,
    shows: PropTypes.array,
    tablePadding: PropTypes.number
}

Shows.defaultProps = {
    date: Moment().format('YYYY-MM-DD'),
    onSell: () => {},
    shows: [],
    tablePadding: 0
}

export default Shows