import { Component, createMemo, onMount, createSignal, For, createEffect } from "solid-js";
import { bingo } from "../../../stores/bingo";
import { Cell } from "./Cell";
import { cn } from "../../../utils/cn";

interface BingoProps { }

export const Bingo: Component<BingoProps> = () => {
  const [gridSize, setGridSize] = createSignal({ width: "100%", height: "100%" });

  const calculateGridSize = () => {
    const { innerWidth: viewportWidth, innerHeight: viewportHeight } = window;
    const maxWidth = viewportWidth * 0.8;
    const maxHeight = viewportHeight * 0.8;

    const cellSize = Math.min(
      maxWidth / bingo.size.x,
      maxHeight / bingo.size.y
    );

    setGridSize({
      width: `${cellSize * bingo.size.x}px`,
      height: `${cellSize * bingo.size.y}px`,
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
      class={cn("grid gap-2")}
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

