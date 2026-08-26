import * as THREE from 'three'

/**
 * Shared pointer target for every parallax effect on the site.
 * Follows the cursor / touch while it is actively over the page and
 * snaps its TARGET back to dead center the moment it leaves, so all
 * the elements that lerp toward it ease back into symmetry.
 * x: -1..1 (right positive) · y: -1..1 (up positive)
 */
export const cosmicPointer = new THREE.Vector2(0, 0)

let bound = false

export function bindCosmicPointer() {
  if (bound || typeof window === 'undefined') return
  bound = true

  const onMove = (e: PointerEvent) => {
    cosmicPointer.set(
      (e.clientX / window.innerWidth) * 2 - 1,
      -((e.clientY / window.innerHeight) * 2 - 1)
    )
  }
  const reset = () => cosmicPointer.set(0, 0)

  window.addEventListener('pointermove', onMove, { passive: true })
  document.documentElement.addEventListener('pointerleave', reset)
  document.documentElement.addEventListener('mouseleave', reset)
  window.addEventListener('blur', reset)
  window.addEventListener('touchend', reset)
  window.addEventListener('touchcancel', reset)
}
