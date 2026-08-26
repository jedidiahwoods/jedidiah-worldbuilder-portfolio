import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { glowTexture, mulberry32 } from './textures'
import { ProjectNode } from './ProjectNode'
import { NeuronWeb } from './NeuronWeb'
import { projectsInRealm } from '../data/projects'

const EARTH_R = 2.3

const atmosphereVert = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const atmosphereFrag = /* glsl */ `
  varying vec3 vNormal;
  uniform vec3 uColor;
  void main() {
    float intensity = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, -1.0)), 3.5);
    gl_FragColor = vec4(uColor, 1.0) * intensity;
  }
`

const surfaceVert = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const surfaceFrag = /* glsl */ `
  varying vec3 vNormal;
  uniform vec3 uDeep;
  uniform vec3 uRim;
  void main() {
    float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 1.6);
    vec3 col = mix(uDeep, uRim, fresnel);
    gl_FragColor = vec4(col, 0.94);
  }
`

/**
 * THE PHYSICAL REALM — a glowing holographic Earth: fresnel-lit globe,
 * lat/long grid, clustered "city lights", orbit rings carrying the
 * physical projects.
 */
export function PhysicalRealm({
  center,
  active,
}: {
  center: [number, number, number]
  active: boolean
}) {
  const earth = useRef<THREE.Group>(null!)
  const orbits = useRef<THREE.Group>(null!)
  const items = projectsInRealm('physical')

  // city-light clusters on the sphere surface
  const cityPositions = useMemo(() => {
    const rand = mulberry32(11)
    const pts: number[] = []
    const clusters = 16
    for (let c = 0; c < clusters; c++) {
      const theta = rand() * Math.PI * 2
      const phi = Math.acos(2 * rand() - 1)
      const centerDir = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.sin(phi) * Math.sin(theta),
        Math.cos(phi)
      )
      const n = 18 + Math.floor(rand() * 34)
      for (let i = 0; i < n; i++) {
        const jitter = new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).multiplyScalar(0.5)
        const dir = centerDir.clone().add(jitter).normalize()
        const p = dir.multiplyScalar(EARTH_R * 1.005)
        pts.push(p.x, p.y, p.z)
      }
    }
    return new Float32Array(pts)
  }, [])

  const gridGeom = useMemo(
    () => new THREE.WireframeGeometry(new THREE.SphereGeometry(EARTH_R * 1.002, 28, 18)),
    []
  )

  // project node ring positions (slightly elliptical, staggered heights)
  const nodeAngles = [-0.5, 0.7, 2.4]
  const nodePositions: [number, number, number][] = items.map((_, i) => {
    const a = nodeAngles[i % nodeAngles.length]
    return [Math.cos(a) * 4.4, Math.sin(a * 1.7) * 1.5, Math.sin(a) * 2.2]
  })

  useFrame(({ clock, pointer }) => {
    const t = clock.elapsedTime
    earth.current.rotation.y = t * 0.06
    earth.current.rotation.x = THREE.MathUtils.lerp(
      earth.current.rotation.x,
      active ? -pointer.y * 0.12 : 0,
      0.03
    )
    orbits.current.rotation.y = t * 0.02
  })

  return (
    <group position={center}>
      <group ref={earth}>
        {/* globe body */}
        <mesh>
          <sphereGeometry args={[EARTH_R, 56, 56]} />
          <shaderMaterial
            vertexShader={surfaceVert}
            fragmentShader={surfaceFrag}
            transparent
            depthWrite={false}
            uniforms={{
              uDeep: { value: new THREE.Color('#1c1330') },
              uRim: { value: new THREE.Color('#b06a2c') },
            }}
          />
        </mesh>
        {/* lat/long hologram grid */}
        <lineSegments geometry={gridGeom}>
          <lineBasicMaterial
            color="#ffb36b"
            transparent
            opacity={0.28}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>
        {/* city lights */}
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[cityPositions, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.11}
            map={glowTexture()}
            color="#ffd9a8"
            transparent
            opacity={1}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            sizeAttenuation
          />
        </points>
      </group>

      {/* atmosphere glow */}
      <mesh scale={1.28}>
        <sphereGeometry args={[EARTH_R, 48, 48]} />
        <shaderMaterial
          vertexShader={atmosphereVert}
          fragmentShader={atmosphereFrag}
          transparent
          depthWrite={false}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          uniforms={{ uColor: { value: new THREE.Color('#ff8a30') } }}
        />
      </mesh>

      {/* warm halo behind everything */}
      <sprite scale={16} position={[0, 0, -4]}>
        <spriteMaterial
          map={glowTexture(256, 0.8)}
          color="#5e2f10"
          transparent
          opacity={0.55}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>

      {/* orbit rings + project nodes */}
      <group ref={orbits}>
        {[4.4, 5.4].map((r, i) => (
          <mesh key={i} rotation={[Math.PI / 2 + (i === 0 ? 0.35 : -0.2), 0, 0]}>
            <torusGeometry args={[r, 0.004, 8, 128]} />
            <meshBasicMaterial
              color="#ffb36b"
              transparent
              opacity={0.22}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}
      </group>
      {items.map((p, i) => (
        <ProjectNode
          key={p.slug}
          project={p}
          position={nodePositions[i]}
          accent="#ffb36b"
          visible={active}
        />
      ))}

      {/* ambient ember constellation reaching to the screen edges */}
      <NeuronWeb
        seed={17}
        radius={7.4}
        nodeCount={54}
        linkDistance={3.0}
        colors={['#ffb36b', '#ffd9a8', '#8b5bb0']}
        pulseColor="#ffd9a8"
        pulseCount={6}
        parallax={0.06}
        spread={[1.9, 1.0, 0.7]}
        position={[0, 0, -3]}
      />
    </group>
  )
}
