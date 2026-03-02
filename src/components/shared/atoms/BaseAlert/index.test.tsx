import { renderWithProviders } from "@/test/test-utils"
import BaseAlert from "."
import { screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"

describe("BaseAlert Component", () => {
  it("renders title correctly", () => {
    renderWithProviders(
      <BaseAlert title="Alert Title" />
    )

    expect(screen.getByText("Alert Title")).toBeInTheDocument()
  })

  it("renders description correctly", () => {
    renderWithProviders(
      <BaseAlert description="Alert description text" />
    )

    expect(screen.getByText("Alert description text")).toBeInTheDocument()
  })

  it("renders default icon when showIcon is true", () => {
    const { container } = renderWithProviders(
      <BaseAlert title="With Icon" />
    )

    // AlertIndicator biasanya render svg/icon
    expect(container.querySelector("svg")).toBeInTheDocument()
  })

  it("renders custom icon when provided", () => {
    renderWithProviders(
      <BaseAlert
        title="Custom Icon"
        icon={<span data-testid="custom-icon">🔥</span>}
      />
    )

    expect(screen.getByTestId("custom-icon")).toBeInTheDocument()
  })

  it("does not render icon when showIcon is false", () => {
    const { container } = renderWithProviders(
      <BaseAlert title="No Icon" showIcon={false} />
    )

    expect(container.querySelector("svg")).not.toBeInTheDocument()
  })

  it("renders close button when closable is true", () => {
    renderWithProviders(
      <BaseAlert title="Closable Alert" closable />
    )

    const button = screen.getByRole("button")
    expect(button).toBeInTheDocument()
  })

  it("calls onClose when close button is clicked", () => {
    const handleClose = vi.fn()

    renderWithProviders(
      <BaseAlert
        title="Closable Alert"
        closable
        onClose={handleClose}
      />
    )

    const button = screen.getByRole("button")
    fireEvent.click(button)

    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it("applies inline display when inline=true", () => {
    const { container } = renderWithProviders(
      <BaseAlert title="Inline Alert" inline />
    )

    const root = container.firstChild as HTMLElement
    expect(root).toHaveStyle({ display: "inline-flex" })
  })

  it("uses default display flex when inline is false", () => {
    const { container } = renderWithProviders(
      <BaseAlert title="Block Alert" />
    )

    const root = container.firstChild as HTMLElement
    expect(root).toHaveStyle({ display: "flex" })
  })
})