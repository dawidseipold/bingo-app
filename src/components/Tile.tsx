import { Component } from "solid-js";

interface TileProps {
  text: string;
}


export const Tile: Component<TileProps> = (props) => {
  let text = () => props.text;

  return (
    <div class="text-center font-bold tracking-wider text-white p-4 rounded-xl drop-shadow-md text-shadow w-full h-full min-w-12 min-h-12 flex items-center justify-center aspect-square even:bg-blue-400/25 odd:bg-blue-400/50">
      {text()}
    </div>
  )
}

