import React, { useState } from "react";
import "./ImagePanelLayout.css";
import ImageUploader from "./ImageUploader";
import ImageAreaSelector from "./ImageAreaSelector";

const ImagePanelLayout: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  return (
    <div className="container">
      <div className="navbar">
        <div className="circle" />
      </div>
      <div className="control-container">
        {imageSrc ? (
          <ImageAreaSelector imageSrc={imageSrc} />
        ) : (
          <ImageUploader onImageLoad={setImageSrc} />
        )}
      </div>
    </div>
  );
};

export default ImagePanelLayout;
