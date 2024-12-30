
import { Component } from "solid-js";
import { Item, setItems } from "../stores/items";

interface FormProps {
  onShuffle: () => void;
  emptyMiddle: boolean;
  setEmptyMiddle: (value: boolean) => void;
}

export const Form: Component<FormProps> = (props) => {
  let formRef: HTMLFormElement | undefined;

  return (
    <form
      ref={(el) => (formRef = el)}
      class="flex gap-x-4 w-full"
      onSubmit={(e) => {
        e.preventDefault();

        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const content = formData.get("content") as string;

        if (!content.trim()) {
          alert("Please enter a valid item.");
          return;
        }

        setItems("items", (prevItems: Item[]) => [
          ...prevItems,
          {
            text: content,
          },
        ]);

        formRef?.reset();
        props.onShuffle();
      }}
    >
      <input
        class="bg-custom-background-secondary w-full h-16 rounded-3xl text-white px-6 py-4 text-xl"
        type="text"
        id="content"
        name="content"
      />
      <div class="flex gap-x-2 text-white items-center">
        <input
          id="empty"
          name="empty"
          type="checkbox"
          checked={props.emptyMiddle}
          onInput={(e) => props.setEmptyMiddle(e.currentTarget.checked)}
        />

        <label for="empty" class="flex w-max font-bold text-xl">Empty Middle</label>
      </div>

      <button class="flex items-center justify-center bg-blue-500 hover:bg-blue-500/75 rounded-3xl p-4 text-white font-bold tracking-wider">
        Submit
      </button>
    </form>
  );
};

