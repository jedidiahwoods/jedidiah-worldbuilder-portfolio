import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useLocation } from 'react-router-dom'
import { Starfield } from './Starfield'
import { NeuronWeb } from './NeuronWeb'
import { PhysicalRealm } from './PhysicalRealm'
import { DigitalRealm } from './DigitalRealm'
import { projectBySlug } from '../data/projects'

export const PHYSICAL_CENTER: [number, number, number] = [-60, 0, 0]
export const DIGITAL_CENTER: [number, number, number] = [60, 0, 0]

type Mode = 'hero' | 'physical' | 'digital'

function useMode(): Mode {
  const { pathname } = useLocation()
  return useMemo<Mode>(() => {
    if (pathname.startsWith('/physical')) return 'physical'
    if (pathname.startsWith('/digital')) return 'digital'
    if (pathname.startsWith('/project/')) {
      const slug = pathname.split('/')[2]
      const p = projectBySlug(slug)
      return p?.realm ?? 'hero'
    }
    return 'hero'
  }, [pathname])
}

const CAMERA_TARGETS: Record<Mode, { pos: THREE.Vector3; look: THREE.Vector3 }> = {
  hero: { pos: new THREE.Vector3(0, 0, 15), look: new THREE.Vector3(0, 0, 0) },
  physical: {
    pos: new THREE.Vector3(PHYSICAL_CENTER[0], 0.6, 10.5),
    look: new THREE.Vector3(PHYSICAL_CENTER[0], 0, 0),
  },
  digital: {
    pos: new THREE.Vector3(DIGITAL_CENTER[0], 0.3, 10),
    look: new THREE.Vector3(DIGITAL_CENTER[0], 0, 0),
  },
}

function CameraRig({ mode }: { mode: Mode }) {
  const look = useRef(new THREE.Vector3(0, 0, 0))

  useFrame(({ camera, pointer }, dt) => {
    const target = CAMERA_TARGETS[mode]
    const damp = 1 - Math.exp(-dt * 1.8)

    // flight toward the realm, with a gentle pointer-driven drift
    const desired = target.pos
      .clone()
      .add(new THREE.Vector3(pointer.x * 0.9, pointer.y * 0.6, 0))
    camera.position.lerp(desired, damp)
    look.current.lerp(target.look, damp)
    camera.lookAt(look.current)
  })

  return null
}

/** The persistent universe. Lives behind every route. */
export function Scene() {
  const mode = useMode()

  return (
    <div id="canvas-root">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 26], fov: 50, near: 0.1, far: 400 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={['#030309']} />
        <fog attach="fog" args={['#030309', 40, 160]} />
        <Suspense fallback={null}>
          <Starfield />
          {/* hero: the cosmic neuron web where universe meets mind */}
          <NeuronWeb />
          <PhysicalRealm center={PHYSICAL_CENTER} active={mode === 'physical'} />
          <DigitalRealm center={DIGITAL_CENTER} active={mode === 'digital'} />
        </Suspense>
        <CameraRig mode={mode} />
      </Canvas>
    </div>
  )
}
