import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { glowTexture, mulberry32 } from './textures'

const coreVert = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const coreFrag = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 1.7);
    vec3 col = mix(vec3(0.95, 1.0, 1.0), vec3(0.28, 0.78, 1.0), fresnel);
    gl_FragColor = vec4(col, 1.0);
  }
`
import { ProjectNode } from './ProjectNode'
import { NeuronWeb } from './NeuronWeb'
import { projectsInRealm } from '../data/projects'

interface Dendrite {
  curve: THREE.CatmullRomCurve3
  tube: THREE.TubeGeometry
  major: boolean
}

/**
 * THE DIGITAL REALM — a vast neuron: glowing nucleus, branching dendrites
 * built from curves, electric pulses racing along them, and the digital
 * projects sitting at the synapse terminals.
 */
export function DigitalRealm({
  center,
  active,
}: {
  center: [number, number, number]
  active: boolean
}) {
  const group = useRef<THREE.Group>(null!)
  const nucleus = useRef<THREE.Group>(null!)
  const shellA = useRef<THREE.Mesh>(null!)
  const shellB = useRef<THREE.Mesh>(null!)
  const ringA = useRef<THREE.Mesh>(null!)
  const ringB = useRef<THREE.Mesh>(null!)
  const pulseRefs = useRef<THREE.Sprite[]>([])

  // sparks pinned to the outer wire shell's vertices
  const sparkPositions = useMemo(
    () => new Float32Array(new THREE.IcosahedronGeometry(0.62, 1).getAttribute('position').array),
    []
  )
  const items = projectsInRealm('digital')

  // terminal positions ring the nucleus and adapt to however many
  // digital projects exist in the data
  const terminals = useMemo<[number, number, number][]>(() => {
    const rand = mulberry32(7)
    // leave a notch at the top of the ring so no node sits under the realm title
    const gap = 1.1
    const start = Math.PI / 2 + gap / 2
    const span = Math.PI * 2 - gap
    return items.map((_, i) => {
      const a = start + (i / items.length) * span + rand() * 0.12
      const r = 4.1 + (i % 2) * 0.85 + rand() * 0.3
      return [
        Math.cos(a) * r * 1.13,
        Math.sin(a) * r * 0.58,
        (rand() - 0.5) * 1.4,
      ]
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length])

  const dendrites = useMemo<Dendrite[]>(() => {
    const rand = mulberry32(23)
    const out: Dendrite[] = []

    const makeCurve = (end: THREE.Vector3, major: boolean) => {
      const mid1 = end.clone().multiplyScalar(0.33).add(
        new THREE.Vector3((rand() - 0.5) * 1.6, (rand() - 0.5) * 1.6, (rand() - 0.5) * 1.2)
      )
      const mid2 = end.clone().multiplyScalar(0.66).add(
        new THREE.Vector3((rand() - 0.5) * 1.2, (rand() - 0.5) * 1.2, (rand() - 0.5) * 0.9)
      )
      const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0, 0), mid1, mid2, end])
      const tube = new THREE.TubeGeometry(curve, 48, major ? 0.022 : 0.01, 6, false)
      out.push({ curve, tube, major })
      return curve
    }

    // major dendrites to project terminals
    terminals.forEach((t) => makeCurve(new THREE.Vector3(...t), true))

    // minor ambient dendrites
    for (let i = 0; i < 9; i++) {
      const theta = rand() * Math.PI * 2
      const phi = Math.acos(2 * rand() - 1)
      const r = 2.6 + rand() * 2.4
      makeCurve(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta) * 0.8,
          r * Math.cos(phi) * 0.7
        ),
        false
      )
    }
    return out
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terminals])

  const pulses = useRef(
    Array.from({ length: 18 }, (_, i) => ({
      dendrite: i % 3,
      t: (i * 0.37) % 1,
      speed: 0.3 + ((i * 7919) % 100) / 250,
    }))
  )

  useFrame(({ clock, pointer }) => {
    const t = clock.elapsedTime
    group.current.rotation.y = Math.sin(t * 0.07) * 0.1 + (active ? pointer.x * 0.1 : 0)
    group.current.rotation.x = Math.cos(t * 0.05) * 0.05 - (active ? pointer.y * 0.08 : 0)
    const beat = 1 + Math.pow(Math.max(0, Math.sin(t * 1.6)), 6) * 0.12
    nucleus.current.scale.setScalar(beat)
    shellA.current.rotation.y = t * 0.45
    shellA.current.rotation.x = t * 0.2
    shellB.current.rotation.y = -t * 0.22
    shellB.current.rotation.z = t * 0.13
    ringA.current.rotation.z = t * 0.3
    ringB.current.rotation.z = -t * 0.24

    pulses.current.forEach((p, i) => {
      p.t += p.speed * 0.016
      if (p.t >= 1) {
        p.t = 0
        p.dendrite = Math.floor(Math.random() * dendrites.length)
      }
      const sprite = pulseRefs.current[i]
      if (sprite) {
        const pos = dendrites[p.dendrite].curve.getPoint(p.t)
        sprite.position.copy(pos)
        const fade = Math.sin(p.t * Math.PI)
        sprite.scale.setScalar(0.18 + fade * 0.22)
        ;(sprite.material as THREE.SpriteMaterial).opacity = fade
      }
    })
  })

  return (
    <group position={center}>
      <group ref={group}>
        {/* nucleus: wired energy core */}
        <group ref={nucleus}>
          {/* hot fresnel heart */}
          <mesh>
            <icosahedronGeometry args={[0.3, 4]} />
            <shaderMaterial vertexShader={coreVert} fragmentShader={coreFrag} />
          </mesh>
          {/* inner wire cage */}
          <mesh ref={shellA}>
            <icosahedronGeometry args={[0.46, 1]} />
            <meshBasicMaterial
              color="#7fe3ff"
              wireframe
              transparent
              opacity={0.85}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          {/* outer wire lattice, counter-rotating */}
          <mesh ref={shellB}>
            <icosahedronGeometry args={[0.62, 2]} />
            <meshBasicMaterial
              color="#8b7bff"
              wireframe
              transparent
              opacity={0.32}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          {/* sparks on the lattice joints */}
          <points>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[sparkPositions, 3]} />
            </bufferGeometry>
            <pointsMaterial
              size={0.06}
              map={glowTexture()}
              color="#d8f4ff"
              transparent
              opacity={0.9}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
              sizeAttenuation
            />
          </points>
          {/* orbit rings */}
          <mesh ref={ringA} rotation={[1.2, 0.4, 0]}>
            <torusGeometry args={[0.85, 0.006, 8, 96]} />
            <meshBasicMaterial
              color="#59e0ff"
              transparent
              opacity={0.55}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          <mesh ref={ringB} rotation={[-0.9, 0.9, 0.4]}>
            <torusGeometry args={[1.02, 0.004, 8, 96]} />
            <meshBasicMaterial
              color="#8b7bff"
              transparent
              opacity={0.4}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
        <sprite scale={4.2}>
          <spriteMaterial
            map={glowTexture(256, 0.7)}
            color="#59e0ff"
            transparent
            opacity={0.6}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
        <sprite scale={11} position={[0, 0, -2]}>
          <spriteMaterial
            map={glowTexture(256, 0.85)}
            color="#2a2470"
            transparent
            opacity={0.6}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>

        {/* dendrites */}
        {dendrites.map((d, i) => (
          <mesh key={i} geometry={d.tube}>
            <meshBasicMaterial
              color={d.major ? '#6fd8ff' : '#5a4fd0'}
              transparent
              opacity={d.major ? 0.5 : 0.3}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}

        {/* electric pulses */}
        {pulses.current.map((_, i) => (
          <sprite
            key={i}
            ref={(el) => {
              if (el) pulseRefs.current[i] = el
            }}
          >
            <spriteMaterial
              map={glowTexture()}
              color="#d8f4ff"
              transparent
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </sprite>
        ))}

        {/* ambient micro-web around the neuron */}
        <NeuronWeb
          seed={31}
          radius={7.2}
          nodeCount={64}
          linkDistance={2.9}
          colors={['#8b7bff', '#59e0ff', '#4a9eff']}
          pulseColor="#a9ecff"
          pulseCount={10}
          parallax={0.05}
          spread={[1.9, 1.0, 0.7]}
        />
      </group>

      {items.map((p, i) => (
        <ProjectNode
          key={p.slug}
          project={p}
          position={terminals[i]}
          accent="#59e0ff"
          visible={active}
        />
      ))}
    </group>
  )
}
