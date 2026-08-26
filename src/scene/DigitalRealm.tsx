import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { glowTexture, mulberry32 } from './textures'
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
  const nucleus = useRef<THREE.Mesh>(null!)
  const pulseRefs = useRef<THREE.Sprite[]>([])
  const items = projectsInRealm('digital')

  // terminal positions for the three project nodes
  const terminals: [number, number, number][] = [
    [-4.6, 1.9, 0.6],
    [4.7, 1.4, -0.4],
    [0.4, -3.4, 1.0],
  ]

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
  }, [])

  const pulses = useRef(
    Array.from({ length: 16 }, (_, i) => ({
      dendrite: i % 12,
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
        {/* nucleus */}
        <mesh ref={nucleus}>
          <icosahedronGeometry args={[0.42, 3]} />
          <meshBasicMaterial color="#8fd8ff" />
        </mesh>
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
          radius={5.6}
          nodeCount={46}
          linkDistance={2.6}
          colors={['#8b7bff', '#59e0ff', '#4a9eff']}
          pulseColor="#a9ecff"
          pulseCount={8}
          parallax={0.05}
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
