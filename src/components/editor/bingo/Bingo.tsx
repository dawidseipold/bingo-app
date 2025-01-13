import { Component, For } from "solid-js"
import { bingo } from "../../../stores/bingo"
import { Cell } from "./Cell"

interface BingoProps { }

export const Bingo: Component<BingoProps> = () => {
  return (
    <div
      class="grid"
      style={{
        "grid-template-columns": `repeat(${bingo.size.x}, 1fr)`,
        "grid-template-rows": `repeat(${bingo.size.y}, 1fr)`
      }}
    >
      <For each={bingo.items}>
        {(item, index) => (
          <Cell item={item} index={index} />
        )}
      </For>
    </div>
  )
}
