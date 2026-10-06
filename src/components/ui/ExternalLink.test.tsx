import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ExternalLink, MailLink } from "./ExternalLink";

describe("ExternalLink", () => {
  it("opens http(s) URLs in a new tab with noopener", () => {
    render(<ExternalLink href="https://example.com">GitHub</ExternalLink>);

    const link = screen.getByRole("link", { name: /GitHub/ });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("does not render javascript: or data: hrefs", () => {
    const { rerender } = render(
      <ExternalLink href="javascript:alert(1)">Bad</ExternalLink>,
    );
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.getByText("Bad").tagName).toBe("SPAN");

    rerender(<ExternalLink href="data:text/html,hi">Bad</ExternalLink>);
    expect(screen.queryByRole("link")).toBeNull();
  });
});

describe("MailLink", () => {
  it("renders a bare mailto address", () => {
    render(<MailLink email="a@b.com">Email</MailLink>);
    expect(screen.getByRole("link")).toHaveAttribute("href", "mailto:a@b.com");
  });

  it("does not render injected mailto headers", () => {
    render(<MailLink email="a@b.com?bcc=evil@x.com">Email</MailLink>);
    expect(screen.queryByRole("link")).toBeNull();
  });
});
