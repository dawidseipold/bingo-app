import { createStore } from "solid-js/store"

export interface Item {
  text: string
}

export interface ItemsStore {
  items: Item[]
}

export const [items, setItems] = createStore<ItemsStore>({
  items: [],
})
