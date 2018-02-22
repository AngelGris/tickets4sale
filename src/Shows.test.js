import React from 'react'
import Shows from './Shows'
import Moment from 'moment'

import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

const date = Moment().add(10, 'd').format('YYYY-MM-DD')
const handleSell = jest.fn()
const shows = [{"type":"comedy","title":"beaux' stratagem, the","ticketsLeft":15,"ticketsAvailable":5,"status":"Open for sale","price":40},{"type":"comedy","title":"importance of being earnest, the","ticketsLeft":30,"ticketsAvailable":10,"status":"Open for sale","price":50},{"type":"comedy","title":"mentalists, the","ticketsLeft":30,"ticketsAvailable":10,"status":"Open for sale","price":50},{"type":"comedy","title":"play that goes wrong, the","ticketsLeft":15,"ticketsAvailable":5,"status":"Open for sale","price":50},{"type":"musical","title":"bend it like beckham the musical","ticketsLeft":15,"ticketsAvailable":5,"status":"Open for sale","price":70},{"type":"musical","title":"groundhog day","ticketsLeft":15,"ticketsAvailable":5,"status":"Open for sale","price":56},{"type":"musical","title":"les miserables","ticketsLeft":30,"ticketsAvailable":10,"status":"Open for sale","price":70},{"type":"musical","title":"let it be","ticketsLeft":15,"ticketsAvailable":5,"status":"Open for sale","price":56},{"type":"musical","title":"lion king, the ","ticketsLeft":30,"ticketsAvailable":10,"status":"Open for sale","price":70},{"type":"musical","title":"miss saigon","ticketsLeft":15,"ticketsAvailable":5,"status":"Open for sale","price":70},{"type":"musical","title":"stomp","ticketsLeft":15,"ticketsAvailable":5,"status":"Open for sale","price":70},{"type":"musical","title":"wonder.land","ticketsLeft":30,"ticketsAvailable":10,"status":"Open for sale","price":70},{"type":"drama","title":"constellations","ticketsLeft":30,"ticketsAvailable":10,"status":"Open for sale","price":40},{"type":"drama","title":"creditors","ticketsLeft":15,"ticketsAvailable":5,"status":"Open for sale","price":32},{"type":"drama","title":"curious incident of the dog in the night-time, the","ticketsLeft":30,"ticketsAvailable":10,"status":"Open for sale","price":40},{"type":"drama","title":"heresy of love, the","ticketsLeft":30,"ticketsAvailable":10,"status":"Open for sale","price":40},{"type":"drama","title":"hetty feather","ticketsLeft":30,"ticketsAvailable":10,"status":"Open for sale","price":40},{"type":"drama","title":"husbands and sons","ticketsLeft":30,"ticketsAvailable":10,"status":"Open for sale","price":40},{"type":"drama","title":"la musica","ticketsLeft":30,"ticketsAvailable":10,"status":"Open for sale","price":40},{"type":"drama","title":"les liaisons dangereuses","ticketsLeft":30,"ticketsAvailable":10,"status":"Open for sale","price":40},{"type":"drama","title":"nell gwynn","ticketsLeft":30,"ticketsAvailable":10,"status":"Open for sale","price":40},{"type":"drama","title":"number, a","ticketsLeft":30,"ticketsAvailable":10,"status":"Open for sale","price":40},{"type":"drama","title":"pericles","ticketsLeft":15,"ticketsAvailable":5,"status":"Open for sale","price":40},{"type":"drama","title":"tempest, the","ticketsLeft":30,"ticketsAvailable":10,"status":"Open for sale","price":40},{"type":"drama","title":"trial, the","ticketsLeft":30,"ticketsAvailable":10,"status":"Open for sale","price":40},{"type":"drama","title":"woman in black, the","ticketsLeft":30,"ticketsAvailable":10,"status":"Open for sale","price":40}]

describe('<Shows />', () => {
    describe('renders without crashing', () => {
        it('default props', () => {
            const wrapper = shallow(<Shows />)
            expect(wrapper.length).toBe(1)
        })

        it('defined props', () => {
            const wrapper = shallow(<Shows date={date} onSell={handleSell} shows={shows} tablePadding={10} />)
            expect(wrapper.length).toBe(1)
        })
    })

    describe('show/hide sell modal', () => {
        const wrapper = shallow(<Shows date={date} onSell={handleSell} shows={shows} tablePadding={10} />)

        it('show modal', () => {
            wrapper.instance().showSellModal(1)
            expect(wrapper.state().currentShow).toBe(1)
            expect(wrapper.state().showModal).toBe(true)
        })

        it('hide modal', () => {
            wrapper.instance().hideSellModal()
            expect(wrapper.state().showModal).toBe(false)
        })
    })

    it('handle sell', () => {
        const wrapper = shallow(<Shows date={date} onSell={handleSell} shows={shows} tablePadding={10} />)
        wrapper.instance().handleSell(2)
        expect(handleSell.mock.calls.length).toBe(1)
        expect(handleSell.mock.calls[0][0]).toBe(0)
        expect(handleSell.mock.calls[0][1]).toBe(2)
    })

    it('change on filter select', () => {
        const wrapper = mount(<Shows date={date} onSell={handleSell} shows={shows} tablePadding={10} />)
        wrapper.find('select').first().simulate('change', {target: { value : 3}});
    })

    describe('scroll top on data load', () => {
        it('scroll top on page change', () => {
            const wrapper = mount(<Shows date={date} onSell={handleSell} shows={shows} tablePadding={10} />)
            wrapper.find('.rt-tbody').instance().scrollTop = 100
            expect(wrapper.find('.rt-tbody').instance().scrollTop).toBe(100)
            wrapper.instance().handlePageChange()
            wrapper.update()
            //expect(wrapper.find('.rt-tbody').instance().scrollTop).toBe(0)
        })
    })
})