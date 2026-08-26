import { useMemo, useRef, useState } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { Billboard, Html } from '@react-three/drei'
import * as THREE from 'three'
import { useNavigate } from 'react-router-dom'
import { glowTexture } from './textures'
import type { Project } from '../data/projects'

/**
 * A clickable glowing photo-medallion representing one project:
 * the project's cover image inside a luminous ring, haloed in the
 * realm's accent color. Swap the cover file to change the orb.
 */
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
  const medallion = useRef<THREE.Group>(null!)
  const halo = useRef<THREE.Sprite>(null!)
  const ring = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)

  const texture = useLoader(THREE.TextureLoader, project.cover)

  // center-crop the cover into the circle, whatever its aspect ratio
  useMemo(() => {
    const img = texture.image as { width?: number; height?: number } | undefined
    if (img?.width && img?.height) {
      const aspect = img.width / img.height
      if (aspect > 1) {
        texture.repeat.set(1 / aspect, 1)
        texture.offset.set((1 - 1 / aspect) / 2, 0)
      } else {
        texture.repeat.set(1, aspect)
        texture.offset.set(0, (1 - aspect) / 2)
      }
    }
    texture.colorSpace = THREE.SRGBColorSpace
  }, [texture])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const pulse = 1 + Math.sin(t * 2 + position[0] * 3.1) * 0.05
    const boost = hovered ? 1.22 : 1
    medallion.current.scale.setScalar(pulse * boost)
    halo.current.scale.setScalar(2.1 * pulse * boost)
    ;(halo.current.material as THREE.SpriteMaterial).opacity = hovered ? 0.95 : 0.55
    ;(ring.current.material as THREE.MeshBasicMaterial).opacity = hovered ? 1 : 0.75
  })

  const open = () => {
    if (visible) navigate(`/project/${project.slug}`)
  }

  return (
    <group position={position}>
      <sprite ref={halo} position={[0, 0, -0.06]}>
        <spriteMaterial
          map={glowTexture()}
          color={accent}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
      <Billboard>
        <group ref={medallion}>
          <mesh
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
            <circleGeometry args={[0.52, 48]} />
            <meshBasicMaterial map={texture} toneMapped={false} />
          </mesh>
          <mesh ref={ring}>
            <ringGeometry args={[0.55, 0.585, 64]} />
            <meshBasicMaterial
              color={accent}
              transparent
              opacity={0.75}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      </Billboard>
      {visible && (
        <Html center position={[0, -0.95, 0]} zIndexRange={[10, 0]}>
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
