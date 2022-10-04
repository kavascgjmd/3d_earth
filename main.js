
  import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
  import vertexShader from './Shader/vertex.glsl';
  import fragmentShader from './Shader/fragment.glsl';
  import atmospherevertexShader from './Shader/atmospherevertex.glsl';
  import atmospherefragmentShader from './Shader/atmospherefragment.glsl';
  import gsap from 'gsap';
 
  
  const renderersize = {
    x : window.innerWidth,
    y : window.innerHeight
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1,1000);
  const renderer = new THREE.WebGLRenderer({antialias : true});
  renderer.setSize(renderersize.x, renderersize.y);
  renderer.setPixelRatio(devicePixelRatio);
  document.body.appendChild(renderer.domElement);
  camera.position.z = 15;
  const geometry = new THREE.SphereGeometry(7 , 100,100);
  const material = new THREE.ShaderMaterial({
    vertexShader ,
    fragmentShader,
    uniforms: {
      globalTexture : {
        value : new THREE.TextureLoader().load('./earth_uv.jpg')
      }
    }
  });
  const spheremesh = new THREE.Mesh(geometry, material);
  const group = new THREE.Group();
  group.add(spheremesh);
  scene.add(group);
  
  const mouse = {
    x : 0, 
    y : 0
  }

  const ageometry = new THREE.SphereGeometry(7 , 100,100);
  const amaterial = new THREE.ShaderMaterial({
     vertexShader : atmospherevertexShader,
     fragmentShader : atmospherefragmentShader,
     blending : THREE.AdditiveBlending,
     side: THREE.BackSide,
    
  });
  const aspheremesh = new THREE.Mesh(ageometry, amaterial);
  aspheremesh.scale.set(1.1,1.1,1.1);
  scene.add(aspheremesh);

  const starGeometry = new THREE.BufferGeometry();
  const starMaterial = new THREE.PointsMaterial({
    color : 0xffffff
  })
  const starmesh = new THREE.Points(starGeometry, starMaterial);
  scene.add(starmesh)
  const starVertices = []
  for(let i = 0; i<1000; i++){
    const x = (Math.random() - 0.5) *2000;
    const y = (Math.random() - 0.5) *2000;
    const z = -Math.random() * 2000
    starVertices.push(x,y,z);
  }

  starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices,3))

  function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
    spheremesh.rotation.y += 0.01;
    gsap.to(group.rotation, {
      y : mouse.x,
      x : -mouse.y,
      duration : 2
    })
    
  }
animate();
addEventListener('mousemove',(e)=>{
  mouse.x = (e.x/window.innerWidth)*2 - 1;
  mouse.y = 1  - (e.y/window.innerHeight);
})