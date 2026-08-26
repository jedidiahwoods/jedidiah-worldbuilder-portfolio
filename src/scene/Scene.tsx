import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useLocation } from 'react-router-dom'
import { bindCosmicPointer, cosmicPointer } from './pointer'
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

/**
 * The world loops like a cylinder: flying right past the Digital Realm
 * wraps around to approach the Physical Realm from the left, so the
 * realm-switch arrows never backtrack. The seam sits in empty starfield
 * at |x| = WRAP_X, where the teleport is invisible.
 */
const WRAP_X = 135

function CameraRig({ mode }: { mode: Mode }) {
  const look = useRef(new THREE.Vector3(0, 0, 0))
  const base = useRef<THREE.Vector3 | null>(null)
  const drift = useRef(new THREE.Vector3())
  const driftTarget = useRef(new THREE.Vector3())
  const prevMode = useRef<Mode>(mode)
  const warping = useRef(false)

  if (prevMode.current !== mode) {
    // digital → physical continues rightward and wraps around the cosmos
    warping.current = prevMode.current === 'digital' && mode === 'physical'
    prevMode.current = mode
  }

  useFrame(({ camera, size }, dt) => {
    if (!base.current) base.current = camera.position.clone()
    const pointer = cosmicPointer
    const raw = CAMERA_TARGETS[mode]
    // pull back on narrow screens so the realm layouts fit
    const portrait = size.width / size.height < 0.9
    const target =
      portrait && mode !== 'hero'
        ? { pos: raw.pos.clone().setZ(raw.pos.z * 1.32), look: raw.look }
        : raw

    // pointer drift tracks the cursor much faster than the realm flight
    const fast = 1 - Math.exp(-dt * 9)
    driftTarget.current.set(pointer.x * 0.9, pointer.y * 0.6, 0)
    drift.current.lerp(driftTarget.current, fast)

    if (warping.current) {
      // phase 1: accelerate right toward the seam
      const out = new THREE.Vector3(WRAP_X + 10, target.pos.y, target.pos.z)
      const damp = 1 - Math.exp(-dt * 2.6)
      base.current.lerp(out, damp)
      look.current.lerp(new THREE.Vector3(WRAP_X + 10, 0, 0), damp)
      camera.position.copy(base.current).add(drift.current)
      camera.lookAt(look.current)
      if (base.current.x > WRAP_X - 8) {
        // seam: jump across the wrap in empty space, still moving right
        base.current.x -= 2 * WRAP_X
        look.current.x -= 2 * WRAP_X
        warping.current = false
      }
      return
    }

    const damp = 1 - Math.exp(-dt * 1.8)
    base.current.lerp(target.pos, damp)
    look.current.lerp(target.look, damp)
    camera.position.copy(base.current).add(drift.current)
    camera.lookAt(look.current)
  })

  return null
}

/** The persistent universe. Lives behind every route. */
export function Scene() {
  const mode = useMode()

  useEffect(() => {
    bindCosmicPointer()
  }, [])

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
          {/* hero: the cosmic neuron web where universe meets mind — spread to the screen edges */}
          <NeuronWeb radius={7.4} nodeCount={110} linkDistance={3.2} spread={[2.0, 1.0, 0.9]} pulseCount={18} />
          <PhysicalRealm center={PHYSICAL_CENTER} active={mode === 'physical'} />
          <DigitalRealm center={DIGITAL_CENTER} active={mode === 'digital'} />
        </Suspense>
        <CameraRig mode={mode} />
      </Canvas>
    </div>
  )
}
