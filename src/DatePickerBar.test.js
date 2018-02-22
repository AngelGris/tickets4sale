import React from 'react'
import DatePickerBar from './DatePickerBar'
import Moment from 'moment'

import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

const date = Moment().format('YYYY-MM-DD')
const handleChange = jest.fn()

describe('<DatePickerBar />', () => {
    describe('renders without crashing', () => {
        it('default props', () => {
            const wrapper = shallow(<DatePickerBar />)
            expect(wrapper.length).toBe(1)
        })

        it('user defined props', () => {
            const wrapper = shallow(<DatePickerBar date={date} onChange={handleChange} />)
            expect(wrapper.length).toBe(1)
        })
    })

    it('change date', () => {
        const wrapper = shallow(<DatePickerBar date={date} onChange={handleChange} />)
        const newDate = Moment().add(10, 'd').format('YYYY-MM-DD')
        wrapper.instance().handleChange(newDate)
        expect(handleChange.mock.calls.length).toBe(1)
        expect(wrapper.state().date).toBe(newDate)
        expect(handleChange.mock.calls[0][0]).toBe(newDate)
    })
})