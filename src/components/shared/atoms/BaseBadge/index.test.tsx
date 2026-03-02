import { screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import BaseBadge from "."
import { renderWithProviders } from "@/test/test-utils"

describe("BaseBadge", () => {
  it("renders children correctly", () => {
    renderWithProviders(<BaseBadge>New</BaseBadge>)

    expect(screen.getByText("New")).toBeInTheDocument()
  })

  it("applies default props", () => {
    renderWithProviders(<BaseBadge>Default</BaseBadge>)

    const badge = screen.getByText("Default")
    expect(badge).toBeInTheDocument()
  })

  it("accepts custom colorPalette, variant, and size", () => {
    renderWithProviders(
      <BaseBadge colorPalette="red" variant="solid" size="lg">
        Danger
      </BaseBadge>
    )

    const badge = screen.getByText("Danger")
    expect(badge).toBeInTheDocument()
  })

  it("forwards additional props", () => {
    renderWithProviders(
      <BaseBadge data-testid="badge" id="custom-id">
        Test
      </BaseBadge>
    )

    const badge = screen.getByTestId("badge")
    expect(badge).toHaveAttribute("id", "custom-id")
  })

  it("renders as inline-flex with alignment styles", () => {
    renderWithProviders(<BaseBadge data-testid="badge">Styled</BaseBadge>)

    const badge = screen.getByTestId("badge")
    expect(badge).toHaveStyle({
      display: "inline-flex",
      alignItems: "center",
    })
  })

  it("renders compound Icon correctly", () => {
    renderWithProviders(
      <BaseBadge>
        <BaseBadge.Icon data-testid="icon">
          🔔
        </BaseBadge.Icon>
        Notifications
      </BaseBadge>
    )

    expect(screen.getByText("Notifications")).toBeInTheDocument()
    expect(screen.getByTestId("icon")).toBeInTheDocument()
    expect(screen.getByText("🔔")).toBeInTheDocument()
  })

  it("applies custom className to Icon", () => {
    renderWithProviders(
      <BaseBadge>
        <BaseBadge.Icon className="custom-icon" data-testid="icon">
          ⭐
        </BaseBadge.Icon>
      </BaseBadge>
    )

    const icon = screen.getByTestId("icon")
    expect(icon.className).toContain("custom-icon")
  })
})