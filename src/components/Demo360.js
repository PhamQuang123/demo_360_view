import React, { useEffect, useRef } from "react";

import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
const Demo360 = () => {
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <ReactPhotoSphereViewer
        src="/images/anh5_blended_fused.jpg" // Đường dẫn đến ảnh 360 độ
        width="100%"
        height="800px"
      />
    </div>
  );
};

export default Demo360;
