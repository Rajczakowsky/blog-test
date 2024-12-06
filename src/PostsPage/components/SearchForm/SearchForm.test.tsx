import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SearchForm } from "./SearchForm";

describe("SearchForm", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("renders the search input with the correct placeholder", () => {
    render(<SearchForm query="" setQuery={vi.fn()} />);
    const searchInput = screen.getByPlaceholderText("Search posts...");
    expect(searchInput).toBeInTheDocument();
  });

  it("calls setQuery with the correct value when input changes", () => {
    const setQueryMock = vi.fn();
    render(<SearchForm query="" setQuery={setQueryMock} />);
    const searchInput = screen.getByPlaceholderText("Search posts...");

    fireEvent.change(searchInput, { target: { value: "test" } });

    vi.advanceTimersByTime(300);

    expect(setQueryMock).toHaveBeenCalledWith("test");
  });

  it("renders the search input with the correct initial value", () => {
    render(<SearchForm query="initial value" setQuery={vi.fn()} />);
    const searchInput = screen.getByPlaceholderText("Search posts...");
    expect(searchInput).toHaveValue("initial value");
  });

  it("prevents form submission", () => {
    render(<SearchForm query="" setQuery={vi.fn()} />);
    const form = screen.getByRole("search").querySelector("form");
    const submitEvent = new Event("submit", {
      bubbles: true,
      cancelable: true,
    });

    form?.dispatchEvent(submitEvent);
    expect(submitEvent.defaultPrevented).toBe(true);
  });
});
