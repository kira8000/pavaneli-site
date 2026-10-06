import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SelectField, TextAreaField, TextField } from "./Field";

describe("Field", () => {
  it("associates the label with the control", () => {
    render(<TextField label="Email" />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("marks a required field for assistive technology and hides the asterisk from it", () => {
    render(<TextField label="Name" required />);

    const input = screen.getByRole("textbox", { name: "Name" });
    expect(input).toHaveAttribute("aria-required", "true");
    expect(screen.getByText("*")).toHaveAttribute("aria-hidden", "true");
  });

  it("links the error message to the control and flags it invalid", () => {
    render(<TextField label="Email" error="Enter a valid email address." />);

    const input = screen.getByLabelText("Email");
    expect(input).toBeInvalid();
    expect(input).toHaveAccessibleDescription("Enter a valid email address.");
  });

  it("is valid and undescribed without an error", () => {
    render(<TextField label="Email" />);

    const input = screen.getByLabelText("Email");
    expect(input).toBeValid();
    expect(input).not.toHaveAttribute("aria-describedby");
  });

  it("keeps a hidden label available to screen readers", () => {
    render(<TextField label="Search" hideLabel />);

    expect(screen.getByLabelText("Search")).toBeInTheDocument();
    expect(screen.getByText("Search")).toHaveClass("sr-only");
  });

  it("works for selects and textareas too", () => {
    render(
      <>
        <SelectField
          label="Role"
          error="Invalid"
          options={[{ value: "a", label: "Admin" }]}
        />
        <TextAreaField label="Body" />
      </>,
    );

    expect(screen.getByRole("combobox", { name: "Role" })).toBeInvalid();
    expect(screen.getByRole("textbox", { name: "Body" })).toBeInTheDocument();
  });

  it("gives every field its own id", () => {
    render(
      <>
        <TextField label="One" />
        <TextField label="Two" />
      </>,
    );

    expect(screen.getByLabelText("One").id).not.toBe(screen.getByLabelText("Two").id);
  });
});
