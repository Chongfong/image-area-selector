import React, { useState, useRef, MouseEvent } from "react";
import { Rnd } from "react-rnd";
import { Block } from "../common/block";
import "./ImageAreaSelector.css";
import { DeleteIcon } from "../common/DeleteIcon";

interface ImageAreaSelectorProps {
  imageSrc: string | null;
  blocks: Block[];
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
}

interface detectCollisionProps {
  rect1: Block;
  rect2: Block;
}

interface hasCollisionProps {
  newBounds: Block;
  id?: number | null;
}

interface updateBlockProps {
  id: number;
  data: Partial<Block>;
}

interface handleDragStopProps {
  id: number;
  d: { x: number; y: number };
}

interface handleResizeStopProps {
  id: number;
  ref: HTMLElement;
  position: { x: number; y: number };
}

const ImageAreaSelector: React.FC<ImageAreaSelectorProps> = ({
  imageSrc,
  blocks,
  setBlocks,
}) => {
  const draggingRef = useRef<boolean | null>(null);
  const [creating, setCreating] = useState<boolean>(false);
  const [newBlock, setNewBlock] = useState<Block | null>(null);
  const [counter, setCounter] = useState<number>(0);
  const previewRef = useRef<HTMLDivElement | null>(null);

  const detectCollision = ({ rect1, rect2 }: detectCollisionProps): boolean => {
    return !(
      rect1.x + rect1.width <= rect2.x ||
      rect1.x >= rect2.x + rect2.width ||
      rect1.y + rect1.height <= rect2.y ||
      rect1.y >= rect2.y + rect2.height
    );
  };

  const hasCollision = ({
    newBounds,
    id = null,
  }: hasCollisionProps): boolean => {
    return blocks
      .filter((block) => block.id !== id)
      .some((block) => detectCollision({ rect1: newBounds, rect2: block }));
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>): void => {
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

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>): void => {
    if (!creating || !newBlock || !previewRef.current) return;
    const rect = previewRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    const width = Math.min(
      Math.abs(currentX - newBlock.startX),
      rect.width - newBlock.startX,
    );
    const height = Math.min(
      Math.abs(currentY - newBlock.startY),
      rect.height - newBlock.startY,
    );

    const x = Math.min(newBlock.startX, Math.max(0, currentX));
    const y = Math.min(newBlock.startY, Math.max(0, currentY));

    setNewBlock({ ...newBlock, x, y, width, height });
  };

  const handleMouseUp = (): void => {
    if (!creating || !newBlock) return;
    setCreating(false);
    if (
      newBlock.width > 0 &&
      newBlock.height > 0 &&
      !hasCollision({ newBounds: newBlock })
    ) {
      setBlocks([...blocks, newBlock]);
      setCounter(counter + 1);
    }
    setNewBlock(null);
  };

  const updateBlock = ({ id, data }: updateBlockProps): void => {
    setBlocks(
      blocks.map((block) => (block.id === id ? { ...block, ...data } : block)),
    );
  };

  const deleteBlock = (id: number): void => {
    setBlocks(blocks.filter((block) => block.id !== id));
  };

  const handleDragStart = (): void => {
    draggingRef.current = true;
  };

  const handleDragStop = ({ id, d }: handleDragStopProps): void => {
    draggingRef.current = false;
    const newBounds = {
      ...blocks.find((block) => block.id === id)!,
      x: d.x,
      y: d.y,
    };
    if (!hasCollision({ newBounds, id })) {
      updateBlock({ id, data: { x: d.x, y: d.y } });
    }
  };

  const handleResizeStart = (): void => {
    draggingRef.current = true;
  };

  const handleResizeStop = ({
    id,
    ref,
    position,
  }: handleResizeStopProps): void => {
    draggingRef.current = false;
    const newBounds = {
      ...blocks.find((block) => block.id === id)!,
      width: parseInt(ref.style.width, 10),
      height: parseInt(ref.style.height, 10),
      ...position,
    };
    if (!hasCollision({ newBounds, id })) {
      updateBlock({
        id,
        data: {
          width: parseInt(ref.style.width, 10),
          height: parseInt(ref.style.height, 10),
          ...position,
        },
      });
    }
  };

  return (
    <>
      {imageSrc && (
        <>
          <div
            ref={previewRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            className="preview-area"
          >
            <img src={imageSrc} alt="Preview" className="preview-image" />
            {blocks.map((block, ind) => (
              <Rnd
                key={block.id}
                size={{ width: block.width, height: block.height }}
                position={{ x: block.x, y: block.y }}
                onDragStart={handleDragStart}
                onDragStop={(_, d) => handleDragStop({ id: block.id, d })}
                onResizeStart={handleResizeStart}
                onResizeStop={(_, __, ref, ___, position) =>
                  handleResizeStop({ id: block.id, ref, position })
                }
                bounds="parent"
              >
                <div className="block">
                  <div className="block-index">{ind}</div>
                  <button
                    className="block-delete"
                    onClick={() => deleteBlock(block.id)}
                  >
                    <DeleteIcon size={20} color="gray" />
                  </button>
                </div>
              </Rnd>
            ))}
            {creating && newBlock && (
              <div
                className="new-block"
                style={{
                  left: newBlock.x,
                  top: newBlock.y,
                  width: newBlock.width,
                  height: newBlock.height,
                }}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ImageAreaSelector;
