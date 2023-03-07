### WebGL

---

> 웹 상에서 그래픽을 표현하는 언어 자바스크립트 사용, 3D를 표현함, GPU를 사용하기 때문에 성능이 좋음
> 로우레벨 언어라 개발 난이도가 높음

### three.js

---

> WebGL을 쉽게 사용하기 위해 api를 제공해주는 라이브러리

## Renderer: ({ OPTION })

---

> 카메라를 통해 보여지는 장면을 출력하는 기능

OPTION

- canvas: 정적으로 canvas를 불러올때 사용
- antialias: 랜더링시 물체의 계단 현상을 줄여줌 ( 성능저하 )
- alpha: 배경을 투명하게 함

### 캔버스 해상도 올리는 법

---

> 사진의 해상도를 올리는 방법은 사진을 2배 크기로 랜더링하여 원래 사이즈로 줄이는 방법이다.
> canvas또한 마찬가지 방법으로 해상도를 올릴수 있다.

window.devicePixelRatio: 현재 디바이스의 해상도 비율을 알려줌

setPixelRatio: 캔버스 랜더사이즈를 바꿔줌 ( 2 → 현재 해상도 \* 2)

### 배경 투명도 설정 & 배경 색 설정

---

> alpha를 통해 투명하게 한 배경의 투명도를 renderer 내장함수로 조절 할 수 있다.

setClearAlpha(number): 0 ~ 1로 갈수록 불투명도가 올라감

setClearColor(hash | string): 컬러값을 입력하면 됨

## Scene

---

> three.js에서 화면에 보여지는 부분을 Scene라고 말함. ( 조명, 사람, 물체 등등이 보여지는 곳 )
> Renderer 보다 위에 위치해 있기에 배경색을 덮을 수도 있다.

- Properties
  ### background
  ***
  background: new THREE.Color(string) : Scene은 랜더러 위에 위치하고 있기 때문에, 랜더러의 색을 덮을 수 있다.

## Light

---

> Material(재질)에 따라 사물이 달리 보일수도 있기 떄문에 조명이 필요함.
> 여러개의 조명을 추가 할 수도 있음 ( 성능 저하 )

- DirectionalLight(color, intensity: 빛의 강도)
- AmbientLight(color, intensity): 은은하게 사물 전체에 조명을 밝혀줌.

## Mesh

---

> 도형과 재질을 합친 물체를 Mesh라고 한다.
> 조명에 영향을 받는 Material이 있고, 그렇지 않은 Material이 존재한다.

MeshBasicMaterial: 조명에 영향을 받지않는 Material

MeshStandardMaterial: 조명에 영향을 받는 Material

## PerspectiveCamera: (fov, aspect, near, far)

---

> fov(시야각): 카메라를 통해 화면에 출력되는 각도
> aspect(카메라 절두체 종횡비): 너비/높이 or 가로 ➗ 세로
> near(카메라 절두체 근평면): 카메라와 어느정도 가까이 있을때 부터 화면에 보이는가에 대한 값
> far(카메라 절두체 원평면): 카메라와 어느정도 멀리까지 화면에 보이는가에 대한 값

PerspectiveCamera: 3D 장면을 랜더링 하는데 가장 널리 쓰이는 카메라 ( 원근표시 )

## OrthographicCamera: (left, right, top, bottom, near, far)

---

> left: 카메라 절두체 좌평면
> right: 카메라 절두체 우평면
> top: 카메라 절두체 상평면
> bottom: 카메라 절두체 하평면
> near: 카메라 절두체 근평면
> far: 카메라 절두체 원평면

OrthographicCamera: 카메라와의 거리에 관계없이 객체의 크키를 일정하게 유지해주는 카메라( 원근 표시 x )

- lookAt: 카메라가 지정된 좌표를 바라봄
- zoom: 크거나, 작게보려 할때
  - updateProjectionMatrix()를 함께 써주어야 반영이 됨

## 3D Animation

---

### window.requestAnimationFrame

requestAnimationFrame: 브라우저에게 수행하기를 원하는 애니메이션을 알리고 다음 리페인트가 진행되기 전에 해당 애니메이션을 업데이트하는 함수를 호출하게 함. 리페인트 이전에 실행할 콜백을 인자로 받는다.

- 반복적인 리페인트 전 함수호출로 애니메이션을 그린다.

### renderer.setAnimationLoop

