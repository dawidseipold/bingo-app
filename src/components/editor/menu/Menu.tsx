import { Component, Match, Switch } from "solid-js";
import { FaSolidAnglesLeft as DoubleChevron } from 'solid-icons/fa'

interface EditorMenuProps {
  expanded: boolean
}

export const EditorMenu: Component<EditorMenuProps> = (props) => {
  const expanded = () => props.expanded;

  return (
    <div>
      <Switch>
        <Match when={props.expanded}>
          Expanded
        </Match>

        <Match when={!props.expanded}>
          Shrunk
        </Match>
      </Switch>
    </div>
  )
}
