import React, { useState, useRef } from "react";
import { Rnd } from "react-rnd";
import { Block } from "../../utils/blockUtils";
import { DeleteIcon } from "../common/DeleteIcon";
import {
  deleteBlock,
  handleDragStop,
  handleResizeStop,
  handleDragStatus,
} from "../../utils/handlers";
import "./ImageAreaSelector.css";
import {
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
} from "../../utils/mouseHandlers";

interface ImageAreaSelectorProps {
  imageSrc: string | null;
  blocks: Block[];
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
}

const ImageAreaSelector: React.FC<ImageAreaSelectorProps> = ({
  imageSrc,
  blocks,
  setBlocks,
}) => {
  const [creating, setCreating] = useState(false);
  const [newBlock, setNewBlock] = useState<Block | null>(null);
  const [counter, setCounter] = useState(0);
  const draggingRef = useRef<boolean | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      {imageSrc && (
        <div
          ref={previewRef}
          onMouseDown={(e) =>
            handleMouseDown(
              e,
              previewRef,
              setCreating,
              setNewBlock,
              counter,
              draggingRef,
            )
          }
          onMouseMove={(e) =>
            handleMouseMove(e, previewRef, creating, newBlock, setNewBlock)
          }
          onMouseUp={() =>
            handleMouseUp(
              creating,
              newBlock,
              setCreating,
              setNewBlock,
              blocks,
              setBlocks,
              setCounter,
            )
          }
          className="preview-area"
        >
          <img src={imageSrc} alt="Preview" className="preview-image" />
          {blocks.map((block, ind) => (
            <Rnd
              key={block.id}
              size={{ width: block.width, height: block.height }}
              position={{ x: block.x, y: block.y }}
              onDragStart={() => {
                handleDragStatus(draggingRef, true);
              }}
              onDragStop={(_, d) => {
                handleDragStop(blocks, setBlocks, block.id, d);
                handleDragStatus(draggingRef, null);
              }}
              onResizeStart={() => {
                handleDragStatus(draggingRef, true);
              }}
              onResizeStop={(_, __, ref, ___, position) => {
                handleResizeStop(blocks, setBlocks, block.id, ref, position);
                handleDragStatus(draggingRef, null);
              }}
              bounds="parent"
            >
              <div className="block">
                <div className="block-index">{ind}</div>
                <button
                  className="block-delete"
                  onClick={() => deleteBlock(blocks, setBlocks, block.id)}
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
      )}
    </>
  );
};

export default ImageAreaSelector;
