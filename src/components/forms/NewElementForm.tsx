import { createForm } from "@tanstack/solid-form"
import { addItem, Item, itemSchema } from "../../stores/items"
import { FaSolidArrowRightLong as ArrowRight } from 'solid-icons/fa'

export const NewElementForm = () => {
  const form = createForm<Item>(() => ({
    defaultValues: {
      id: "",
      value: ""
    },
    onSubmit: async ({ value, formApi }) => {
      value.id = crypto.randomUUID();
      addItem(value);

      formApi.reset();
    }
  }))

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      class="flex flex-col gap-y-1"
    >
      <form.Field
        name="value"
        validators={{
          onChange: itemSchema
        }}
        children={(field) => (
          <>
            <label for={field().name} class="font-semibold">Add new element</label>

            <div class="flex items-center gap-x-2 h-10 w-full">
              <input
                name={field().name}
                id={field().name}
                value={field().state.value}
                onBlur={field().handleBlur}
                onInput={(e) => field().handleChange(e.target.value)}
                class="flex items-center px-4 h-full w-full bg-background-300 border-2 border-background-100 text-black rounded-2xl"
              />

              {/* TODO: Add a custom action button class */}
              <button type="submit" class="bg-black rounded-xl h-full text-white aspect-square flex items-center justify-center">
                <ArrowRight />
              </button>
            </div>
          </>
        )}
      />
    </form>
  )
}

