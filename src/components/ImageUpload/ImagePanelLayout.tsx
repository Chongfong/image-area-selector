import React, { useState } from "react";
import { Block } from "../../utils/blockUtils";
import "./ImagePanelLayout.css";
import ImageUploader from "./ImageUploader";
import ImageAreaSelector from "./ImageAreaSelector";

interface ImagePanelLayoutProps {
  blocks: Block[];
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
}

const ImagePanelLayout: React.FC<ImagePanelLayoutProps> = ({
  blocks,
  setBlocks,
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  return (
    <div className="container">
      <div className="navbar">
        <div className="circle" />
      </div>
      <div className="control-container">
        {imageSrc ? (
          <ImageAreaSelector
            imageSrc={imageSrc}
            blocks={blocks}
            setBlocks={setBlocks}
          />
        ) : (
          <ImageUploader onImageLoad={setImageSrc} />
        )}
      </div>
    </div>
  );
};

export default ImagePanelLayout;
