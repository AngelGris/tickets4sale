import React, { Component } from 'react'
import DatePicker from 'react-date-picker'
import Moment from 'moment'
import { Well } from 'react-bootstrap'
import PropTypes from 'prop-types'

import './DatePickerBar.css'

class DatePickerBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            date: new Date()
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(date) {
        this.setState({
            date: date
        })
        this.props.onChange(Moment(date).format('YYYY-MM-DD'))
    }

    render() {
        const { date } = this.state

        return (
            <Well>
                Show date:
                <DatePicker value={date} onChange={this.handleChange} />
            </Well>
        )
    }
}

DatePickerBar.propTypes = {
    date: PropTypes.string,
    onChange: PropTypes.func
}

DatePickerBar.defaultProps = {
    date: Moment().format('YYYY-MM-DD'),
    onChange: () => {}
}

export default DatePickerBar