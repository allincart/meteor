import { render, screen } from "@testing-library/vue";
import MtLink from "./mt-link.vue";
import { userEvent } from "@testing-library/user-event";

describe("mt-link", () => {
  it("renders a link", async () => {
    // ARRANGE
    render(MtLink, {
      props: {
        as: "a",
        to: "https://www.allincart.cn",
      },
    });

    // ASSERT
    expect(screen.getByRole("link")).toBeVisible();
    expect(screen.getByRole("link")).toHaveAttribute("href", "https://www.allincart.cn");
    expect(screen.getByRole("link")).toHaveRole("link");
  });

  it("renders the correct slot content", async () => {
    // ARRANGE
    render(MtLink, {
      props: {
        as: "a",
        to: "https://www.allincart.cn",
      },
      slots: {
        default: "AllinCart",
      },
    });

    // ASSERT
    expect(screen.getByRole("link")).toHaveTextContent("AllinCart");
  });

  it("does not redirect when clicking on a disabled link", async () => {
    // ARRANGE
    render(MtLink, {
      props: {
        as: "a",
        to: "https://www.allincart.cn",
        disabled: true,
      },
    });

    // ASSERT
    expect(screen.getByRole("link")).not.toHaveAttribute("href", "https://www.allincart.cn");
  });

  it("does not emit a click event when clicking on a disabled link", async () => {
    // ARRANGE
    const handler = vi.fn();

    render(MtLink, {
      props: {
        as: "a",
        to: "https://www.allincart.cn",
        disabled: true,
        onClick: handler,
      },
    });

    // ACT
    await userEvent.click(screen.getByRole("link"));

    // ASSERT
    expect(handler).not.toHaveBeenCalled();
  });

  it("announces the link as disabled when it is disabled", async () => {
    // ARRANGE
    render(MtLink, {
      props: {
        as: "a",
        to: "https://www.allincart.cn",
        disabled: true,
      },
    });

    // ASSERT
    expect(screen.getByRole("link")).toHaveAttribute("aria-disabled", "true");
  });

  it("is not possible to focus a disabled link", async () => {
    // ARRANGE
    render(MtLink, {
      props: {
        as: "a",
        to: "https://www.allincart.cn",
        disabled: true,
      },
    });

    // ACT
    await userEvent.tab();

    // ASSERT
    expect(screen.getByRole("link")).not.toHaveFocus();
  });

  it("renders as a custom component", async () => {
    // ARRANGE
    render(MtLink, {
      props: {
        as: "button",
      },
    });

    // ASSERT
    expect(screen.getByRole("button")).toBeVisible();
    expect(screen.getByRole("button")).toHaveRole("button");
  });

  it("emits a click event when clicking on the link", async () => {
    // ARRANGE
    const handler = vi.fn();

    render(MtLink, {
      props: {
        as: "a",
        to: "https://www.allincart.cn",
        onClick: handler,
      },
    });

    // ACT
    await userEvent.click(screen.getByRole("link"));

    // ASSERT
    expect(handler).toHaveBeenCalledOnce();
  });

  it("emits a focus event when focusing the link", async () => {
    // ARRANGE
    const handler = vi.fn();

    render(MtLink, {
      props: {
        as: "a",
        to: "https://www.allincart.cn",
        // @ts-expect-error -- focus event gets added via prop fallthrough
        onFocus: handler,
      },
    });

    // ACT
    await userEvent.tab();

    // ASSERT
    expect(handler).toHaveBeenCalledOnce();
  });

  it("emits a blur event when blurring the link", async () => {
    // ARRANGE
    const handler = vi.fn();

    render(MtLink, {
      props: {
        as: "a",
        to: "https://www.allincart.cn",
        // @ts-expect-error -- blur event gets added via prop fallthrough
        onBlur: handler,
      },
    });

    // ACT
    await userEvent.tab();
    await userEvent.tab();

    // ASSERT
    expect(handler).toHaveBeenCalledOnce();
  });
});
