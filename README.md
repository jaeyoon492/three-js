- position: 물체의 위치를 이동시키는 것을 말한다.
  - Mesh.position.x, Mesh.position.y, Mesh.position.z = x, y, z 방향으로 이동 시킨다.
  - Mesh.position.set(x,y,z): set 함수를 통해 물체의 위치를 변경 하기 쉽다.
  - Mesh.position.length(): 원점에서 현재 물체까지의 거리를 알려줌.
  - Mesh.position.distanceTo(new Vector(x,y,z)): 물체의 현재위치에서 새로울 백터까지의 거리를 나타냄.
    - Mesh.position.distanceTo(Vector | mesh | camera | ligtht): 다른 오브젝트까지의 거리도 가능
  - Vector3: 3D 공간안에 있는 한 점을 말한다. [3차원 공간에서 어떤 점의 위치를 말한다.]
- scale: 물체의 크기를 바꾸는 것을 말한다.
  - Mesh.scale.x, Mesh.scale.y, Mesh.scale.z = x,y,z 방향으로 크기를 조절한다.
  - Mesh.scale.set(x,y,z): set 함수를 통해 물체의 크기를 조절하기 쉽다.
- rotate: 물체를 회전시키는 것을 말한다.
  - Mesh.rotation.z,x,y = 축을 기준으로 물체의 각도를 회전시킨다. (축의 방향으로 회전시키는게 아님)
    - THREE.MathUtils.degToRad(radNumber): radian각도를 degree 각도로 변경해줌
  - 독립된 회전축 적용: 복수의 rotate 기능을 순서데로 실행했다고 가정: [ y:45 → x: 20]
    - 프로그램이 물체를 회전시킬때는 처음 입력된 방향으로 회전이 되고, 두번째 입력된 방향으로 회전 시키려 할때, 이미 회전된 사물의 정면(카메라가 최초로 바라본 물체의 평면) 기준으로 회전 하는것이 아닌 절대 좌표를 기준으로 회전하기에 회전축을 독립적으로 적용해야한다.
      - Mesh.rotation.reorder(”XYZ”): 독립된 회전축의 순서를 지정한다.
  - Group Scene: 사물을 그룹핑하여 같은 그룹인 사물끼리만 동일한 애니메이션이 적용되도록 할 수 있다.
    - 태양계 행성간 공전을 구현할 때, 회전할 기준 행성(사물)과 그 하위 행성(사물)이 담긴 그룹을 그룹핑 하는 방식으로 가장 하위까지 그룹핑을 하고, 각 그룹에 애니메이션을 저용하여 같은 그룹에 있는 (행성(사물), 그룹)이 같은 애니메이션이 적용되도록 할 수 있다.
      - new THREE.Object3D(): 그룹을 생성한다.
      - new THREE.Group(): 그룹을 생성한다.
        - Group.add(Object3D[ ]): 그룹에 오브젝트3D를 추가한다.
      - scene.add(group): 씬에 그룹을 넣게되면 하위 그룹까지 랜더링 한다.
    - 애니메이션 적용은 각 그룹별로 해주어야 한다.
      - group1.rotation.y += 0.01
      - group2.rotation.y += 0.01
      - group3.rotation.y += 0.01

## Geometry

---

> 사물 모형의 종류: three.js 에서 지원하는 여러가지의 도형이 있다.

- THREE.MeshStandardMaterial
  - side: 카메라가 도형 내부에 진입했을 때 확인하고 싶을때
  - wireframe: 도형의 와이어프레임을 표현하여 세밀한 도형의 구조를 확인할 수 있다.
- Geometry 형태 조작
  - THREE.MeshStandardMaterial({ option })
    - flatShading: 나눠진 segment에 해당하는 점을 랜더링해줌
  - 사물의 각 점의 위치를 알고 싶을때?
    - Geometry.attribute.potition.array: Float32Array: 각 점 위치의 (x,y,z) 값을 순차적으로 담긴 배열을 처리하는 성능을 개선하기 위해 형식화 배열(typed Array)을 사용했다.
      - Ex: length가 12675인 경우 실제 점의 갯수는 12675 / 3을 하면 된다. 각 x,y,z 값을 모두 배열에 담았기 때문.
      - [-0, 5, 0, -0, 5, 0, -0, 5, 0, -0, 5, 0…] 순으로 배열에 값이 담겨 있다면, index 0번 부터 x, y, z로 보고 3개씩 잘라서 하나의 점으로 보면된다.

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
