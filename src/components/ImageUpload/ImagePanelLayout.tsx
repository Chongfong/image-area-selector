import "./ImagePanelLayout.css";
import ImageUploader from "./ImageUploader";

const ImagePanelLayout = () => {
  return (
    <div className="container">
      <div className="navbar">
        <div className="circle" />
      </div>
      <div className="control-container">
        <ImageUploader />
      </div>
    </div>
  );
};

export default ImagePanelLayout;
