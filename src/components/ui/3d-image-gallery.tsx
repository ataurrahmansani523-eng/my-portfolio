import React, { Suspense, useEffect, useMemo, useRef, useState, createContext, useContext } from "react"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  OrbitControls,
  Environment,
  Html,
  Plane,
  Sphere,
} from "@react-three/drei"
import { Download, Heart, X, ArrowLeft, Sparkles, Move } from "lucide-react"

/**
 * Single-file Stellar Card Gallery featuring Sani's custom vision chronicles
 */

type Card = {
  id: string
  imageUrl: string
  alt: string
  title: string
}

type CardContextType = {
  selectedCard: Card | null
  setSelectedCard: (card: Card | null) => void
  cards: Card[]
}

const CardContext = createContext<CardContextType | undefined>(undefined)

function useCard() {
  const ctx = useContext(CardContext)
  if (!ctx) throw new Error("useCard must be used within CardProvider")
  return ctx
}

function CardProvider({ children }: { children: React.ReactNode }) {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)

  const cards: Card[] = [
    { id: "1", imageUrl: "https://i.imgur.com/nlAidIi.jpeg", alt: "Royal Sovereign Setup", title: "Imperial Legacy" },
    { id: "2", imageUrl: "https://i.imgur.com/OmwzPcp.jpeg", alt: "Dignified Classic Aesthetics", title: "Sovereign Sanctuary" },
    { id: "3", imageUrl: "https://i.imgur.com/cQaS1Ne.jpeg", alt: "Prestigious Interior Command", title: "Executive Command" },
    { id: "4", imageUrl: "https://i.imgur.com/gNHguEp.jpeg", alt: "Deluxe Gold Desk Setup", title: "Golden Vision" },
    { id: "5", imageUrl: "https://i.imgur.com/4aC0OVv.jpeg", alt: "Elite Penthouse Lounge", title: "Elite Prestige" },
    { id: "6", imageUrl: "https://i.imgur.com/01gXB9I.jpeg", alt: "Ultimate Sovereign Quarters", title: "Supreme Residence" },
    { id: "7", imageUrl: "https://i.imgur.com/L7BLv5p.jpeg", alt: "Sovereign Executive Workspace", title: "Absolute Command" },
    { id: "8", imageUrl: "https://i.imgur.com/zoCt994.jpeg", alt: "Prestigious Sovereign Study", title: "Majestic Quarters" },
    { id: "9", imageUrl: "https://i.imgur.com/qrpJ8hw.jpeg", alt: "High-End Architectural Solitude", title: "Infinite Growth" },
    { id: "10", imageUrl: "https://i.imgur.com/1HJgDPc.jpeg", alt: "Divine Imperial Sanctuary", title: "Imperial Throne" },
  ]

  return (
    <CardContext.Provider value={{ selectedCard, setSelectedCard, cards }}>
      {children}
    </CardContext.Provider>
  )
}

function StarfieldBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x0a0a0a, 1)
    mountRef.current.appendChild(renderer.domElement)

    const starsGeometry = new THREE.BufferGeometry()
    const starsCount = 12000
    const positions = new Float32Array(starsCount * 3)
    const colors = new Float32Array(starsCount * 3)

    for (let i = 0; i < starsCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000

      // Blend some golden stars into the cosmic array
      if (Math.random() > 0.8) {
        colors[i * 3] = 0.784 // R: 200
        colors[i * 3 + 1] = 0.635 // G: 162
        colors[i * 3 + 2] = 0.290 // B: 74
      } else {
        colors[i * 3] = 1.0
        colors[i * 3 + 1] = 1.0
        colors[i * 3 + 2] = 1.0
      }
    }

    starsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    starsGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    
    const starsMaterial = new THREE.PointsMaterial({ 
      size: 0.85, 
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    })
    
    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)

    camera.position.z = 10

    let animationId = 0
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      stars.rotation.y += 0.00015
      stars.rotation.x += 0.00008
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      if (!camera || !renderer) return
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      starsGeometry.dispose()
      starsMaterial.dispose()
    }
  }, [])

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full z-0 bg-black" />
}

