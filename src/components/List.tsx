import { VsClose } from 'solid-icons/vs';
import { Component, For } from "solid-js";
import { Item, setItems } from "../stores/items";

interface ListProps {
  items: Item[];
}

export const List: Component<ListProps> = (props) => {
  const items = () => props.items;

  return (
    <ul class="flex flex-wrap gap-x-2 gap-y-2 items-start w-full">
      <For each={items()}>
        {(item, index) => {
          const currentIndex = index();

          return (
            <button
              onClick={() => {
                setItems("items", (prevItems) =>
                  prevItems.filter((_, i) => i !== currentIndex)
                );
              }}
              class="flex gap-x-2 items-center text-white bg-custom-background-tertiary pl-2 pr-4 py-2 rounded-3xl hover:bg-custom-background-tertiary/75 cursor-pointer group"
            >
              <span class="bg-rose-600/75 p-1 rounded-full w-6 h-6 flex items-center justify-center group-hover:bg-rose-600/50">
                <VsClose />
              </span>

              <span>{item.text}</span>
            </button>
          );
        }}
      </For>
    </ul>
  );
};

