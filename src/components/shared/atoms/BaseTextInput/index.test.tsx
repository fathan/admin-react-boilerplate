import { renderWithProviders } from "@/test/test-utils"
import { BaseTextInput } from "."
import { fireEvent, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import type { UseFormRegisterReturn } from "react-hook-form"

describe("BaseTextInput Component", () => {
  it("renders input correctly", () => {
    renderWithProviders(<BaseTextInput name="username" />)

    const input = screen.getByRole("textbox")
    expect(input).toBeInTheDocument()
  })

  it("applies name and id correctly", () => {
    renderWithProviders(<BaseTextInput name="email" />)

    const input = screen.getByRole("textbox")
    expect(input).toHaveAttribute("name", "email")
    expect(input).toHaveAttribute("id", "email")
  })

  it("uses default type='text'", () => {
    renderWithProviders(<BaseTextInput name="fullname" />)

    const input = screen.getByRole("textbox")
    expect(input).toHaveAttribute("type", "text")
  })

  it("allows overriding type", () => {
    renderWithProviders(
      <BaseTextInput
        name="password"
        type="password"
        data-testid="password-input"
      />
    )

    const input = screen.getByTestId("password-input")
    expect(input).toHaveAttribute("type", "password")
  })

  it("forwards additional props", () => {
    renderWithProviders(
      <BaseTextInput
        name="search"
        placeholder="Search here..."
      />
    )

    const input = screen.getByPlaceholderText("Search here...")
    expect(input).toBeInTheDocument()
  })

  it("applies className correctly", () => {
    renderWithProviders(
      <BaseTextInput
        name="custom"
        className="custom-class"
      />
    )

    const input = screen.getByRole("textbox")
    expect(input).toHaveClass("custom-class")
  })

  it("applies registration props from react-hook-form", () => {
    const registrationMock: UseFormRegisterReturn = {
      name: "username",
      onChange: vi.fn(),
      onBlur: vi.fn(),
      ref: vi.fn(),
    }

    renderWithProviders(
      <BaseTextInput
        name="username"
        registration={registrationMock}
      />
    )

    const input = screen.getByRole("textbox")

    fireEvent.change(input, { target: { value: "Fathan" } })
    fireEvent.blur(input)

    expect(registrationMock.onChange).toHaveBeenCalled()
    expect(registrationMock.onBlur).toHaveBeenCalled()
  })

  it("allows overriding props after registration", () => {
    const registrationMock: UseFormRegisterReturn = {
      name: "email",
      onChange: vi.fn(),
      onBlur: vi.fn(),
      ref: vi.fn(),
    }

    renderWithProviders(
      <BaseTextInput
        name="email"
        registration={registrationMock}
        disabled
      />
    )

    const input = screen.getByRole("textbox")
    expect(input).toBeDisabled()
  })
})