import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const {
  Scene,
  BoxGeometry,
  MeshLambertMaterial,
  Mesh,
  PointLight,
  AmbientLight,
  OrthographicCamera,
  WebGLRenderer,
  SphereGeometry,
  CylinderGeometry,
  AxesHelper,
} = THREE
const init = () => {
  const scene = new Scene()

  const geometry1 = new BoxGeometry(100, 100, 100)
  const material1 = new MeshLambertMaterial({
    color: 0x0000ff,
    opacity: 0.7,
    transparent: true,
    // emissive: 0x4488ee,
    // shininess: 12,
  })
  const mesh1 = new Mesh(geometry1, material1)
  scene.add(mesh1)

  const geometry2 = new SphereGeometry(55, 40, 40)
  const material2 = new MeshLambertMaterial({color: 0xff00ff})
  const mesh2 = new Mesh(geometry2, material2)
  scene.add(mesh2)

  const geometry3 = new CylinderGeometry(50, 50, 100, 25)
  const material3 = new MeshLambertMaterial({color: 0xffff00})
  const mesh3 = new Mesh(geometry3, material3)
  scene.add(mesh3)
  mesh3.position.set(150, 0, 0)

  // 灯光
  const point = new PointLight(0xffffff)
  point.position.set(400, 200, 300)
  scene.add(point)
  // 环境光
  const ambient = new AmbientLight(0x444444)
  scene.add(ambient)

  // 坐标系
  const axes = new AxesHelper(250)
  scene.add(axes)

  const width = window.innerWidth, height = window.innerHeight, k = width / height, s = 200
  const camera = new OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
  camera.position.set(200, 300, 200)
  camera.lookAt(scene.position)

  const rendener = new WebGLRenderer()
  rendener.setSize(width, height)
  rendener.setClearColor(0xb9d3ff, 1)

  return {rendener, mesh1, scene, camera}
}

const {rendener, mesh1, scene, camera} = init()
let T0 = Date.now()
// document.getElementById('root')?.appendChild(rendener.domElement)
const render = (dom: HTMLDivElement) => {
  let T1 = Date.now()
  let t = T1 - T0
  T0 = T1
  requestAnimationFrame(() => render(dom))
  !dom.hasChildNodes() && dom.appendChild(rendener.domElement)
  rendener.render(scene, camera)
  // mesh1.rotateX(0.001 * t)
  mesh1.rotateY(0.001 * t)
  // mesh1.rotateZ(0.001 * t)

}
let controls = new OrbitControls(camera, rendener.domElement)
console.log(controls)
const three = {
  render,
}
export default three