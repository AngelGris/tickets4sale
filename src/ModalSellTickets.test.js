import React from 'react'
import ModalSellTickets from './ModalSellTickets'
import Moment from 'moment'

import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

const date = Moment().add(10, 'd').format('YYYY-MM-DD')
const handleHide = jest.fn()
const handleSell = jest.fn()
const show = {
    "type":"comedy",
    "title":"beaux' stratagem, the",
    "ticketsLeft":15,
    "ticketsAvailable":5,
    "status":"Open for sale",
    "price":40
}

describe('<ModalSellTickets />', () => {
    describe('renders without crashing', () => {
        it('default props', () => {
            const wrapper = shallow(<ModalSellTickets show={show} />)
            expect(wrapper.length).toBe(1)
        })

        it('null show', () => {
            const wrapper = shallow(<ModalSellTickets show={{}} />)
            expect(wrapper.length).toBe(1)
        })

        it('defined props', () => {
            const wrapper = shallow(<ModalSellTickets date={date} onHide={handleHide} onSell={handleSell} show={show} showModal={false} />)
            expect(wrapper.length).toBe(1)
        })
    })

    it('handle change', () => {
        const wrapper = mount(<ModalSellTickets date={date} onHide={handleHide} onSell={handleSell} show={show} showModal={true} />)
        expect(wrapper.state().ticketsTotal).toBe(0)
        wrapper.ref('tickets').value = 2
        wrapper.instance().handleChange()
        expect(wrapper.state().ticketsTotal).toBe(wrapper.ref('tickets').value * show.price)
    })

    it('handle sell', () => {
        const wrapper = mount(<ModalSellTickets date={date} onHide={handleHide} onSell={handleSell} show={show} showModal={true} />)
        wrapper.instance().handleSell()
        expect(handleSell.mock.calls.length).toBe(1)
        expect(handleSell.mock.calls[0][0]).toBe(0)
        wrapper.ref('tickets').value = 2
        wrapper.instance().handleSell()
        expect(handleSell.mock.calls.length).toBe(2)
        expect(handleSell.mock.calls[1][0]).toBe(2)
    })
})