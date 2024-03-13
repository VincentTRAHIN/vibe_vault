import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Playlist from "../src/components/Playlist/Playlist.jsx";

describe("Playlist component", () => {
  test("renders playlist name input correctly", () => {
    const playlistName = "My Playlist";
    const onNameChange = jest.fn();

    render(
      <Playlist playlistName={playlistName} onNameChange={onNameChange} />
    );

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe(playlistName);
  });

  test("calls onNameChange when playlist name input is changed", () => {
    const onNameChange = jest.fn();

    render(<Playlist playlistName="" onNameChange={onNameChange} />);

    const inputElement = screen.getByRole("textbox");
    const newPlaylistName = "New Playlist";

    fireEvent.change(inputElement, { target: { value: newPlaylistName } });

    expect(onNameChange).toHaveBeenCalledTimes(1);
    expect(onNameChange).toHaveBeenCalledWith(newPlaylistName);
  });
});
