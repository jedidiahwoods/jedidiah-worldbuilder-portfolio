import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { useNavigate } from 'react-router-dom'
import { glowTexture } from './textures'
import type { Project } from '../data/projects'

/** A clickable glowing star-node representing one project. */
export function ProjectNode({
  project,
  position,
  accent,
  visible,
}: {
  project: Project
  position: [number, number, number]
  accent: string
  visible: boolean
}) {
  const navigate = useNavigate()
  const core = useRef<THREE.Mesh>(null!)
  const halo = useRef<THREE.Sprite>(null!)
  const [hovered, setHovered] = useState(false)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const pulse = 1 + Math.sin(t * 2 + position[0] * 3.1) * 0.08
    const boost = hovered ? 1.45 : 1
    core.current.scale.setScalar(pulse * boost)
    halo.current.scale.setScalar(1.6 * pulse * boost)
    ;(halo.current.material as THREE.SpriteMaterial).opacity = hovered ? 0.95 : 0.6
  })

  const open = () => {
    if (visible) navigate(`/project/${project.slug}`)
  }

  return (
    <group position={position}>
      <mesh
        ref={core}
        onClick={open}
        onPointerOver={() => {
          if (!visible) return
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = 'auto'
        }}
      >
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <sprite ref={halo}>
        <spriteMaterial
          map={glowTexture()}
          color={accent}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
      {visible && (
        <Html center position={[0, -0.42, 0]} zIndexRange={[10, 0]}>
          <div className="node-label" onClick={open} style={{ transform: 'translateY(0)' }}>
            <div className="node-name" style={hovered ? { color: accent } : undefined}>
              {project.name}
            </div>
            <div className="node-tag">{project.status}</div>
          </div>
        </Html>
      )}
    </group>
  )
}
