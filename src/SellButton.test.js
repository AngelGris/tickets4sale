import React from 'react'
import SellButton from './SellButton'

import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

const handleClick = jest.fn()

describe('<SellButton />', () => {
    describe('renders without crashing', () => {
        it('default props', () => {
            const wrapper = shallow(<SellButton onClick={handleClick} />)
            expect(wrapper.length).toBe(1)
        })

        it('show = true', () => {
            const wrapper = shallow(<SellButton onClick={handleClick} show={true} />)
            expect(wrapper.length).toBe(1)
        })

        it('show = false', () => {
            const wrapper = shallow(<SellButton onClick={handleClick} show={false} />)
            expect(wrapper.length).toBe(1)
        })
    })
})