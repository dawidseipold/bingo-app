import { createStore } from "solid-js/store";
import { Item } from "./items";
import * as v from 'valibot';

export const sizeSchema = v.object({
  x: v.pipe(
    v.number(),
    v.minValue(1),
    v.maxValue(10)

  ),
  y: v.pipe(
    v.number(),
    v.minValue(1),
    v.maxValue(10)
  )
});

export type Size = v.InferInput<typeof sizeSchema>;
export type Mode = 'manual' | 'auto';
interface BingoItem extends Item {
  empty: boolean
}

export interface BingoStore {
  mode: Mode,
  items: BingoItem[],
  size: Size
}

export const [bingo, setBingo] = createStore<BingoStore>({
  mode: 'auto',
  items: [],
  size: {
    x: 5,
    y: 5
  }
})

export const changeSize = (newSize: Size) => {
  setBingo("size", newSize)
}

export const changeMode = (newMode: Mode) => {
  setBingo("mode", newMode)
}

// TODO: If there's no items it should return an empty list (at least I think so, still need to wrap my mind around how I want it to work)
export const setBingoItems = (newItems: Item[]) => {
  const totalSlots = bingo.size.x * bingo.size.y;
  const filledItems: BingoItem[] = newItems.slice(0, totalSlots).map(item => ({
    ...item,
    empty: false
  }));

  while (filledItems.length < totalSlots) {
    filledItems.push({
      id: `empty-${filledItems.length}`,
      value: '',
      empty: true
    });
  }

  setBingo("items", filledItems);
};
