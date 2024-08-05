import { Block } from "./blockUtils";
import { hasCollision } from "./blockUtils";

export const handleMouseDown = (
  e: React.MouseEvent<HTMLDivElement>,
  previewRef: React.RefObject<HTMLDivElement>,
  setCreating: React.Dispatch<React.SetStateAction<boolean>>,
  setNewBlock: React.Dispatch<React.SetStateAction<Block | null>>,
  counter: number,
  draggingRef: React.RefObject<boolean | null>,
): void => {
  if (draggingRef.current) return;
  const rect = previewRef.current?.getBoundingClientRect();
  if (!rect) return;

  setCreating(true);
  setNewBlock({
    id: counter,
    startX: e.clientX - rect.left,
    startY: e.clientY - rect.top,
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
    width: 0,
    height: 0,
  });
};

export const handleMouseMove = (
  e: React.MouseEvent<HTMLDivElement>,
  previewRef: React.RefObject<HTMLDivElement>,
  creating: boolean,
  newBlock: Block | null,
  setNewBlock: React.Dispatch<React.SetStateAction<Block | null>>,
): void => {
  if (!creating || !newBlock || !previewRef.current) return;
  const rect = previewRef.current.getBoundingClientRect();
  const currentX = e.clientX - rect.left;
  const currentY = e.clientY - rect.top;

  const startX = Math.max(0, Math.min(newBlock.startX, rect.width));
  const startY = Math.max(0, Math.min(newBlock.startY, rect.height));

  const width = Math.max(0, Math.min(rect.width, Math.abs(currentX - startX)));
  const height = Math.max(
    0,
    Math.min(rect.height, Math.abs(currentY - startY)),
  );

  const x = Math.max(
    0,
    Math.min(rect.width - width, Math.min(startX, currentX)),
  );
  const y = Math.max(
    0,
    Math.min(rect.height - height, Math.min(startY, currentY)),
  );

  setNewBlock({ ...newBlock, x, y, width, height });
};

export const handleMouseUp = (
  creating: boolean,
  newBlock: Block | null,
  setCreating: React.Dispatch<React.SetStateAction<boolean>>,
  setNewBlock: React.Dispatch<React.SetStateAction<Block | null>>,
  blocks: Block[],
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>,
  setCounter: React.Dispatch<React.SetStateAction<number>>,
): void => {
  if (!creating || !newBlock) return;
  setCreating(false);
  if (
    newBlock.width > 0 &&
    newBlock.height > 0 &&
    !hasCollision(blocks, newBlock)
  ) {
    setBlocks((prevBlocks) => [...prevBlocks, newBlock]);
    setCounter((prevCounter) => prevCounter + 1);
  }
  setNewBlock(null);
};
