import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { starTexture, glowTexture, mulberry32 } from './textures'

/** Deep-space starfield + nebula clouds spanning the whole world. */
export function Starfield() {
  const group = useRef<THREE.Group>(null!)

  const { positions, colors, sizes } = useMemo(() => {
    const rand = mulberry32(42)
    const count = 2600
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const palette = [
      new THREE.Color('#e9e7f5'),
      new THREE.Color('#bcd7ff'),
      new THREE.Color('#8b7bff'),
      new THREE.Color('#59e0ff'),
      new THREE.Color('#ffd9a8'),
    ]
    for (let i = 0; i < count; i++) {
      // wide slab of space covering hero + both realms
      positions[i * 3] = (rand() - 0.5) * 260
      positions[i * 3 + 1] = (rand() - 0.5) * 90
      positions[i * 3 + 2] = -6 - rand() * 90
      const c = palette[Math.floor(rand() * palette.length)]
      const dim = 0.35 + rand() * 0.65
      colors[i * 3] = c.r * dim
      colors[i * 3 + 1] = c.g * dim
      colors[i * 3 + 2] = c.b * dim
      sizes[i] = 0.4 + rand() * 1.4
    }
    return { positions, colors, sizes }
  }, [])

  useFrame(({ clock, pointer }) => {
    const t = clock.elapsedTime
    // slow cosmic drift + gentle pointer parallax
    group.current.rotation.z = Math.sin(t * 0.02) * 0.02
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, pointer.x * -1.2, 0.02)
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, pointer.y * -0.8, 0.02)
  })

  const nebulae = useMemo(
    () => [
      // hero: violet / cyan cosmos
      { pos: [-6, 3, -34], scale: 34, color: '#4a3d8f', opacity: 0.30 },
      { pos: [8, -4, -40], scale: 40, color: '#1b4a66', opacity: 0.26 },
      { pos: [0, 6, -55], scale: 52, color: '#2a1f5e', opacity: 0.3 },
      { pos: [-2, -7, -30], scale: 24, color: '#59306b', opacity: 0.16 },
      // physical realm: ember nebula
      { pos: [-62, 5, -30], scale: 38, color: '#6b3a1c', opacity: 0.3 },
      { pos: [-56, -6, -42], scale: 44, color: '#4a2547', opacity: 0.26 },
      // digital realm: electric nebula
      { pos: [62, 4, -32], scale: 38, color: '#1c3f6b', opacity: 0.3 },
      { pos: [56, -6, -44], scale: 46, color: '#35216b', opacity: 0.3 },
    ],
    []
  )

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
          <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.5}
          map={starTexture()}
          vertexColors
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
      {nebulae.map((n, i) => (
        <sprite key={i} position={n.pos as [number, number, number]} scale={n.scale}>
          <spriteMaterial
            map={glowTexture(256, 0.75)}
            color={n.color}
            transparent
            opacity={n.opacity}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
      ))}
    </group>
  )
}
