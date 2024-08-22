import React from 'react';
import { useDropzone } from "react-dropzone";

const Upload = () => {
  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted: (files: any) => {
      console.log('drop accepted-------', files);
      uploadCsv(files);
    }
  });
  // 上传评测文件
  const uploadCsv = (files: any) => {
    console.log(files);
  };

  return (
    <div {...getRootProps({ className: "dropzone" })} style={{ width: "60%", height: "30vh", position: 'fixed', top: '30%', left: '20%', backgroundColor: '#ffffff', border: '1px solid #ddd', zIndex: '99' }}>
      <input {...getInputProps()} />
      <p>Drag and drop some files here, or click to select files</p>
    </div>
  );
};

export default Upload;