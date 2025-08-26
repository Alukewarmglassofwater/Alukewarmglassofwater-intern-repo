import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import HnItem from "./components/fetchfromanAPI";

const mockItem = {
  id: 8863,
  title: "Test Title",
  by: "pg",
  url: "https://news.ycombinator.com/",
  score: 42,
  descendants: 10,
  time: 1_234_567_890,
  type: "story",
};

describe("HnItem", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    jest.resetAllMocks();
    // Ensure fetch exists & is mockable in the test env
    global.fetch = jest.fn() as any;
  });

  afterAll(() => {
    global.fetch = originalFetch as any;
  });

  test("shows loading, then renders item data on success", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockItem,
    });

    render(<HnItem itemId={8863} />);

    // Loading state
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Success state (title becomes a heading link)
    const heading = await screen.findByRole("heading", {
      name: mockItem.title,
    });
    expect(heading).toBeInTheDocument();

    // A couple of key fields render
    expect(screen.getByText(/ID:/i)).toBeInTheDocument();
    expect(screen.getByText(String(mockItem.id))).toBeInTheDocument();
    expect(screen.getByText(/By:/i)).toBeInTheDocument();
    expect(screen.getByText(mockItem.by)).toBeInTheDocument();
  });

  test("handles HTTP error (non-OK response)", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    render(<HnItem itemId={123} />);

    // Error message from component
    expect(await screen.findByText(/Error: HTTP 404/i)).toBeInTheDocument();
  });

  test("handles network error (fetch rejects)", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("boom"));

    render(<HnItem itemId={123} />);

    expect(await screen.findByText(/Error: boom/i)).toBeInTheDocument();
  });

  test("uses the passed itemId in the request URL", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockItem,
    });

    render(<HnItem itemId={999} />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "https://hacker-news.firebaseio.com/v0/item/999.json",
        expect.objectContaining({ signal: expect.any(AbortSignal) })
      );
    });
  });
});
