import React, { useState, useRef, useEffect } from "react";
import React360Viewer from "react-360-view";

const My360View = () => {
  const [index, setIndex] = useState(1);
  const totalFrames = 26;
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startIndex = useRef(0);

  // Hàm xử lý sự kiện khi người dùng click giữ chuột
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startIndex.current = index;
  };

  // Hàm xử lý sự kiện khi chuột di chuyển trong khi giữ click
  const handleMouseMove = (e) => {
    if (isDragging.current) {
      const dx = e.clientX - startX.current;
      const sensitivity = 5; // Độ nhạy khi kéo chuột (tăng số này để xoay nhanh hơn)
      let newIndex = startIndex.current + Math.floor(dx / sensitivity);

      // Đảm bảo index không vượt quá tổng số frame và không âm
      if (newIndex > totalFrames) {
        newIndex = newIndex % totalFrames;
      } else if (newIndex < 1) {
        newIndex = totalFrames + (newIndex % totalFrames);
      }

      if (dx < 0) {
        setIndex((prevFrame) => (prevFrame > 1 ? prevFrame - 1 : totalFrames));
      } else if (dx > 0) {
        // Di chuyển chuột sang phải -> tăng fram
        setIndex((prevFrame) => (prevFrame < totalFrames ? prevFrame + 1 : 1));
      }
    }
  };

  // Hàm xử lý khi người dùng thả chuột
  const handleMouseUp = () => {
    isDragging.current = false; // Dừng việc theo dõi chuột
  };

  return (
    <div>
      <h1>360 Image_01 Viewer </h1>

      <div
        // onMouseDown={handleMouseDown}
        // onMouseMove={handleMouseMove}
        // onMouseUp={handleMouseUp}
        // onMouseLeave={handleMouseUp}
        style={{ width: "700px", height: "650px" }}
      >
        <React360Viewer
          amount={totalFrames}
          imagePath="/100_0404"
          paddingIndex={true} // chuyển đổi index thành số có 1 chữ số thành 2 chữ số 1-9 -> 01-09
          fileName="DJI_00{index}.JPG"
          index={index}
          autoplay={false} // Tắt tự động xoay
          notifyOnPointerDown={handleMouseDown}
          notifyOnPointerMoved={handleMouseMove}
          notifyOnPointerUp={handleMouseUp}
        />
      </div>
      <h1>360 Image_02 Viewer</h1>
      <div style={{ width: "800px", height: "1000px" }}>
        <React360Viewer
          amount={totalFrames}
          imagePath="/100_0405"
          fileName="DJI_00{index}.JPG"
          index={index}
          paddingIndex={true}
          autoplay={false}
          notifyOnPointerDown={handleMouseDown}
          notifyOnPointerMoved={handleMouseMove}
          notifyOnPointerUp={handleMouseUp}
        />
      </div>
    </div>
  );
};

export default My360View;
