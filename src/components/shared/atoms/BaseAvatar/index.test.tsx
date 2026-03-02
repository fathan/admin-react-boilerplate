import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import BaseAvatar from "."

describe("BaseAvatar", () => {
  it("renders image when src is provided", () => {
    render(<BaseAvatar src="avatar.jpg" name="John Doe" />)

    const img = screen.getByRole("img")
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute("src", "avatar.jpg")
    expect(img).toHaveAttribute("alt", "John Doe")
  })

  it("renders initials when src is not provided", () => {
    render(<BaseAvatar name="John Doe" />)

    expect(screen.getByText("JD")).toBeInTheDocument()
  })

  it("renders '?' when name is not provided", () => {
    render(<BaseAvatar />)

    expect(screen.getByText("?")).toBeInTheDocument()
  })

  it("applies correct size class when size is string", () => {
    render(<BaseAvatar name="John" size="lg" />)

    const wrapper = screen.getByText("J").closest("div")?.parentElement
    expect(wrapper?.className).toContain("w-14")
    expect(wrapper?.className).toContain("h-14")
  })

  it("applies inline style when size is number", () => {
    render(<BaseAvatar name="John" size={60} />)

    const wrapper = screen.getByText("J").closest("div")?.parentElement
    expect(wrapper).toHaveStyle({
      width: "60px",
      height: "60px",
    })
  })

  it("renders online status indicator", () => {
    render(<BaseAvatar name="John" status="online" />)

    const statusDot = document.querySelector(".bg-green-500")
    expect(statusDot).toBeInTheDocument()
  })

  it("renders away status indicator", () => {
    render(<BaseAvatar name="John" status="away" />)

    const statusDot = document.querySelector(".bg-yellow-400")
    expect(statusDot).toBeInTheDocument()
  })

  it("renders offline status indicator", () => {
    render(<BaseAvatar name="John" status="offline" />)

    const statusDot = document.querySelector(".bg-red-500")
    expect(statusDot).toBeInTheDocument()
  })

  it("applies custom className", () => {
    render(<BaseAvatar name="John" className="custom-class" />)

    const wrapper = screen.getByText("J").closest("div")?.parentElement
    expect(wrapper?.className).toContain("custom-class")
  })
})