import * as THREE from "three";

export const example = () => {
  const canvas = document.querySelector("#my-canvas");
  const renderer = new THREE.WebGL1Renderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;
  scene.add(camera);

  // Light
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.x = 1;
  light.position.z = 2;
  scene.add(light);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: "red",
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 그리기

  let oldTime = Date.now();

  const draw = () => {
    const newTime = Date.now();
    const deltaTime = newTime - oldTime;
    oldTime = newTime;

    // 각도는 Radian을 사용
    // 360도는 2파이
    // mesh.rotation.y += 0.1;
    // mesh.rotation.y += THREE.MathUtils.degToRad(1);
    // mesh.rotation.z += THREE.MathUtils.degToRad(1);

    // 절대시간을 통해 애니메이션을 랜더링 하므로, 기기성능에 의한 애니메이션 편차를 줄일수 있다.
    // 단, 기기성능에 의한 시간이 적게 찍히는 만큼 애니메이션 프레임이 줄어들수 있다.
    mesh.rotation.y += (2 * deltaTime) / 1000;
    mesh.position.y += (2 * deltaTime) / 1000;
    if (mesh.position.y > 3) {
      mesh.position.y = 0;
    }

    renderer.render(scene, camera);

    // window.requestAnimationFrame(draw);
    renderer.setAnimationLoop(draw);
  };

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 이벤트
  window.addEventListener("resize", setSize);

  draw();
};
