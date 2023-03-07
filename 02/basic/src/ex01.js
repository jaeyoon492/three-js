import * as THREE from "three";

export const example = () => {
  // 동적으로 캔버스 조립하기
  // const renderer = new THREE.WebGL1Renderer();
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // document.body.appendChild(renderer.domElement)

  const canvas = document.querySelector("#my-canvas");
  const renderer = new THREE.WebGL1Renderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  // ( 시야각, 카메라 절두체 종횡비(가로, 세로 비율 || 너비/높이), 카메라 절두체 근평명, 카메라 절두체 원평면 )
  // 화면에 랜더링 되려면,
  // const camera = new THREE.PerspectiveCamera(
  //   75,
  //   window.innerWidth / window.innerHeight,
  //   0.1,
  //   1000
  // );

  // // 단위 = 만들고자 하는 단위를 정하면됨.
  // camera.position.x = 1;
  // camera.position.y = 2;
  // camera.position.z = 5;
  // scene.add(camera);

  // Orthographic camera
  const orthographicCamera = new THREE.OrthographicCamera(
    -(window.innerWidth / window.innerHeight), // left
    window.innerWidth / window.innerHeight, // right
    1, // top
    -1, // bottom
    0.1,
    1000
  );

  orthographicCamera.position.x = 1;
  orthographicCamera.position.y = 2;
  orthographicCamera.position.z = 5;

  orthographicCamera.lookAt(0, 0, 0);
  orthographicCamera.zoom = 0.5;
  orthographicCamera.updateProjectionMatrix();
  scene.add(orthographicCamera);

  // 단위 = 만들고자 하는 단위를 정하면됨.
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    //   color: "0xff0000",
    // color: "#ff0000"
    color: "red",
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 그리기
  // renderer.render(scene, camera);
  renderer.render(scene, orthographicCamera);
};
