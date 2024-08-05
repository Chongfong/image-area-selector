export interface Block {
  id: number;
  startX: number;
  startY: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export const detectCollision = (rect1: Block, rect2: Block): boolean => {
  return !(
    rect1.x + rect1.width <= rect2.x ||
    rect1.x >= rect2.x + rect2.width ||
    rect1.y + rect1.height <= rect2.y ||
    rect1.y >= rect2.y + rect2.height
  );
};

export const hasCollision = (
  blocks: Block[],
  newBounds: Block,
  id?: number,
): boolean => {
  return blocks
    .filter((block) => block.id !== id)
    .some((block) => detectCollision(newBounds, block));
};
