import { FaSolidShuffle as Shuffle, FaSolidPlus as Plus } from 'solid-icons/fa'
import { Tooltip } from "@kobalte/core/tooltip";
import { Tabs } from '@kobalte/core/tabs';
import { For } from 'solid-js';
import { items } from '../stores/items';
import { NewElementForm } from './forms/NewElementForm';
import { ElementsList } from './ElementsList';
import { GridSizeForm } from './forms/GridSizeForm';
import { ModeForm } from './forms/ModeForm';


const MENU_ITEMS = [
  {
    name: "Bingo",
    value: "bingo"
  },
  {
    name: "Settings",
    value: "settings"
  }
]

export const Menu = () => {
  return (
    <aside class="flex flex-col gap-y-16 section pt-0 w-max min-w-[376px] overflow-scroll">
      <Tabs aria-label="menu navigation" class="flex flex-col gap-y-4">
        <Tabs.List class="flex flex-col sticky top-0 bg-background-200 z-50 pt-4">
          <ul class="flex gap-x-2">
            <For each={MENU_ITEMS}>
              {(item, _) => (
                <Tabs.Trigger value={item.value} as="li" class="px-4 group cursor-pointer font-semibold">
                  {item.name}
                  <span class="flex w-full h-1.5 mt-1 rounded-t-xl group-data-[selected]:bg-brand"></span>
                </Tabs.Trigger>
              )}
            </For>
          </ul>

          <span class="flex -mx-4 w-[calc(100%+32px)] h-[1px] bg-background-100"></span>

        </Tabs.List>

        <Tabs.Content value="bingo" class="flex flex-col gap-y-4">
          <ModeForm />
          <GridSizeForm />
          <NewElementForm />
          <ElementsList />
        </Tabs.Content>

        <Tabs.Content value="settings">
          2
        </Tabs.Content>
      </Tabs>

      {/* <Tooltip openDelay={100} closeDelay={50}> */}
      {/*   <Tooltip.Trigger class="p-1.5 border-[3px] border-stone-600 hover:border-stone-600/75 rounded-xl group"> */}
      {/*     <Plus class="w-5 h-5 text-stone-600 group-hover:text-stone-600/75" /> */}
      {/*   </Tooltip.Trigger> */}

      {/*   <Tooltip.Portal> */}
      {/*     <Tooltip.Content class="bg-stone-700 text-white tracking-wide font-semibold px-4 py-2 rounded-2xl mt-2"> */}
      {/*       Add new */}
      {/*     </Tooltip.Content> */}
      {/*   </Tooltip.Portal> */}
      {/* </Tooltip> */}

      {/* <button onClick={shuffleItems} class="flex items-center justify-center border-4 border-blue-500 hover:border-blue-500/75 rounded-3xl p-4 text-blue-500 hover:text-blue-500/75 font-bold tracking-wider">Shuffle</button> */}
    </aside >
  )
}

