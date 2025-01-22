import { Component, createMemo, onMount, createSignal, For, createEffect } from "solid-js";
import { bingo } from "../../../stores/bingo";
import { Cell } from "./Cell";
import { cn } from "../../../utils/cn";

interface BingoProps { }

export const Bingo: Component<BingoProps> = () => {
  const [gridSize, setGridSize] = createSignal({ width: "100%", height: "100%" });

  const backgroundColors = {
    blue: 'bg-blue-200',
    red: 'bg-red-200',
    green: 'bg-green-200',
    purple: 'bg-purple-200',
    orange: 'bg-orange-200',
    teal: 'bg-teal-200'
  };

  const calculateGridSize = () => {
    const { innerWidth: viewportWidth, innerHeight: viewportHeight } = window;
    const cellSize = Math.min(
      (viewportWidth * 0.8) / bingo.size.x,
      (viewportHeight * 0.8) / bingo.size.y
    );

    setGridSize({
      width: `${cellSize * bingo.size.x + 56}px`,
      height: `${cellSize * bingo.size.y + 56}px`,
    });
  };

  createEffect(() => {
    void bingo.size;
    calculateGridSize();
  });

  onMount(() => {
    calculateGridSize();

    window.addEventListener("resize", calculateGridSize);
    return () => window.removeEventListener("resize", calculateGridSize);
  });

  return (
    <div
      class={cn("grid gap-2 p-8 rounded-3xl", backgroundColors[bingo.color])}
      style={{
        "grid-template-columns": `repeat(${bingo.size.x}, 1fr)`,
        "grid-template-rows": `repeat(${bingo.size.y}, 1fr)`,
        width: gridSize().width,
        height: gridSize().height,
      }}
    >
      <For each={bingo.items}>
        {(item, index) => <Cell item={item} index={index} />}
      </For>
    </div>
  );
};

