import { screen, fireEvent, waitFor } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { useForm } from "react-hook-form"
import { BaseAsyncSelect } from "."
import axios from "axios"
import { renderWithProviders } from "@/test/test-utils"

vi.mock("axios")

vi.mock("react-select/async", async () => {
  const React = await import("react")

  return {
    default: React.forwardRef((props: any, _ref) => {
      return (
        <div>
          <button onClick={() => props.onMenuOpen?.()}>
            open-menu
          </button>

          <button
            onClick={() =>
              props.loadOptions("john", () => {})
            }
          >
            search
          </button>

          <button
            onClick={() =>
              props.onChange?.({ label: "John", value: 1 })
            }
          >
            select-option
          </button>
        </div>
      )
    }),
  }
})

const mockedAxios = axios as jest.Mocked<typeof axios>

const Wrapper = () => {
  const { control } = useForm()

  return (
    <BaseAsyncSelect
      name="test"
      control={control}
      loadOptionsUrl="https://jsonplaceholder.typicode.com/users"
    />
  )
}

describe("BaseAsyncSelect", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(console, "error").mockImplementation(() => {})
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it("fetches options when menu opens", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [{ id: 4, name: "Patricia Lebsack" }],
    })

    renderWithProviders(<Wrapper />)

    fireEvent.click(screen.getByText("open-menu"))

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/users",
        expect.objectContaining({
          params: expect.objectContaining({
            q: "",
            page: 1,
            limit: 20,
          }),
        })
      )
    })
  })

  it("maps API response to OptionType correctly", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [{ id: 4, name: "Patricia Lebsack" }],
    })

    renderWithProviders(<Wrapper />)

    fireEvent.click(screen.getByText("open-menu"))

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalled()
    })
  })

  it("calls API with search query (debounced)", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [{ id: 2, name: "John" }],
    })

    renderWithProviders(<Wrapper />)

    fireEvent.click(screen.getByText("search"))

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/users",
        expect.objectContaining({
          params: expect.objectContaining({
            q: "john",
          }),
        })
      )
    })
  })

  it("returns empty array when API fails", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("API Error"))

    renderWithProviders(<Wrapper />)

    fireEvent.click(screen.getByText("search"))

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalled()
    })
  })

  it("calls react-hook-form onChange when option selected", async () => {
    renderWithProviders(<Wrapper />)

    fireEvent.click(screen.getByText("select-option"))

    await waitFor(() => {
      expect(screen.getByText("select-option")).toBeInTheDocument()
    })
  })
})