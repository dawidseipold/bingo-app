
import { createSignal, createEffect, For, Show } from 'solid-js';
import { Tile } from './components/Tile';
import { items as itemsStore } from './stores/items';
import { shuffle } from './utils/shuffle';
import { Menu } from './components/Menu';

function App() {
  const items = () => itemsStore.items;
  const [shuffledItems, setShuffledItems] = createSignal(items());
  const [emptyMiddle, setEmptyMiddle] = createSignal(false);

  createEffect(() => {
    setShuffledItems(items());
  });

  const gridSize = () => {
    const length = items().length + (emptyMiddle() ? 1 : 0);
    return Math.ceil(Math.sqrt(length));
  };


  const shuffleItems = () => {
    setShuffledItems(items());
    let shuffled = shuffle(itemsStore.items);

    const totalElements = shuffled.length + (emptyMiddle() ? 1 : 0);
    const gridSize = Math.ceil(Math.sqrt(totalElements));
    const gridLength = gridSize * gridSize;

    if (emptyMiddle() && gridSize % 2 !== 0) {
      const middleIndex = Math.floor(gridLength / 2);
      shuffled.splice(middleIndex, 0, { value: "" });
    }

    while (shuffled.length < gridLength) {
      shuffled.push({ value: "" });
    }

    setShuffledItems(shuffled);
  };

  return (
    <main class="flex flex-col gap-y-8 p-8 items-center min-h-dvh bg-background-100">


      <div class="flex gap-x-8 w-full">
        <div class="flex w-full section">
          s
          <Show when={shuffledItems().length > 0}>
            <div
              style={{
                display: "grid",
                "grid-template-columns": `repeat(${gridSize()}, 1fr)`,
                "grid-template-rows": `repeat(${gridSize()}, 1fr)`
              }}
              class="w-max h-max gap-4 bg-blue-400/25 rounded-3xl p-4"
            >
              <For each={shuffledItems()}>
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

