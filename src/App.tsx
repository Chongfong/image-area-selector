import { useState } from "react";
import { Block } from "./components/common/block";
import "./App.css";
import ImagePanelLayout from "./components/ImageUpload/ImagePanelLayout";
import DataPreviewLayout from "./components/DataPreview/DataPreviewLayout";

export function App() {
  const [blocks, setBlocks] = useState<Block[]>([]);

  return (
    <div className="app-container">
      <ImagePanelLayout blocks={blocks} setBlocks={setBlocks} />
      <DataPreviewLayout blocks={blocks} />
    </div>
  );
}
