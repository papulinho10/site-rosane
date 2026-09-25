import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SmoothHorizontalScrollerProps {
  children: React.ReactNode;
  speed?: number; // pixels per frame, e.g. 1.3
  className?: string;
  showControls?: boolean;
  isPaused?: boolean;
  onTogglePause?: () => void;
  showPlayPauseButton?: boolean;
  pauseOnClick?: boolean;
  pauseDurationMs?: number; // default 4000ms (4 seconds)
}

export const SmoothHorizontalScroller: React.FC<SmoothHorizontalScrollerProps> = ({
  children,
  speed = 1.3,
  className = '',
  showControls = true,
  isPaused = false,
  pauseOnClick = true,
  pauseDurationMs = 4000,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const group1Ref = useRef<HTMLDivElement>(null);
  const group2Ref = useRef<HTMLDivElement>(null);
  const groupWidthRef = useRef<number>(0);

  // Drag & Inertia state refs
  const isPointerDownRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const isInertiaRef = useRef(false);
  const inertiaFrameRef = useRef<number | null>(null);
  const autoScrollFrameRef = useRef<number | null>(null);
  const pauseTimerRef = useRef<number | null>(null);
  const progressTimerRef = useRef<number | null>(null);

  const [temporaryPause, setTemporaryPause] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isProgressActive, setIsProgressActive] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Effective paused state
  const effectivelyPaused = isPaused || temporaryPause;

  // Measure single group width (including the flex gap)
  const measureGroupWidth = useCallback(() => {
    if (group1Ref.current && group2Ref.current) {
      const w = group2Ref.current.offsetLeft - group1Ref.current.offsetLeft;
      if (w > 0) {
        groupWidthRef.current = w;
        // Position initially in Group 2 so user can scroll left or right infinitely from the start
        if (scrollRef.current && scrollRef.current.scrollLeft < 10) {
          scrollRef.current.scrollLeft = w;
        }
      }
    }
  }, []);

  // Update progress bar percentage (0 to 100% of single cycle)
  const updateProgress = useCallback(() => {
    const el = scrollRef.current;
    const w = groupWidthRef.current;
    if (!el || w <= 0) return;

    const currentInLoop = ((el.scrollLeft - w) % w + w) % w;
    const pct = Math.max(0, Math.min(1, currentInLoop / w));
    setScrollProgress(pct);
  }, []);

  // True seamless infinite wrapping:
  // Group 1, Group 2, Group 3 are rendered identically.
  // When scroll reaches Group 3, we subtract 1 group width (seamlessly returning to Group 2).
  // When scroll falls below Group 2, we add 1 group width.
  const wrapScroll = useCallback((el: HTMLDivElement) => {
    const w = groupWidthRef.current;
    if (w <= 0) return;

    if (el.scrollLeft >= 2 * w) {
      el.scrollLeft -= w;
    } else if (el.scrollLeft < w) {
      el.scrollLeft += w;
    }
  }, []);

  // Initialize and measure on mount & window resize
  useEffect(() => {
    // Initial measurement
    const timer = setTimeout(() => {
      measureGroupWidth();
      updateProgress();
    }, 100);

    const handleResize = () => {
      measureGroupWidth();
      updateProgress();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [measureGroupWidth, updateProgress]);

  // Clean continuous auto-scroll loop
  useEffect(() => {
    const autoScroll = () => {
      const el = scrollRef.current;
      if (el && !isPointerDownRef.current && !effectivelyPaused && !isInertiaRef.current) {
        el.scrollLeft += speed;
        wrapScroll(el);
        updateProgress();
      }
      autoScrollFrameRef.current = requestAnimationFrame(autoScroll);
    };

    autoScrollFrameRef.current = requestAnimationFrame(autoScroll);
    return () => {
      if (autoScrollFrameRef.current) cancelAnimationFrame(autoScrollFrameRef.current);
    };
  }, [speed, effectivelyPaused, wrapScroll, updateProgress]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
      if (progressTimerRef.current) clearTimeout(progressTimerRef.current);
      if (inertiaFrameRef.current) cancelAnimationFrame(inertiaFrameRef.current);
    };
  }, []);

  // Trigger temporary pause
  const triggerPause = useCallback((durationMs: number) => {
    setTemporaryPause(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);

    pauseTimerRef.current = window.setTimeout(() => {
      setTemporaryPause(false);
    }, durationMs);
  }, []);

  // Hide progress bar after user finishes manual interaction
  const scheduleHideProgressBar = useCallback(() => {
    if (progressTimerRef.current) clearTimeout(progressTimerRef.current);
    progressTimerRef.current = window.setTimeout(() => {
      setIsProgressActive(false);
    }, 2200);
  }, []);

  // Global Mouse Move and Mouse Up handlers so dragging doesn't stutter if pointer leaves bounds
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isPointerDownRef.current) return;
      const el = scrollRef.current;
      if (!el) return;

      const deltaX = e.pageX - startXRef.current;
      if (Math.abs(deltaX) > 6) {
        hasDraggedRef.current = true;
      }

      const now = performance.now();
      const dt = now - lastTimeRef.current;
      if (dt > 12) {
        velocityRef.current = (lastXRef.current - e.pageX) / dt;
        lastXRef.current = e.pageX;
        lastTimeRef.current = now;
      }

      // 1:1 Instant scroll position change (smooth and lag-free)
      el.scrollLeft = startScrollLeftRef.current - deltaX;
      wrapScroll(el);
      updateProgress();
    };

    const handleGlobalMouseUp = () => {
      if (!isPointerDownRef.current) return;
      isPointerDownRef.current = false;
      setIsDragging(false);

      const el = scrollRef.current;
      if (!el) return;

      if (hasDraggedRef.current) {
        triggerPause(2500);

        // Momentum / Inertia Glide
        let vel = velocityRef.current;
        if (Math.abs(vel) > 2.8) vel = Math.sign(vel) * 2.8;

        if (Math.abs(vel) > 0.18) {
          isInertiaRef.current = true;

          const runInertia = () => {
            if (!isInertiaRef.current || !scrollRef.current) return;

            scrollRef.current.scrollLeft += vel * 16;
            wrapScroll(scrollRef.current);
            updateProgress();

            vel *= 0.93; // smooth deceleration

            if (Math.abs(vel) > 0.04) {
              inertiaFrameRef.current = requestAnimationFrame(runInertia);
            } else {
              isInertiaRef.current = false;
              scheduleHideProgressBar();
            }
          };

          inertiaFrameRef.current = requestAnimationFrame(runInertia);
        } else {
          scheduleHideProgressBar();
        }

        setTimeout(() => {
          hasDraggedRef.current = false;
        }, 120);
      } else {
        scheduleHideProgressBar();
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [wrapScroll, updateProgress, triggerPause, scheduleHideProgressBar]);

  // Pointer Down (Mouse & Touch)
  const handlePointerDown = (pageX: number) => {
    const el = scrollRef.current;
    if (!el) return;

    if (inertiaFrameRef.current) {
      cancelAnimationFrame(inertiaFrameRef.current);
      isInertiaRef.current = false;
    }

    measureGroupWidth();
    isPointerDownRef.current = true;
    hasDraggedRef.current = false;
    setIsDragging(true);
    setIsProgressActive(true);

    if (progressTimerRef.current) clearTimeout(progressTimerRef.current);

    startXRef.current = pageX;
    lastXRef.current = pageX;
    lastTimeRef.current = performance.now();
    startScrollLeftRef.current = el.scrollLeft;
    velocityRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isPointerDownRef.current || e.touches.length === 0) return;
    const pageX = e.touches[0].pageX;
    const el = scrollRef.current;
    if (!el) return;

    const deltaX = pageX - startXRef.current;
    if (Math.abs(deltaX) > 6) {
      hasDraggedRef.current = true;
    }

    const now = performance.now();
    const dt = now - lastTimeRef.current;
    if (dt > 12) {
      velocityRef.current = (lastXRef.current - pageX) / dt;
      lastXRef.current = pageX;
      lastTimeRef.current = now;
    }

    el.scrollLeft = startScrollLeftRef.current - deltaX;
    wrapScroll(el);
    updateProgress();
  };

  const handleTouchEnd = () => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    setIsDragging(false);

    const el = scrollRef.current;
    if (!el) return;

    if (hasDraggedRef.current) {
      triggerPause(2500);

      let vel = velocityRef.current;
      if (Math.abs(vel) > 2.8) vel = Math.sign(vel) * 2.8;

      if (Math.abs(vel) > 0.18) {
        isInertiaRef.current = true;

        const runInertia = () => {
          if (!isInertiaRef.current || !scrollRef.current) return;

          scrollRef.current.scrollLeft += vel * 16;
          wrapScroll(scrollRef.current);
          updateProgress();

          vel *= 0.93;

          if (Math.abs(vel) > 0.04) {
            inertiaFrameRef.current = requestAnimationFrame(runInertia);
          } else {
            isInertiaRef.current = false;
            scheduleHideProgressBar();
          }
        };

        inertiaFrameRef.current = requestAnimationFrame(runInertia);
      } else {
        scheduleHideProgressBar();
      }

      setTimeout(() => {
        hasDraggedRef.current = false;
      }, 120);
    } else {
      scheduleHideProgressBar();
    }
  };

  // Capture Click on cards inside scroller
  const handleClickCapture = (e: React.MouseEvent) => {
    // If user was actively dragging/swiping, suppress the click so details modal does not pop up
    if (hasDraggedRef.current) {
      e.stopPropagation();
      e.preventDefault();
      hasDraggedRef.current = false;
      return;
    }

    // Direct tap/click on product: trigger 4-second pause
    if (pauseOnClick) {
      triggerPause(pauseDurationMs);
    }
  };

  // Manual Arrow Navigation
  const handleStepScroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.75;

    setIsProgressActive(true);
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });

    triggerPause(3000);

    setTimeout(() => {
      if (scrollRef.current) {
        wrapScroll(scrollRef.current);
        updateProgress();
      }
    }, 400);

    scheduleHideProgressBar();
  };

  return (
    <div className={`relative group ${className}`}>
      {/* Left Navigation Arrow */}
      {showControls && (
        <button
          type="button"
          onClick={() => handleStepScroll('left')}
          className="absolute -left-2 sm:left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1b0309]/95 hover:bg-[#340714] text-rose-200 hover:text-white border border-rose-700/60 shadow-xl backdrop-blur-md flex items-center justify-center transition-all duration-300 active:scale-95 hover:border-rose-400"
          aria-label="Rolar para esquerda"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      {/* Right Navigation Arrow */}
      {showControls && (
        <button
          type="button"
          onClick={() => handleStepScroll('right')}
          className="absolute -right-2 sm:right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1b0309]/95 hover:bg-[#340714] text-rose-200 hover:text-white border border-rose-700/60 shadow-xl backdrop-blur-md flex items-center justify-center transition-all duration-300 active:scale-95 hover:border-rose-400"
          aria-label="Rolar para direita"
        >
          <ChevronRight size={20} />
        </button>
      )}

      {/* 
        Scrollable Track:
        - 3 Identical groups for true mathematical seamless infinite looping.
        - When the last product finishes, the very first product is right next to it with identical gap.
        - Fluid, uninhibited manual dragging with momentum glide.
      */}
      <div
        ref={scrollRef}
        onClickCapture={handleClickCapture}
        onMouseDown={(e) => handlePointerDown(e.pageX)}
        onTouchStart={(e) => {
          if (e.touches.length > 0) {
            handlePointerDown(e.touches[0].pageX);
          }
        }}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        className="flex gap-4 sm:gap-6 overflow-x-auto overflow-y-hidden py-4 px-2 sm:px-4 cursor-grab active:cursor-grabbing select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {/* Set A */}
        <div ref={group1Ref} className="flex gap-4 sm:gap-6 shrink-0">
          {children}
        </div>

        {/* Set B (Initial focus) */}
        <div ref={group2Ref} className="flex gap-4 sm:gap-6 shrink-0">
          {children}
        </div>

        {/* Set C (Continuous seamless overflow) */}
        <div className="flex gap-4 sm:gap-6 shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>

      {/* 
        Infinite Seamless Scrollbar:
        Only the clean line, no text or percentages, with a continuous looping indicator 
        that wraps perpetually without ever hitting an end.
      */}
      <div 
        className={`transition-all duration-300 mt-2 sm:mt-3 flex flex-col items-center max-w-xs mx-auto px-4 ${
          isDragging || isProgressActive 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-1 pointer-events-none'
        }`}
      >
        <div className="w-40 sm:w-52 h-1 sm:h-1.5 rounded-full bg-[#20040c]/90 border border-rose-900/60 overflow-hidden relative shadow-inner">
          {/* Infinite looping thumb segments */}
          <div 
            className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-rose-500 via-rose-400 to-amber-300 shadow-[0_0_10px_rgba(244,63,94,0.7)]"
            style={{
              width: '28%',
              left: `${((scrollProgress % 1 + 1) % 1) * 100}%`,
            }}
          />
          <div 
            className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-rose-500 via-rose-400 to-amber-300 shadow-[0_0_10px_rgba(244,63,94,0.7)]"
            style={{
              width: '28%',
              left: `${((scrollProgress % 1 + 1) % 1) * 100 - 100}%`,
            }}
          />
          <div 
            className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-rose-500 via-rose-400 to-amber-300 shadow-[0_0_10px_rgba(244,63,94,0.7)]"
            style={{
              width: '28%',
              left: `${((scrollProgress % 1 + 1) % 1) * 100 + 100}%`,
            }}
          />
        </div>
      </div>

    </div>
  );
};