requestAnimationFrame 과 같은 기능이라 아무거나 사용해도 된다

- 단, three.js를 이용해서 AR, VR 컨텐츠를 제작하려 할때 setAnimationLoop를 사용해야 한다.

### 애니메이션 성능보정

---

> 사용자마다 다른 기기로 애니메이션을 볼때 사용자 기기 성능마다 차이가 발생 할 수 있다. 이를 보정하는 방법을 적었다.

### 방법1

- new Clock().getElapsedTime(): 1초씩 증가하는 절대시간을 제공 해준다. ( 어떤 기기든 편차없음 )
  - 애니메이션 효과에 이 값을 넣어 기기성능의 편차를 시간으로 대체하여 어떤 기기에서든 움직이는 위치, 각도를 똑같이 만들 수 있다.
    - 단, 성능이 안좋은 기기는 그만큼 시간이 찍히는게 적기 때문에 뚝뚝 끊기게 될 수 있다.

### 방법2

- new Clock().getDelta(): 애니메이션 콜백함수가 실행되는 간격의 시간차를 제공해준다.
  - 기기 성능에 따라 프레임 차이가 나지만, 애니메아션 자체성능은 떨어지지 않는다.

### 방법3

- 자바스크립트 내장 함수 [Date.now](http://Date.now) 값을 통해 애니메이션 콜백함수 간격마다 시간차를 계산하여, 성능을 보정 할 수있다.
  - 기기 성능에 따라 프레임 차이가 나지만, 애니메아션 자체성능은 떨어지지 않는다.

## Fog : 안개

---

> scene.fog에 안개를 추가 할 수 있다.

- new THREE.Fog(color, near, far): scene.fog에 추가해줄 안개를 생성한다.

## gsap: 외부 애니메이션 라이브러리 사용

---

> 외불 애니메이션 라이브러리 gsap는 캔버스 내에 랜더링된 mesh애니메이션을 조정할 수 있다.

- gsap.to(Object, { duration, x, y, z })
  - gsap에서 제공한 api는 THREE.Mesh 객체(Object3D<Event>.position: THREE.Vector3)를 조정 할 수 있다.

## Utils

---

> three.js 에서 제공하는 유틸리티 기능

- MathUtils.degToRad: Radian 각도를 degree 각도로 전환해줌
- AxesHelper: 각 0,0,0 기준의 축을 랜더시켜 현재 사물의 치를 파악하기 편리하게 도와주는 기능
- GridHelper: 평면좌표를 보여주어 사물의 위치를 파악하기 편리하게 도와주는 기능
- Stats.js: 초당 프레임을 출력해주는 모듈
  - three.js 제공 기능이 아님, **npm i stats** 로 설치
  - stats.dom을 document.body에 append 하여 현재 fps 상태창을 출력함
  - 반복되는 애니메이션 콜백 함수 내부에 stats.update() 함수를 넣어 현재 출력되는 애니메이션의 프레임을 업데이트 함
- Dat.gui: Gui를 통해 사물, 카메라 같은 오브젝트를 컨트롤 할 수 있도록 해주는 모듈
  - three.js 제공 기능이 아님, **npm i dat.gui**로 설치
  - dat.gui를 사용하여 사물을 고정한채로 카메라 위치를 이동 시킬때, 애니메이션 변경을 캐치 하려면, 애니메이션 콜백 함수 내부, 외부에 camera.lookAt(Object)를 추가해야 한다.

## 용어

---

Scene(무대): three.js에서 화면에 보여지는 부분을 Scene라고 말함. ( 조명, 사람, 물체 등등이 보여지는 곳 )

Mesh(사물, 물체): three.js에서 사물, 물체를 표현할때 Mesh라고 함 ( Geometry: 모양, Material: 재질 )

Camera: 시야각으로 사물을 바라봄

Light(조명): 필수는 아니지만, Material(재질)에 따라 사물이 달리 보일수도 있기 떄문에 조명이 필요함.

Renderer: 카메라를 통해 보여지는 장면을 출력해 줌.

x축: 가로를 나타낼때 기준에서 왼쪽으로 가면 + , 오른쪽으로 가면 -

y축: 세로, 즉 위 아래를 나타냄 기준에서 위로가면 + , 아래로가면 -

z축: 앞, 뒤를 나타냄 기준에서 앞으로 가면 + , 뒤로가면 -
