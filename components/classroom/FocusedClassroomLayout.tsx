"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import ScreenshotEditor from "./ScreenshotEditor";
import { LessonTopBar } from "./LessonTopBar";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  Mic, 
  Send, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  Lock, 
  ChevronRight, 
  ChevronDown,
  MessageCircle, 
  ThumbsUp, 
  Share2, 
  Layers,
  Lightbulb,
  Image as ImageIcon,
  Presentation,
  Check,
  BrainCircuit,
  ArrowRight,
  X,
  Settings,
  Camera,
  Pen
} from "lucide-react";

// Definition of classroom topics
const TOPICS = [
  {
    id: 1,
    title: "1. Introduction to Kinematics",
    duration: "02:30",
    maxDurationSec: 150,
    subject: "Physics",
    chapter: "Chapter 2: Motion",
    teacher: "Dr. Aura",
    whiteboard: {
      title: "Introduction to Kinematics",
      subtitle: "The study of motion without considering its causes.",
      mainPoints: [
        "Kinematics describes position, velocity, and acceleration of bodies.",
        "Motion is relative - it depends entirely on the Frame of Reference chosen.",
        "Frame of Reference: The coordinate system or viewpoint from which measurements are made."
      ],
      formulas: [],
      example: "A passenger sitting on a moving bus is at rest relative to the bus, but in motion relative to a bystander on the road."
    }
  },
  {
    id: 2,
    title: "2. Distance vs Displacement",
    duration: "03:15",
    maxDurationSec: 195,
    subject: "Physics",
    chapter: "Chapter 2: Motion",
    teacher: "Dr. Aura",
    whiteboard: {
      title: "Distance vs Displacement",
      subtitle: "Understanding path length versus shortest straight-line distance.",
      mainPoints: [
        "Distance (d): Total path length traveled. It is a SCALAR quantity (always positive).",
        "Displacement (s): Shortest straight-line distance from start to end. It is a VECTOR quantity (has direction, can be negative)."
      ],
      formulas: [
        { label: "Distance", math: "d = Path₁ + Path₂ + Path₃..." },
        { label: "Displacement", math: "s = x_final - x_initial (with direction)" }
      ],
      example: "Walk 4 meters East, then 3 meters North. Distance traveled = 7 meters. Total displacement = 5 meters Northeast."
    }
  },
  {
    id: 3,
    title: "3. Speed & Velocity",
    duration: "04:15",
    maxDurationSec: 255,
    subject: "Physics",
    chapter: "Chapter 2: Motion",
    teacher: "Dr. Aura",
    whiteboard: {
      title: "Speed and Velocity",
      subtitle: "Rate of change of position in scalar and vector forms.",
      mainPoints: [
        "Speed: Rate at which distance is covered (Scalar: Speed = Distance / Time).",
        "Velocity: Speed in a given direction (Vector: Velocity = Displacement / Time)."
      ],
      formulas: [
        { label: "Average Speed", math: "v_avg = Distance / Time" },
        { label: "Average Velocity", math: "v⃗_avg = Displacement / Time = Δx⃗ / Δt" }
      ],
      example: "A car travels 100 meters North in 20 seconds. Its speed is 5 m/s. Its velocity is 5 m/s North."
    }
  },
  {
    id: 4,
    title: "4. Acceleration & Deceleration",
    duration: "03:45",
    maxDurationSec: 225,
    subject: "Physics",
    chapter: "Chapter 2: Motion",
    teacher: "Dr. Aura",
    whiteboard: {
      title: "Acceleration & Deceleration",
      subtitle: "The rate at which velocity changes over time.",
      mainPoints: [
        "Acceleration (a): Increase in velocity per unit time (Vector quantity).",
        "Deceleration: Decrease in velocity, mathematically written as negative acceleration."
      ],
      formulas: [
        { label: "Average Acceleration", math: "a⃗ = (v⃗_final - v⃗_initial) / t" }
      ],
      example: "A bike speeds up from 0 to 10 m/s in 5 seconds. Acceleration = (10 - 0)/5 = 2 m/s²."
    }
  },
  {
    id: 5,
    title: "5. Equations of Motion",
    duration: "05:00",
    maxDurationSec: 300,
    subject: "Physics",
    chapter: "Chapter 2: Motion",
    teacher: "Dr. Aura",
    whiteboard: {
      title: "Equations of Motion",
      subtitle: "Four formulas connecting key kinematics variables under constant acceleration.",
      mainPoints: [
        "These equations relate displacement (s), initial velocity (u), final velocity (v), acceleration (a), and time (t).",
        "They are ONLY valid for motion with CONSTANT acceleration."
      ],
      formulas: [
        { label: "Equation 1", math: "v = u + at" },
        { label: "Equation 2", math: "s = ut + ½at²" },
        { label: "Equation 3", math: "v² = u² + 2as" }
      ],
      example: "A stone is dropped from rest off a cliff. Initial speed u = 0. Find distance fallen in 3 seconds (use g = 9.8 m/s²)."
    }
  }
];

