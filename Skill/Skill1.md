---
name: threejs-scroll-3d
description: Créer des animations 3D hero premium avec Three.js synchronisées au scroll, avec particules, morphing, et post-processing. Utiliser ce skill pour tout composant HeroScene3D, canvas 3D interactif, ou animation scroll Three.js dans Next.js.
---

# SKILL : Three.js Scroll 3D Animation (Next.js / React)

## Installation dépendances
```bash
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing
npm install -D @types/three
```

## Architecture du composant HeroScene3D

### Structure de base (Next.js compatible)
```tsx
// components/HeroScene3D.tsx
'use client'
import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

// TOUJOURS wrapper Canvas dans dynamic import (SSR désactivé)
// Dans la page parent :
// const HeroScene3D = dynamic(() => import('@/components/HeroScene3D'), { ssr: false })
```

### Pattern scroll progress
```tsx
// Utiliser useScroll de @react-three/drei pour le progress
import { useScroll } from '@react-three/drei'

function Scene() {
  const scroll = useScroll()
  
  useFrame(() => {
    const progress = scroll.offset // 0 à 1
    // Appliquer morphing selon progress
  })
}

// OU utiliser un listener scroll classique pour Canvas externe
useEffect(() => {
  const container = containerRef.current
  const handleScroll = () => {
    const rect = container.getBoundingClientRect()
    const totalHeight = container.offsetHeight - window.innerHeight
    const scrolled = Math.max(0, -rect.top)
    setProgress(Math.min(1, scrolled / totalHeight))
  }
  window.addEventListener('scroll', handleScroll, { passive: true })
  return () => window.removeEventListener('scroll', handleScroll)
}, [])
```

### Particules dorées (pattern éprouvé)
```tsx
function GoldenParticles({ progress }: { progress: number }) {
  const pointsRef = useRef<THREE.Points>(null)
  const COUNT = 6000
  
  // Générer positions sphériques de base
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    const goldColor = new THREE.Color('#C9A227')
    const goldLightColor = new THREE.Color('#E8C84A')
    
    for (let i = 0; i < COUNT; i++) {
      // Position initiale : chaos
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2 + Math.random() * 3
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
      
      // Couleur or avec variation
      const c = Math.random() > 0.5 ? goldColor : goldLightColor
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    return { positions, colors }
  }, [])
  
  // Morphing cibles selon progress
  useFrame(() => {
    if (!pointsRef.current) return
    const posAttr = pointsRef.current.geometry.attributes.position
    
    for (let i = 0; i < COUNT; i++) {
      // Phase 1 (0-0.3): chaos → sphère
      // Phase 2 (0.3-0.6): sphère → spirale
      // Phase 3 (0.6-0.85): spirale → explosion
      // Phase 4 (0.85-1): recomposition
      // Interpoler avec THREE.MathUtils.lerp
    }
    posAttr.needsUpdate = true
  })
  
  return (
    <Points ref={pointsRef} positions={positions} colors={colors}>
      <PointMaterial
        size={0.015}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  )
}
```

### Canvas wrapper avec sticky scroll
```tsx
export default function HeroScene3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [webglSupported, setWebglSupported] = useState(true)
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  
  // Check WebGL support
  useEffect(() => {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) setWebglSupported(false)
  }, [])
  
  if (prefersReducedMotion || !webglSupported) {
    return <HeroStaticFallback />
  }
  
  return (
    <div ref={containerRef} className="relative h-[600vh]">
      {/* Canvas sticky */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          gl={{ antialias: true, alpha: true }}
          aria-label="Animation 3D de particules dorées illustrant la création d'un événement sur mesure"
          role="img"
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} color="#C9A227" intensity={1} />
          <GoldenParticles progress={progress} />
          <EffectComposer>
            <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} intensity={0.8} />
          </EffectComposer>
        </Canvas>
        
        {/* Overlays texte au-dessus du canvas */}
        <ScrollOverlays progress={progress} />
      </div>
    </div>
  )
}
```

## Performance rules
1. **Jamais** de `new THREE.Vector3()` dans `useFrame` — pré-allouer hors du loop
2. **`posAttr.needsUpdate = true`** uniquement si frame a vraiment changé
3. **Delta guard** : `if (Math.abs(progress - prevProgress.current) < 0.002) return`
4. Utiliser `useMemo` pour toutes les géométries et matériaux
5. `dispose()` les géométries et matériaux dans le cleanup `useEffect`
6. Canvas `gl={{ powerPreference: 'high-performance' }}` pour GPU dédié
7. **Désactiver antialiasing** sur mobile (détecter avec `window.innerWidth < 768`)

## Overlays texte synchro scroll
```tsx
// Chaque overlay s'affiche dans une fenêtre de progress
interface Overlay { threshold: number; duration: number; content: ReactNode; position: 'left'|'right'|'center' }

function ScrollOverlays({ progress }: { progress: number }) {
  const overlays = useScrollOverlays(locale) // hook retournant les 5 overlays
  
  return (
    <div className="absolute inset-0 pointer-events-none">
      {overlays.map((overlay, i) => {
        const visible = progress >= overlay.threshold && progress < overlay.threshold + overlay.duration
        const opacity = visible ? 1 : 0
        
        return (
          <motion.div
            key={i}
            animate={{ opacity, y: visible ? 0 : 20 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`absolute ${overlay.position === 'center' ? 'inset-0 flex items-center justify-center' : ''}`}
          >
            {overlay.content}
          </motion.div>
        )
      })}
    </div>
  )
}
```

## Fallback statique
```tsx
function HeroStaticFallback() {
  return (
    <div className="relative h-screen flex items-center justify-center bg-[#05070A] overflow-hidden">
      {/* Particules CSS pures comme fallback */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#C9A227] opacity-30"
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 6 + 4}s ease-in-out infinite`,
              animationDelay: Math.random() * 4 + 's'
            }}
          />
        ))}
      </div>
      <HeroContent />
    </div>
  )
}
```

## Import dans page (OBLIGATOIRE : dynamic + ssr:false)
```tsx
// app/[locale]/page.tsx
import dynamic from 'next/dynamic'

const HeroScene3D = dynamic(
  () => import('@/components/HeroScene3D'),
  {
    ssr: false,
    loading: () => <HeroLoadingSpinner />
  }
)
```

## Checklist qualité
- [ ] `ssr: false` sur dynamic import
- [ ] WebGL support check
- [ ] `prefers-reduced-motion` respecté
- [ ] `aria-label` sur canvas
- [ ] dispose() dans cleanup
- [ ] Delta guard dans useFrame
- [ ] Particules pre-allouées avec useMemo
- [ ] Bloom post-processing dosé (intensity 0.5–1.0 max)
- [ ] Fallback statique fonctionnel sans JavaScript