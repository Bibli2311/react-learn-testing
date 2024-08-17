import Counter from "./Counter"
import {render, screen} from "@testing-library/react"
import '@testing-library/dom'

test('load and display', async () => {

    render(<Counter></Counter>)

    await screen.findByText("hello world")

    expect(screen.findByText("hello world")).toHaveTextContent('hello world')
})