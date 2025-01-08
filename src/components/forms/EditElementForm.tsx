// TODO: form validation
// TODO: tailwind-variants

import { createForm } from "@tanstack/solid-form"
import { editItem, Item } from "../../stores/items"
import { Component } from "solid-js"

interface EditElementFormProps {
  item: Item
}

export const EditElementForm: Component<EditElementFormProps> = (props) => {
  const item = () => props.item;

  const form = createForm<Item>(() => ({
    defaultValues: {
      id: item().id,
      value: item().value
    },
    onSubmit: async ({ value }) => {
      editItem(value)
    },
  }))

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      class="flex flex-col gap-y-4"
    >

      <form.Field
        name="value"
        children={(field) => (
          <div class="flex flex-col gap-y-1">
            <label for={field().name}>Value</label>
            <input
              id={field().name}
              name={field().name}
              value={field().state.value}
              onBlur={field().handleBlur}
              onInput={(e) => field().handleChange(e.target.value)}
              class="flex items-center px-4 h-10 w-full bg-background-300 border-2 border-background-100 text-black rounded-2xl"
            />
          </div>
        )}
      />

      <button type="submit" class="self-end bg-brand rounded-2xl h-10 px-4 py-2 text-white aspect-square flex items-center justify-center" >Submit</button>
    </form>
  )
}

