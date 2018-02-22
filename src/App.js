import React, { Component } from 'react'
import Moment from 'moment'
import { Alert } from 'react-bootstrap'
import PropTypes from 'prop-types'

import DatePickerBar from './DatePickerBar'
import Shows from './Shows'
import './App.css'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            messages: {
                'error': '',
                'notification': ''
            },
            date: Moment().format('YYYY-MM-DD'),
            shows: [],
        }

        this.dismissError = this.dismissError.bind(this)
        this.dismissNotification = this.dismissNotification.bind(this)
        this.handleChangeDate = this.handleChangeDate.bind(this)
        this.handleSell = this.handleSell.bind(this)
        this.updateShows = this.updateShows.bind(this)
    }

    componentWillMount() {
        this.loadShows(this.state.date)
    }

    dismissError() {
        let messages = this.state.messages
        messages.error = ''
        this.setState({
            messages: messages
        })
    }

    dismissNotification() {
        let messages = this.state.messages
        messages.notification = ''
        this.setState({
            messages: messages
        })
    }

    handleChangeDate(date) {
        this.setState({
            date: date
        })
        this.loadShows(date)
    }

    handleSell(index, tickets) {
        let shows = this.state.shows
        let error = ''
        let notification = ''
        tickets = parseInt(tickets, 10)

        if (tickets === 0) {
            error = 'No tickets selected'
        } else if (shows[this.state.date][index].ticketsAvailable >= tickets) {
            shows[this.state.date][index].ticketsLeft -= tickets
            shows[this.state.date][index].ticketsAvailable -= tickets
            notification = tickets + ' ticket(s) sold for "' + shows[this.state.date][index].title + '"'
        } else {
            error = 'Sell couldn\'t be completed'
        }

        this.setState({
            messages: {
                error: error,
                notification: notification
            },
            shows: shows
        })
    }

    loadShows(date) {
        if (this.state.shows[date] === undefined) {
            this.props.api.getShows(date, this.updateShows)
        }
    }

    updateShows(newShows) {
        let shows = this.state.shows
        shows[this.state.date] = newShows
        this.setState({
            shows: shows
        })
    }

    render() {
        const { messages, date } = this.state
        const shows = this.state.shows[date]
        let tablePadding = 69
        if (messages.error !== '') {
            tablePadding += 52
        }
        if (messages.notification !== '') {
            tablePadding += 52
        }

        return (
            <div>
                {messages.error !== '' && <Alert bsStyle="danger" onDismiss={this.dismissError}><label>{messages.error}</label></Alert>}
                {messages.notification !== '' && <Alert bsStyle="success" onDismiss={this.dismissNotification}><label>{messages.notification}</label></Alert>}
                <DatePickerBar date={date} onChange={this.handleChangeDate} />
                <Shows shows={shows} date={date} tablePadding={tablePadding} onSell={this.handleSell} />
            </div>
        )
    }
}

App.propTypes = {
    api: PropTypes.object.isRequired
}

export default App;
