import { Block } from "./blockUtils";
import { hasCollision } from "./blockUtils";

export const updateBlock = (
  blocks: Block[],
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>,
  id: number,
  data: Partial<Block>,
): void => {
  setBlocks(
    blocks.map((block) => (block.id === id ? { ...block, ...data } : block)),
  );
};

export const deleteBlock = (
  blocks: Block[],
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>,
  id: number,
): void => {
  setBlocks(blocks.filter((block) => block.id !== id));
};

export const handleDragStatus = (
  ref: React.MutableRefObject<boolean | null>,
  status: boolean | null,
) => {
  ref.current = status;
};

export const handleDragStop = (
  blocks: Block[],
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>,
  id: number,
  d: { x: number; y: number },
): void => {
  const newBounds = {
    ...blocks.find((block) => block.id === id)!,
    x: d.x,
    y: d.y,
  };
  if (!hasCollision(blocks, newBounds, id)) {
    updateBlock(blocks, setBlocks, id, { x: d.x, y: d.y });
  }
};

export const handleResizeStop = (
  blocks: Block[],
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>,
  id: number,
  ref: HTMLElement,
  position: { x: number; y: number },
): void => {
  const newBounds = {
    ...blocks.find((block) => block.id === id)!,
    width: parseInt(ref.style.width, 10),
    height: parseInt(ref.style.height, 10),
    ...position,
  };
  if (!hasCollision(blocks, newBounds, id)) {
    updateBlock(blocks, setBlocks, id, {
      width: parseInt(ref.style.width, 10),
      height: parseInt(ref.style.height, 10),
      ...position,
    });
  }
};
