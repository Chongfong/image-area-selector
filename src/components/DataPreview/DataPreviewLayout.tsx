import React from "react";
import "./DataPreviewLayout.css";
import { Block } from "../../utils/blockUtils";

interface DataPreviewLayoutProps {
  blocks: Block[];
}

const DataPreviewLayout: React.FC<DataPreviewLayoutProps> = ({ blocks }) => {
  const jsonString = JSON.stringify(blocks, ["x", "y", "width", "height"], 2);

  return (
    <div className="data-preview-container">
      {blocks.length > 0 && <pre className="detail">{jsonString}</pre>}
    </div>
  );
};

export default DataPreviewLayout;
