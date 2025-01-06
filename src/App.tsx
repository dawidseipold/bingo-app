
import { createSignal, createEffect, For, Show } from 'solid-js';
import { Tile } from './components/Tile';
import { items as itemsStore } from './stores/items';
import { shuffle } from './utils/shuffle';
import { Menu } from './components/Menu';
import { bingo } from './stores/bingo';

function App() {
  const items = () => itemsStore.items;

  return (
    <main class="flex flex-col gap-y-8 p-8 items-center min-h-dvh bg-background-100">


      <div class="flex gap-x-8 w-full">
        <div class="flex w-full section">
          {/* <Show when={shuffledItems().length > 0}> */}
          <div
            style={{
              display: "grid",
              "grid-template-columns": `repeat(${bingo.size.x}, 1fr)`,
              "grid-template-rows": `repeat(${bingo.size.y}, 1fr)`
            }}
            class="w-max h-max gap-4 bg-blue-400/25 rounded-3xl p-4"
          >
            <For each={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}>
              {(item) => (
                <Tile text={"test"} />
              )}
            </For>
          </div>
          {/* </Show> */}
        </div>

        <Menu />
      </div>
    </main>
  );
}

export default App;