function FloatingCard({
  card,
  position,
}: {
  card: Card
  position: { x: number; y: number; z: number; rotationX: number; rotationY: number; rotationZ: number }
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const { setSelectedCard } = useCard()

  useFrame(({ camera }) => {
    if (groupRef.current) {
      groupRef.current.lookAt(camera.position)
    }
  })

  const handleClick = (e: any) => {
    e.stopPropagation()
    setSelectedCard(card)
  }
  const handlePointerOver = (e: any) => {
    e.stopPropagation()
    setHovered(true)
    document.body.style.cursor = "pointer"
  }
  const handlePointerOut = (e: any) => {
    e.stopPropagation()
    setHovered(false)
    document.body.style.cursor = "auto"
  }

  return (
    <group ref={groupRef} position={[position.x, position.y, position.z]}>
      <Plane
        ref={meshRef}
        args={[4.5, 6]}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <meshBasicMaterial transparent opacity={0} />
      </Plane>

      <Html
        transform
        distanceFactor={11}
        position={[0, 0, 0.02]}
        style={{
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: hovered ? "scale(1.18)" : "scale(1)",
          pointerEvents: "none",
        }}
      >
        <div
          className="w-44 h-[256px] rounded-xl overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.85)] bg-[#0f0f11]/90 p-2.5 select-none text-center border transition-all duration-300"
          style={{
            boxShadow: hovered
              ? "0 30px 60px rgba(200, 162, 74, 0.4), 0 0 35px rgba(200, 162, 74, 0.2)"
              : "0 15px 40px rgba(0, 0, 0, 0.7)",
            borderColor: hovered ? "rgba(200, 162, 74, 0.65)" : "rgba(255, 255, 255, 0.06)",
          }}
        >
          <div className="w-full h-[188px] overflow-hidden rounded-lg bg-zinc-950">
            <img
              src={card.imageUrl}
              alt={card.alt}
              className="w-full h-full object-cover transition-transform duration-700"
              style={{
                transform: hovered ? "scale(1.1)" : "scale(1)"
              }}
              loading="lazy"
              draggable={false}
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="mt-3">
            <p className="text-[#F5F2EA] text-[10px] font-sans font-medium tracking-[0.2em] uppercase truncate px-1">
              {card.title}
            </p>
          </div>
        </div>
      </Html>
    </group>
  )
}

function CardModal() {
  const { selectedCard, setSelectedCard } = useCard()
  const [isFavorited, setIsFavorited] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  if (!selectedCard) return null

  // Subtle clean 3D tilt interaction for focus details
  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 22
    const rotateY = (centerX - x) / 22
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)"
    }
  }

  const toggleFavorite = () => setIsFavorited((v) => !v)
  const handleClose = () => setSelectedCard(null)
  
  const handleBackdropClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) handleClose()
  }

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center bg-black/92 backdrop-blur-md select-none" onClick={handleBackdropClick}>
      <div className="relative max-w-sm sm:max-w-md w-full mx-4">
        {/* Dynamic decorative border frame inside the popup */}
        <button 
          onClick={handleClose} 
          className="absolute -top-16 right-1/2 translate-x-1/2 sm:translate-x-0 sm:right-0 w-12 h-12 flex items-center justify-center rounded-full border border-white/10 hover:border-[#C8A24A]/40 text-white hover:text-[#C8A24A] transition-all z-20 bg-black/50 backdrop-blur"
        >
          <X className="w-5 h-5" />
        </button>

        <div style={{ perspective: "1000px" }} className="w-full">
          <div
            ref={cardRef}
            className="relative rounded-2xl bg-[#0b0c0d] border border-white/[0.05] p-5 transition-all duration-300 ease-out w-full shadow-[0_30px_90px_rgba(0,0,0,0.95)]"
            style={{
              transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Elegant corner dots */}
            <div className="absolute top-4 left-4 w-1.5 h-1.5 rounded-full bg-[#C8A24A]/45" />
            <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-[#C8A24A]/45" />
            <div className="absolute bottom-4 left-4 w-1.5 h-1.5 rounded-full bg-[#C8A24A]/45" />
            <div className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full bg-[#C8A24A]/45" />

            <div className="relative w-full mb-5 rounded-lg overflow-hidden bg-black" style={{ aspectRatio: "4 / 5" }}>
              <img
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
                alt={selectedCard.alt}
                src={selectedCard.imageUrl}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            <h3 className="text-[#F5F2EA] text-center text-sm font-semibold tracking-[0.25em] font-serif mb-5 uppercase">
              {selectedCard.title}
            </h3>

            <div className="flex gap-3">
              <a
                href={selectedCard.imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 h-12 flex items-center justify-center rounded-full font-sans text-[10px] font-bold tracking-[0.25em] uppercase transition duration-300 bg-[#C8A24A] hover:bg-[#b08b34] text-black shadow-[0_5px_15px_rgba(200,162,74,0.25)] select-none"
              >
                <div className="flex items-center gap-2">
                  <Download className="h-3.5 w-3.5" />
                  <span>HQ View</span>
                </div>
              </a>
              <button
                type="button"
                onClick={toggleFavorite}
                className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 hover:border-red-500 hover:text-red-500 hover:bg-red-500/5 text-zinc-400 transition-all active:scale-95"
              >
                <Heart className={`h-4 w-4 ${isFavorited ? "text-red-500" : ""}`} fill={isFavorited ? "#ef4444" : "none"} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CardGalaxy() {
  const { cards } = useCard()

  const cardPositions = useMemo(() => {
    const positions: {
      x: number
      y: number
      z: number
      rotationX: number
      rotationY: number
      rotationZ: number
    }[] = []
    const numCards = cards.length
    const goldenRatio = (1 + Math.sqrt(5)) / 2

    for (let i = 0; i < numCards; i++) {
      const y = 1 - (i / (numCards - 1)) * 2
      const radiusAtY = Math.sqrt(1 - y * y)
      const theta = (2 * Math.PI * i) / goldenRatio
      const x = Math.cos(theta) * radiusAtY
      const z = Math.sin(theta) * radiusAtY
      
      // Luxury distribution distance in 3D sphere
      const layerRadius = 14 + (i % 3) * 3.5

      positions.push({
        x: x * layerRadius,
        y: y * layerRadius,
        z: z * layerRadius,
        rotationX: Math.atan2(z, Math.sqrt(x * x + y * y)),
        rotationY: Math.atan2(x, z),
        rotationZ: (Math.random() - 0.5) * 0.15,
      })
    }
    return positions
  }, [cards.length])

  return (
    <>
      <Sphere args={[2.5, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#C8A24A" transparent opacity={0.06} wireframe />
      </Sphere>
      <Sphere args={[13, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#C8A24A" transparent opacity={0.03} wireframe />
      </Sphere>
      <Sphere args={[17, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#C8A24A" transparent opacity={0.015} wireframe />
      </Sphere>

      {cards.map((card, i) => (
        <FloatingCard key={card.id} card={card} position={cardPositions[i]} />
      ))}
    </>
  )
}

interface StellarCardGalleryProps {
  onClose?: () => void
}

export default function StellarCardGallerySingle({ onClose }: StellarCardGalleryProps) {
  return (
    <CardProvider>
      <div className="w-full h-screen relative overflow-hidden bg-[#070707] z-[220]">
        
        {/* Starfield particles simulation */}
        <StarfieldBackground />

        {/* Cinematic Grid Lines Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#1c1914_1.3px,transparent_1.3px)] [background-size:32px_32px] opacity-25 pointer-events-none z-10" />

        {/* 3D WebGL Canvas Component */}
        <Canvas
          camera={{ position: [0, 0, 18], fov: 60 }}
          className="absolute inset-0 z-10"
          onCreated={({ gl }) => {
            gl.domElement.style.pointerEvents = "auto"
          }}
        >
          <Suspense fallback={null}>
            <Environment preset="night" />
            <ambientLight intensity={0.45} />
            <pointLight position={[15, 15, 15]} intensity={0.7} />
            <pointLight position={[-15, -15, -15]} intensity={0.45} />
            <CardGalaxy />
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={5}
              maxDistance={38}
              autoRotate={true}
              autoRotateSpeed={0.35}
              rotateSpeed={0.5}
              zoomSpeed={1.0}
              panSpeed={0.6}
              target={[0, 0, 0]}
            />
          </Suspense>
        </Canvas>

        {/* Single Fullscreen Interactive Card Viewer popup */}
        <CardModal />

        {/* Ambient Top Headers Overlay */}
        <div className="absolute top-6 left-6 md:left-10 z-20 flex items-center gap-4 text-white pointer-events-none select-none">
          {onClose && (
            <button
              onClick={onClose}
              className="pointer-events-auto h-11 px-5 border border-white/10 hover:border-[#C8A24A]/40 bg-black/60 hover:bg-black/85 text-zinc-200 hover:text-[#C8A24A] text-[9px] font-sans font-bold uppercase tracking-[0.3em] rounded-full flex items-center gap-2 cursor-pointer transition-all active:scale-[97%]"
            >
              <ArrowLeft size={13} />
              Return
            </button>
          )}

          <div className="hidden sm:flex flex-col">
            <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-[#C8A24A] font-semibold flex items-center gap-2">
              <Sparkles size={11} className="animate-spin" style={{ animationDuration: "5s" }} />
              Sani's Visual Chronicles
            </span>
          </div>
        </div>

        {/* Ambient Center Bottom controls indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 px-5 py-2 border border-white/[0.04] bg-black/75 backdrop-blur-md rounded-full pointer-events-none select-none flex items-center gap-2.5 shadow-25 opacity-75">
          <Move size={11} className="text-[#C8A24A] animate-pulse" />
          <p className="text-[8px] md:text-[9.5px] font-sans uppercase tracking-[0.25em] text-[#F5F2EA] font-medium">
            Drag to Rotate • Scroll to Zoom • Select card for detail
          </p>
        </div>

      </div>
    </CardProvider>
  )
}
