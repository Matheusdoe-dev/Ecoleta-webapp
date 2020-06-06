import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";

// style
import { DropzoneWrapper } from "./styles";

interface Props {
  onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState("");

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const fileUrl = URL.createObjectURL(file);

      setSelectedFileUrl(fileUrl);
      onFileUploaded(file);
    },
    [onFileUploaded]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <DropzoneWrapper {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />

      {selectedFileUrl ? (
        <img src={selectedFileUrl} alt="Imagem do ponto" />
      ) : isDragActive ? (
        <p>
          <FiUpload />
          Drop the files here ...
        </p>
      ) : (
        <p>
          <FiUpload />
          Drag 'n' drop some files here, or click to select files
        </p>
      )}
    </DropzoneWrapper>
  );
};

export default Dropzone;
