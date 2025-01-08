import { createStore } from "solid-js/store";
import { Item } from "./items";
import * as v from 'valibot';

export const sizeSchema = v.object({
  x: v.pipe(
    v.number(),
    v.minValue(1),
    v.maxValue(15)

  ),
  y: v.pipe(
    v.number(),
    v.minValue(1),
    v.maxValue(15)
  )
});

export type Size = v.InferInput<typeof sizeSchema>;

export type Mode = 'manual' | 'auto';

export interface BingoStore {
  mode: Mode,
  items: Item[],
  size: Size
}

export const [bingo, setBingo] = createStore<BingoStore>({
  mode: 'auto',
  items: [],
  size: {
    x: 0,
    y: 0
  }
})

export const changeSize = (newSize: Size) => {
  setBingo("size", newSize)
}

export const changeMode = (newMode: Mode) => {
  setBingo("mode", newMode)
}
