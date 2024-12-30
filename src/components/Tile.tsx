import { Component } from "solid-js";

interface TileProps {
  text: string;
}


export const Tile: Component<TileProps> = (props) => {
  let text = () => props.text;

  return (
    <div class="text-center font-bold tracking-wider text-white p-4 rounded-xl drop-shadow-md text-shadow w-max min-w-16 min-h-16 flex items-center justify-center aspect-square max-w-48 even:bg-blue-400/25 odd:bg-blue-400/50">
      {text()}
    </div>
  )
}

