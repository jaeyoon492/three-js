import * as THREE from "three";

export const example = () => {
  const canvas = document.querySelector("#my-canvas");
  const renderer = new THREE.WebGL1Renderer({
    canvas,
    antialias: true,
    // 벼경을 투명화게 함
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  // 투명도 설정
  //   renderer.setClearAlpha(1);
  //   renderer.setClearColor(0x00ff00)
  renderer.setClearColor("#00ff00");
  renderer.setClearAlpha(0.5);

  // Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("gray");

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.x = 1;
  camera.position.y = 2;
  camera.position.z = 5;
  scene.add(camera);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: "red",
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 그리기
  renderer.render(scene, camera);

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 이벤트
  window.addEventListener("resize", setSize);
};
