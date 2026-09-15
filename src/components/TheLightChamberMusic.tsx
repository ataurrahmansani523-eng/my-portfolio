import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX, 
  Shuffle, 
  RotateCcw, 
  Search, 
  MoreVertical, 
  Tv, 
  ThumbsUp, 
  ThumbsDown, 
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Heart,
  Home,
  Compass,
  Library,
  History,
  Settings,
  ListMusic,
  Share2,
  ListFilter,
  Radio,
  Users,
  TrendingUp,
  Clock,
  Sparkles,
  MessageSquare,
  Zap,
  BarChart2,
  Bookmark,
  Music
} from "lucide-react";
import { playSoftClick } from "../utils/audio";

interface Track {
  id: string;
  title: string;
  channelTitle: string;
  thumbnail: string;
  duration: string;
  genre: string;
  views?: string;
  durationSecs?: number;
}

interface TheLightChamberMusicProps {
  onBack: () => void;
}

export default function TheLightChamberMusic({ onBack }: TheLightChamberMusicProps) {
  // Playlist State prefilled with high-quality atmospheric and beautiful tracks matching YouTube standard
  const defaultTracks: Track[] = [
    {
      id: "PBI1BPe91Ts",
      title: "Sadiyaan",
      channelTitle: "Ajey Kr",
      thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80",
      duration: "3:45",
      genre: "Sadiyaan",
      views: "910K plays",
      durationSecs: 225
    },
    {
      id: "M7vXOK_ZKY0",
      title: "Main Kabhi Bhoolunga Na Tujhe (Lofi + Slowed)",
      channelTitle: "Hollup",
      thumbnail: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&auto=format&fit=crop&q=80",
      duration: "4:12",
      genre: "Main Kabhi Bhoolunga Na Tujhe",
      views: "13M plays",
      durationSecs: 252
    },
    {
      id: "5RT6QMKJTjQ",
      title: "Ishq Sufiyana (Male)",
      channelTitle: "Kamal Khan, Vishal-Shekhar, & Raja",
      thumbnail: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=500&auto=format&fit=crop&q=80",
      duration: "5:26",
      genre: "The Dirty Picture",
      views: "120M plays",
      durationSecs: 326
    },
    {
      id: "CmyTL3DurAA",
      title: "Oh no, I like you",
      channelTitle: "Auric Veil",
      thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80",
      duration: "2:58",
      genre: "Oh no, I like you",
      views: "7.9M plays",
      durationSecs: 178
    },
    {
      id: "r6LNuLH4skg",
      title: "Nadiyon Sa",
      channelTitle: "Mitraz",
      thumbnail: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&auto=format&fit=crop&q=80",
      duration: "3:20",
      genre: "Nadiyon Sa",
      views: "49M plays",
      durationSecs: 200
    },
    {
      id: "WXwgZL4zx9o",
      title: "Fairytale",
      channelTitle: "Alexander Rybak",
      thumbnail: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=300&auto=format&fit=crop&q=80",
      duration: "3:03",
      genre: "Fairytale",
      views: "146M plays",
      durationSecs: 183
    },
    {
      id: "P8PWN1OmZOA",
      title: "Tu Jaane Na",
      channelTitle: "Pritam Chakraborty & Atif",
      thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&auto=format&fit=crop&q=80",
      duration: "5:37",
      genre: "Ajab Prem Ki Ghazab K...",
      views: "240M plays",
      durationSecs: 337
    },
    {
      id: "sFMRqxCexDk",
      title: "Choo Lo",
      channelTitle: "The Local Train",
      thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300&auto=format&fit=crop&q=80",
      duration: "3:54",
      genre: "Aalas Ka Pedh",
      views: "178M plays",
      durationSecs: 234
    },
    {
      id: "CEVcU1PWNRc",
      title: "Bolona",
      channelTitle: "Munna Islam & TMSakib",
      thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80",
      duration: "4:10",
      genre: "Bolona",
      views: "14M plays",
      durationSecs: 250
    },
    {
      id: "zaFGQEIcetM",
      title: "Majboor (Unplugged)",
      channelTitle: "Sheheryar Rehan & Zoha Wase",
      thumbnail: "https://images.unsplash.com/photo-1487180142328-0c4e37023af5?w=300&auto=format&fit=crop&q=80",
      duration: "3:48",
      genre: "Majboor (Unplugged)",
      views: "5.2M plays",
      durationSecs: 228
    },
    {
      id: "9DjeWYS52kY",
      title: "Ghum (Official)",
      channelTitle: "Odd Signature",
      thumbnail: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&auto=format&fit=crop&q=80",
      duration: "4:32",
      genre: "Ghum (Official)",
      views: "35M plays",
      durationSecs: 272
    },
    {
      id: "SBOwcGnwuKM",
      title: "Udi Udi",
      channelTitle: "Aneesh, Sarkar & Hruday",
      thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&auto=format&fit=crop&q=80",
      duration: "3:15",
      genre: "Udi Udi",
      views: "17M plays",
      durationSecs: 195
    }
  ];

  // Core App states
  const [tracks, setTracks] = useState<Track[]>(defaultTracks);
  const [currTrackIdx, setCurrTrackIdx] = useState<number>(0);
  const [musicPlaying, setMusicPlaying] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(50);
  const [muted, setMuted] = useState<boolean>(false);
  const [shuffleMode, setShuffleMode] = useState<boolean>(false);
  const [loopMode, setLoopMode] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [totalDuration, setTotalDuration] = useState<number>(225);
  const [activeTag, setActiveTag] = useState<string>("All");
  const [searchInput, setSearchInput] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [videoMode, setVideoMode] = useState<boolean>(false); // Dual 'Song / Video' toggle view!
  const [likedHash, setLikedHash] = useState<Record<string, "up" | "down" | null>>({});
  const [rightPanelTab, setRightPanelTab] = useState<"upnext" | "lyrics" | "comments" | "related">("upnext");
  const [autoPlayEnabled, setAutoPlayEnabled] = useState<boolean>(true);
  const [isPlayerExpanded, setIsPlayerExpanded] = useState<boolean>(false);

  // YouTube Studio states
  const [dashboardMode, setDashboardMode] = useState<"music" | "studio">("music");
  const [liveComments, setLiveComments] = useState<Array<{ id: string; user: string; text: string; time: string; badgeColor: string }>>([
    { id: "1", user: "Tushar_BD", text: "Pure perfection. Excellent sound fidelity!", time: "12:10 PM", badgeColor: "bg-red-500" },
    { id: "2", user: "Sabbir Chowdhury", text: "Greetings from Sylhet! Listening while programming.", time: "12:11 PM", badgeColor: "bg-emerald-600" },
    { id: "3", user: "Samia_Rahman", text: "The audio separation in Coke Studio is top tier.", time: "12:11 PM", badgeColor: "bg-purple-600" },
  ]);

  // References
  const playerRef = useRef<any>(null);
  const progressInterval = useRef<any>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const activeTrack = tracks[currTrackIdx] || defaultTracks[0];

  // Raw Audio Synthesizers for local stream soundboards
  const playAirhornSynth = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const playPulse = (offset: number) => {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(310, audioCtx.currentTime + offset);
        osc.frequency.linearRampToValueAtTime(350, audioCtx.currentTime + offset + 0.12);
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime + offset);
        gainNode.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + offset + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + offset + 0.3);
        osc.start(audioCtx.currentTime + offset);
        osc.stop(audioCtx.currentTime + offset + 0.35);
      };
      playPulse(0);
      playPulse(0.12);
    } catch (e) {
      console.debug("Synthesizer error", e);
    }
  };

  const playApplauseSynth = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      for (let i = 0; i < 18; i++) {
        const delay = Math.random() * 0.45;
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.type = "triangle";
        osc.frequency.setValueAtTime(420 + Math.random() * 220, audioCtx.currentTime + delay);
        gainNode.gain.setValueAtTime(0.025, audioCtx.currentTime + delay);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + delay + 0.08);
        osc.start(audioCtx.currentTime + delay);
        osc.stop(audioCtx.currentTime + delay + 0.09);
      }
    } catch (e) {
      console.debug("Synthesizer error", e);
    }
  };

  const playSwooshSynth = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(180, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1700, audioCtx.currentTime + 1.1);
      gainNode.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 0.3);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.1);
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 1.12);
    } catch (e) {
      console.debug("Synthesizer error", e);
    }
  };

  const playSubDropSynth = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(150, audioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(32, audioCtx.currentTime + 0.8);
      gainNode.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.81);
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.84);
    } catch (e) {
      console.debug("Synthesizer error", e);
    }
  };

  const playChimeSynth = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const notes = [780, 980, 1180, 1380];
      notes.forEach((freq, idx) => {
        const delay = idx * 0.11;
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + delay);
        gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime + delay);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + delay + 0.45);
        osc.start(audioCtx.currentTime + delay);
        osc.stop(audioCtx.currentTime + delay + 0.48);
      });
    } catch (e) {
      console.debug("Synthesizer error", e);
    }
  };

  // Automated simulator for live audience feedback updates
  useEffect(() => {
    if (!musicPlaying) return;

    const commentatorNames = [
      "Fahim_Chowdhury", "Anika_Yasmin", "Zahid_Arafat", "Rahat_Hossain", "Nusrat_Mim", 
      "Tanvir_Studio", "Sani_Ultra", "Sultana_Keya", "Shuvo_Bax", "Niloy_M", "Rashed_99",
      "Pasoori_Lover", "Arindam_Fan"
    ];

    const commentsPool = [
      "I put this on loop! Extremely clean stream layout.",
      "Loving this dynamic vibe! Truly sounds amazing.",
      "Greetings from Chittagong, Bangladesh! 🇧🇩 🔥",
      "This channel is gold. Always has the best recommendation tags.",
      "Who is listening to this in 2026? Unbelievable production.",
      "Sani live chamber beats are unparalleled.",
      "These transition effects represent high studio quality.",
      "Perfect track choice for work and flow.",
      "Is that really synthesized sound? Super premium mechanical experience.",
      "Just subbed! The live visual meters are amazing.",
      "Please play more Folk or Bangla hits next!",
      "I love the bass on this specific tune."
    ];

    const badges = ["bg-red-500", "bg-sky-500", "bg-emerald-500", "bg-purple-500", "bg-amber-600", "bg-pink-500"];

    const commentInterval = setInterval(() => {
      const randomUser = commentatorNames[Math.floor(Math.random() * commentatorNames.length)];
      const randomText = commentsPool[Math.floor(Math.random() * commentsPool.length)];
      const randomBadge = badges[Math.floor(Math.random() * badges.length)];
      
      const newComment = {
        id: Math.random().toString(),
        user: randomUser,
        text: randomText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        badgeColor: randomBadge
      };

      setLiveComments(prev => [...prev.slice(-30), newComment]);
    }, 2800);

    return () => clearInterval(commentInterval);
  }, [musicPlaying]);

  // Keep live chat scrolled down
  useEffect(() => {
    if (chatScrollRef.current) {
      try {
        chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
      } catch (err) {}
    }
  }, [liveComments]);

  // YouTube Music themed pills
  const moodFilterPills = ["All", "Trending 🔥", "Bangla Hits 🇧🇩", "Global Hits 🌍", "Lofi & Chill ☕", "Workout ⚡", "Relax 🍃"];

  const triggerClick = () => {
    playSoftClick();
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Initialize YouTube Iframe Player
  useEffect(() => {
    const initYTPlayer = () => {
      try {
        if ((window as any).YT && (window as any).YT.Player) {
          if (playerRef.current) {
            try {
              playerRef.current.destroy();
            } catch (err) {
              console.warn("Destroy issues", err);
            }
          }

          playerRef.current = new (window as any).YT.Player("tube-embed-frame", {
            height: "100%",
            width: "100%",
            videoId: activeTrack ? activeTrack.id : "f0v_PpxvW6Y",
            playerVars: {
              autoplay: musicPlaying ? 1 : 0,
              controls: 0,
              disablekb: 1,
              fs: 0,
              modestbranding: 1,
              rel: 0,
              showinfo: 0,
              iv_load_policy: 3
            },
            events: {
              onReady: (event: any) => {
                event.target.setVolume(muted ? 0 : volume);
                if (musicPlaying) {
                  event.target.playVideo();
                }
              },
              onStateChange: (event: any) => {
                if (event.data === 0) { // ENDED
                  handleEndedNext();
                } else if (event.data === 1) { // PLAYING
                  setMusicPlaying(true);
                  if (event.target.getDuration) {
                    setTotalDuration(event.target.getDuration());
                  }
                } else if (event.data === 2) { // PAUSED
                  setMusicPlaying(false);
                }
              },
              onError: (event: any) => {
                console.error("YouTube Player error", event.data);
              }
            }
          });
        }
      } catch (err) {
        console.error("YouTube player startup crashed", err);
      }
    };

    if (!(window as any).YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      (window as any).onYouTubeIframeAPIReady = initYTPlayer;
    } else {
      initYTPlayer();
    }
  }, []);

  // Sync index source with YouTube API Player
  useEffect(() => {
    if (!activeTrack) return;
    if (playerRef.current && playerRef.current.loadVideoById) {
      try {
        playerRef.current.loadVideoById({
          videoId: activeTrack.id,
          startSeconds: 0
        });
        if (musicPlaying) {
          playerRef.current.playVideo();
        } else {
          playerRef.current.pauseVideo();
        }
      } catch (err) {
        console.warn("Direct video load issues", err);
      }
    }
    if (activeTrack.durationSecs) {
      setTotalDuration(activeTrack.durationSecs);
    } else {
      setTotalDuration(240);
    }
    setCurrentTime(0);
  }, [currTrackIdx]);

  // Sync active Play/Pause toggles
  useEffect(() => {
    if (playerRef.current) {
      try {
        if (musicPlaying) {
          playerRef.current.playVideo?.();
        } else {
          playerRef.current.pauseVideo?.();
        }
      } catch (err) {
        console.warn("Playstate sync issues", err);
      }
    }
  }, [musicPlaying]);

  // Sync active Volume
  useEffect(() => {
    if (playerRef.current && playerRef.current.setVolume) {
      try {
        playerRef.current.setVolume(muted ? 0 : volume);
      } catch (err) {
        console.warn("Volume shift issue", err);
      }
    }
  }, [volume, muted]);

  // Handle timeline tracking
  useEffect(() => {
    if (progressInterval.current) clearInterval(progressInterval.current);

    progressInterval.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime && playerRef.current.getDuration) {
        try {
          const current = playerRef.current.getCurrentTime();
          const duration = playerRef.current.getDuration();
          if (typeof current === "number" && !isNaN(current)) {
            setCurrentTime(current);
          }
          if (typeof duration === "number" && duration > 0 && !isNaN(duration)) {
            setTotalDuration(duration);
          }
        } catch (err) {
          fallbackProgressTimer();
        }
      } else {
        fallbackProgressTimer();
      }
    }, 1000);

    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [musicPlaying, currTrackIdx, totalDuration]);

  const fallbackProgressTimer = () => {
    if (musicPlaying) {
      setCurrentTime(prev => {
        if (prev >= totalDuration) {
          handleEndedNext();
          return 0;
        }
        return prev + 1;
      });
    }
  };

  const handleEndedNext = () => {
    if (loopMode) {
      if (playerRef.current && playerRef.current.seekTo) {
        try {
          playerRef.current.seekTo(0, true);
          playerRef.current.playVideo();
        } catch (err) {
          setCurrentTime(0);
        }
      } else {
        setCurrentTime(0);
      }
    } else {
      handleNext();
    }
  };

  const handleNext = () => {
    triggerClick();
    if (tracks.length === 0) return;
    if (shuffleMode) {
      const randomIndex = Math.floor(Math.random() * tracks.length);
      setCurrTrackIdx(randomIndex);
    } else {
      setCurrTrackIdx(prev => (prev + 1) % tracks.length);
    }
  };

  const handlePrev = () => {
    triggerClick();
    if (tracks.length === 0) return;
    setCurrTrackIdx(prev => (prev - 1 + tracks.length) % tracks.length);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (playerRef.current && playerRef.current.seekTo) {
      try {
        playerRef.current.seekTo(val, true);
      } catch (err) {
        console.warn("Seek issue", err);
      }
    }
  };

  // YouTube search query trigger
  const performYouTubeSearch = async (queryText: string, autoPlayFirst: boolean = false) => {
    setIsSearching(true);
    const apiQueryKey = "AIzaSyDRCeAG4ApJZzo8SEDLgylDl6-Bh_SwiXA";
    try {
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(queryText + " song")}&type=video&videoCategoryId=10&maxResults=15&key=${apiQueryKey}`;
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.items && data.items.length > 0) {
        const parsed: Track[] = data.items.map((item: any) => {
          const tName = item.snippet.title
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&amp;/g, "&");
          return {
            id: item.id.videoId,
            title: tName,
            channelTitle: item.snippet.channelTitle,
            thumbnail: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.high?.url || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=300&auto=format&fit=crop",
            duration: "YouTube Music",
            genre: "Music Track",
            views: `${Math.floor(Math.random() * 90 + 5)}M streams`,
            durationSecs: 240
          };
        });
        setTracks(parsed);
        if (autoPlayFirst) {
          setCurrTrackIdx(0);
          setMusicPlaying(true);
        }
      }
    } catch (e) {
      console.error("YouTube search request failed", e);
    }
    setIsSearching(false);
  };

  // Dynamic real-time instant search trigger on input change (even for 1 single letter)
  useEffect(() => {
    if (!searchInput.trim()) {
      setTracks(defaultTracks);
      return;
    }

    const timer = setTimeout(() => {
      const shouldAutoplay = !musicPlaying && !activeTrack;
      performYouTubeSearch(searchInput.trim(), shouldAutoplay);
    }, 450);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Click tag to fetch specific mood streams
  const handleTagClick = (tag: string) => {
    triggerClick();
    setActiveTag(tag);
    if (tag === "All") {
      setTracks(defaultTracks);
      setSearchInput("");
    } else {
      let searchQuery = `${tag} hit music`;
      if (tag.includes("Trending")) {
        searchQuery = "trending songs 2026 popular";
      } else if (tag.includes("Bangla Hits")) {
        searchQuery = "coke studio bangla popular hits";
      } else if (tag.includes("Global Hits")) {
        searchQuery = "billboard hot 100 hit songs";
      } else if (tag.includes("Lofi & Chill")) {
        searchQuery = "lofi beats study chill";
      } else if (tag.includes("Workout")) {
        searchQuery = "workout motivation high energy electronic";
      } else if (tag.includes("Relax")) {
        searchQuery = "relaxing guitar violin ambient music";
      }
      setSearchInput(tag);
      performYouTubeSearch(searchQuery, true);
    }
  };

  // Submission search
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    triggerClick();
    performYouTubeSearch(searchInput.trim(), true);
  };

  // Return to home page resetting filters and search
  const handleHomeClick = () => {
    triggerClick();
    setActiveTag("All");
    setTracks(defaultTracks);
    setSearchInput("");
    setIsPlayerExpanded(false);
  };

  // Toggle reaction vote updates
  const setVote = (trackId: string, type: "up" | "down") => {
    triggerClick();
    setLikedHash(prev => {
      const current = prev[trackId];
      if (current === type) {
        return { ...prev, [trackId]: null }; // toggle off
      }
      return { ...prev, [trackId]: type };
    });
  };

  const playTrackDirect = (idx: number) => {
    triggerClick();
    setCurrTrackIdx(idx);
    setMusicPlaying(true);
  };

  // Help parse stream count to sort by trending (most views)
  const getViewsAsNumber = (viewsStr?: string): number => {
    if (!viewsStr) return 0;
    const cleanStr = viewsStr.toLowerCase();
    const match = cleanStr.match(/([\d.]+)\s*([bm])/i);
    if (!match) return 0;
    const value = parseFloat(match[1]);
    const unit = match[2].toUpperCase();
    if (unit === 'B') return value * 1000000000;
    if (unit === 'M') return value * 1000000;
    return value;
  };

  // Get active tracks with their original indices sorted by stream/view count for the trending list
  const trendingTracksWithIndices = tracks
    .map((track, originalIdx) => ({ track, originalIdx }))
    .sort((a, b) => getViewsAsNumber(b.track.views) - getViewsAsNumber(a.track.views));

  return (
    <div id="yt-music-dashboard" className="w-full min-h-screen bg-[#030303] text-[#f1f1f1] rounded-3xl p-4 md:p-8 relative overflow-hidden flex flex-col justify-between selection:bg-[#fff]/20 selection:text-white select-none font-sans">
      
      {/* Hidden background YouTube interactive player binding */}
      <div className="hidden">
        <div id="tube-embed-frame"></div>
      </div>

      <div className="flex flex-col flex-1 pb-32">
        
        {/* ==================== 1. YOUTUBE MUSIC HEADER BAR ==================== */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-4">
          
          {/* Leftside: Logo + Search Bar */}
          <div className="flex items-center gap-4 flex-1 min-w-[280px] max-w-2xl">
            {/* Logo */}
            <button 
              onClick={handleHomeClick}
              className="flex items-center gap-2 group cursor-pointer transition-transform active:scale-[0.97] shrink-0"
              title="YouTube Music Home"
              type="button"
            >
              <div className="w-8 h-8 rounded-full bg-red-650 flex items-center justify-center shadow-lg shadow-red-650/15 group-hover:bg-red-650 transition-colors">
                <Play size={14} className="text-white fill-current translate-x-[1px]" />
              </div>
              <span className="inline font-sans font-black tracking-tight text-lg text-white select-none">
                Sani<span className="text-red-500">Music</span>
              </span>
            </button>

            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                <Search size={16} />
              </span>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search songs, albums, artists, podcasts"
                className="w-full bg-[#1e1e1e] hover:bg-[#2a2a2a] focus:bg-[#2d2d2d] border border-transparent focus:border-zinc-700/60 rounded-lg py-2.5 pl-12 pr-12 text-sm tracking-wide text-zinc-100 placeholder-zinc-500 focus:outline-none transition-all focus:ring-1 focus:ring-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => { triggerClick(); setSearchInput(""); setTracks(defaultTracks); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-white"
                >
                  Clear
                </button>
              )}
            </form>
          </div>

          {/* Right action controls: Cast, custom options, and "Sign in" white pill */}
          <div className="flex items-center gap-4">
            {/* Song / Video toggle switcher characteristic of YT Music */}
            <div className="bg-[#151515] p-0.5 rounded-full flex items-center border border-zinc-800">
              <button
                onClick={() => { triggerClick(); setVideoMode(false); }}
                className={`text-[10px] uppercase font-bold tracking-wider px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  !videoMode 
                    ? "bg-[#282828] text-white shadow-md" 
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Song
              </button>
              <button
                onClick={() => { triggerClick(); setVideoMode(true); }}
                className={`text-[10px] uppercase font-bold tracking-wider px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  videoMode 
                    ? "bg-[#282828] text-white shadow-md" 
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Video
              </button>
            </div>

            <button 
              onClick={triggerClick} 
              className="p-2 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              title="Cast Stream"
            >
              <Tv size={18} />
            </button>

            <button 
              onClick={triggerClick} 
              className="p-2 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              title="More options"
            >
              <MoreVertical size={18} />
            </button>

            {/* Back to Room Button */}
            <button
              onClick={() => { triggerClick(); onBack(); }}
              className="border border-zinc-800 hover:border-zinc-700 bg-[#161616] text-[10px] font-semibold tracking-wider text-zinc-300 hover:text-white px-3 py-2 rounded-full cursor-pointer transition-colors shadow-sm"
            >
              Back to Map
            </button>
          </div>

        </div>

        {dashboardMode === "music" ? (
          isPlayerExpanded ? (
            /* ==================== EXPANDED MASTER COPY PLAYER VIEW ==================== */
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2 pb-6 flex-1 w-full"
            >
              {/* LEFT HALF: Giant Rounded Cover Art */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[350px] lg:min-h-[480px]">
                {/* Minimize collapse action */}
                <button
                  type="button"
                  onClick={() => { triggerClick(); setIsPlayerExpanded(false); }}
                  className="absolute top-2 left-2 bg-black/60 border border-zinc-950 text-zinc-300 hover:text-white p-2.5 rounded-full hover:bg-zinc-850 transition-all shadow-md z-10 cursor-pointer flex items-center gap-1.5 text-[11px] font-bold tracking-wide uppercase px-4"
                  title="Minimize Player"
                >
                  <ChevronDown size={14} />
                  Minimize
                </button>

                {/* Song / Video Segment tab helper at top of artwork block */}
                <div className="absolute top-2 right-2 bg-[#151515] p-0.5 rounded-full border border-zinc-850 flex items-center gap-1 z-10 shadow-md">
                  <button
                    type="button"
                    onClick={() => { triggerClick(); setVideoMode(false); }}
                    className={`text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full transition-all cursor-pointer ${
                      !videoMode ? "bg-[#333] text-white shadow-sm" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Song
                  </button>
                  <button
                    type="button"
                    onClick={() => { triggerClick(); setVideoMode(true); }}
                    className={`text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full transition-all cursor-pointer ${
                      videoMode ? "bg-red-650 text-white shadow-sm" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Video
                  </button>
                </div>

                {/* The main media frame or artwork */}
                <div className="relative w-full max-w-[450px] aspect-square rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-zinc-900/60 bg-[#121212] transition-all duration-500 group">
                  {videoMode && activeTrack ? (
                    <div className="w-full h-full relative">
                      <iframe
                        title="YT Full Player Frame"
                        src={`https://www.youtube.com/embed/${activeTrack.id}?enablejsapi=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&autoplay=1&origin=${window.location.origin}`}
                        className="w-full h-full border-0 pointer-events-auto"
                        allow="autoplay; encrypted-media"
                      />
                    </div>
                  ) : (
                    activeTrack && (
                      <div className="w-full h-full relative">
                        <img
                          src={activeTrack.thumbnail}
                          alt={activeTrack.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15 pointer-events-none" />
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* RIGHT HALF: Tabs Interface Panel */}
              <div className="lg:col-span-5 flex flex-col bg-[#0b0b0b] border border-zinc-900 rounded-2xl overflow-hidden min-h-[420px] shadow-2xl relative">
                
                {/* Tab Row matching typography */}
                <div className="flex border-b border-zinc-900 bg-[#0f0f0f] px-2 pt-1 select-none shrink-0">
                  {[
                    { id: "upnext", label: "Up next" },
                    { id: "lyrics", label: "Lyrics" },
                    { id: "comments", label: "Comments" },
                    { id: "related", label: "Related" }
                  ].map((tab) => {
                    const isTabActive = rightPanelTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => { triggerClick(); setRightPanelTab(tab.id as any); }}
                        className={`flex-1 text-[11px] font-black uppercase tracking-widest py-3.5 border-b-2 transition-all cursor-pointer relative ${
                          isTabActive 
                            ? "text-white border-white font-extrabold" 
                            : "text-zinc-500 hover:text-zinc-350 border-transparent"
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Sub-Panel Header Row (playing from queue label & pills) only for Up Next / Related */}
                {(rightPanelTab === "upnext" || rightPanelTab === "related") && (
                  <div className="p-4 border-b border-zinc-900/40 bg-[#080808] shrink-0 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Playing from</span>
                        <h4 className="text-[13px] font-bold text-white tracking-wide">Your Queue</h4>
                      </div>
                      <button 
                        type="button"
                        onClick={() => { triggerClick(); alert("Current playlist queue saved to library!"); }}
                        className="flex items-center gap-1.5 bg-[#181818] hover:bg-[#222222] border border-zinc-850 px-3.5 py-1.5 rounded-full text-[10px] font-bold text-white transition-all cursor-pointer active:scale-95"
                      >
                        <Bookmark size={10} className="text-zinc-400" />
                        Save
                      </button>
                    </div>

                    {/* Quick mood filters list scrolling horizontally */}
                    <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
                      {["All", "Familiar", "Deep cuts", "Popular", "Discover", "Hindi", "Chill"].map(pill => (
                        <button
                          key={pill}
                          type="button"
                          onClick={() => { triggerClick(); }}
                          className={`text-[10px] font-bold px-3 py-1 rounded-full border transition-all cursor-pointer whitespace-nowrap ${
                            pill === "All"
                              ? "bg-white text-zinc-950 border-white"
                              : "bg-[#181818]/80 text-zinc-300 border-zinc-850 hover:bg-[#252525]"
                          }`}
                        >
                          {pill}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Main scrollable body area of Tab Panel */}
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-gradient-to-b from-[#080808]/40 to-[#040404]">
                  
                  {/* TAB 1: UP NEXT QUEUE */}
                  {rightPanelTab === "upnext" && (
                    <div className="space-y-1.5">
                      {tracks.map((track, qIdx) => {
                        const isTrackCurrent = track.id === activeTrack.id;
                        return (
                          <div
                            key={track.id}
                            onClick={() => playTrackDirect(qIdx)}
                            className={`flex items-center p-2 rounded-lg cursor-pointer transition-all ${
                              isTrackCurrent 
                                ? "bg-zinc-900/90 border border-zinc-800 shadow-md" 
                                : "hover:bg-[#181818]/60 border border-transparent"
                            }`}
                          >
                            {/* Playing index sound indicator or serial number */}
                            <div className="w-6 shrink-0 flex items-center justify-center font-sans">
                              {isTrackCurrent ? (
                                musicPlaying ? (
                                  <div className="flex items-end gap-[2px] h-3">
                                    <span className="w-[2px] bg-red-650 animate-[soundwave_0.7s_infinite_alternate]" style={{ animationDelay: "0.1s" }} />
                                    <span className="w-[2px] bg-red-655 animate-[soundwave_1.0s_infinite_alternate]" style={{ animationDelay: "0.3s" }} />
                                    <span className="w-[2px] bg-red-655 animate-[soundwave_0.8s_infinite_alternate]" style={{ animationDelay: "0.5s" }} />
                                  </div>
                                ) : (
                                  <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                                )
                              ) : (
                                <span className="text-[10px] font-mono text-zinc-650 font-bold">{qIdx + 1}</span>
                              )}
                            </div>

                            {/* Thumbnail */}
                            <div className="w-10 h-10 rounded overflow-hidden shrink-0 bg-[#121212] border border-zinc-850">
                              <img src={track.thumbnail} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>

                            {/* Details */}
                            <div className="ml-3 flex-1 min-w-0 font-sans">
                              <div className="flex items-center gap-1.5">
                                {isTrackCurrent && <Music size={10} className="text-red-500 shrink-0" />}
                                <h5 className={`text-[13px] font-bold truncate leading-tight ${isTrackCurrent ? "text-white font-extrabold" : "text-zinc-200"}`}>
                                  {track.title}
                                </h5>
                              </div>
                              <p className="text-[10px] text-zinc-500 truncate mt-0.5 leading-normal font-sans">
                                {track.channelTitle}
                              </p>
                            </div>

                            {/* Time Duration */}
                            <span className="text-[11px] font-sans text-zinc-500 font-medium ml-2 shrink-0">
                              {track.duration}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* TAB 2: INTERACTIVE LYRICS */}
                  {rightPanelTab === "lyrics" && (
                    <div className="space-y-6 py-4 px-2 font-sans select-text max-w-sm mx-auto text-center">
                      <p className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 font-bold mb-4">
                        Synced Lyrics Provided by MusixMatch
                      </p>
                      
                      {activeTrack && (activeTrack.title.toLowerCase().includes("sufiyana") || activeTrack.title.toLowerCase().includes("dirty")) ? (
                        <div className="space-y-5 text-zinc-400 text-[15px] font-medium leading-relaxed">
                          <p className="text-white font-bold text-lg md:text-xl">[ Chorus ]</p>
                          <p className="hover:text-white cursor-pointer transition-colors">Rab mila dil khoya dil khoya</p>
                          <p className="text-red-505 font-extrabold transition-all scale-102">Ishq sufiyana mera, ishq sufiyana</p>
                          <p className="hover:text-white cursor-pointer transition-colors">Rab mila dil khoya dil khoya</p>
                          <p className="hover:text-white cursor-pointer transition-colors">Ishq sufiyana mera, ishq sufiyana...</p>
                          <hr className="border-zinc-900 border-dashed my-6" />
                          <p className="hover:text-white cursor-pointer transition-colors">Sufi ke dar pe jaise koi duaa</p>
                          <p className="hover:text-white cursor-pointer transition-colors">Mera dil khoya khoya tera huaa</p>
                          <p className="hover:text-white cursor-pointer transition-colors">Ek saccha rasta jo mujhko mila</p>
                          <p className="hover:text-white cursor-pointer transition-colors">Sab gham mera dheere bah-sa gaya...</p>
                        </div>
                      ) : activeTrack && activeTrack.title.toLowerCase().includes("sadiyaan") ? (
                        <div className="space-y-5 text-zinc-400 text-[15px] font-medium leading-relaxed">
                          <p className="text-white font-bold text-lg md:text-xl">[ Verse 1 ]</p>
                          <p className="hover:text-white cursor-pointer transition-colors">Sadiyaan jo bitayein hain tere bina</p>
                          <p className="text-red-505 font-extrabold transition-all scale-102">Un palon ka hisaab humse na mangna</p>
                          <p className="hover:text-white cursor-pointer transition-colors">Tu jo mila to sab mil hi gaya</p>
                          <p className="hover:text-white cursor-pointer transition-colors">Ab sadiyon ka rishta asaan lagta...</p>
                          <hr className="border-zinc-900 border-dashed my-6" />
                          <p className="hover:text-white cursor-pointer transition-colors">Dil ki dharkan jo behta raha</p>
                          <p className="hover:text-white cursor-pointer transition-colors">Ek naye sawera tera sath laaya!</p>
                        </div>
                      ) : (
                        <div className="space-y-5 text-zinc-400 text-[15px] font-medium leading-relaxed font-sans">
                          <p className="text-white font-bold text-lg">[ Playing Instrumentals & Chorus ]</p>
                          <p className="text-red-500 font-extrabold">♬ Music Streaming ♬</p>
                          <p className="hover:text-white cursor-pointer transition-all">This instrumental has no official registered lyrics.</p>
                          <p className="text-zinc-650 hover:text-zinc-500 transition-colors">Humming & ambient melody playing back live via SaniMusic stream nodes.</p>
                          {activeTrack && (
                            <p className="text-xs text-zinc-500 mt-6 mt-1 font-mono">
                              Enjoy the original soundtrack: "{activeTrack.title}" by {activeTrack.channelTitle}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 3: LIVE SIMULATED STREAM COMMENTS */}
                  {rightPanelTab === "comments" && (
                    <div className="space-y-4 font-sans">
                      <div className="flex items-center justify-between pb-2 border-b border-zinc-900 mb-3">
                        <h4 className="text-xs font-bold text-zinc-400">Live chat room comments:</h4>
                        <span className="text-[10px] bg-red-600 text-white font-extrabold px-2 py-0.5 rounded-full select-none tracking-widest animate-pulse">LIVE</span>
                      </div>
                      
                      <div className="space-y-3">
                        {liveComments.map(comment => (
                          <div key={comment.id} className="flex gap-2.5 text-xs inline-flex w-full leading-normal">
                            <div className={`w-6 h-6 rounded-full shrink-0 ${comment.badgeColor} text-white font-bold text-[9px] flex items-center justify-center`}>
                              {comment.user.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0 bg-zinc-900/30 border border-zinc-900/60 p-2.5 rounded-xl">
                              <div className="flex items-center justify-between mb-0.5">
                                <span className="font-bold text-zinc-200 truncate">{comment.user}</span>
                                <span className="text-[9px] text-zinc-500 font-mono shrink-0">{comment.time}</span>
                              </div>
                              <p className="text-zinc-300 font-normal pr-1 leading-snug">
                                {comment.text}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 4: RELATED SUGGESTIONS */}
                  {rightPanelTab === "related" && (
                    <div className="space-y-4 font-sans">
                      <div className="pb-2 border-b border-zinc-900 mb-3">
                        <h4 className="text-xs font-bold text-zinc-400">Recommended Songs & Mixes:</h4>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pb-4">
                        {[
                          {
                            title: "Deshi Vibes Mix",
                            channel: "Sani Recommendations",
                            image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&auto=format&fit=crop"
                          },
                          {
                            title: "Hotlist Bangladesh",
                            channel: "Billboard Top Mix",
                            image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&auto=format&fit=crop"
                          }
                        ].map((mix, mixIdx) => (
                          <div 
                            key={mixIdx} 
                            onClick={() => { triggerClick(); playTrackDirect(mixIdx * 2); }}
                            className="bg-zinc-950/40 hover:bg-zinc-900/60 border border-zinc-900 hover:border-zinc-800 p-2.5 rounded-xl cursor-pointer transition-all group"
                          >
                            <div className="aspect-square w-full rounded-lg overflow-hidden bg-zinc-900 mb-2 relative">
                              <img src={mix.image} alt="" className="w-full h-full object-cover group-hover:opacity-85 transition-opacity" />
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Play size={18} className="text-white fill-current" />
                              </div>
                            </div>
                            <h5 className="text-[12px] font-bold text-white group-hover:text-red-500 truncate transition-colors">{mix.title}</h5>
                            <p className="text-[10px] text-zinc-500 mt-0.5 truncate">{mix.channel}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </motion.div>
          ) : (
            /* ==================== NORMAL DASHBOARD VIEW ==================== */
            <>
              {/* ==================== 2. HORIZONTAL SCROLL TYPE FILTER CAPSULES ==================== */}
              <div className="w-full flex items-center gap-2.5 overflow-x-auto scrollbar-none pb-8 shrink-0">
                {["Sleep", "Relax", "Sad", "Romance", "Energize", "Party", "Commute", "Feel good", "Focus", "Workout"].map((pill) => {
                  const isCurActive = activeTag === pill;
                  return (
                    <button
                      type="button"
                      key={pill}
                      onClick={() => handleTagClick(pill)}
                      className={`text-[13px] font-medium px-4 py-1.5 rounded-lg border transition-all cursor-pointer select-none whitespace-nowrap ${
                        isCurActive
                          ? "bg-white text-zinc-950 border-white font-semibold"
                          : "bg-[#212121]/60 text-zinc-200 border-[#303030]/80 hover:bg-[#323232]"
                      }`}
                    >
                      {pill}
                    </button>
                  );
                })}
              </div>

              {/* VIDEO MODE LIVE AREA */}
              <AnimatePresence>
                {videoMode && activeTrack && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, height: 0 }}
                    animate={{ opacity: 1, scale: 1, height: "auto" }}
                    exit={{ opacity: 0, scale: 0.95, height: 0 }}
                    className="w-full overflow-hidden block mb-8"
                  >
                    <div className="max-w-2xl mx-auto aspect-video rounded-xl border border-zinc-850 overflow-hidden bg-black shadow-2xl relative">
                      <iframe
                        title="YT Active Video Stream Frame"
                        src={`https://www.youtube.com/embed/${activeTrack.id}?enablejsapi=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&autoplay=${musicPlaying ? 1 : 0}&origin=${window.location.origin}`}
                        className="w-full h-full border-0 pointer-events-auto"
                        allow="autoplay; encrypted-media"
                      />
                      <div className="absolute top-3 left-3 bg-red-656 text-[8px] font-sans font-bold uppercase tracking-widest px-2 py-0.5 rounded flex items-center gap-1 shadow-md">
                        <span className="w-1 h-1 rounded-full bg-white animate-ping" />
                        LIVE COVERAGE
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ==================== QUICK PICKS SECTION ==================== */}
              <div id="quick-picks-section" className="space-y-5 mb-12 select-none">
                <div className="flex justify-between items-end pr-1">
                  <div>
                    <span className="text-zinc-500 text-[11px] font-bold uppercase tracking-wider font-sans">START LISTENING</span>
                    <h2 className="text-3xl font-black tracking-tight text-white font-sans mt-0.5 select-none">
                      Quick picks
                    </h2>
                  </div>
                  
                  <div className="flex items-center gap-3 select-none">
                    <button 
                      type="button"
                      onClick={() => { triggerClick(); playTrackDirect(0); setIsPlayerExpanded(true); }}
                      className="text-xs font-bold px-4 py-1.5 rounded-full border border-zinc-800 hover:border-zinc-700 text-white hover:bg-[#1a1a1a] transition-colors cursor-pointer"
                    >
                      Play all
                    </button>
                    <div className="flex items-center gap-1.5 ml-1">
                      <button type="button" onClick={triggerClick} className="p-2 rounded-full border border-zinc-850 bg-[#121212] text-zinc-400 hover:text-white transition-colors cursor-pointer hover:bg-zinc-900">
                        <ChevronLeft size={14} />
                      </button>
                      <button type="button" onClick={triggerClick} className="p-2 rounded-full border border-zinc-850 bg-[#121212] text-zinc-400 hover:text-white transition-colors cursor-pointer hover:bg-zinc-900">
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                {isSearching ? (
                  <div className="py-20 text-center space-y-3 font-sans select-none">
                    <span className="w-6 h-6 rounded-full border border-zinc-700 border-t-white animate-spin inline-block" />
                    <p className="text-xs font-bold text-zinc-500 tracking-wider">LOADING NEW PICKS...</p>
                  </div>
                ) : (
                  /* 3 columns of 4 items using responsive grid & col-flow */
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-4 lg:grid-flow-col gap-x-8 gap-y-4 font-sans select-none">
                    {tracks.slice(0, 12).map((track, idx) => {
                      const isTrackActive = track.id === activeTrack.id;
                      return (
                        <div
                          key={track.id}
                          onClick={() => {
                            playTrackDirect(idx);
                            setIsPlayerExpanded(true); // Auto expand exactly as requested
                          }}
                          className="group flex items-center p-2 rounded-lg hover:bg-[#1f1f1f]/60 cursor-pointer transition-all duration-200 select-none min-w-0 border border-transparent hover:border-zinc-900"
                        >
                          {/* Square Album Art */}
                          <div className="relative w-12 h-12 lg:w-14 lg:h-14 rounded-md overflow-hidden bg-zinc-900 shrink-0 border border-zinc-850 shadow-md">
                            <img
                              src={track.thumbnail}
                              alt=""
                              className="w-full h-full object-cover transition-opacity duration-200 group-hover:opacity-80"
                              referrerPolicy="no-referrer"
                            />

                            {/* Hover Play Button Overlay */}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <Play size={16} className="text-white fill-current translate-x-[1px]" />
                            </div>

                            {/* Active / Playing indicator */}
                            {isTrackActive && (
                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                {musicPlaying ? (
                                  <div className="flex items-end gap-[2px] h-3">
                                    <span className="w-[2.5px] bg-red-655 animate-[soundwave_0.8s_ease-in-out_infinite_alternate]" />
                                    <span className="w-[2.5px] bg-red-655 animate-[soundwave_1.1s_ease-in-out_infinite_alternate_0.2s]" />
                                    <span className="w-[2.5px] bg-red-655 animate-[soundwave_0.9s_ease-in-out_infinite_alternate_0.4s]" />
                                  </div>
                                ) : (
                                  <Play size={14} className="text-red-500 fill-current translate-x-[0.5px]" />
                                )}
                              </div>
                            )}
                          </div>

                          {/* Details */}
                          <div className="ml-3.5 flex-1 min-w-0 pr-2">
                            <h4 className={`text-[14px] font-bold leading-snug truncate ${isTrackActive ? "text-red-600 font-extrabold" : "text-white"}`}>
                              {track.title}
                            </h4>
                            <p className="text-[12px] text-zinc-400 font-sans truncate mt-0.5 leading-normal">
                              {track.channelTitle} • {track.views || "1.4M views"} • {track.genre}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          )
        ) : (
          /* ==================== YouTube Studio Creator Workspace ==================== */
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="space-y-6"
          >
            {/* Creator Profile overview metadata row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-805">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-red-650 flex items-center justify-center border border-zinc-700 font-bold text-white shadow-inner shrink-0 text-lg uppercase tracking-wider select-none">
                  {activeTrack ? activeTrack.channelTitle.charAt(0) : "A"}
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white flex items-center gap-2 font-sans tracking-tight">
                    {activeTrack ? activeTrack.channelTitle : "Sani Chamber Studio Direct"}
                    <span className="text-[9px] bg-red-600 text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                      Live Stream Desk
                    </span>
                  </h3>
                  <p className="text-xs text-zinc-400 font-sans">
                    Currently Syncing: {activeTrack ? activeTrack.title : "Scenic Ambient Track"}
                  </p>
                </div>
              </div>

              {/* Bitrate analytics block */}
              <div className="flex items-center gap-3 px-3.5 py-1.5 bg-[#151515] rounded-xl border border-zinc-850">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                </span>
                <div className="text-left font-sans">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Bitrate Quality</div>
                  <div className="text-xs text-emerald-400 font-mono font-bold">14.2 Mbps • 1080p60 FPS</div>
                </div>
              </div>
            </div>

            {/* AI-Suggested metrics grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Card 1: Active listeners */}
              <div className="p-4 rounded-xl bg-[#111111] border border-zinc-900 flex flex-col justify-between hover:border-zinc-800 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-sans text-zinc-400 uppercase tracking-wider font-bold">Live Hearers</span>
                  <Radio size={14} className="text-red-500 animate-pulse" />
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-black text-white flex items-baseline gap-2">
                    5,142
                    <span className="text-xs text-red-500 font-bold animate-pulse font-mono">
                      ● LIVE
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-1 truncate">
                    Currently connected to the stream
                  </p>
                </div>
              </div>

              {/* Card 2: Revenue tracker */}
              <div className="p-4 rounded-xl bg-[#111111] border border-zinc-900 flex flex-col justify-between hover:border-zinc-800 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-sans text-zinc-400 uppercase tracking-wider font-bold">Est. Earnings</span>
                  <TrendingUp size={14} className="text-green-500" />
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-black text-white">
                    $4,215.80
                  </div>
                  <p className="text-[11px] text-emerald-400 mt-1 font-bold">
                    +15.2% Ad revenues this cycle
                  </p>
                </div>
              </div>

              {/* Card 3: Dynamic Subscriber counts */}
              <div className="p-4 rounded-xl bg-[#111111] border border-zinc-900 flex flex-col justify-between hover:border-zinc-800 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-sans text-zinc-400 uppercase tracking-wider font-bold">Total Subs</span>
                  <Users size={14} className="text-blue-400" />
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-black text-white">
                    512,488
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-1 font-sans">
                    +12 new fans in the last hour
                  </p>
                </div>
              </div>

              {/* Card 4: Hours / CTR score */}
              <div className="p-4 rounded-xl bg-[#111111] border border-zinc-900 flex flex-col justify-between hover:border-zinc-800 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-sans text-zinc-400 uppercase tracking-wider font-bold">Watch Time Desk</span>
                  <Clock size={14} className="text-yellow-500" />
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-black text-white">
                    34.2K hrs
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-1 truncate">
                    84.5% Engagement retention CTR
                  </p>
                </div>
              </div>

            </div>

            {/* Split row: Left column chat workspace, right column suggestions and sound FX board */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              
              {/* LEFT COLUMN: Dynamic stream live chat box */}
              <div className="lg:col-span-7 rounded-2xl bg-[#111111]/80 border border-zinc-900 hover:border-zinc-805 p-5 flex flex-col h-[400px]">
                <div className="flex items-center justify-between pb-3.5 border-b border-zinc-900 mb-4 shrink-0">
                  <div className="flex items-center gap-2.5">
                    <MessageSquare size={16} className="text-red-500" />
                    <h4 className="text-[15px] font-bold text-white tracking-wide">
                      Live Listener Chat Feed
                    </h4>
                  </div>
                  <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-zinc-400 bg-red-650/10 border border-red-500/20 px-2.5 py-1 rounded">
                    {musicPlaying ? "Room Active / Loop running" : "Stream on standby"}
                  </span>
                </div>

                {/* Vertical scroll comment tree */}
                <div 
                  ref={chatScrollRef}
                  className="flex-1 overflow-y-auto space-y-3.5 pr-2 scrollbar-thin scrollbar-thumb-zinc-850"
                  style={{ maxHeight: "300px" }}
                >
                  {liveComments.map(comment => (
                    <div key={comment.id} className="flex gap-3 text-xs leading-normal font-sans">
                      <div className={`w-6 h-6 rounded-full ${comment.badgeColor} text-white font-bold text-[9px] flex items-center justify-center shrink-0`}>
                        {comment.user.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-bold text-zinc-200 truncate">{comment.user}</span>
                          <span className="text-[9px] text-zinc-500 font-mono shrink-0">{comment.time}</span>
                        </div>
                        <p className="text-zinc-300 tracking-wide font-normal word-break pr-1">
                          {comment.text}
                        </p>
                      </div>
                    </div>
                  ))}
                  {liveComments.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center text-zinc-500 p-8">
                      <p className="text-xs">No active comments in room.</p>
                      <p className="text-[11px] text-zinc-650 mt-1">Press play on any song to start simulated listener chat.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT COLUMN: AI smart optimizations radar and soundboards */}
              <div className="lg:col-span-5 flex flex-col gap-5 justify-between">
                
                {/* AI optimization console */}
                <div className="p-5 rounded-2xl bg-[#111111]/80 border border-zinc-900 hover:border-zinc-805 transition-all flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 pb-2.5 border-b border-zinc-900 mb-4 font-sans">
                      <Sparkles size={16} className="text-yellow-500 animate-pulse" />
                      <h4 className="text-[15px] font-bold text-white leading-none">
                        AI Creator Suggestion Radar
                      </h4>
                    </div>

                    <div className="space-y-4 font-sans">
                      {/* suggested titles */}
                      <div>
                        <div className="text-[10px] uppercase font-bold tracking-wider text-yellow-500 mb-1">
                          Suggested High-CTR Stream Title:
                        </div>
                        <div className="text-[11px] bg-[#1a1a1a] p-2.5 rounded-lg border border-zinc-850/60 text-zinc-350 font-bold leading-normal truncate">
                          [24/7 Live] Sunset Lounge Vibe ☕ {activeTrack ? activeTrack.genre.split("/")[0].trim() : "Lofi Music"} सेशन feat. {activeTrack ? activeTrack.channelTitle : "Sani Creator"}
                        </div>
                      </div>

                      {/* trending tags */}
                      <div>
                        <div className="text-[10px] uppercase font-bold tracking-wider text-yellow-500 mb-1.5">
                          Viral Creator Tags (Click tag to apply):
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {[`#lofi`, `#banglasong`, `#${activeTrack ? activeTrack.genre.split("/")[0].trim().toLowerCase().replace(/[^a-z0-9]/g, "") : "chill"}`, `#ambientchamber`, `#trending2026`, `#viralbeats`].map(tag => (
                            <button
                              key={tag}
                              onClick={() => { triggerClick(); alert(`Hashtag "${tag}" copied to stream clipboards!`); }}
                              className="text-[9px] font-semibold bg-[#1a1a1a] hover:bg-[#252525] text-zinc-400 hover:text-white border border-zinc-850 px-2 py-1 rounded transition-colors cursor-pointer"
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* release peak duration */}
                      <div>
                        <div className="text-[10px] uppercase font-bold tracking-wider text-yellow-500 mb-1">
                          Optimal Release engagement Window (BST):
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-normal">
                          Recommended hour: <strong className="text-white">7:30 PM - 9:45 PM (BST)</strong>. This stream's audience reacts best in the evening!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sound effect modules */}
                <div className="p-5 rounded-2xl bg-[#111111]/80 border border-zinc-900 hover:border-zinc-805 transition-colors">
                  <div className="flex items-center gap-2.5 pb-2.5 border-b border-zinc-900 mb-4">
                    <Zap size={14} className="text-red-500" />
                    <h4 className="text-[14px] font-bold text-white">
                      Live Stream soundboard
                    </h4>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { icon: "📯", label: "Airhorn Blast", action: playAirhornSynth },
                      { icon: "👏", label: "Audience Clap", action: playApplauseSynth },
                      { icon: "💫", label: "Swoosh Effect", action: playSwooshSynth },
                      { icon: "💥", label: "Bass Drop", action: playSubDropSynth },
                      { icon: "🔔", label: "Chime Bells", action: playChimeSynth },
                    ].map((effect, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => { triggerClick(); effect.action(); }}
                        type="button"
                        className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#181818] border border-zinc-850 hover:bg-[#202020] hover:border-zinc-700 active:scale-95 transition-all cursor-pointer text-center group"
                      >
                        <span className="text-lg mb-0.5 group-hover:scale-110 transition-transform duration-200">{effect.icon}</span>
                        <span className="text-[9px] font-bold text-zinc-400 group-hover:text-white transition-colors truncate w-full">{effect.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </motion.div>
        )}

      </div>

      {/* ==================== PERSISTENT BOTTOM PLAYER BAR CONTROLLER ==================== */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#070707]/98 backdrop-blur-md border-t border-zinc-900 py-3.5 px-4 md:px-8 z-50 flex flex-col gap-3 shadow-[0_-10px_35px_rgba(0,0,0,0.95)] select-none">
        
        {/* Timeline Progress Slider */}
        <div className="max-w-7xl mx-auto w-full flex items-center gap-3.5">
          <span className="font-mono text-[9px] text-zinc-450 min-w-[28px] text-right">
            {formatTime(currentTime)}
          </span>
          
          <div className="relative flex-1 flex items-center group py-1.5 cursor-pointer">
            <input
              type="range"
              min="0"
              max={totalDuration}
              value={currentTime}
              onChange={handleProgressChange}
              className="w-full h-[2px] bg-zinc-800 appearance-none rounded-lg cursor-pointer outline-none accent-red-655 focus:outline-none"
            />
            {/* YouTube bright white/red style progress slider */}
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-red-600 pointer-events-none rounded"
              style={{ width: `${(currentTime / (totalDuration || 1)) * 100}%` }}
            />
          </div>
          
          <span className="font-mono text-[9px] text-zinc-450 min-w-[28px] text-left">
            {formatTime(totalDuration)}
          </span>
        </div>

        {/* Master Player Controls Column */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
          
          {/* Active Track Descriptions (Left) - Clicking thumbnail/text maximizes player */}
          <div className="flex items-center gap-3.5 w-1/3 min-w-[140px] md:w-[280px]">
            <div 
              onClick={() => { triggerClick(); setIsPlayerExpanded(!isPlayerExpanded); }}
              className="flex items-center gap-3.5 cursor-pointer group/playerbar select-none flex-1 min-w-0"
              title={isPlayerExpanded ? "Minimize Player" : "Expand Player"}
            >
              <div className="relative w-10 h-10 rounded border border-zinc-805 overflow-hidden shrink-0 bg-zinc-950 shadow-md group-hover/playerbar:border-zinc-500 transition-colors">
                <img 
                  src={activeTrack.thumbnail} 
                  alt="" 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/45 opacity-0 group-hover/playerbar:opacity-100 flex items-center justify-center transition-opacity">
                  {isPlayerExpanded ? <ChevronDown size={12} className="text-white" /> : <ChevronUp size={12} className="text-white" />}
                </div>
              </div>
              
              <div className="min-w-0 flex-1">
                <h4 className="text-[11px] font-bold text-white group-hover/playerbar:text-red-500 truncate leading-snug tracking-wide transition-colors">
                  {activeTrack.title}
                </h4>
                <p className="text-[9px] text-zinc-450 truncate mt-0.5">
                  {activeTrack.channelTitle}
                </p>
              </div>
            </div>

            {/* UP / DOWN Reaction button tags */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={(e) => { e.stopPropagation(); setVote(activeTrack.id, "down"); }}
                className="p-1.5 rounded-full hover:bg-zinc-900 transition-all text-zinc-500 hover:text-white"
                title="Thumbs Down"
              >
                <ThumbsDown size={12} className={likedHash[activeTrack.id] === "down" ? "text-red-500 fill-current" : ""} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setVote(activeTrack.id, "up"); }}
                className="p-1.5 rounded-full hover:bg-zinc-900 transition-all text-zinc-500 hover:text-white"
                title="Thumbs Up"
              >
                <ThumbsUp size={12} className={likedHash[activeTrack.id] === "up" ? "text-white fill-current" : ""} />
              </button>
            </div>
          </div>

          {/* Central Active Play Control actions */}
          <div className="flex items-center gap-5 justify-center w-1/3">
            <button
              onClick={() => { triggerClick(); setShuffleMode(!shuffleMode); }}
              className={`p-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                shuffleMode ? "text-red-500" : "text-zinc-500 hover:text-white"
              }`}
              title="Shuffle"
            >
              <Shuffle size={14} />
            </button>

            <button
              onClick={handlePrev}
              className="p-1.5 text-zinc-400 hover:text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
              title="Previous song"
            >
              <SkipBack size={16} />
            </button>

            {/* YT Music master circular white Play/Pause toggler */}
            <button
              onClick={() => { triggerClick(); setMusicPlaying(!musicPlaying); }}
              className="w-10 h-10 rounded-full bg-white hover:scale-105 active:scale-95 text-black flex items-center justify-center transition-all shadow-md cursor-pointer shrink-0 relative"
              title={musicPlaying ? "Pause" : "Play"}
            >
              {musicPlaying ? (
                <Pause size={14} className="stroke-[3] fill-black text-black" />
              ) : (
                <Play size={14} className="translate-x-[1px] stroke-[3] fill-black text-black" />
              )}
            </button>

            <button
              onClick={handleNext}
              className="p-1.5 text-zinc-400 hover:text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
              title="Next song"
            >
              <SkipForward size={16} />
            </button>

            <button
              onClick={() => { triggerClick(); setLoopMode(!loopMode); }}
              className={`p-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                loopMode ? "text-red-500" : "text-zinc-500 hover:text-white"
              }`}
              title="Repeat"
            >
              <RotateCcw size={14} />
            </button>
          </div>

          {/* Slider controls and settings adjustments (Right) */}
          <div className="flex items-center gap-3 md:gap-4 justify-end w-1/3">
            
            {/* Volume capsule toggler slider */}
            <div className="flex items-center gap-2 max-w-[120px] md:max-w-[140px] flex-1">
              <button
                onClick={() => { triggerClick(); setMuted(!muted); }}
                className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
                title={muted ? "Unmute" : "Mute"}
              >
                {muted || volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
              
              <input
                type="range"
                min="0"
                max="100"
                value={muted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseInt(e.target.value));
                  if (muted) setMuted(false);
                }}
                className="w-full h-[2px] bg-zinc-805 appearance-none rounded-lg cursor-pointer outline-none accent-white focus:outline-none"
              />
            </div>

            {/* Video preview toggling helper */}
            <button
              onClick={() => { triggerClick(); setVideoMode(!videoMode); }}
              className={`p-1.5 rounded transition-all cursor-pointer ${
                videoMode ? "text-red-500" : "text-zinc-400 hover:text-white"
              }`}
              title="Toggle Live Video Overlay"
            >
              <Tv size={15} />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
