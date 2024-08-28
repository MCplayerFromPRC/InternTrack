import React from 'react';
import { useDropzone } from "react-dropzone";
import './index.scss';
import { message } from 'antd';
const Upload = ({ closePop }: { closePop: () => void }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted: (files: any) => {
      console.log('drop accepted-------', files);
      uploadCsv(files);
    }
  });
  // 上传评测文件
  const uploadCsv = (files: any) => {
    console.log(files);
    message.success('上传成功！');
    closePop();
  };

  return (
    <div {...getRootProps({ className: "dropzone" })}>
      <input {...getInputProps()} />
      <div className="close" onClick={(e: any) => { e.stopPropagation(); closePop(); }}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </div>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
        </svg>
        <p>Drag and drop some files here, or click to select files</p>
      </div>
    </div>
  );
};

export default Upload;