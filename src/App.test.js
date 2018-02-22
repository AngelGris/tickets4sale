import React from 'react'
import App from './App'
import Moment from 'moment'

import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import apis from './Api'

Enzyme.configure({ adapter: new Adapter() })

describe('<App />', () => {
    let loadShows = jasmine.createSpy('loadShows')

    beforeEach(() => {
        spyOn(apis, 'getShows').and.callFake(function(date, callback) {
            callback([{"type":"comedy","title":"beaux' stratagem, the","ticketsLeft":15,"ticketsAvailable":5,"status":"Open for sale","price":40},{"type":"comedy","title":"importance of being earnest, the","ticketsLeft":30,"ticketsAvailable":10,"status":"Open for sale","price":50},{"type":"comedy","title":"mentalists, the","ticketsLeft":30,"ticketsAvailable":10,"status":"Open for sale","price":50},{"type":"comedy","title":"play that goes wrong, the","ticketsLeft":15,"ticketsAvailable":5,"status":"Open for sale","price":50},{"type":"musical","title":"bend it like beckham the musical","ticketsLeft":15,"ticketsAvailable":5,"status":"Open for sale","price":70},{"type":"musical","title":"groundhog day","ticketsLeft":15,"ticketsAvailable":5,"status":"Open for sale","price":56},{"type":"musical","title":"les miserables","ticketsLeft":30,"ticketsAvailable":10,"status":"Open for sale","price":70},{"type":"musical","title":"let it be","ticketsLeft":15,"ticketsAvailable":5,"status":"Open for sale","price":56},{"type":"musical","title":"lion king, the ","ticketsLeft":30,"ticketsAvailable":10,"status":"Open for sale","price":70},{"type":"musical","title":"miss saigon","ticketsLeft":15,"ticketsAvailable":5,"status":"Open for sale","price":70},{"type":"musical","title":"stomp","ticketsLeft":15,"ticketsAvailable":5,"status":"Open for sale","price":70},{"type":"musical","title":"wonder.land","ticketsLeft":30,"ticketsAvailable":10,"status":"Open for sale","price":70},{"type":"drama","title":"constellations","ticketsLeft":30,"ticketsAvailable":10,"status":"Open for sale","price":40},{"type":"drama","title":"creditors","ticketsLeft":15,"ticketsAvailable":5,"status":"Open for sale","price":32},{"type":"drama","title":"curious incident of the dog in the night-time, the","ticketsLeft":30,"ticketsAvailable":10,"status":"Open for sale","price":40},{"type":"drama","title":"heresy of love, the","ticketsLeft":30,"ticketsAvailable":10,"status":"Open for sale","price":40},{"type":"drama","title":"hetty feather","ticketsLeft":30,"ticketsAvailable":10,"status":"Open for sale","price":40},{"type":"drama","title":"husbands and sons","ticketsLeft":30,"ticketsAvailable":10,"status":"Open for sale","price":40},{"type":"drama","title":"la musica","ticketsLeft":30,"ticketsAvailable":10,"status":"Open for sale","price":40},{"type":"drama","title":"les liaisons dangereuses","ticketsLeft":30,"ticketsAvailable":10,"status":"Open for sale","price":40},{"type":"drama","title":"nell gwynn","ticketsLeft":30,"ticketsAvailable":10,"status":"Open for sale","price":40},{"type":"drama","title":"number, a","ticketsLeft":30,"ticketsAvailable":10,"status":"Open for sale","price":40},{"type":"drama","title":"pericles","ticketsLeft":15,"ticketsAvailable":5,"status":"Open for sale","price":40},{"type":"drama","title":"tempest, the","ticketsLeft":30,"ticketsAvailable":10,"status":"Open for sale","price":40},{"type":"drama","title":"trial, the","ticketsLeft":30,"ticketsAvailable":10,"status":"Open for sale","price":40},{"type":"drama","title":"woman in black, the","ticketsLeft":30,"ticketsAvailable":10,"status":"Open for sale","price":40}])
        })
    })

    it('renders without crashing', () => {
        const wrapper = shallow(<App api={apis} />)
        expect(wrapper.length).toBe(1)
    })

    describe('show/hide alerts', () => {
        it('no alerts on startup', () => {
            const wrapper = shallow(<App api={apis} />)
            expect(wrapper.state().messages.error).toBe('')
            expect(wrapper.find('.alert-error').length).toBe(0)
            expect(wrapper.state().messages.notification).toBe('')
            expect(wrapper.find('.alert-success').length).toBe(0)
        })

        it('show error and no notification', () => {
            const wrapper = mount(<App api={apis} />)
            const messages = {
                error: 'No tickets left',
                notification: ''
            }
            wrapper.setState({ messages: messages})
            expect(wrapper.find('.alert-danger label').text()).toBe(messages.error)
            expect(wrapper.find('.alert-danger').length).toBe(1)
            expect(wrapper.find('.alert-success').length).toBe(0)
        })

        it('show notification and no error', () => {
            const wrapper = mount(<App api={apis} />)
            const messages = {
                error: '',
                notification: 'Sale completed'
            }
            wrapper.setState({ messages: messages})
            expect(wrapper.find('.alert-danger').length).toBe(0)
            expect(wrapper.find('.alert-success label').text()).toBe(messages.notification)
            expect(wrapper.find('.alert-success').length).toBe(1)
        })

        it('show error and notification and dismiss them', () => {
            const wrapper = mount(<App api={apis} />)
            const messages = {
                error: 'No tickets left',
                notification: 'Sale completed'
            }
            wrapper.setState({ messages: messages})
            expect(wrapper.find('.alert-danger label').text()).toBe(messages.error)
            expect(wrapper.find('.alert-danger').length).toBe(1)
            expect(wrapper.find('.alert-success label').text()).toBe(messages.notification)
            expect(wrapper.find('.alert-success').length).toBe(1)

            wrapper.find('.alert-danger button').simulate('click')
            wrapper.update()
            expect(wrapper.state().messages.error).toBe('')
            expect(wrapper.find('.alert-danger').length).toBe(0)
            expect(wrapper.find('.alert-success label').text()).toBe(messages.notification)
            expect(wrapper.find('.alert-success').length).toBe(1)

            wrapper.find('.alert-success button').simulate('click')
            wrapper.update()
            expect(wrapper.state().messages.error).toBe('')
            expect(wrapper.find('.alert-danger').length).toBe(0)
            expect(wrapper.state().messages.notification).toBe('')
            expect(wrapper.find('.alert-success').length).toBe(0)
        })
    })

    it('change date', () => {
        const wrapper = shallow(<App api={apis} />)
        const today = Moment().format('YYYY-MM-DD')
        const otherDate = '2018-02-18'

        expect(wrapper.state().date).toBe(today)
        expect(wrapper.state().shows[otherDate]).toBe(undefined)
        wrapper.instance().handleChangeDate(otherDate)
        expect(wrapper.state().date).toBe(otherDate)
        expect(wrapper.state().shows[otherDate]).not.toBe(undefined)
    })

    it ('sell tickets', () => {
        const wrapper = mount(<App api={apis} />)

        // Set a date in 10 days the future to have tickets for sale
        const date = Moment().add(10,  'd').format('YYYY-MM-DD')
        wrapper.instance().handleChangeDate(date)

        let ticketsLeft = wrapper.state().shows[date][0].ticketsLeft
        let ticketsAvailable = wrapper.state().shows[date][0].ticketsAvailable

        // 0 tickets selected
        wrapper.instance().handleSell(0, 0)
        wrapper.update()
        expect(wrapper.state().shows[date][0].ticketsLeft).toBe(ticketsLeft)
        expect(wrapper.state().shows[date][0].ticketsAvailable).toBe(ticketsAvailable)
        expect(wrapper.find('.alert-danger').length).toBe(1)
        expect(wrapper.find('.alert-success').length).toBe(0)

        // sell 1 ticket
        wrapper.instance().handleSell(0, 1)
        wrapper.update()
        expect(wrapper.state().shows[date][0].ticketsLeft).toBe(--ticketsLeft)
        expect(wrapper.state().shows[date][0].ticketsAvailable).toBe(--ticketsAvailable)
        expect(wrapper.find('.alert-danger').length).toBe(0)
        expect(wrapper.find('.alert-success').length).toBe(1)

        // trying to buy more thn available
        wrapper.instance().handleSell(0, ticketsAvailable + 1)
        wrapper.update()
        expect(wrapper.state().shows[date][0].ticketsLeft).toBe(ticketsLeft)
        expect(wrapper.state().shows[date][0].ticketsAvailable).toBe(ticketsAvailable)
        expect(wrapper.find('.alert-danger').length).toBe(1)
        expect(wrapper.find('.alert-success').length).toBe(0)
    })
})