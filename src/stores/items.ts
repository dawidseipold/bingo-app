import { createStore } from "solid-js/store"

export interface Item {
  value: string
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
}

export const removeItem = (item: Item) => {
  setItems("items", (prevItems: Item[]) =>
    prevItems.filter(prevItem => prevItem.value !== item.value)
  )
}
