"use client";
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import imagesLoaded from 'imagesloaded'
import { cn } from '@/lib/utils'
import { FaAws } from 'react-icons/fa'

// Premium Full-Color Brand Icon Components
const ReactIcon = ({ className, strokeWidth, ...props }: any) => (
  <img 
    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" 
    alt="React" 
    className={cn("w-9 h-9 object-contain transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(97,218,251,0.7)]", className)} 
    referrerPolicy="no-referrer"
  />
);

const NextJsIcon = ({ className, strokeWidth, ...props }: any) => (
  <img 
    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" 
    alt="Next.js" 
    className={cn("w-9 h-9 object-contain filter invert brightness-200 transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]", className)} 
    referrerPolicy="no-referrer"
  />
);

const TsIcon = ({ className, strokeWidth, ...props }: any) => (
  <img 
    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" 
    alt="TypeScript" 
    className={cn("w-9 h-9 object-contain transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(49,120,198,0.7)]", className)} 
    referrerPolicy="no-referrer"
  />
);

const JsIcon = ({ className, strokeWidth, ...props }: any) => (
  <img 
    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" 
    alt="JavaScript" 
    className={cn("w-9 h-9 object-contain transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(247,223,30,0.7)]", className)} 
    referrerPolicy="no-referrer"
  />
);

const NodeJsIcon = ({ className, strokeWidth, ...props }: any) => (
  <img 
    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" 
    alt="Node.js" 
    className={cn("w-9 h-9 object-contain transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(51,153,51,0.7)]", className)} 
    referrerPolicy="no-referrer"
  />
);

const ApiIcon = ({ className, strokeWidth, ...props }: any) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="url(#api-gradient)" 
    className={cn("w-9 h-9 transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(56,189,248,0.7)]", className)} 
    strokeWidth={1.5} 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <defs>
      <linearGradient id="api-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#0ea5e9" />
      </linearGradient>
    </defs>
    <path d="M18 10a6 6 0 1 0-12 0c0 7 3 9 3 9h6s3-2 3-9" />
    <path d="M12 10a3 3 0 1 0-3-3" />
    <path d="M12 10v10" />
    <circle cx="12" cy="20" r="1" />
  </svg>
);

const SqlIcon = ({ className, strokeWidth, ...props }: any) => (
  <img 
    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" 
    alt="PostgreSQL" 
    className={cn("w-9 h-9 object-contain transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(51,103,145,0.7)]", className)} 
    referrerPolicy="no-referrer"
  />
);

const MongoIcon = ({ className, strokeWidth, ...props }: any) => (
  <img 
    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" 
    alt="MongoDB" 
    className={cn("w-9 h-9 object-contain transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(71,162,72,0.7)]", className)} 
    referrerPolicy="no-referrer"
  />
);

const AiIcon = ({ className, strokeWidth, ...props }: any) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="url(#ai-gradient)" 
    className={cn("w-9 h-9 transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(236,72,153,0.7)]", className)} 
    strokeWidth={1.5} 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <defs>
      <linearGradient id="ai-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f43f5e" />
        <stop offset="50%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
    </defs>
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
    <path d="M9 13a3 3 0 1 1-3-3" />
    <path d="M15 13a3 3 0 1 0 3-3" />
    <circle cx="9" cy="10" r="1" />
    <circle cx="15" cy="10" r="1" />
    <path d="M12 12v4" />
    <path d="M12 16a2 2 0 1 0 2 2" />
  </svg>
);

const GitIcon = ({ className, strokeWidth, ...props }: any) => (
  <img 
    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" 
    alt="Git" 
    className={cn("w-9 h-9 object-contain transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(240,80,50,0.7)]", className)} 
    referrerPolicy="no-referrer"
  />
);

const DockerIcon = ({ className, strokeWidth, ...props }: any) => (
  <img 
    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" 
    alt="Docker" 
    className={cn("w-9 h-9 object-contain transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(36,150,237,0.7)]", className)} 
    referrerPolicy="no-referrer"
  />
);

