import { createStore } from "solid-js/store"

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
}

export const removeItem = (item: Item) => {
  setItems("items", (prevItems: Item[]) =>
    prevItems.filter(prevItem => prevItem.id !== item.id)
  )
}
export const editItem = (item: Item) => {
  setItems("items", (prevItems: Item[]) =>
    prevItems.map((prevItem: Item) =>
      prevItem.id === item.id ? item : prevItem
    )
  )
}

