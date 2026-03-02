import { renderWithProviders } from "@/test/test-utils"
import { BaseTextArea } from "."
import { fireEvent, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import type { UseFormRegisterReturn } from "react-hook-form"

describe("BaseTextArea Component", () => {
  it("renders textarea correctly", () => {
    renderWithProviders(<BaseTextArea name="description" />)

    const textarea = screen.getByRole("textbox")
    expect(textarea).toBeInTheDocument()
  })

  it("applies name and id correctly", () => {
    renderWithProviders(<BaseTextArea name="bio" />)

    const textarea = screen.getByRole("textbox")
    expect(textarea).toHaveAttribute("name", "bio")
    expect(textarea).toHaveAttribute("id", "bio")
  })

  it("forwards additional props", () => {
    renderWithProviders(
      <BaseTextArea name="comment" placeholder="Write here..." />
    )

    const textarea = screen.getByPlaceholderText("Write here...")
    expect(textarea).toBeInTheDocument()
  })

  it("applies registration props from react-hook-form", () => {
    const registrationMock: UseFormRegisterReturn = {
      name: "message",
      onChange: vi.fn(),
      onBlur: vi.fn(),
      ref: vi.fn(),
    }

    renderWithProviders(
      <BaseTextArea name="message" registration={registrationMock} />
    )

    const textarea = screen.getByRole("textbox")

    fireEvent.change(textarea, { target: { value: "Hello" } })
    fireEvent.blur(textarea)

    expect(registrationMock.onChange).toHaveBeenCalled()
    expect(registrationMock.onBlur).toHaveBeenCalled()
  })

  it("allows overriding props after registration", () => {
    const registrationMock: UseFormRegisterReturn = {
      name: "message",
      onChange: vi.fn(),
      onBlur: vi.fn(),
      ref: vi.fn(),
    }

    renderWithProviders(
      <BaseTextArea
        name="message"
        registration={registrationMock}
        disabled
      />
    )

    const textarea = screen.getByRole("textbox")
    expect(textarea).toBeDisabled()
  })
})