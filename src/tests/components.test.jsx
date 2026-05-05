import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import AddProjectModal from "../components/AddProjectModal";

// ────────────────────────────────────────────────
// SearchBar
// ────────────────────────────────────────────────
describe("SearchBar", () => {
  it("renders with placeholder text", () => {
    render(<SearchBar value="" onChange={() => {}} />);
    expect(
      screen.getByPlaceholderText(/search projects/i)
    ).toBeInTheDocument();
  });

  it("calls onChange when the user types", async () => {
    const handleChange = vi.fn();
    render(<SearchBar value="" onChange={handleChange} />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "brand");
    expect(handleChange).toHaveBeenCalled();
  });

  it("shows clear button when value is non-empty", () => {
    render(<SearchBar value="hello" onChange={() => {}} />);
    expect(screen.getByLabelText(/clear search/i)).toBeInTheDocument();
  });

  it("clear button calls onChange with empty string", () => {
    const handleChange = vi.fn();
    render(<SearchBar value="hello" onChange={handleChange} />);
    fireEvent.click(screen.getByLabelText(/clear search/i));
    expect(handleChange).toHaveBeenCalledWith("");
  });

  it("does not show clear button when value is empty", () => {
    render(<SearchBar value="" onChange={() => {}} />);
    expect(screen.queryByLabelText(/clear search/i)).not.toBeInTheDocument();
  });
});

// ────────────────────────────────────────────────
// FilterBar
// ────────────────────────────────────────────────
describe("FilterBar", () => {
  const categories = ["All", "Branding", "Web", "Print"];

  it("renders all category buttons", () => {
    render(<FilterBar categories={categories} active="All" onSelect={() => {}} />);
    categories.forEach((cat) => {
      expect(screen.getByRole("button", { name: cat })).toBeInTheDocument();
    });
  });

  it("applies active class to the selected category", () => {
    render(<FilterBar categories={categories} active="Branding" onSelect={() => {}} />);
    expect(screen.getByRole("button", { name: "Branding" })).toHaveClass(
      "filter-btn--active"
    );
  });

  it("calls onSelect with the correct category when clicked", () => {
    const handleSelect = vi.fn();
    render(<FilterBar categories={categories} active="All" onSelect={handleSelect} />);
    fireEvent.click(screen.getByRole("button", { name: "Web" }));
    expect(handleSelect).toHaveBeenCalledWith("Web");
  });
});

// ────────────────────────────────────────────────
// AddProjectModal
// ────────────────────────────────────────────────
describe("AddProjectModal", () => {
  const mockCategories = ["Branding", "Web", "Print", "Digital"];

  it("renders the modal with all required fields", () => {
    render(
      <AddProjectModal
        onClose={() => {}}
        onSubmit={() => {}}
        categories={mockCategories}
      />
    );
    expect(screen.getByLabelText(/project title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/client name/i)).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", () => {
    const handleClose = vi.fn();
    render(
      <AddProjectModal
        onClose={handleClose}
        onSubmit={() => {}}
        categories={mockCategories}
      />
    );
    fireEvent.click(screen.getByLabelText(/close modal/i));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("shows validation errors when submitting an empty form", async () => {
    render(
      <AddProjectModal
        onClose={() => {}}
        onSubmit={() => {}}
        categories={mockCategories}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /add project/i }));
    expect(await screen.findByText(/title is required/i)).toBeInTheDocument();
    expect(screen.getByText(/category is required/i)).toBeInTheDocument();
    expect(screen.getByText(/description is required/i)).toBeInTheDocument();
    expect(screen.getByText(/client name is required/i)).toBeInTheDocument();
  });

  it("calls onSubmit with correct data when form is valid", async () => {
    const handleSubmit = vi.fn();
    render(
      <AddProjectModal
        onClose={() => {}}
        onSubmit={handleSubmit}
        categories={mockCategories}
      />
    );

    await userEvent.type(screen.getByLabelText(/project title/i), "Test Project");
    await userEvent.selectOptions(screen.getByLabelText(/category/i), "Branding");
    await userEvent.type(screen.getByLabelText(/description/i), "A great test project description.");
    await userEvent.type(screen.getByLabelText(/client name/i), "Test Client");

    fireEvent.click(screen.getByRole("button", { name: /add project/i }));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    const submitted = handleSubmit.mock.calls[0][0];
    expect(submitted.title).toBe("Test Project");
    expect(submitted.category).toBe("Branding");
    expect(submitted.client).toBe("Test Client");
  });

  it("parses comma-separated tags into an array", async () => {
    const handleSubmit = vi.fn();
    render(
      <AddProjectModal
        onClose={() => {}}
        onSubmit={handleSubmit}
        categories={mockCategories}
      />
    );

    await userEvent.type(screen.getByLabelText(/project title/i), "Tagged Project");
    await userEvent.selectOptions(screen.getByLabelText(/category/i), "Web");
    await userEvent.type(screen.getByLabelText(/description/i), "Some description here.");
    await userEvent.type(screen.getByLabelText(/client name/i), "Client Co");
    await userEvent.type(screen.getByLabelText(/tags/i), "React, Design, CSS");

    fireEvent.click(screen.getByRole("button", { name: /add project/i }));

    const submitted = handleSubmit.mock.calls[0][0];
    expect(submitted.tags).toEqual(["React", "Design", "CSS"]);
  });
});
