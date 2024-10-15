import React, { useEffect } from "react";
import * as THREE from "three";

const Viewer360 = () => {
  useEffect(() => {
    // Tạo scene
    const scene = new THREE.Scene();

    // Tạo camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 0.1; // Đặt camera gần với trung tâm hình cầu

    // Tạo renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Tạo hình cầu
    const geometry = new THREE.SphereGeometry(500, 60, 40); // Hình cầu lớn
    geometry.scale(-1, 1, 1); // Lật hình cầu để người dùng có thể xem từ bên trong

    // Load 27 ảnh và gán lên bề mặt hình cầu
    const materials = [];

    // for (let i = 1; i < 27; i++) {

    //   const texture = new THREE.TextureLoader().load(`/100_0404/DJI_00${i < 10 ? "0":""}${i}.JPG`);
    //   materials.push(new THREE.MeshBasicMaterial({ map: texture }));
    // }
    const texture = new THREE.TextureLoader().load(
      "/100_0404/DJI_0001.JPG",
      (texture) => {
        // Tải thành công
        materials.push(new THREE.MeshBasicMaterial({ map: texture }));
        console.log("tai thanh cong");
      },
      undefined, // Optional: Callback cho tiến trình tải (nếu cần)
      (error) => {
        console.error("Error loading texture:", error); // In lỗi nếu có
      }
    );
    materials.push(new THREE.MeshBasicMaterial({ map: texture }));
    console.log(materials);

    // Tạo mesh cho hình cầu với 26 material khác nhau
    const sphere = new THREE.Mesh(geometry, materials);
    scene.add(sphere);

    // Animation loop để xoay hình cầu nhẹ
    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.y += 0.001; // Xoay hình cầu theo trục Y
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return null;
};

export default Viewer360;
