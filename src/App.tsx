import "./App.css";
import ImagePanelLayout from "./components/ImageUpload/ImagePanelLayout";
import DataPreviewLayout from "./components/DataPreview/DataPreviewLayout";

export function App() {
  return (
    <div className="app-container">
      <ImagePanelLayout />
      <DataPreviewLayout />
    </div>
  );
}
