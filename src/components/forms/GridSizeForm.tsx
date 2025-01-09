import { Select } from "@kobalte/core/select"
import { createForm } from "@tanstack/solid-form"
import { FaSolidCheck as Check, FaSolidChevronDown as ChevronDown } from 'solid-icons/fa'
import { changeSize, setBingoItems, Size, sizeSchema } from "../../stores/bingo"
import { IoClose as X } from 'solid-icons/io'
import * as v from 'valibot';
import { items, setItems } from "../../stores/items"

export const GridSizeForm = () => {
  const form = createForm<Size>(() => ({
    defaultValues: {
      x: 5,
      y: 5
    },
    onSubmit: async ({ value }) => {
      changeSize(value);
      setBingoItems(items.items)
    }
  }))

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      e.stopPropagation();
      form.handleSubmit();
    }}>
      <div class="flex items-center gap-x-2">
        <h3 class="font-semibold">Size</h3>

        <form.Field
          name='x'
          validators={{
            onChange: v.pipe(
              v.number(),
              v.minValue(1, "Size must be at least 1"),
              v.maxValue(15, "Size can't be bigger than 15")
            ),
          }}
          children={(field) => (
            <input
              type="number"
              min="1"
              max="15"
              name={field().name}
              value={field().state.value}
              onBlur={field().handleBlur}
              onChange={(e) => {
                const value = Math.min(Math.max(Number(e.currentTarget.value), 1), 15);
                field().handleChange(value);

                form.handleSubmit();
              }}
              class="ml-auto w-16 flex justify-center text-center items-center px-4 h-10 bg-background-300 border-2 border-background-100 text-black rounded-2xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          )}
        />

        <span><X /></span>

        <form.Field
          name='y'
          children={(field) => (
            <input
              type="number"
              min="1"
              max="15"
              name={field().name}
              value={field().state.value}
              onBlur={field().handleBlur}
              onChange={(e) => {
                const value = Math.min(Math.max(Number(e.currentTarget.value), 1), 15);
                field().handleChange(value);

                form.handleSubmit();
              }}
              class="w-16 flex justify-center text-center items-center px-4 h-10 bg-background-300 border-2 border-background-100 text-black rounded-2xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          )}
        />
      </div>
    </form>
  )
}
