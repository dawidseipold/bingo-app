import { createSignal, Match, Switch } from "solid-js"
import { Bingo } from "../components/editor/bingo/Bingo"
import { Menu } from "../components/Menu"
import { ToggleButton } from "@kobalte/core/toggle-button"
import { EditorMenu } from "../components/editor/menu/Menu"

export const EditorRoute = () => {
  const [expanded, setExpanded] = createSignal(false);

  return (
    <main class="flex items-center justify-center w-dvw h-dvh">
      <Bingo />
      {/* <Menu /> */}

      <EditorMenu expanded={expanded()} setExpanded={setExpanded} />
    </main>
  )
}

