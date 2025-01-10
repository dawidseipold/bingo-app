import { createStore } from "solid-js/store"
import * as v from 'valibot';
import { setBingoItems } from "./bingo";

export const itemSchema = v.pipe(
  v.string(),
  v.nonEmpty("Item can't be empty"),
  v.maxLength(64, "Item too long")
);

export interface Item {
  id: string;
  value: string;
}

export interface ItemsStore {
  items: Item[]
}

export const [items, setItems] = createStore<ItemsStore>({
  items: [],
})

export const addItem = (item: Item) => {
  setItems("items", (prevItems: Item[]) => [
    ...prevItems,
    item
  ]);

  setBingoItems(items.items)
}

export const removeItem = (item: Item) => {
  setItems("items", (prevItems: Item[]) =>
    prevItems.filter(prevItem => prevItem.id !== item.id)
  )

  setBingoItems(items.items)
}
export const editItem = (item: Item) => {
  setItems("items", (prevItems: Item[]) =>
    prevItems.map((prevItem: Item) =>
      prevItem.id === item.id ? item : prevItem
    )
  )

  setBingoItems(items.items)
}