export function FocusedClassroomLayout() {
  // Navigation / Focus State
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Lesson Progress States
  const [selectedTopicIdx, setSelectedTopicIdx] = useState(2); // Default to Topic 3: Speed & Velocity
  const activeTopic = TOPICS[selectedTopicIdx];
  
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(132); // Starts partway through (2:12)
  const duration = activeTopic.maxDurationSec;
  const progressPercent = (currentTime / duration) * 100;
  
  // Audio Controls
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [voiceActive, setVoiceActive] = useState(true);
  
  // Interactive View Modes within the Player Screen
  // Interactive View Modes within the Player Screen
  // 'video' = Whiteboard, 'graph' = Velocity Graph, 'example' = worked example, 'practice' = MCQ question, 'explanation' = AI doubt explanation
  const [activeMode, setActiveMode] = useState<'video' | 'graph' | 'example' | 'practice' | 'explanation'>('video');
  
  // Raise Hand State
  const [handRaised, setHandRaised] = useState(false);
  
  // Chat / Student Interaction Q&A
  const [doubtText, setDoubtText] = useState("");
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [voiceTimer, setVoiceTimer] = useState(0);
  const [aiResponding, setAiResponding] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{sender: 'student' | 'ai', text: string, time: string, isVoice?: boolean, attachment?: string}>>([
    {
      sender: 'ai',
      text: "Hello! I am Dr. Aura, your AI Physics instructor. Feel free to raise your hand at any moment during the lesson if you have a doubt, want another example, or would like to test your understanding!",
      time: "02:00"
    }
  ]);
  
  // Screenshot Editor State
  const [isEditingScreenshot, setIsEditingScreenshot] = useState(false);
  const [pendingExplanation, setPendingExplanation] = useState(false);
  
  // MCQ Practice State
  const [selectedMCQOption, setSelectedMCQOption] = useState<string | null>(null);

  // Mobile Bottom Drawer States
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState<'playlist' | 'qna' | 'actions' | 'practice'>('playlist');

  // Sidebar Resizable Split-Pane States
  const [sidebarWidth, setSidebarWidth] = useState(380);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const isResizing = useRef(false);
  
  // Refs
  const desktopChatContainerRef = useRef<HTMLDivElement>(null);
  const mobileChatContainerRef = useRef<HTMLDivElement>(null);
  const voiceIntervalRef = useRef<any>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    const scrollDesktop = desktopChatContainerRef.current;
    if (scrollDesktop) scrollDesktop.scrollTop = scrollDesktop.scrollHeight;
    
    const scrollMobile = mobileChatContainerRef.current;
    if (scrollMobile) scrollMobile.scrollTop = scrollMobile.scrollHeight;
  }, [chatHistory, aiResponding]);

  // Sync body class for fullscreen overrides (hiding website sidebar)
  useEffect(() => {
    if (isFullscreen) {
      document.body.classList.add("fullscreen-active");
    } else {
      document.body.classList.remove("fullscreen-active");
    }
    return () => document.body.classList.remove("fullscreen-active");
  }, [isFullscreen]);

  // Bind browser native HTML5 fullscreenchange events to state & lock orientation on mobile
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isCurrentlyFullscreen);
      
      if (isCurrentlyFullscreen) {
        // Attempt to lock to landscape on mobile/tablet screens
        const orientation = screen.orientation as any;
        if (window.innerWidth < 1024 && orientation && typeof orientation.lock === 'function') {
          orientation.lock("landscape").catch((err: any) => {
            console.warn("Screen orientation lock failed:", err);
          });
        }
      } else {
        // Unlock orientation
        const orientation = screen.orientation as any;
        if (orientation && typeof orientation.unlock === 'function') {
          try {
            orientation.unlock();
          } catch (err: any) {
            console.warn("Screen orientation unlock failed:", err);
          }
        }
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Escape Key Fullscreen handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  // Video Playing Timer
  useEffect(() => {
    let interval: any;
    if (isPlaying && !handRaised) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, handRaised]);

  // Simulated Voice Recording Timer
  useEffect(() => {
    if (isRecordingVoice) {
      setVoiceTimer(0);
      voiceIntervalRef.current = setInterval(() => {
        setVoiceTimer(t => t + 1);
      }, 1000);
    } else {
      if (voiceIntervalRef.current) clearInterval(voiceIntervalRef.current);
    }
    return () => {
      if (voiceIntervalRef.current) clearInterval(voiceIntervalRef.current);
    };
  }, [isRecordingVoice]);

  // Split-Pane drag handles
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current) return;
    const newWidth = window.innerWidth - e.clientX - 24; // offset padding
    if (newWidth >= 300 && newWidth <= 600) {
      setSidebarWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Sync timeline progress if switching topic
  useEffect(() => {
    setCurrentTime(0);
    setIsPlaying(true);
    setHandRaised(false);
    setActiveMode('video');
  }, [selectedTopicIdx]);

  // Format seconds to MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Timeline Scrubbing Handler
  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.min(Math.max(clickX / rect.width, 0), 1);
    setCurrentTime(Math.floor(percentage * duration));
  };

  // Replay from start
  const handleReplay = () => {
    setCurrentTime(0);
    setIsPlaying(true);
  };

  // Toggle Raise Hand
  const handleToggleRaiseHand = () => {
    if (!handRaised) {
      setHandRaised(true);
      setIsPlaying(false);
      // Auto-open Q&A on both mobile and desktop
      setIsMobilePanelOpen(true);
      setActiveMobileTab('qna');
      setIsSidebarExpanded(true);
      
      // Add a greeting from AI
      const topicName = activeTopic.title.substring(3);
      setChatHistory(prev => [
        ...prev,
        {
          sender: 'ai',
          text: `✋ You raised your hand. Lesson is paused at ${formatTime(currentTime)}. Let's clear your doubts regarding "${topicName}". You can ask by typing below or clicking the microphone for voice chat.`,
          time: formatTime(currentTime)
        }
      ]);

      // On mobile viewports, automatically trigger the bottom drawer focused on Q&A tab
      if (window.innerWidth < 1280) {
        setIsMobilePanelOpen(true);
        setActiveMobileTab('qna');
      }
    } else {
      setHandRaised(false);
      setIsPlaying(true); // Resume lesson
    }
  };

  // Handle Quick Actions
  const triggerQuickAction = (mode: 'video' | 'graph' | 'example' | 'practice') => {
    setActiveMode(mode);
    setIsPlaying(false); // Pause when examining interactive states
    
    let simulatedQuestion = "";
    let simulatedResponse = "";

    if (mode === 'video') {
      simulatedQuestion = "Back to lesson board";
      simulatedResponse = "Resuming visual board mode. You can view the core concept formulas and notes here.";
    } else if (mode === 'graph') {
      simulatedQuestion = "Show me the motion graph";
      simulatedResponse = `Here is the velocity-time graph for "${activeTopic.title.substring(3)}". Notice how constant speed appears as a flat horizontal line, while acceleration represents a positive slope.`;
    } else if (mode === 'example') {
      simulatedQuestion = "Give another example";
      simulatedResponse = `Absolutely! Let's walk through a real-world scenario. If a commuter train travels 1.2 km North, stops, and returns 0.6 km South, we calculate its displacement as 0.6 km North. Check the interactive steps on screen.`;
    } else if (mode === 'practice') {
      simulatedQuestion = "Give me a practice question";
      simulatedResponse = `I've loaded a concept challenge on the board. Test your knowledge by selecting the correct answer, and I'll explain the physics behind it!`;
    }

    // Append to Q&A Chat
    setChatHistory(prev => [
      ...prev,
      { sender: 'student', text: simulatedQuestion, time: formatTime(currentTime) }
    ]);

    setAiResponding(true);
    setTimeout(() => {
      setChatHistory(prev => [
        ...prev,
        { sender: 'ai', text: simulatedResponse, time: formatTime(currentTime) }
      ]);
      setAiResponding(false);
    }, 1200);
  };

  // Handle Custom Doubt Submission (Text)
  const submitTextDoubt = () => {
    if (!doubtText.trim()) return;
    const studentQuery = doubtText;
    setDoubtText("");
    
    // Auto-pause if not paused
    setIsPlaying(false);
    setPendingExplanation(true);
    
    setChatHistory(prev => [
      ...prev,
      { sender: 'student', text: studentQuery, time: formatTime(currentTime) }
    ]);
    
    setAiResponding(true);
    
    // Simulate AI response calculation
    setTimeout(() => {
      let reply = "";
      if (studentQuery.toLowerCase().includes("negative") || studentQuery.toLowerCase().includes("minus")) {
        reply = "Velocity is a vector quantity (magnitude + direction). If moving forward is defined as positive (+), then backing up or moving backward is mathematically represented as a negative velocity (-). Speed, however, is a scalar and is always positive.";
      } else if (studentQuery.toLowerCase().includes("difference") || studentQuery.toLowerCase().includes("vs")) {
        reply = "Speed is a scalar value (e.g., 60 km/h) measuring only rate of movement. Velocity is a vector (e.g., 60 km/h East) measuring both rate and direction. If you drive in a circle at 60 km/h, your speed is constant, but your velocity changes continuously because your direction is changing!";
      } else {
        reply = `That is an excellent question regarding "${activeTopic.title.substring(3)}". Let's think of it in terms of rate of change: we divide the displacement vector by the elapsed time. Does this match your physical intuition? Let me know if you want a step-by-step example!`;
      }
      
      setChatHistory(prev => [
        ...prev,
        { sender: 'ai', text: reply, time: formatTime(currentTime) }
      ]);
      setAiResponding(false);
    }, 1500);
  };

  // Handle Voice Doubt simulation
  const handleVoiceClick = () => {
    if (!isRecordingVoice) {
      setIsRecordingVoice(true);
      setIsPlaying(false); // Auto-pause on voice doubt
    } else {
      setIsRecordingVoice(false);
      setPendingExplanation(true);
      // Submit simulated voice question
      setChatHistory(prev => [
        ...prev,
        { 
          sender: 'student', 
          text: "🎤 What is the difference between average speed and instantaneous velocity?", 
          time: formatTime(currentTime),
          isVoice: true 
        }
      ]);
      
      setAiResponding(true);
      setTimeout(() => {
        setChatHistory(prev => [
          ...prev,
          { 
            sender: 'ai', 
            text: "Instantaneous velocity refers to the exact velocity of an object at one specific split-second (like reading your speedometer + GPS direction right now). Average speed looks at the total distance covered over the entire duration of the journey.", 
            time: formatTime(currentTime) 
          }
        ]);
        setAiResponding(false);
      }, 1500);
    }
  };

  return (
    <PageTransition>
      <div className="flex flex-col gap-4 sm:gap-6 p-0 sm:p-6 lg:p-8 bg-[#070b15]/95 text-slate-100 min-h-screen">
        
        {/* Header bar (minimized/hidden in fullscreen, desktop only) */}
        {!isFullscreen && (
          <div className="hidden lg:block px-4 sm:px-0">
            <LessonTopBar 
              isFocusMode={isFocusMode} 
              onToggleFocus={() => setIsFocusMode(!isFocusMode)} 
            />
          </div>
        )}

        {/* Main Section - Resizable Split-Pane Flex Layout on Desktop */}
        <div className="flex flex-col xl:flex-row gap-0 sm:gap-6 items-start w-full relative">
          
          {/* Left Column: Lesson Player and Info */}
          <div className="flex-1 min-w-0 space-y-6 w-full">
            
            {/* 1. Interactive Lesson Player (YouTube Style) */}
            <div 
              ref={playerRef}
              className={`w-full bg-[#080d19] overflow-hidden group flex flex-col justify-between transition-all video-player-container-rotated ${
                isFullscreen 
                  ? 'fixed inset-0 z-[100] w-screen h-screen rounded-none border-none' 
                  : 'relative min-h-[300px] sm:min-h-0 aspect-[4/3] sm:aspect-video rounded-none sm:rounded-3xl border-y sm:border border-cyan-500/20 shadow-[0_0_35px_rgba(6,182,212,0.1)]'
              }`}
            >
              
              {/* Screen grid overlay */}
              <div className="absolute inset-0 opacity-20 pointer-events-none soft-grid" />
              
              {/* Player Top Overlay (Info Bar) - Absolutely Positioned */}
              <div className="absolute top-0 left-0 right-0 z-30 p-2.5 sm:p-4 bg-gradient-to-b from-black/90 to-transparent flex justify-between items-center opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-1.5 sm:gap-3">
                  <span className="flex h-1.5 w-1.5 sm:h-2 sm:w-2 items-center justify-center rounded-full bg-cyan-400">
                    <span className="absolute inline-flex h-2.5 w-2.5 sm:h-3 sm:w-3 animate-ping rounded-full bg-cyan-400 opacity-75" />
                  </span>
                  <p className="text-[10px] sm:text-xs font-semibold tracking-wider text-cyan-300 uppercase">
                    Interactive Lesson: {activeTopic.title.substring(3)}
                  </p>
                </div>
                
                <div className="flex gap-1.5 sm:gap-2">
                  <span className="text-[9px] sm:text-xs bg-white/10 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-slate-300 border border-white/5 backdrop-blur-md">
                    Mode: {activeMode.toUpperCase()}
                  </span>
                  {handRaised && (
                    <span className="text-[9px] sm:text-xs bg-red-500/20 border border-red-500/30 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-red-300 font-bold animate-pulse backdrop-blur-md">
                      ✋ Hand Raised
                    </span>
                  )}
                </div>
              </div>

              {/* Player Main Content Viewport */}
              <div className="relative flex-1 flex items-center justify-center p-0 text-center w-full h-full">
                
                {/* Paused state overlay when raised hand */}
                <AnimatePresence>
                  {handRaised && !isEditingScreenshot && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-20 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center gap-2 sm:gap-4 text-center p-4 sm:p-6"
                    >
                      {/* Compact hand icon on mobile, larger on desktop */}
                      <div className="h-10 w-10 sm:h-16 sm:w-16 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-sm sm:shadow-[0_0_20px_rgba(34,211,238,0.3)] animate-pulse">
                        <span className="text-lg sm:text-3xl">✋</span>
                      </div>
                      <div className="px-2 max-w-lg">
                        <h3 className="text-base sm:text-xl font-bold text-white">Lecture Paused</h3>
                        <p className="text-[10px] sm:text-sm text-cyan-200 mt-1.5 leading-relaxed">
                          Please ask your question. Your teacher is listening, or if you want to text the question, you can do that too. 
                          <br className="hidden sm:block" />
                          <span className="text-white/70">You can also capture the board to point out exactly where you have a doubt.</span>
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-2">
                        <button 
                          onClick={() => { 
                            setHandRaised(false); 
                            if (pendingExplanation) {
                              setActiveMode('explanation');
                              setPendingExplanation(false);
                            } else {
                              setIsPlaying(true); 
                            }
                          }}
                          className="rounded-full bg-cyan-500 hover:bg-cyan-400 px-4 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold text-slate-900 shadow-md shadow-cyan-400/20 transition-all hover:scale-105"
                        >
                          Lower Hand & Resume
                        </button>
                        <button 
                          onClick={() => setIsEditingScreenshot(true)}
                          className="flex items-center justify-center gap-2 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-600 px-4 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold text-white transition-all hover:scale-105"
                        >
                          <Camera size={14} />
                          Capture Board
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* MODE A: Lesson Whiteboard (Default) - FULL VIEWPORT WHITE BOARD */}
                {activeMode === 'video' && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="absolute inset-0 bg-white text-slate-900 p-4 sm:p-8 pt-12 sm:pt-16 pb-14 sm:pb-20 overflow-y-auto text-left font-sans flex flex-col justify-start w-full h-full"
                  >
                    {/* Topic title */}
                    <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-cyan-600">{activeTopic.subject} &bull; {activeTopic.chapter}</span>
                    <h2 className="text-base sm:text-2xl font-extrabold text-slate-900 mt-1 border-b border-slate-200 pb-1.5">
                      {activeTopic.whiteboard.title}
                    </h2>
                    <p className="text-[11px] sm:text-sm italic text-slate-500 mt-2 font-medium">
                      &ldquo;{activeTopic.whiteboard.subtitle}&rdquo;
                    </p>
                    
                    {/* Key Points */}
                    <div className="mt-2.5 sm:mt-4 space-y-1.5 sm:space-y-2.5">
                      {activeTopic.whiteboard.mainPoints.map((point, idx) => (
                        <div key={idx} className="flex gap-2 text-[11px] sm:text-sm text-slate-700">
                          <span className="text-cyan-600 font-extrabold shrink-0">&raquo;</span>
                          <p className="leading-relaxed font-sans font-medium">{point}</p>
                        </div>
                      ))}
                    </div>

                    {/* Formulas in focus */}
                    {activeTopic.whiteboard.formulas.length > 0 && (
                      <div className="mt-3 sm:mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        {activeTopic.whiteboard.formulas.map((form, idx) => (
                          <div key={idx} className="bg-slate-50 border border-slate-200/85 rounded-2xl p-2 sm:p-3.5 flex flex-col shadow-sm">
                            <span className="text-[9px] sm:text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{form.label}</span>
                            <span className="text-xs sm:text-base font-mono font-extrabold text-cyan-600 mt-1">{form.math}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Example */}
                    <div className="mt-3 sm:mt-5 bg-purple-50 border border-purple-100 rounded-2xl p-2.5 sm:p-4 shadow-sm">
                      <span className="text-[9px] sm:text-[10px] text-purple-600 font-bold uppercase tracking-wider block mb-0.5">Illustration Example</span>
                      <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-sans font-medium">
                        {activeTopic.whiteboard.example}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* MODE B: Velocity Graph Visualizer - FULL VIEWPORT GRAPH */}
                {activeMode === 'graph' && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="absolute inset-0 bg-[#0e1628] p-4 sm:p-8 pt-12 sm:pt-16 pb-14 sm:pb-20 overflow-y-auto text-left flex flex-col justify-start w-full h-full"
                  >
                    <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2 shrink-0">
                      <div>
                        <h3 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
                          <span className="p-1 rounded bg-cyan-500/20 text-cyan-400"><Layers size={16} /></span>
                          Velocity-Time Graph
                        </h3>
                        <p className="text-xs text-slate-400">Topic: Speed vs Velocity</p>
                      </div>
                      <span className="text-xs text-cyan-300 font-mono">Constant Accel. Example</span>
                    </div>

                    {/* SVG Interactive Graph */}
                    <div className="relative w-full h-44 sm:h-56 border-l-2 border-b-2 border-slate-500/60 mt-2 px-2 pb-2 shrink-0">
                      {/* Grid Lines */}
                      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                        <div className="h-px bg-slate-100 w-full" />
                        <div className="h-px bg-slate-100 w-full" />
                        <div className="h-px bg-slate-100 w-full" />
                        <div className="h-px bg-slate-100 w-full" />
                      </div>

                      {/* Labels */}
                      <div className="absolute -left-10 top-0 text-[10px] font-mono text-slate-400 h-full flex flex-col justify-between py-1">
                        <span>v (m/s)</span>
                        <span>10</span>
                        <span>5</span>
                        <span>0</span>
                      </div>
                      
                      <div className="absolute -bottom-6 left-0 w-full text-[10px] font-mono text-slate-400 flex justify-between px-1">
                        <span>0s</span>
                        <span>3s (Accel)</span>
                        <span>7s (Constant v)</span>
                        <span>10s (Stop)</span>
                      </div>

                      {/* SVG Line Graph */}
                      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        {/* Acceleration segment */}
                        <line x1="0" y1="100" x2="30" y2="50" stroke="#a855f7" strokeWidth="2" strokeDasharray="1 1" />
                        {/* Constant speed segment */}
                        <line x1="30" y1="50" x2="70" y2="50" stroke="#22d3ee" strokeWidth="3" />
                        {/* Deceleration segment */}
                        <line x1="70" y1="50" x2="100" y2="100" stroke="#f43f5e" strokeWidth="2" strokeDasharray="1 1" />

                        {/* Animated tracker moving along the line */}
                        <motion.circle 
                          r="3" 
                          fill="#22d3ee" 
                          className="shadow-[0_0_10px_#22d3ee]"
                          animate={{ 
                            cx: [0, 30, 70, 100], 
                            cy: [100, 50, 50, 100] 
                          }}
                          transition={{ 
                            duration: 10, 
                            repeat: Infinity, 
                            ease: "linear" 
                          }} 
                        />
                      </svg>
                    </div>

                    <div className="mt-8 bg-black/40 rounded-xl p-3 border border-white/5 text-[11px] sm:text-xs text-slate-300 flex justify-between gap-4 shrink-0">
                      <div>
                        <span className="text-[9px] text-purple-400 block font-bold">Purple Phase (0s - 3s)</span>
                        Acceleration = 1.67 m/s²
                      </div>
                      <div>
                        <span className="text-[9px] text-cyan-400 block font-bold">Cyan Phase (3s - 7s)</span>
                        Velocity = Constant 5 m/s
                      </div>
                      <div>
                        <span className="text-[9px] text-red-400 block font-bold">Red Phase (7s - 10s)</span>
                        Deceleration = -1.67 m/s²
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* MODE C: Worked Example - FULL VIEWPORT EXAMPLE */}
                {activeMode === 'example' && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="absolute inset-0 bg-[#0e1628] p-4 sm:p-8 pt-12 sm:pt-16 pb-14 sm:pb-20 overflow-y-auto text-left flex flex-col justify-start w-full h-full"
                  >
                    <h3 className="font-bold text-white text-base sm:text-lg flex items-center gap-2 mb-2 shrink-0">
                      <span className="p-1 rounded bg-purple-500/20 text-purple-400"><Lightbulb size={16} /></span>
                      Interactive Worked Example: Commuter Train
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 bg-slate-950/60 p-3.5 rounded-xl border border-white/5 leading-relaxed shrink-0 mb-3">
                      A train travels 1200 meters North in 60 seconds, pauses briefly, and then travels 600 meters South in 40 seconds. Find its:
                    </p>

                    <div className="space-y-2.5 overflow-y-auto flex-1 pr-1 custom-scrollbar">
                      <details className="group border border-white/10 rounded-xl overflow-hidden bg-black/20">
                        <summary className="p-3 cursor-pointer font-semibold text-xs sm:text-sm flex justify-between items-center hover:bg-white/5 transition">
                          <span>1. Total Distance vs Net Displacement</span>
                          <span className="text-cyan-400 group-open:rotate-180 transition-transform"><ChevronDown size={16} /></span>
                        </summary>
                        <div className="p-3 border-t border-white/5 text-[11px] sm:text-xs text-slate-300 space-y-1 font-mono">
                          <p className="text-white">Distance = absolute path length:</p>
                          <p className="text-cyan-400 font-bold">d = 1200m + 600m = 1800 meters</p>
                          <p className="text-white mt-2">Displacement = final change in position:</p>
                          <p className="text-cyan-400 font-bold">s⃗ = 1200m (N) - 600m (S) = 600 meters North</p>
                        </div>
                      </details>

                      <details className="group border border-white/10 rounded-xl overflow-hidden bg-black/20">
                        <summary className="p-3 cursor-pointer font-semibold text-xs sm:text-sm flex justify-between items-center hover:bg-white/5 transition">
                          <span>2. Average Speed Calculation</span>
                          <span className="text-cyan-400 group-open:rotate-180 transition-transform"><ChevronDown size={16} /></span>
                        </summary>
                        <div className="p-3 border-t border-white/5 text-[11px] sm:text-xs text-slate-300 space-y-1 font-mono">
                          <p className="text-white">Average Speed = Total Distance / Total Time</p>
                          <p>Time = 60s + 40s = 100 seconds</p>
                          <p className="text-cyan-400 font-bold">Speed = 1800m / 100s = 18 m/s</p>
                        </div>
                      </details>

                      <details className="group border border-white/10 rounded-xl overflow-hidden bg-black/20">
                        <summary className="p-3 cursor-pointer font-semibold text-xs sm:text-sm flex justify-between items-center hover:bg-white/5 transition">
                          <span>3. Average Velocity Calculation</span>
                          <span className="text-cyan-400 group-open:rotate-180 transition-transform"><ChevronDown size={16} /></span>
                        </summary>
                        <div className="p-3 border-t border-white/5 text-[11px] sm:text-xs text-slate-300 space-y-1 font-mono">
                          <p className="text-white">Average Velocity = Net Displacement / Total Time</p>
                          <p>Net Displacement = 600m North</p>
                          <p className="text-cyan-400 font-bold">Velocity = 600m (North) / 100s = 6 m/s North</p>
                        </div>
                      </details>
                    </div>
                  </motion.div>
                )}

                {/* MODE E: Explanation Mode */}
                {activeMode === 'explanation' && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="absolute inset-0 bg-[#0e1628] p-4 sm:p-6 flex flex-col justify-center items-center overflow-hidden w-full h-full text-center z-10"
                  >
                    <div className="absolute inset-0 opacity-10 pointer-events-none soft-grid" />
                    <div className="max-w-3xl z-10 flex flex-col items-center justify-center gap-4 w-full h-full pt-8 pb-12">
                      <h3 className="text-lg sm:text-xl font-bold text-white flex items-center justify-center gap-2 shrink-0">
                        <span className="p-1.5 rounded bg-cyan-500/20 text-cyan-400"><BrainCircuit size={20} /></span>
                        AI Teacher Explanation
                      </h3>
                      
                      <div className="bg-black/40 border border-cyan-500/30 p-4 sm:p-5 rounded-2xl shadow-[0_0_30px_rgba(34,211,238,0.1)] relative w-full overflow-y-auto max-h-[50%] custom-scrollbar text-left shrink-0">
                        <div className="absolute top-2 right-2 text-cyan-500/40 animate-pulse"><Pen size={16} /></div>
                        <p className="text-[11px] sm:text-sm text-cyan-100 font-mono leading-relaxed pr-6">
                          Let's clarify your doubt here on the board:<br/><br/>
                          As we've discussed, <span className="text-yellow-400 font-bold">Speed</span> is a Scalar quantity (it only cares about magnitude, no direction), while <span className="text-emerald-400 font-bold">Velocity</span> is a Vector (it requires both magnitude + direction).<br/><br/>
                          For example, if you walk 5 steps forward and 5 steps back, your total distance is 10, but your displacement (and thus average velocity) is exactly 0!
                        </p>
                      </div>
                      
                      <button 
                        onClick={() => { setActiveMode('video'); setIsPlaying(true); setIsSidebarExpanded(false); }}
                        className="px-6 py-2 sm:py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-900 text-xs sm:text-sm font-bold rounded-full transition shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:scale-105 active:scale-95 flex items-center gap-2 shrink-0 mt-2"
                      >
                        <Play size={14} fill="currentColor" />
                        Got it! Resume Lesson
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* MODE D: MCQ Practice Challenge - FULL VIEWPORT QUIZ */}
                {activeMode === 'practice' && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="absolute inset-0 bg-[#0e1628] p-4 sm:p-8 pt-12 sm:pt-16 pb-14 sm:pb-20 overflow-y-auto text-left flex flex-col justify-start w-full h-full"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3 shrink-0">
                      <h3 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
                        <span className="p-1 rounded bg-indigo-500/20 text-indigo-400"><BrainCircuit size={16} /></span>
                        Concept Check: Speed vs Velocity
                      </h3>
                      <span className="text-[10px] bg-indigo-500/20 border border-indigo-500/30 px-2 py-0.5 rounded text-indigo-300 font-semibold">Quiz</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-100 font-medium mb-4 bg-black/20 p-3.5 rounded-xl border border-white/5 shrink-0">
                      A cyclist rides 3 km East and then 4 km North in 30 minutes. What is their average velocity in km/h?
                    </p>

                    {/* MCQ Options */}
                    <div className="space-y-2.5 overflow-y-auto flex-1 pr-1 custom-scrollbar">
                      {[
                        { key: "A", text: "14 km/h East" },
                        { key: "B", text: "10 km/h Northeast", correct: true },
                        { key: "C", text: "8 km/h North" },
                        { key: "D", text: "5 km/h Northeast" }
                      ].map((opt) => {
                        const isSelected = selectedMCQOption === opt.key;
                        const isCorrect = opt.correct;
                        const showAnswer = selectedMCQOption !== null;

                        let borderClass = "border-white/10 bg-white/5 hover:bg-white/10";
                        if (isSelected) {
                          if (isCorrect) borderClass = "border-emerald-500 bg-emerald-500/10 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]";
                          else borderClass = "border-red-500 bg-red-500/10 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.2)]";
                        } else if (showAnswer && isCorrect) {
                          borderClass = "border-emerald-500/50 bg-emerald-500/5 text-emerald-400";
                        }

                        return (
                          <button
                            key={opt.key}
                            disabled={selectedMCQOption !== null}
                            onClick={() => setSelectedMCQOption(opt.key)}
                            className={`w-full p-3 text-left rounded-xl border transition-all text-xs font-semibold flex items-center justify-between ${borderClass}`}
                          >
                            <span className="flex items-center gap-3">
                              <span className={`w-5.5 h-5.5 rounded-full flex items-center justify-center text-[10px] border ${
                                isSelected ? 'bg-white/20 border-current' : 'border-white/20'
                              }`}>
                                {opt.key}
                              </span>
                              {opt.text}
                            </span>
                            {isSelected && isCorrect && <Check size={14} className="text-emerald-400" />}
                          </button>
                        );
                      })}

                      {/* Quiz Feedback */}
                      {selectedMCQOption !== null && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-3.5 rounded-xl border text-[11px] leading-relaxed ${
                            selectedMCQOption === "B" 
                              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200" 
                              : "bg-red-500/10 border-red-500/30 text-red-200"
                          }`}
                        >
                          <span className="font-bold block mb-1">
                            {selectedMCQOption === "B" ? "🎉 Correct Answer!" : "❌ Incorrect, let's learn why:"}
                          </span>
                          Pythagoras gives displacement = √(3² + 4²) = 5 km Northeast. Time taken = 30 mins = 0.5 hours. Velocity = 5 km / 0.5 h = 10 km/h Northeast.
                        </motion.div>
                      )}

                      {selectedMCQOption !== null && (
                        <div className="flex justify-end pt-1">
                          <button 
                            onClick={() => setSelectedMCQOption(null)}
                            className="text-[11px] text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 transition"
                          >
                            Retry Quiz
                            <RotateCcw size={10} />
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

              </div>

              {/* Player Video Control Bar - Absolutely Overlayed at Bottom */}
              <div className="absolute bottom-0 left-0 right-0 z-30 bg-black/95 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-3 border-t border-white/5 flex flex-col gap-1.5 sm:gap-2">
                
                {/* 1. Time Slider Timeline */}
                <div 
                  className="relative group w-full h-1.5 bg-white/20 rounded-full cursor-pointer transition-all hover:h-2"
                  onClick={handleTimelineClick}
                >
                  <div 
                    className="absolute top-0 left-0 h-full bg-cyan-400 rounded-full group-hover:bg-cyan-300 transition-colors" 
                    style={{ width: `${progressPercent}%` }}
                  />
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 h-3.5 w-3.5 bg-cyan-300 rounded-full border-2 border-white shadow-[0_0_10px_#22d3ee] scale-0 group-hover:scale-100 transition-all cursor-grab" 
                    style={{ left: `calc(${progressPercent}% - 7px)` }}
                  />
                </div>

                {/* 2. Interactive Buttons Row */}
                <div className="flex items-center justify-between w-full gap-2 sm:gap-4 text-slate-300 text-xs sm:text-sm flex-nowrap">
                  
                  {/* Left Side: Play, Pause, Replay, Time */}
                  <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="text-white hover:text-cyan-300 transition-colors p-1"
                      title={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <Pause size={16} fill="currentColor" className="sm:w-[18px] sm:h-[18px]" /> : <Play size={16} fill="currentColor" className="sm:w-[18px] sm:h-[18px]" />}
                    </button>
                    
                    <button 
                      onClick={handleReplay}
                      className="hover:text-cyan-300 transition-colors p-1"
                      title="Replay from start"
                    >
                      <RotateCcw size={14} className="sm:w-[16px] sm:h-[16px]" />
                    </button>

                    {/* Mute and volume slider - hidden on mobile */}
                    <div className="hidden sm:flex items-center gap-2 group/volume">
                      <button 
                        onClick={() => setIsMuted(!isMuted)}
                        className="hover:text-cyan-300 transition-colors"
                      >
                        {isMuted ? <VolumeX size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Volume2 size={16} className="sm:w-[18px] sm:h-[18px]" />}
                      </button>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={isMuted ? 0 : volume} 
                        onChange={(e) => {
                          setVolume(Number(e.target.value));
                          setIsMuted(false);
                        }}
                        className="w-0 group-hover/volume:w-16 h-1 bg-white/20 accent-cyan-400 appearance-none rounded-full transition-all duration-300 cursor-pointer"
                      />
                    </div>

                    <div className="font-mono text-[10px] sm:text-xs text-slate-400 select-none">
                      <span className="text-white">{formatTime(currentTime)}</span> / {formatTime(duration)}
                    </div>
                  </div>

                  {/* Center: Raise Hand Button */}
                  <div className="flex-1 flex justify-center max-w-[150px] sm:max-w-none">
                    <button 
                      onClick={handleToggleRaiseHand}
                      className={`relative flex items-center justify-center gap-1 sm:gap-2 rounded-full px-2.5 py-1.5 sm:px-5 sm:py-2 text-[10px] sm:text-xs font-bold transition-all w-full sm:w-auto shrink-0 ${
                        handRaised 
                          ? "bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:bg-red-400" 
                          : "bg-cyan-400 text-slate-900 shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:bg-cyan-300 hover:scale-105"
                      }`}
                    >
                      <span className="text-xs sm:text-sm">✋</span>
                      <span className="hidden xs:inline">{handRaised ? "Lower Hand" : "Raise Hand"}</span>
                      <span className="xs:hidden">{handRaised ? "Lower" : "Raise"}</span>
                    </button>
                  </div>

                  {/* Right Side: Fullscreen Toggle */}
                  <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                    <button 
                      onClick={() => {
                        if (!document.fullscreenElement) {
                          playerRef.current?.requestFullscreen().catch((err) => {
                            console.error("Error enabling HTML5 fullscreen", err);
                          });
                          setIsFullscreen(true);
                          setIsFocusMode(true);
                        } else {
                          document.exitFullscreen().catch((err) => {
                            console.error("Error exiting HTML5 fullscreen", err);
                          });
                          setIsFullscreen(false);
                        }
                      }}
                      className="hover:text-cyan-300 transition-colors p-1"
                      title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                    >
                      {isFullscreen ? <Minimize2 size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Maximize2 size={16} className="sm:w-[18px] sm:h-[18px]" />}
                    </button>
                  </div>

                </div>
              </div>

              <AnimatePresence>
                {isEditingScreenshot && (
                  <ScreenshotEditor 
                    onSend={(dataUrl) => {
                      setIsEditingScreenshot(false);
                      setPendingExplanation(true);
                      // Open Q&A panel so they can see the message
                      setIsMobilePanelOpen(true);
                      setActiveMobileTab('qna');
                      
                      setChatHistory(prev => [
                        ...prev,
                        { 
                          sender: 'student', 
                          text: doubtText || "I have a question about this part.", 
                          time: formatTime(currentTime), 
                          attachment: dataUrl 
                        }
                      ]);
                      setDoubtText("");
                      
                      setAiResponding(true);
                      setTimeout(() => {
                        setAiResponding(false);
                        setChatHistory(prev => [
                          ...prev,
                          { sender: 'ai', text: "I see your annotated screenshot! What exactly is confusing you here?", time: formatTime(currentTime) }
                        ]);
                      }, 2000);
                    }}
                    onCancel={() => setIsEditingScreenshot(false)}
                    backgroundContent={null}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Desktop-only Quick Action Chips Bar & Lesson Info underneath player */}
            <div className="hidden xl:block px-4 sm:px-0 space-y-6">
              
              {/* Quick Action Chips Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  <Sparkles size={14} className="text-cyan-400 animate-pulse" />
                  Quick Actions:
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { mode: 'video', label: 'Explain Again', icon: <RotateCcw size={12} /> },
                    { mode: 'example', label: 'Give Another Example', icon: <Lightbulb size={12} /> },
                    { mode: 'graph', label: 'Show Graph', icon: <ImageIcon size={12} /> },
                    { mode: 'practice', label: 'Practice Question', icon: <Presentation size={12} /> },
                  ].map((act) => (
                    <button
                      key={act.mode}
                      onClick={() => triggerQuickAction(act.mode as any)}
                      className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                        activeMode === act.mode 
                          ? 'border-cyan-400 bg-cyan-400/20 text-cyan-200' 
                          : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {act.icon}
                      {act.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lesson Info Box (YouTube Style) */}
              <div className="glass rounded-3xl p-6 space-y-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                    Kinematics: Velocity and Speed in 1D
                  </h1>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <span className="text-cyan-400 font-bold">{activeTopic.subject}</span>
                    <span className="h-1 w-1 bg-slate-600 rounded-full" />
                    <span>{activeTopic.chapter}</span>
                    <span className="h-1 w-1 bg-slate-600 rounded-full" />
                    <span>Topic: {activeTopic.title.substring(3)}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center font-bold text-cyan-300 shadow-glow">
                      DA
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Dr. Aura (AI Master Instructor)</h4>
                      <p className="text-xs text-slate-400">Physics & Kinematics Specialist</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex flex-col text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Lesson Progress</span>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden border border-white/5">
                          <div className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-full" style={{ width: '45%' }} />
                        </div>
                        <span className="text-xs font-bold text-white">45%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-black/35 rounded-2xl p-4 border border-white/5 text-xs text-slate-300 space-y-2 leading-relaxed">
                  <p>
                    <strong>Lesson Description:</strong> In this lecture segment, we explore the fundamental physics behind speed (scalar) and velocity (vector) in one dimension. You will learn the formulas, view interactive graphical plots of coordinate motion, and solve exam-aligned practice MCQ queries live with instantaneous feedback.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="bg-indigo-500/20 border border-indigo-500/20 px-2.5 py-0.5 rounded text-[10px] font-semibold text-indigo-300">NCTB Aligned</span>
                    <span className="bg-purple-500/20 border border-purple-500/20 px-2.5 py-0.5 rounded text-[10px] font-semibold text-purple-300">Interactive Video</span>
                    <span className="bg-cyan-500/20 border border-cyan-500/20 px-2.5 py-0.5 rounded text-[10px] font-semibold text-cyan-300">Aura AI Tutor</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Mobile-only Compact Lesson Info underneath player */}
            <div className="xl:hidden px-4 py-4 space-y-2">
              <span className="bg-cyan-500/20 border border-cyan-500/20 px-2 py-0.5 rounded text-[10px] font-semibold text-cyan-300">
                Physics &bull; Chapter 2
              </span>
              <h1 className="text-lg font-bold text-white leading-tight">
                Kinematics: Velocity and Speed in 1D
              </h1>
              <p className="text-xs text-slate-400 font-semibold">Teacher: Dr. Aura (AI Tutor)</p>
            </div>

          </div>

          {/* Resizer Handle (Desktop only) */}
          {isSidebarExpanded && (
            <div 
              onMouseDown={handleMouseDown}
              className="hidden xl:block w-1.5 self-stretch cursor-col-resize bg-white/5 hover:bg-cyan-400/50 active:bg-cyan-400 transition-all rounded-full select-none"
              title="Drag to resize sidebar width"
            />
          )}

          {/* Right Column: Playlist / Q&A / Up Next Sidebar - Desktop Only */}
          <div className="hidden xl:flex relative shrink-0" style={{ width: isSidebarExpanded ? sidebarWidth : 64 }}>
            <AnimatePresence initial={false}>
              {isSidebarExpanded ? (
                <motion.div
                  key="expanded-sidebar"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: sidebarWidth, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="space-y-6 overflow-hidden custom-scrollbar h-full"
                >
                  <div style={{ width: sidebarWidth }} className="flex flex-col gap-6 px-4 sm:px-0 pb-12 sm:pb-0 h-full">
                    
                    {/* Collapse Button */}
                    <div className="flex justify-end">
                      <button 
                        onClick={() => setIsSidebarExpanded(false)} 
                        className="flex items-center gap-2 p-2 px-3 bg-white/5 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-all text-xs font-bold"
                      >
                        Collapse Sidebar
                        <ChevronRight size={14} />
                      </button>
                    </div>

                    {/* Q&A Chat panel beside the video player */}
                    <div className="glass rounded-3xl border border-cyan-500/20 p-5 space-y-4 shadow-[0_8px_30px_rgba(6,182,212,0.15)] bg-slate-900/60 backdrop-blur-xl shrink-0">
                    
                    {/* Header */}
                    <div className="flex justify-between items-center border-b border-white/5 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="p-1 rounded-lg bg-cyan-400/20 text-cyan-300">
                          <BrainCircuit size={16} />
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-white">Interactive Q&A Session</h4>
                          <p className="text-[10px] text-cyan-300">Speaking with Dr. Aura (AI)</p>
                        </div>
                      </div>
                      <span className="text-[10px] bg-cyan-400/10 border border-cyan-400/20 px-2 py-0.5 rounded text-cyan-300 font-semibold animate-pulse">
                        Active Discussion
                      </span>
                    </div>

                    {/* Chat Area */}
                    <div ref={desktopChatContainerRef} className="h-60 overflow-y-auto pr-2 space-y-4 custom-scrollbar text-xs">
                      {chatHistory.map((chat, idx) => (
                        <div key={idx} className={`flex gap-3 ${chat.sender === 'student' ? 'flex-row-reverse' : ''}`}>
                          <div className={`h-8 w-8 shrink-0 rounded-full flex items-center justify-center font-bold border ${
                            chat.sender === 'student'
                              ? 'bg-slate-700/50 border-slate-600 text-slate-300'
                              : 'bg-cyan-500 border-cyan-400 text-slate-900 shadow-[0_0_10px_rgba(34,211,238,0.2)]'
                          }`}>
                            {chat.sender === 'student' ? 'U' : 'DA'}
                          </div>

                          <div className={`max-w-[75%] p-3.5 rounded-2xl ${
                            chat.sender === 'student'
                              ? 'bg-white/10 text-white rounded-tr-none border border-white/5'
                              : 'bg-cyan-950/40 border border-cyan-500/20 text-cyan-100 rounded-tl-none'
                          }`}>
                            {chat.attachment && (
                              <div className="mb-2 rounded-lg overflow-hidden border border-white/10 shadow-sm relative w-full bg-black/40 aspect-video">
                                <img src={chat.attachment} alt="Annotated screenshot" className="w-full h-full object-contain" />
                              </div>
                            )}
                            <p className="leading-relaxed font-sans">{chat.text}</p>
                            <span className="text-[9px] text-slate-400 block mt-1 text-right">{chat.time}</span>
                          </div>
                        </div>
                      ))}

                      {aiResponding && (
                        <div className="flex gap-3">
                          <div className="h-8 w-8 shrink-0 rounded-full bg-cyan-500 border border-cyan-400 text-slate-900 flex items-center justify-center font-bold animate-pulse">
                            DA
                          </div>
                          <div className="bg-cyan-950/20 border border-cyan-500/10 p-3.5 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Waveform */}
                    {isRecordingVoice && (
                      <div className="flex flex-col items-center justify-center p-4 border border-red-500/20 rounded-xl bg-red-500/5 animate-pulse text-xs text-red-200">
                        <div className="flex items-center gap-1 mb-2">
                          <span className="h-3 w-0.5 bg-red-400 animate-grow-tall-1" style={{ animation: 'bounce 0.6s infinite 0s' }} />
                          <span className="h-5 w-0.5 bg-red-400 animate-grow-tall-2" style={{ animation: 'bounce 0.6s infinite 0.15s' }} />
                          <span className="h-8 w-0.5 bg-red-400 animate-grow-tall-3" style={{ animation: 'bounce 0.6s infinite 0.3s' }} />
                          <span className="h-5 w-0.5 bg-red-400 animate-grow-tall-2" style={{ animation: 'bounce 0.6s infinite 0.45s' }} />
                          <span className="h-3 w-0.5 bg-red-400 animate-grow-tall-1" style={{ animation: 'bounce 0.6s infinite 0.6s' }} />
                        </div>
                        <span>🎤 AI Listening... Speak now (0:0{voiceTimer})</span>
                        <button onClick={() => setIsRecordingVoice(false)} className="mt-2 text-[10px] text-red-400 font-semibold hover:underline">Cancel</button>
                      </div>
                    )}

                    {/* Inputs Footer */}
                    <div className="flex gap-2 items-end">
                      <div className="relative flex-1">
                        <textarea
                          placeholder="Ask a doubt about this lesson step..."
                          value={doubtText}
                          onChange={(e) => setDoubtText(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitTextDoubt(); } }}
                          className="w-full text-xs resize-none rounded-2xl border border-white/10 bg-black/40 p-3.5 pr-20 text-white placeholder-slate-500 outline-none transition focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/20"
                          rows={2}
                        />
                        <div className="absolute bottom-2 right-2 flex items-center gap-1">
                          <button 
                            onClick={() => setIsEditingScreenshot(true)}
                            className="rounded-xl p-2 transition text-slate-400 hover:text-white"
                            title="Capture Board"
                          >
                            <Camera size={14} />
                          </button>
                          <button 
                            onClick={handleVoiceClick}
                            className={`rounded-xl p-2 transition ${isRecordingVoice ? 'bg-red-500 text-white animate-pulse' : 'bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20'}`}
                          >
                            <Mic size={14} />
                          </button>
                        </div>
                      </div>

                      <button onClick={submitTextDoubt} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-900 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-cyan-400/20">
                        <Send size={16} />
                      </button>
                    </div>

                  </div>
            
            {/* Playlist: Related Lesson Topics */}
            <div className="glass rounded-3xl p-5 border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded bg-cyan-400/20 text-cyan-300"><BookOpen size={14} /></span>
                  <h3 className="text-sm font-bold text-white">Chapter playlist</h3>
                </div>
                <span className="text-[10px] text-slate-400 font-bold font-mono">
                  {selectedTopicIdx + 1}/{TOPICS.length}
                </span>
              </div>

              <div className="space-y-2.5">
                {TOPICS.map((topic, index) => {
                  const isActive = index === selectedTopicIdx;
                  const isCompleted = index < selectedTopicIdx;
                  const isLocked = index > selectedTopicIdx + 1;

                  let borderStyle = "border-white/5 bg-white/5 hover:bg-white/10";
                  let titleColor = "text-slate-300";

                  if (isActive) {
                    borderStyle = "border-cyan-400/50 bg-cyan-400/10 shadow-[0_0_15px_rgba(34,211,238,0.1)]";
                    titleColor = "text-cyan-300 font-bold";
                  } else if (isCompleted) {
                    titleColor = "text-slate-400 line-through decoration-slate-600";
                  }

                  return (
                    <button
                      key={topic.id}
                      onClick={() => { if (!isLocked) setSelectedTopicIdx(index); }}
                      disabled={isLocked}
                      className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 text-xs ${borderStyle} ${isLocked ? 'opacity-40 cursor-not-allowed' : ''}`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {isCompleted && <span className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0"><Check size={10} /></span>}
                        {isActive && <span className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shrink-0 animate-pulse"><Play size={10} fill="currentColor" /></span>}
                        {!isCompleted && !isActive && !isLocked && <span className="w-5 h-5 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-slate-400 shrink-0">{topic.id}</span>}
                        {isLocked && <span className="w-5 h-5 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-slate-600 shrink-0"><Lock size={10} /></span>}
                        <span className={`truncate ${titleColor}`}>{topic.title}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 shrink-0 font-mono">{topic.duration}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Q&A / Doubts History list */}
            <div className="glass rounded-3xl p-5 border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded bg-purple-500/20 text-purple-300"><MessageCircle size={14} /></span>
                  <h3 className="text-sm font-bold text-white">Class Q&A Logs</h3>
                </div>
                <span className="text-[10px] text-slate-400 font-bold bg-white/10 px-2 py-0.5 rounded">2 Resolved</span>
              </div>

              <div className="space-y-3">
                <div className="border border-white/5 bg-black/20 p-3 rounded-xl space-y-2 text-xs">
                  <div className="flex justify-between items-center text-[10px] text-slate-400">
                    <span className="font-bold text-cyan-400">Student Question</span>
                    <span>Topic 2</span>
                  </div>
                  <p className="text-slate-200 italic font-medium">&ldquo;Why can distance only be positive?&rdquo;</p>
                  <p className="text-[11px] text-slate-400 pt-1 border-t border-white/5 leading-relaxed">
                    <strong>Dr. Aura:</strong> Distance is scalar path length, which only accumulates. Displacement is final minus initial position vectors, which cancel directions.
                  </p>
                </div>

                <div className="border border-white/5 bg-black/20 p-3 rounded-xl space-y-2 text-xs">
                  <div className="flex justify-between items-center text-[10px] text-slate-400">
                    <span className="font-bold text-cyan-400">Student Question</span>
                    <span>Topic 3</span>
                  </div>
                  <p className="text-slate-200 italic font-medium">&ldquo;Does constant speed mean constant velocity?&rdquo;</p>
                  <p className="text-[11px] text-slate-400 pt-1 border-t border-white/5 leading-relaxed">
                    <strong>Dr. Aura:</strong> No! Moving in a circle at constant speed constantly shifts velocity because the direction of the vector is continuously rotating.
                  </p>
                </div>
              </div>
            </div>

            {/* Up Next / Quick Practice card */}
            <div className="relative rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-indigo-950/40 to-[#0e1628]/80 p-5 overflow-hidden shadow-violet">
              <div className="absolute inset-0 opacity-10 pointer-events-none soft-grid" />
              <div className="flex items-center gap-2 mb-3">
                <span className="flex items-center justify-center rounded-lg bg-indigo-500/20 p-1.5 text-indigo-400"><BrainCircuit size={14} /></span>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Up Next Challenge</h4>
              </div>
              <p className="text-xs text-slate-300 mt-2 bg-black/30 p-3.5 rounded-xl border border-white/5 leading-relaxed">
                Take the kinematic practice challenge: 5 core question sets curated to solidify speed, velocity, and distance understanding.
              </p>
              <div className="mt-4 flex gap-2">
                    <button onClick={() => triggerQuickAction('practice')} className="flex-1 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-900 py-2.5 text-xs font-bold transition-all shadow-md shadow-cyan-400/20 hover:scale-[1.02]">Start Quiz</button>
                    <button onClick={() => triggerQuickAction('example')} className="flex-1 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white py-2.5 text-xs font-bold transition-all">See Example</button>
                  </div>
                </div>

              </div>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed-sidebar"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="w-16 flex flex-col items-center gap-4 pt-2"
            >
              <button onClick={() => setIsSidebarExpanded(true)} className="p-3 bg-cyan-500/10 text-cyan-400 rounded-2xl hover:bg-cyan-500/20 transition-all shadow-[0_0_15px_rgba(34,211,238,0.1)] hover:scale-105" title="Expand Sidebar">
                <MessageCircle size={20} />
              </button>
              <button onClick={() => setIsSidebarExpanded(true)} className="p-3 bg-white/5 text-slate-300 rounded-2xl hover:bg-white/10 transition-all hover:scale-105" title="View Playlist">
                <BookOpen size={20} />
              </button>
              <button onClick={() => setIsSidebarExpanded(true)} className="p-3 bg-white/5 text-slate-300 rounded-2xl hover:bg-white/10 transition-all hover:scale-105" title="Practice Challenges">
                <Presentation size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>

      </div>

      {/* MOBILE FLOATING ACTION BUTTON (FAB) */}
      <div className="xl:hidden fixed bottom-28 right-6 z-40">
        <button 
          onClick={() => {
            setIsMobilePanelOpen(true);
            if (!handRaised) setActiveMobileTab('playlist');
          }}
          className="flex items-center gap-2 rounded-full bg-cyan-400 hover:bg-cyan-350 text-slate-900 px-5 py-3 shadow-[0_0_20px_rgba(34,211,238,0.5)] font-extrabold text-sm active:scale-95 hover:scale-105 transition-all"
        >
          <BookOpen size={16} />
          Class Options
        </button>
      </div>

      {/* MOBILE BOTTOM DRAWER */}
      <AnimatePresence>
        {isMobilePanelOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobilePanelOpen(false)}
              className="xl:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
            />

            {/* Bottom Drawer container */}
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 24, stiffness: 180 }}
              className="xl:hidden fixed inset-x-0 bottom-0 z-50 rounded-t-3xl bg-[#0c1122] border-t border-cyan-500/20 p-5 shadow-[0_-10px_35px_rgba(0,0,0,0.8)] max-h-[80vh] flex flex-col justify-start overflow-hidden pb-12"
            >
              {/* Header */}
              <div className="flex justify-between items-center border-b border-white/10 pb-3 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-lg bg-cyan-400/20 text-cyan-300"><Layers size={16} /></span>
                  <h3 className="text-sm font-bold text-white">Lesson Dashboard</h3>
                </div>
                <button 
                  onClick={() => setIsMobilePanelOpen(false)}
                  className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Tabs list inside Drawer */}
              <div className="flex gap-1 border-b border-white/5 overflow-x-auto py-2.5 text-xs font-semibold shrink-0 no-scrollbar">
                {[
                  { id: 'playlist', label: 'Playlist' },
                  { id: 'qna', label: 'Ask & Q&A' },
                  { id: 'actions', label: 'Quick Actions' },
                  { id: 'practice', label: 'Practice' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveMobileTab(tab.id as any)}
                    className={`px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap ${
                      activeMobileTab === tab.id
                        ? 'bg-cyan-400 text-slate-900 font-extrabold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content Display Area */}
              <div className="flex-1 overflow-y-auto py-4 min-h-0 text-xs">
                
                {/* Tab 1: Playlist */}
                {activeMobileTab === 'playlist' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-slate-400 pb-1">
                      <span>Chapter playlist</span>
                      <span className="font-mono">{selectedTopicIdx + 1}/{TOPICS.length}</span>
                    </div>

                    <div className="space-y-2">
                      {TOPICS.map((topic, index) => {
                        const isActive = index === selectedTopicIdx;
                        const isCompleted = index < selectedTopicIdx;
                        const isLocked = index > selectedTopicIdx + 1;

                        let borderStyle = "border-white/5 bg-white/5";
                        let titleColor = "text-slate-300";

                        if (isActive) {
                          borderStyle = "border-cyan-400/50 bg-cyan-400/10";
                          titleColor = "text-cyan-300 font-bold";
                        } else if (isCompleted) {
                          titleColor = "text-slate-400 line-through decoration-slate-600";
                        }

                        return (
                          <button
                            key={topic.id}
                            onClick={() => { if (!isLocked) { setSelectedTopicIdx(index); setIsMobilePanelOpen(false); } }}
                            disabled={isLocked}
                            className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-3 text-xs ${borderStyle} ${isLocked ? 'opacity-40' : ''}`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              {isCompleted && <span className="w-4.5 h-4.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0"><Check size={8} /></span>}
                              {isActive && <span className="w-4.5 h-4.5 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shrink-0 animate-pulse"><Play size={8} fill="currentColor" /></span>}
                              {!isCompleted && !isActive && !isLocked && <span className="w-4.5 h-4.5 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-slate-400 shrink-0 text-[9px]">{topic.id}</span>}
                              {isLocked && <span className="w-4.5 h-4.5 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-slate-650 shrink-0"><Lock size={8} /></span>}
                              <span className={`truncate ${titleColor}`}>{topic.title}</span>
                            </div>
                            <span className="text-[9px] text-slate-500 font-mono">{topic.duration}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Tab 2: Q&A Chat Logs */}
                {activeMobileTab === 'qna' && (
                  <div className="space-y-4 flex flex-col h-full justify-between">
                    {/* Message Bubble History */}
                    <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-1">
                      {chatHistory.map((chat, idx) => (
                        <div key={idx} className={`flex gap-2.5 ${chat.sender === 'student' ? 'flex-row-reverse' : ''}`}>
                          <div className={`h-7 w-7 shrink-0 rounded-full flex items-center justify-center text-[10px] font-bold border ${
                            chat.sender === 'student' ? 'bg-slate-700/50 border-slate-600 text-slate-300' : 'bg-cyan-500 border-cyan-400 text-slate-900'
                          }`}>
                            {chat.sender === 'student' ? 'U' : 'DA'}
                          </div>
                          <div className={`max-w-[80%] p-3 rounded-xl text-xs ${
                            chat.sender === 'student' ? 'bg-white/10 text-white rounded-tr-none border border-white/5' : 'bg-cyan-950/40 border border-cyan-500/20 text-cyan-100 rounded-tl-none'
                          }`}>
                            {chat.attachment && (
                              <div className="mb-2 rounded-lg overflow-hidden border border-white/10 shadow-sm relative w-full bg-black/40 aspect-video">
                                <img src={chat.attachment} alt="Annotated screenshot" className="w-full h-full object-contain" />
                              </div>
                            )}
                            <p className="leading-relaxed">{chat.text}</p>
                            <span className="text-[8px] text-slate-400 block mt-1 text-right">{chat.time}</span>
                          </div>
                        </div>
                      ))}

                      {aiResponding && (
                        <div className="flex gap-2.5">
                          <div className="h-7 w-7 rounded-full bg-cyan-500 border border-cyan-400 text-slate-900 flex items-center justify-center text-[10px] font-bold animate-pulse">DA</div>
                          <div className="bg-cyan-950/20 border border-cyan-500/10 p-3 rounded-xl rounded-tl-none flex items-center gap-1">
                            <span className="h-1.2 w-1.2 rounded-full bg-cyan-400 animate-bounce" />
                            <span className="h-1.2 w-1.2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="h-1.2 w-1.2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Voice Waveform animation if recording */}
                    {isRecordingVoice && (
                      <div className="flex flex-col items-center justify-center p-3 border border-red-500/20 rounded-xl bg-red-500/5 text-xs text-red-200">
                        <div className="flex items-center gap-1 mb-1">
                          <span className="h-2 w-0.5 bg-red-400 animate-pulse" />
                          <span className="h-4 w-0.5 bg-red-400 animate-pulse" />
                          <span className="h-2 w-0.5 bg-red-400 animate-pulse" />
                        </div>
                        <span>🎤 AI Listening... (0:0{voiceTimer})</span>
                      </div>
                    )}

                    {/* Inputs */}
                    <div className="flex gap-2 items-end mt-2">
                      <div className="relative flex-1">
                        <textarea
                          placeholder="Type your doubt here..."
                          value={doubtText}
                          onChange={(e) => setDoubtText(e.target.value)}
                          className="w-full text-xs resize-none rounded-xl border border-white/10 bg-black/40 p-2.5 pr-16 text-white outline-none"
                          rows={2}
                        />
                        <div className="absolute bottom-2 right-2 flex items-center gap-0.5">
                          <button 
                            onClick={() => setIsEditingScreenshot(true)}
                            className="rounded-lg p-1.5 transition text-slate-400 hover:text-white"
                          >
                            <Camera size={12} />
                          </button>
                          <button 
                            onClick={handleVoiceClick}
                            className={`rounded-lg p-1.5 ${isRecordingVoice ? 'bg-red-500 text-white animate-pulse' : 'text-cyan-300'}`}
                          >
                            <Mic size={12} />
                          </button>
                        </div>
                      </div>
                      <button onClick={submitTextDoubt} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400 text-slate-900">
                        <Send size={14} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Tab 3: Quick Actions */}
                {activeMobileTab === 'actions' && (
                  <div className="space-y-4">
                    <div className="text-slate-400 pb-1">Jump to board mode:</div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { mode: 'video', label: 'Explain Board Again', icon: <RotateCcw size={12} /> },
                        { mode: 'example', label: 'Show Worked Example', icon: <Lightbulb size={12} /> },
                        { mode: 'graph', label: 'Show Coordinate Graph', icon: <ImageIcon size={12} /> },
                        { mode: 'practice', label: 'Solve Quiz Question', icon: <Presentation size={12} /> },
                      ].map((act) => (
                        <button
                          key={act.mode}
                          onClick={() => { triggerQuickAction(act.mode as any); setIsMobilePanelOpen(false); }}
                          className={`flex items-center gap-1.5 rounded-xl border p-3 text-xs font-semibold transition ${
                            activeMode === act.mode ? 'border-cyan-400 bg-cyan-400/10 text-cyan-300' : 'border-white/10 bg-white/5 text-slate-300'
                          }`}
                        >
                          {act.icon}
                          {act.label}
                        </button>
                      ))}
                    </div>

                    <div className="border-t border-white/10 pt-4 mt-2 space-y-3">
                      <div className="text-slate-400 pb-1">Lesson options:</div>
                      
                      {/* Focus Mode button */}
                      <button
                        onClick={() => { setIsFocusMode(!isFocusMode); setIsMobilePanelOpen(false); }}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border transition-colors ${
                          isFocusMode ? 'border-amber-400 bg-amber-400/10 text-amber-300' : 'border-white/10 bg-white/5 text-slate-300'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full ${isFocusMode ? 'bg-amber-400' : 'bg-slate-500'}`} />
                          Focus Mode
                        </span>
                        <span className="text-[10px] uppercase font-bold">{isFocusMode ? 'ON' : 'OFF'}</span>
                      </button>

                      {/* Settings Buttons */}
                      <div className="flex gap-2">
                        <button className="flex-1 flex items-center justify-center gap-1.5 p-3 rounded-xl border border-white/10 bg-white/5 text-slate-300">
                          <Settings size={12} />
                          Change Teacher
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-1.5 p-3 rounded-xl border border-white/10 bg-white/5 text-slate-300">
                          <CheckCircle2 size={12} />
                          Lesson Notes
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 4: Practice Quiz */}
                {activeMobileTab === 'practice' && (
                  <div className="space-y-4">
                    <div className="relative rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-indigo-950/20 to-[#0e1628]/60 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="p-1 rounded bg-indigo-500/20 text-indigo-400"><BrainCircuit size={12} /></span>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Practice Challenge</h4>
                      </div>
                      <p className="text-xs text-slate-350 bg-black/20 p-3 rounded-xl border border-white/5 leading-relaxed">
                        Take the kinematic practice challenge: 5 core question sets curated to solidify speed, velocity, and distance understanding.
                      </p>
                      <button 
                        onClick={() => { triggerQuickAction('practice'); setIsMobilePanelOpen(false); }}
                        className="w-full mt-3 rounded-xl bg-cyan-400 text-slate-900 py-2 text-xs font-bold shadow-md shadow-cyan-400/20"
                      >
                        Start Live Practice
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}