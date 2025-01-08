import { createForm } from "@tanstack/solid-form";
import { ToggleGroup } from '@kobalte/core/toggle-group';
import { createEffect, createSignal, onMount } from "solid-js";
import { changeMode, Mode } from "../../stores/bingo";
import { cn } from '../../utils/cn'

export const ModeForm = () => {
  const [value, setValue] = createSignal<Mode>('auto');
  const [indicatorWidth, setIndicatorWidth] = createSignal(0);
  const [indicatorPosition, setIndicatorPosition] = createSignal(0);

  let autoRef: HTMLButtonElement | undefined;
  let manualRef: HTMLButtonElement | undefined;

  const form = createForm<{ mode: Mode }>(() => ({
    defaultValues: {
      mode: 'auto',
    },
    onSubmit: async ({ value: formValue }) => {
      formValue.mode = value();
      changeMode(formValue.mode)
    }
  }));

  onMount(() => {
    if (autoRef) {
      setIndicatorWidth(autoRef.offsetWidth);
    }
  });

  createEffect(() => {
    const currentValue = value();
    const width = currentValue === 'auto' ?
      autoRef?.offsetWidth :
      manualRef?.offsetWidth;

    if (width) {
      setIndicatorWidth(width);
    }

    setIndicatorPosition(
      currentValue === 'manual' && autoRef ?
        autoRef.offsetWidth + 8 :
        0
    );
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div class="flex items-center justify-between gap-x-2">
        <h3 class="font-semibold">Mode</h3>

        <form.Field
          name="mode"
          children={(field) => (
            <ToggleGroup
              value={field().state.value}
              onChange={(newValue) => {
                if (newValue === 'auto' || newValue === 'manual') {
                  setValue(newValue);
                  field().handleChange(newValue);
                  form.handleSubmit();
                }
              }}
              onBlur={field().handleBlur}
              class="flex items-center gap-x-2 relative h-10 w-max rounded-2xl bg-background-300 border-2 border-background-100 p-1"
            >
              <div
                class="absolute bg-white rounded-xl transition-all duration-200 ease-out"
                style={{
                  "height": "calc(100% - 8px)",
                  "width": `${indicatorWidth()}px`,
                  "transform": `translateX(${indicatorPosition()}px)`
                }}
              />

              <ToggleGroup.Item
                ref={autoRef}
                value="auto"
                class={cn(
                  "relative z-10 px-4 py-1.5 transition-colors",
                  value() === 'auto' ? "text-brand" : "text-black"
                )}
              >
                Auto
              </ToggleGroup.Item>

              <ToggleGroup.Item
                ref={manualRef}
                value="manual"
                class={cn(
                  "relative z-10 px-4 py-1.5 transition-colors",
                  value() !== 'auto' ? "text-brand" : "text-black"
                )}
              >
                Manual
              </ToggleGroup.Item>
            </ToggleGroup>
          )}
        />
      </div>
    </form>
  );
};
