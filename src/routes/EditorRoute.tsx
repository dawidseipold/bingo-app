import { Match, Switch } from "solid-js"
import { Bingo } from "../components/editor/bingo/Bingo"
import { Menu } from "../components/Menu"
import { ToggleButton } from "@kobalte/core/toggle-button"
import { EditorMenu } from "../components/editor/menu/Menu"

export const EditorRoute = () => {
  return (
    <main>
      <Bingo />
      {/* <Menu /> */}

      <ToggleButton aria-label="menu-state">
        {state => (
          <EditorMenu expanded={state.pressed()} />
        )}
      </ToggleButton>
    </main>
  )
}

