import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./ImageUploader.css";
import { ImageIcon } from "../common/ImageIcon";

interface ImageUploaderProps {
  onImageLoad: (image: string | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageLoad }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          onImageLoad(e.target?.result as string);
        };

        reader.readAsDataURL(file);
      }
    },
    [onImageLoad],
  );

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
      <div {...getRootProps()} className="dropzone-area">
        <input {...getInputProps()} />
        <ImageIcon />
        <p className="upload-text">Upload image</p>
        {Object.keys(fileRejections).length > 0 && fileRejectionItems}
      </div>
    </div>
  );
};

export default ImageUploader;
