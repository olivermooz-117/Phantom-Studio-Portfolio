import { render, screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import App from "../App";

describe("App integration", () => {
  it("renders the landing page with projects", () => {
    render(<App />);
    expect(screen.getByText(/craft studio/i)).toBeInTheDocument();
    // At least one project card should render
    expect(screen.getAllByRole("button", { name: /view .* project/i }).length).toBeGreaterThan(0);
  });

  it("filters projects when typing in the search bar", async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/search projects/i);
    await userEvent.type(searchInput, "Lumina");
    expect(screen.getByText("Lumina Brand Identity")).toBeInTheDocument();
    // Other unrelated projects should not appear
    expect(screen.queryByText("Helix Web Experience")).not.toBeInTheDocument();
  });

  it("filters projects by category filter buttons", async () => {
    render(<App />);
    const webBtn = screen.getByRole("button", { name: "Web" });
    fireEvent.click(webBtn);
    expect(webBtn).toHaveClass("filter-btn--active");
    // Web projects should be visible
    expect(screen.getByText("Helix Web Experience")).toBeInTheDocument();
    // Branding project should not be visible
    expect(screen.queryByText("Lumina Brand Identity")).not.toBeInTheDocument();
  });

  it("shows empty state when search returns no results", async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/search projects/i);
    await userEvent.type(searchInput, "xyznoproject");
    expect(screen.getByText(/no projects found/i)).toBeInTheDocument();
  });

  it("opens and closes the Add Project modal", () => {
    render(<App />);
    const addBtn = screen.getByRole("button", { name: /add project/i });
    fireEvent.click(addBtn);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText(/close modal/i));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("adds a new project and displays it on the page", async () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /add project/i }));

    const dialog = screen.getByRole("dialog");
    await userEvent.type(within(dialog).getByLabelText(/project title/i), "My New Project");
    await userEvent.selectOptions(within(dialog).getByLabelText(/category/i), "Branding");
    await userEvent.type(within(dialog).getByLabelText(/description/i), "A fantastic new project.");
    await userEvent.type(within(dialog).getByLabelText(/client name/i), "New Client Ltd");

    fireEvent.click(within(dialog).getByRole("button", { name: /add project/i }));

    // Modal should close
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    // New project should appear
    expect(screen.getByText("My New Project")).toBeInTheDocument();
  });
});
