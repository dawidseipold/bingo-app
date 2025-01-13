import { Accessor, Component } from "solid-js"
import { bingo, BingoItem } from "../../../stores/bingo"
import { cn } from "../../../utils/cn";

interface CellProps {
  item: BingoItem;
  index: Accessor<number>;
}

export const Cell: Component<CellProps> = (props) => {
  const item = () => props.item;
  const isBingoEven = (bingo.size.x * bingo.size.y) % 2 === 0;

  const getCellColor = (rowIndex: number, colIndex: number) => {
    if (isBingoEven) {
      return (rowIndex % 2 === 0) ? (colIndex % 2 === 0 ? "bg-green-500" : "bg-blue-500") : (colIndex % 2 === 0 ? "bg-blue-500" : "bg-green-500");
    } else {
      return (rowIndex % 2 === 0) ? (colIndex % 2 === 0 ? "bg-green-500" : "bg-blue-500") : (colIndex % 2 === 0 ? "bg-blue-500" : "bg-green-500");
    }
  }

  const rowIndex = Math.floor(props.index() / bingo.size.x);
  const colIndex = props.index() % bingo.size.x;

  return (
    <div
      class={cn(
        "flex items-center justify-center text-center rounded-3xl",
        getCellColor(rowIndex, colIndex)
      )}>
      {item().value}
    </div>
  )
}
