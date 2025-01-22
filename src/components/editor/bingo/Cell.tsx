import { Accessor, Component } from "solid-js"
import { bingo, BingoItem } from "../../../stores/bingo"
import { cn } from "../../../utils/cn";

interface CellProps {
  item: BingoItem;
  index: Accessor<number>;
}

export const Cell: Component<CellProps> = (props) => {
  const item = () => props.item;

  const colorMap = {
    blue: ['bg-blue-400', 'bg-blue-600'],
    red: ['bg-red-400', 'bg-red-500'],
    green: ['bg-green-400', 'bg-green-500'],
    purple: ['bg-purple-400', 'bg-purple-500'],
    orange: ['bg-orange-400', 'bg-orange-500'],
    teal: ['bg-teal-400', 'bg-teal-500']
  };

  const getCellColor = (rowIndex: number, colIndex: number) => {
    const colors = colorMap[bingo.color];

    return (rowIndex + colIndex) % 2 === 0 ? colors[0] : colors[1];
  };

  const rowIndex = Math.floor(props.index() / bingo.size.x);
  const colIndex = props.index() % bingo.size.x;

  return (
    <div
      class={cn(
        "flex items-center justify-center text-center rounded-2xl aspect-square w-full h-full",
        getCellColor(rowIndex, colIndex)
      )}
    >
      {item().value}
    </div>
  )
}
