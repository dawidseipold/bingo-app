
import { createSignal, createEffect, For, Show } from 'solid-js';
import { Tile } from './components/Tile';
import { items as itemsStore } from './stores/items';
import { shuffle } from './utils/shuffle';
import { Menu } from './components/Menu';
import { bingo } from './stores/bingo';

function App() {
  const items = () => itemsStore.items;

  return (
    <main class="w-dvw flex flex-col gap-y-8 p-8 items-center min-h-dvh bg-background-100">
      <div class="flex justify-between gap-x-8 w-full">
        <div class="flex rounded-3xl bg-background-200 w-full justify-center items-center p-4 max-h-[calc(100dvh-4rem)]">
          <Show when={bingo.items.length > 0}>
            <div
              style={{
                display: "grid",
                "grid-template-columns": `repeat(${bingo.size.x}, 1fr)`,
                "grid-template-rows": `repeat(${bingo.size.y}, 1fr)`
              }}
              class="w-max h-max min-w-[50%] min-h-[50%] gap-4 bg-blue-400/25 rounded-2xl p-4 aspect-square"
            >
              <For each={bingo.items}>
                {(item) => (
                  <Tile text={item.value} />
                )}
              </For>
            </div>
          </Show>
        </div>

        <Menu />
      </div>
    </main>
  );
}

export default App;

