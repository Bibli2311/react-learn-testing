import Counter from "./Counter"
import {render, screen} from "@testing-library/react"
import '@testing-library/dom'
import React from 'react';
import '@testing-library/jest-dom'

test('load and display', async () => {

    render(<Counter></Counter>)

    expect(
        screen.getByLabelText(/counter/)
    ).toBeInTheDocument()

    expect(
        screen.getByPlaceholderText(/counter number/)
    ).toBeInTheDocument()

    expect(
        screen.getByTestId(/ptag/i)
    ).toBeInTheDocument()
})