const LinuxIcon = ({ className, strokeWidth, ...props }: any) => (
  <img 
    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" 
    alt="Linux" 
    className={cn("w-9 h-9 object-contain transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]", className)} 
    referrerPolicy="no-referrer"
  />
);

const AwsIcon = ({ className, strokeWidth, ...props }: any) => (
  <FaAws className={cn("w-9 h-9 text-[#FF9900] transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(255,153,0,0.7)]", className)} />
);

const FirebaseIcon = ({ className, strokeWidth, ...props }: any) => (
  <img 
    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg" 
    alt="Firebase" 
    className={cn("w-9 h-9 object-contain transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(255,202,40,0.7)]", className)} 
    referrerPolicy="no-referrer"
  />
);

const PythonIcon = ({ className, strokeWidth, ...props }: any) => (
  <img 
    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" 
    alt="Python" 
    className={cn("w-9 h-9 object-contain transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(55,115,166,0.7)]", className)} 
    referrerPolicy="no-referrer"
  />
);

const PostmanIcon = ({ className, strokeWidth, ...props }: any) => (
  <img 
    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" 
    alt="Postman" 
    className={cn("w-9 h-9 object-contain transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(255,108,55,0.7)]", className)} 
    referrerPolicy="no-referrer"
  />
);

const JavaIcon = ({ className, strokeWidth, ...props }: any) => (
  <img 
    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" 
    alt="Java" 
    className={cn("w-9 h-9 object-contain transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(83,130,161,0.7)]", className)} 
    referrerPolicy="no-referrer"
  />
);

const CppIcon = ({ className, strokeWidth, ...props }: any) => (
  <img 
    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" 
    alt="C++" 
    className={cn("w-9 h-9 object-contain transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(0,89,156,0.7)]", className)} 
    referrerPolicy="no-referrer"
  />
);

export interface TechSkill {
  largeText: string;
  smallText: string;
  icon: React.ComponentType<any>;
  image: string;
}

