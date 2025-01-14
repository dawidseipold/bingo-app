import { Component, createMemo, For } from "solid-js"
import { bingo } from "../../../stores/bingo"
import { Cell } from "./Cell"
import { cn } from '../../../utils/cn'

interface BingoProps { }

export const Bingo: Component<BingoProps> = () => {
  const isWide = createMemo(() => bingo.size.x > bingo.size.y);

  return (
    <div
      class={cn("grid gap-2", isWide() ? "w-full" : "h-full")}
      style={{
        "grid-template-columns": `repeat(${bingo.size.x}, 1fr)`,
        "grid-template-rows": `repeat(${bingo.size.y}, 1fr)`,
        "max-width": "80vw",
        "max-height": "80vh"
      }}
    >
      <For each={bingo.items}>
        {(item, index) => (
          <Cell item={item} index={index} />
        )}
      </For>
    </div >
  )
}
