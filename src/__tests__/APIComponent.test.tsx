import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import APIComponent from '../APIComponent'

describe('api component', () => {
 it('test api call', async () => {
    render(<APIComponent />)
    const apiResp = await screen.findByText('0.10613')
    expect(apiResp).toBeInTheDocument();
 })   
})