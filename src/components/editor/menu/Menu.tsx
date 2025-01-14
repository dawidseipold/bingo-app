import { Component, Match, Setter, Show, Switch } from "solid-js";
import { FaSolidAnglesLeft as DoubleChevron, FaSolidPlus as Plus } from 'solid-icons/fa'
import { cn } from "../../../utils/cn";
import { ToggleButton } from "@kobalte/core/toggle-button";
import { GridSizeForm } from "../../forms/GridSizeForm";
import { ElementsList } from "../../ElementsList";
import { NewElementForm } from "../../forms/NewElementForm";

interface EditorMenuProps {
  expanded: boolean
  setExpanded: Setter<boolean>
}

export const EditorMenu: Component<EditorMenuProps> = (props) => {

  return (
    <aside class="fixed top-8 right-8 flex flex-col gap-y-2 max-h-[calc(100dvh-4rem)] h-max rounded-2xl p-1 bg-background-100">
      <ToggleButton
        pressed={props.expanded}
        onChange={props.setExpanded}
        aria-label="menu-state"
        class={cn("flex items-center justify-center p-3.5 rounded-2xl hover:bg-background-200", { ["w-max"]: props.expanded })}
      >
        <DoubleChevron class={cn({ ["rotate-180"]: props.expanded })} />
      </ToggleButton>

      <Show when={props.expanded}>
        <div class="flex flex-col gap-y-4 p-2 overflow-scroll">
          <GridSizeForm />
          <NewElementForm />
          <ElementsList />
        </div>
      </Show>
    </aside>
  )
}
