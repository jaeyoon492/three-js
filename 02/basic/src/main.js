import * as THREE from "three";

// 동적으로 캔버스 조립하기
// const renderer = new THREE.WebGL1Renderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement)

const canvas = document.querySelector("#my-canvas");
const renderer = new THREE.WebGL1Renderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
// ( 시야각, 카메라 절두체 종횡비(가로, 세로 비율 || 너비/높이), 카메라 절두체 근평명, 카메라 절두체 원평면 )
// 화면에 랜더링 되려면,
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
