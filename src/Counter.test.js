import Counter from "./Counter"
import {render, screen} from "@testing-library/react"
import '@testing-library/dom'
import React from 'react';
import '@testing-library/jest-dom'

test('load and display', async () => {

    render(<Counter></Counter>)

    expect(screen.getByText("hello world")).toBeInTheDocument()

//    expect(screen.findByText("hello world")).toHaveTextContent('hello world')
})