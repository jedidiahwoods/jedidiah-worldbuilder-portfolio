import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { glowTexture, mulberry32 } from './textures'

interface Pulse {
  a: number
  b: number
  t: number
  speed: number
}

/**
 * The hero object: a living web of cosmic neurons — glowing nodes joined by
 * faint filaments, with signal pulses travelling between them. Responds to
 * the pointer by leaning toward it.
 */
export function NeuronWeb({
  position = [0, 0, 0] as [number, number, number],
  seed = 7,
  radius = 6.5,
  nodeCount = 64,
  linkDistance = 3.1,
  colors = ['#8b7bff', '#59e0ff', '#ffd9a8'],
  pulseColor = '#bfe9ff',
  pulseCount = 14,
  parallax = 0.22,
}) {
  const group = useRef<THREE.Group>(null!)
  const pulseRefs = useRef<THREE.Sprite[]>([])

  const { nodes, nodeColors, links, linePositions } = useMemo(() => {
    const rand = mulberry32(seed)
    const nodes: THREE.Vector3[] = []
    for (let i = 0; i < nodeCount; i++) {
      // flattened ellipsoid cloud — grand, galaxy-like
      const theta = rand() * Math.PI * 2
      const phi = Math.acos(2 * rand() - 1)
      const r = radius * (0.35 + 0.65 * Math.cbrt(rand()))
      nodes.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta) * 1.4,
          r * Math.sin(phi) * Math.sin(theta) * 0.75,
          r * Math.cos(phi) * 0.9
        )
      )
    }
    const palette = colors.map((c) => new THREE.Color(c))
    const nodeColors = nodes.map(() => palette[Math.floor(rand() * palette.length)])

    const links: [number, number][] = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < linkDistance) links.push([i, j])
      }
    }
    const linePositions = new Float32Array(links.length * 6)
    links.forEach(([a, b], k) => {
      linePositions.set([nodes[a].x, nodes[a].y, nodes[a].z], k * 6)
      linePositions.set([nodes[b].x, nodes[b].y, nodes[b].z], k * 6 + 3)
    })
    return { nodes, nodeColors, links, linePositions }
  }, [seed, radius, nodeCount, linkDistance, colors])

  const nodeGeom = useMemo(() => {
    const positions = new Float32Array(nodes.length * 3)
    const cols = new Float32Array(nodes.length * 3)
    nodes.forEach((n, i) => {
      positions.set([n.x, n.y, n.z], i * 3)
      cols.set([nodeColors[i].r, nodeColors[i].g, nodeColors[i].b], i * 3)
    })
    return { positions, cols }
  }, [nodes, nodeColors])

  const pulses = useRef<Pulse[]>([])
  if (pulses.current.length === 0 && links.length > 0) {
    const rand = mulberry32(seed + 99)
    pulses.current = Array.from({ length: pulseCount }, () => {
      const [a, b] = links[Math.floor(rand() * links.length)]
      return { a, b, t: rand(), speed: 0.25 + rand() * 0.5 }
    })
  }

  useFrame(({ clock, pointer }, dt) => {
    const t = clock.elapsedTime
    group.current.rotation.y = t * 0.03 + pointer.x * parallax
    group.current.rotation.x = Math.sin(t * 0.05) * 0.06 - pointer.y * parallax * 0.7
    // breathing
    const s = 1 + Math.sin(t * 0.4) * 0.015
    group.current.scale.setScalar(s)

    // advance pulses
    const rand = Math.random
    pulses.current.forEach((p, i) => {
      p.t += dt * p.speed
      if (p.t >= 1) {
        const link = links[Math.floor(rand() * links.length)]
        p.a = link[0]
        p.b = link[1]
        p.t = 0
        p.speed = 0.25 + rand() * 0.5
      }
      const sprite = pulseRefs.current[i]
      if (sprite) {
        sprite.position.lerpVectors(nodes[p.a], nodes[p.b], p.t)
        const fade = Math.sin(p.t * Math.PI)
        sprite.scale.setScalar(0.25 + fade * 0.3)
        ;(sprite.material as THREE.SpriteMaterial).opacity = fade * 0.9
      }
    })
  })

  return (
    <group ref={group} position={position}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodeGeom.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[nodeGeom.cols, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.32}
          map={glowTexture()}
          vertexColors
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color="#7f8ce0"
          transparent
          opacity={0.16}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      {pulses.current.map((_, i) => (
        <sprite
          key={i}
          ref={(el) => {
            if (el) pulseRefs.current[i] = el
          }}
        >
          <spriteMaterial
            map={glowTexture()}
            color={pulseColor}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
      ))}
      {/* faint heart-glow at the core */}
      <sprite scale={7}>
        <spriteMaterial
          map={glowTexture(256, 0.8)}
          color="#3d3480"
          transparent
          opacity={0.5}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
    </group>
  )
}