const TECH_SKILLS: TechSkill[] = [
  { largeText: "React", smallText: "Frontend Engineering", icon: ReactIcon, image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80" },
  { largeText: "Next.js", smallText: "Full-Stack Framework", icon: NextJsIcon, image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80" },
  { largeText: "TS", smallText: "TypeScript", icon: TsIcon, image: "https://images.unsplash.com/photo-1516116211223-4c59d7275244?auto=format&fit=crop&w=600&q=80" },
  { largeText: "JS", smallText: "JavaScript", icon: JsIcon, image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=600&q=80" },
  { largeText: "Node.js", smallText: "Backend Development", icon: NodeJsIcon, image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80" },
  { largeText: "API", smallText: "REST Integration", icon: ApiIcon, image: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=600&q=80" },
  { largeText: "SQL", smallText: "Database Systems", icon: SqlIcon, image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=600&q=80" },
  { largeText: "MongoDB", smallText: "NoSQL Database", icon: MongoIcon, image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=600&q=80" },
  { largeText: "AI", smallText: "AI Integration", icon: AiIcon, image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=600&q=80" },
  { largeText: "Git", smallText: "Version Control", icon: GitIcon, image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80" },
  { largeText: "Docker", smallText: "Containerization", icon: DockerIcon, image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=600&q=80" },
  { largeText: "Linux", smallText: "Development Environment", icon: LinuxIcon, image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=600&q=80" },
  { largeText: "AWS", smallText: "Cloud Computing", icon: AwsIcon, image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80" },
  { largeText: "Firebase", smallText: "Cloud Backend", icon: FirebaseIcon, image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80" },
  { largeText: "Python", smallText: "AI & Automation", icon: PythonIcon, image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80" },
  { largeText: "Postman", smallText: "API Testing", icon: PostmanIcon, image: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=600&q=80" },
  { largeText: "Java", smallText: "Enterprise Development", icon: JavaIcon, image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80" },
  { largeText: "C++", smallText: "System Programming", icon: CppIcon, image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=600&q=80" }
];

gsap.registerPlugin(ScrollTrigger)

export interface BentoItem {
    id: number | string
    title: string
    subtitle: string
    description: string
    icon: React.ReactNode
    content?: React.ReactNode
    image?: string
}

export interface StaggeredGridProps {
    images: string[]
    bentoItems: BentoItem[]
    centerText?: string
    credits?: {
        madeBy: { text: string; href: string }
        moreDemos: { text: string; href: string }
    }
    className?: string
    showFooter?: boolean
    scroller?: string | Element | Window | null
}

export function StaggeredGrid({
    images,
    bentoItems,
    centerText = "Halcyon",
    credits = {
        madeBy: { text: "@codrops", href: "https://x.com/codrops" },
        moreDemos: { text: "More demos", href: "https://tympanus.net/codrops/demos" }
    },
    className,
    showFooter = true,
    scroller
}: StaggeredGridProps) {
    const [isLoaded, setIsLoaded] = useState(false)
    const gridFullRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)

    // Bento Grid State
    const [activeBento, setActiveBento] = useState<number>(0);

    const splitText = (text: string) => {
        return text.split('').map((char, i) => (
            <span key={i} className="char inline-block" style={{ willChange: 'transform' }}>{char === ' ' ? '\u00A0' : char}</span>
        ))
    }

    useEffect(() => {
        const handleLoad = () => {
            document.body.classList.remove('loading')
            setIsLoaded(true)
        }

        // Wait for background images to load
        // Note: we target both regular images and bento images if possible
        const imgLoad = imagesLoaded(document.querySelectorAll('.grid__item-img'), { background: true }, handleLoad)

        return () => {
            // Cleanup
        }
    }, [])

    useEffect(() => {
        if (!isLoaded) return

        // Animate Text Element
        if (textRef.current) {
            const chars = textRef.current.querySelectorAll('.char')
            gsap.timeline({
                scrollTrigger: {
                    trigger: textRef.current,
                    scroller: scroller || undefined,
                    start: 'top bottom',
                    end: 'center center-=25%',
                    scrub: 1,
                }
            })
                .from(chars, {
                    ease: 'sine.out',
                    yPercent: 300,
                    autoAlpha: 0,
                    stagger: {
                        each: 0.05,
                        from: 'center'
                    }
                })
        }

        // Animate Left Grid Cards & Right Video Container
        if (gridFullRef.current) {
            const cards = gridFullRef.current.querySelectorAll('.skill-card')
            const videoContainer = gridFullRef.current.closest('.skills-container-layout')?.querySelector('.video-container-showcase')

            // Stagger animate cards
            gsap.timeline({
                scrollTrigger: {
                    trigger: gridFullRef.current,
                    scroller: scroller || undefined,
                    start: 'top bottom-=5%',
                    end: 'center center+=15%',
                    scrub: 1.5,
                }
            })
                .from(cards, {
                    y: 80,
                    scale: 0.9,
                    autoAlpha: 0,
                    stagger: 0.04,
                    ease: 'power2.out',
                })

            // Animate video container coming in elegantly
            if (videoContainer) {
                gsap.timeline({
                    scrollTrigger: {
                        trigger: gridFullRef.current,
                        scroller: scroller || undefined,
                        start: 'top bottom-=5%',
                        end: 'center center+=15%',
                        scrub: 1.5,
                    }
                })
                    .from(videoContainer, {
                        x: 100,
                        scale: 0.95,
                        autoAlpha: 0,
                        ease: 'power2.out',
                    })
            }
        }
    }, [isLoaded])

    return (
        <div
            className={cn("shadow relative overflow-hidden w-full skills-container-layout px-4 py-8 md:px-8", className)}
            style={{
                '--grid-item-translate': '0px',
            } as React.CSSProperties}
        >
            <section className="grid place-items-center w-full relative mt-[6vh] mb-[8vh] z-10">
                <div ref={textRef} className="text font-serif font-bold tracking-widest uppercase flex content-center text-[clamp(2.5rem,10vw,8rem)] leading-[0.8] text-[#FAF9F6] drop-shadow-[0_2px_15px_rgba(200,162,74,0.35)]">
                    {splitText(centerText)}
                </div>
            </section>

            <section className="w-full relative z-10">
                <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
                    {/* Left Column: Tech Skills Cards */}
                    <div ref={gridFullRef} className="w-full lg:w-[62%] grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-8">
                        {TECH_SKILLS.map((skill, i) => {
                            const IconComponent = skill.icon;
                            return (
                                <figure key={`skill-${i}`} className="skill-card m-0 relative z-10 [perspective:800px] will-change-[transform,opacity] group cursor-pointer h-[155px]">
                                    <div className="w-full h-full [backface-visibility:hidden] will-change-transform rounded-xl overflow-hidden flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-105 group-hover:bg-[#111111]/40 group-hover:border group-hover:border-[rgba(212,175,55,0.25)] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.12)] relative bg-transparent border border-transparent">
                                        
                                        {/* Soft ambient golden highlight on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(212,175,55,0.03)] to-[rgba(212,175,55,0)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[1]" />
                                        
                                        {/* Glowing border overlay on hover */}
                                        <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-[#F4D76E]/20 transition-all duration-500 pointer-events-none z-20" />


                                        {/* Content Container */}
                                        <div className="relative z-10 flex flex-col items-center justify-center p-4 text-center h-full w-full gap-2.5">
                                            {/* Icon */}
                                            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#0A0A0A]/90 backdrop-blur-sm border border-[rgba(212,175,55,0.25)] text-white group-hover:bg-[rgba(212,175,55,0.15)] group-hover:text-white group-hover:border-[#F4D76E] group-hover:shadow-[0_4px_15px_rgba(212,175,55,0.4)] transition-all duration-300">
                                                <IconComponent className="w-9 h-9 object-contain transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(244,215,110,0.6)]" strokeWidth={1.5} />
                                            </div>

                                            {/* Typography for Large and Small Text */}
                                            <div className="mt-1.5 flex flex-col items-center gap-1">
                                                <h4 
                                                    style={{ fontSize: '20px', fontWeight: 600, letterSpacing: '2px' }}
                                                    className="font-serif text-[#FAF9F6] group-hover:text-[#F4D76E] transition-colors duration-300 leading-snug text-center"
                                                >
                                                    {skill.largeText}
                                                </h4>
                                                <p 
                                                    style={{ opacity: 0.55, fontSize: '11px' }}
                                                    className="font-mono tracking-widest text-[#FAF9F6] group-hover:opacity-90 uppercase leading-normal transition-opacity duration-300 text-center"
                                                >
                                                    {skill.smallText}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </figure>
                            );
                        })}
                    </div>

                    {/* Right Column: Video Showcase All the Way to the Right */}
                    <div className="w-full lg:w-[38%] flex items-center justify-center video-container-showcase relative z-10 min-h-[500px] lg:min-h-0">
                        <div className="relative w-full h-full max-w-[420px] lg:max-w-none aspect-[9/16] rounded-2xl overflow-hidden border border-[rgba(212,175,55,0.25)] shadow-[0_15px_45px_rgba(0,0,0,0.75),0_0_35px_rgba(212,175,55,0.15)] bg-[#111111]">
                            <video
                                src="https://i.imgur.com/sLswfaf.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            />
                            {/* Rich dark gradient overrides */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />
                            {/* Inner gold frame border details */}
                            <div className="absolute inset-2 rounded-xl border border-[rgba(212,175,55,0.12)] pointer-events-none" />
                            <div className="absolute inset-0 rounded-2xl border border-[rgba(212,175,55,0.2)] pointer-events-none" />
                        </div>
                    </div>
                </div>
            </section>

            {showFooter && (
                <footer className="frame__footer w-full p-8 flex justify-between items-center relative z-50 text-neutral-900 dark:text-white uppercase font-medium text-xs tracking-wider">
                    <a href={credits.madeBy.href} className="hover:opacity-60 transition-opacity">{credits.madeBy.text}</a>
                    <a href={credits.moreDemos.href} className="hover:opacity-60 transition-opacity">{credits.moreDemos.text}</a>
                </footer>
            )}
        </div>
    )
}

export default StaggeredGrid;
