import { For, Match, Switch } from "solid-js";
import { items, removeItem, setItems } from "../stores/items";
import { FaSolidTrashCan as Trash } from 'solid-icons/fa'
import { Dialog } from "@kobalte/core/dialog";
import { FiEdit3 as Edit } from 'solid-icons/fi'
import { IoClose as Close } from 'solid-icons/io'
import { EditElementForm } from "./forms/EditElementForm";

export const ElementsList = () => {
  return (
    <div class="flex flex-col gap-y-1">
      <h3 class="font-semibold">All Elements</h3>

      <Switch>
        <Match when={items.items.length === 0}>
          Nothing to show...
        </Match>

        <Match when={items.items.length > 0}>
          <ul class="flex flex-col gap-x-2 gap-y-2 items-start w-full">
            <For each={items.items}>
              {(item, _) => {
                return (
                  <div
                    class="flex w-full gap-x-2 items-center hover:bg-background-300 p-1 pl-3 rounded-2xl"
                  >
                    <span class="mr-auto text-wrap truncate max-w-48">{item.value}</span>

                    <nav class="flex gap-x-1">
                      <Dialog>
                        <Dialog.Trigger
                          as="button"
                          class="p-2 w-8 rounded-xl bg-black/25 hover:bg-black/15 text-white aspect-square flex justify-center items-center"
                        >
                          <Edit class="w-4 aspect-square" />
                        </Dialog.Trigger>

                        <Dialog.Portal>
                          <Dialog.Overlay class="bg-black/75 w-dvw h-dvh absolute left-0 top-0" />

                          <Dialog.Content class="section absolute inset-1/2 flex flex-col gap-y-4 h-max w-[512px] -translate-x-1/2 -translate-y-1/2">
                            <Dialog.CloseButton class="absolute right-2 top-2 flex items-center justify-center p-2 rounded-full bg-rose-500 hover:bg-rose-500/75 text-white">
                              <Close class="w-4 h-4" />
                            </Dialog.CloseButton>

                            <Dialog.Title class="font-bold text-2xl">
                              Edit
                            </Dialog.Title>

                            <EditElementForm item={item} />

                          </Dialog.Content>
                        </Dialog.Portal>
                      </Dialog>

                      <button
                        class="p-2 w-8 rounded-xl bg-rose-500 hover:bg-rose-500/85 text-white aspect-square flex justify-center items-center"
                        onClick={() => {
                          removeItem(item)
                        }}
                      >
                        <Trash class="w-3 aspect-square" />
                      </button>
                    </nav>
                  </div>
                );
              }}
            </For>
          </ul>
        </Match>
      </Switch>
    </div >
  )
}
