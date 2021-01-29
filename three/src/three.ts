import * as THREE from 'three'
// import * as OrbitControls from 'three/examples/js/controls/OrbitControls'
// import * as OrbitControls from 'three-orbitcontrols'
const {
  Scene,
  BoxGeometry,
  MeshLambertMaterial,
  Mesh,
  PointLight,
  AmbientLight,
  OrthographicCamera,
  WebGLRenderer,
} = THREE
const init = () => {
  const scene = new Scene()
  const geometry = new BoxGeometry(100, 100, 100)
  const material = new MeshLambertMaterial({ color: 0x0000ff })
  const mesh = new Mesh(geometry, material)
  scene.add(mesh)

  const point = new PointLight(0xffffff)
  point.position.set(400, 200, 300)
  scene.add(point)

  const ambient = new AmbientLight(0x444444)
  scene.add(ambient)

  const width = window.innerWidth, height = window.innerHeight, k = width / height, s = 200
  const camera = new OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
  camera.position.set(200, 300, 200)
  camera.lookAt(scene.position)

  const rendener = new WebGLRenderer()
  rendener.setSize(width, height)
  rendener.setClearColor(0xb9d3ff, 1)

  return {rendener, mesh, scene, camera}
}

const {rendener, mesh, scene, camera} = init()
let T0 = Date.now()
// document.getElementById('root')?.appendChild(rendener.domElement)
const render = (dom: HTMLDivElement) => {
  let T1 = Date.now()
  let t = T1 - T0
  T0 = T1
  requestAnimationFrame(() => render(dom))
  !dom.hasChildNodes() && dom.appendChild(rendener.domElement)
  rendener.render(scene, camera)
  mesh.rotateX(0.001 * t)
  mesh.rotateY(0.001 * t)
  mesh.rotateZ(0.001 * t)
}

const three = {
  render,
}
export default three