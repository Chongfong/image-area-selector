import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./ImageUploader.css";

const ImageUploader: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        setImage(e.target?.result as string);
      };

      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <p className="error-message" key={file.name}>
      {errors[0].message}
    </p>
  ));

  return (
    <div>
      {!image ? (
        <div {...getRootProps()} className="dropzone-area">
          <input {...getInputProps()} />
          <p className="upload-text">Upload image</p>
          {Object.keys(fileRejections).length > 0 && fileRejectionItems}
        </div>
      ) : (
        <img src={image} alt="Uploaded" className="uploaded-image" />
      )}
    </div>
  );
};

export default ImageUploader;
