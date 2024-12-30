
import { createSignal, createEffect, For, Show } from 'solid-js';
import { Tile } from './components/Tile';
import { Form } from './components/Form';
import { items as itemsStore } from './stores/items';
import { shuffle } from './utils/shuffle';
import { List } from './components/List';

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
      shuffled.splice(middleIndex, 0, { text: "" });
    }

    while (shuffled.length < gridLength) {
      shuffled.push({ text: "" });
    }

    setShuffledItems(shuffled);
  };

  return (
    <main class="flex flex-col gap-y-8 px-32 py-8 items-center min-h-dvh bg-custom-background-primary">
      <h1 class="text-white text-6xl font-bold">BINGO APP</h1>

      <Form
        onShuffle={shuffleItems}
        emptyMiddle={emptyMiddle()}
        setEmptyMiddle={(value) => {
          setEmptyMiddle(value);
          if (!value) {
            shuffleItems();
          }
        }}
      />

      <button onClick={shuffleItems} class="flex items-center justify-center border-4 border-blue-500 hover:border-blue-500/75 rounded-3xl p-4 text-blue-500 hover:text-blue-500/75 font-bold tracking-wider">Shuffle</button>

      <List items={items()} />

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
              <Tile text={item.text} />
            )}
          </For>
        </div>
      </Show>
    </main>
  );
}

export default App;

