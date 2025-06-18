import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Square, Settings, Zap, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Task } from '@/types';

interface FocusModeProps {
  isActive: boolean;
  onClose: () => void;
  selectedTask?: Task;
  onSessionComplete: (duration: number, xpEarned: number) => void;
}

const FocusMode: React.FC<FocusModeProps> = ({
  isActive,
  onClose,
  selectedTask,
  onSessionComplete
}) => {
  const [duration, setDuration] = useState(25); // Default 25 minutes
  const [timeLeft, setTimeLeft] = useState(25 * 60); // In seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isSetup, setIsSetup] = useState(true);
  const [sessionStarted, setSessionStarted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isActive) {
      setTimeLeft(duration * 60);
      setIsSetup(true);
      setIsRunning(false);
      setSessionStarted(false);
    }
  }, [isActive, duration]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const handleSessionComplete = () => {
    setIsRunning(false);
    const xpEarned = 75 + (duration > 25 ? 25 : 0); // Bonus for longer sessions
    onSessionComplete(duration, xpEarned);

    // Play completion sound (optional)
    try {
      audioRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+byvmASBECC0fLAcisGNH/M7t+KPQgMU6zj7a1YFAhBk+DuumAQBDB+w+/YhzwGCk6o5OmsXBwKWajh8bhlHgU2jN/uv2oOBj6Hz+z4jz8GCkus4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jNzuwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1xGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+inWRkJWK7h8bliHgU3jN/uwGsOBj6Hz+z4jz8GC0ut4+OtWRcJSKPd8qxgEgVAgtH1wGsHBjCC1/LHfCkGLlqt3+').play();
    } catch (e) {











      // Silent fail if audio doesn't work
    }};const startSession = () => {setIsSetup(false);setSessionStarted(true);setIsRunning(true);};const toggleTimer = () => {setIsRunning(!isRunning);};

  const stopSession = () => {
    setIsRunning(false);
    onClose();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (duration * 60 - timeLeft) / (duration * 60) * 100;

  if (!isActive) return null;

  return (
    <AnimatePresence data-id="2mxorci7a" data-path="src/components/FocusMode.tsx">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center" data-id="8dpan7lpp" data-path="src/components/FocusMode.tsx">

        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden" data-id="1yp1d6owd" data-path="src/components/FocusMode.tsx">
          {Array.from({ length: 20 }).map((_, i) =>
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }} data-id="jpoi3t6lg" data-path="src/components/FocusMode.tsx" />

          )}
        </div>

        <div className="relative z-10 w-full max-w-md mx-4" data-id="ar56gjy9c" data-path="src/components/FocusMode.tsx">
          {isSetup ?
          // Setup Phase
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-purple-500/30 shadow-2xl shadow-purple-500/20" data-id="k96nj6pij" data-path="src/components/FocusMode.tsx">

              <div className="text-center mb-6" data-id="7ohnxrflw" data-path="src/components/FocusMode.tsx">
                <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-purple-400 mb-4" data-id="frcm2vcck" data-path="src/components/FocusMode.tsx">

                  <Target className="w-8 h-8 text-white" data-id="948m79goq" data-path="src/components/FocusMode.tsx" />
                </motion.div>
                
                <h2 className="text-2xl font-bold text-white mb-2" data-id="sqg82zwdg" data-path="src/components/FocusMode.tsx">🌓 Shadow Mode</h2>
                <p className="text-gray-400 text-sm" data-id="vdalsca7i" data-path="src/components/FocusMode.tsx">
                  {selectedTask ? `Focus on: ${selectedTask.title}` : 'Deep focus session'}
                </p>
              </div>

              <div className="space-y-4" data-id="d9fbxdkg2" data-path="src/components/FocusMode.tsx">
                <div data-id="56m0i5zxd" data-path="src/components/FocusMode.tsx">
                  <Label htmlFor="duration" className="text-white text-sm font-medium" data-id="00uucjab6" data-path="src/components/FocusMode.tsx">
                    Session Duration (minutes)
                  </Label>
                  <Input
                  id="duration"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value) || 25)}
                  min="5"
                  max="120"
                  className="mt-1 bg-slate-800 border-slate-600 text-white" data-id="k5xmnhrjj" data-path="src/components/FocusMode.tsx" />

                </div>

                <div className="flex gap-3" data-id="d7h36ghz6" data-path="src/components/FocusMode.tsx">
                  <Button
                  onClick={startSession}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold" data-id="rv24ez1bi" data-path="src/components/FocusMode.tsx">

                    <Play className="w-4 h-4 mr-2" data-id="y8jfpxnrr" data-path="src/components/FocusMode.tsx" />
                    Activate Shadow Mode
                  </Button>
                  
                  <Button
                  onClick={onClose}
                  variant="outline"
                  className="border-slate-600 text-gray-400 hover:bg-slate-700" data-id="357yixhvk" data-path="src/components/FocusMode.tsx">

                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div> :

          // Focus Session Phase
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-purple-500/30 shadow-2xl shadow-purple-500/20 text-center" data-id="xr4flh4pk" data-path="src/components/FocusMode.tsx">

              {/* Header */}
              <div className="mb-8" data-id="94j2jus19" data-path="src/components/FocusMode.tsx">
                <Badge variant="outline" className="mb-4 border-purple-500 text-purple-400" data-id="40wixzud1" data-path="src/components/FocusMode.tsx">
                  🌓 Shadow Mode Active
                </Badge>
                
                {selectedTask &&
              <h3 className="text-white font-medium mb-2" data-id="yxe4w7nyx" data-path="src/components/FocusMode.tsx">{selectedTask.title}</h3>
              }
              </div>

              {/* Timer Display */}
              <div className="relative mb-8" data-id="tvk27kzkn" data-path="src/components/FocusMode.tsx">
                {/* Animated Progress Ring */}
                <div className="relative w-48 h-48 mx-auto" data-id="zp96nojsp" data-path="src/components/FocusMode.tsx">
                  <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100" data-id="he5njadgs" data-path="src/components/FocusMode.tsx">
                    <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="text-slate-700" data-id="ytsdsc3mt" data-path="src/components/FocusMode.tsx" />

                    <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    className="text-purple-400"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: progress / 100 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{
                      strokeDasharray: "283", // 2 * π * 45
                      strokeDashoffset: 283 - progress / 100 * 283
                    }} data-id="3c0fcgvlb" data-path="src/components/FocusMode.tsx" />

                  </svg>
                  
                  {/* Timer Text */}
                  <div className="absolute inset-0 flex items-center justify-center" data-id="rw1u2vctr" data-path="src/components/FocusMode.tsx">
                    <div data-id="654q89got" data-path="src/components/FocusMode.tsx">
                      <motion.div
                      key={timeLeft}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      className="text-4xl font-bold text-white" data-id="1z4yrg4bd" data-path="src/components/FocusMode.tsx">

                        {formatTime(timeLeft)}
                      </motion.div>
                      <p className="text-sm text-gray-400 mt-1" data-id="n28hhfdhf" data-path="src/components/FocusMode.tsx">
                        {isRunning ? 'Focus active' : 'Paused'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* XP Preview */}
              <div className="mb-6" data-id="716it1yo4" data-path="src/components/FocusMode.tsx">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20" data-id="r21incwlv" data-path="src/components/FocusMode.tsx">
                  <Zap className="w-4 h-4 text-purple-400" data-id="ksx1l9mbx" data-path="src/components/FocusMode.tsx" />
                  <span className="text-white text-sm" data-id="vb51olb9i" data-path="src/components/FocusMode.tsx">
                    +{75 + (duration > 25 ? 25 : 0)} XP on completion
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-3 justify-center" data-id="5gwzisv81" data-path="src/components/FocusMode.tsx">
                <Button
                onClick={toggleTimer}
                className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white" data-id="dg0dtmymt" data-path="src/components/FocusMode.tsx">

                  {isRunning ?
                <>
                      <Pause className="w-4 h-4 mr-2" data-id="02gp3gczy" data-path="src/components/FocusMode.tsx" />
                      Pause
                    </> :

                <>
                      <Play className="w-4 h-4 mr-2" data-id="f27o7jsms" data-path="src/components/FocusMode.tsx" />
                      Resume
                    </>
                }
                </Button>
                
                <Button
                onClick={stopSession}
                variant="outline"
                className="border-slate-600 text-gray-400 hover:bg-slate-700" data-id="0c1l34zj9" data-path="src/components/FocusMode.tsx">

                  <Square className="w-4 h-4 mr-2" data-id="yb3ni4o30" data-path="src/components/FocusMode.tsx" />
                  Exit
                </Button>
              </div>

              {/* Session Info */}
              <div className="mt-6 text-xs text-gray-500" data-id="6kdgosu4c" data-path="src/components/FocusMode.tsx">
                <p data-id="etmwrsrpz" data-path="src/components/FocusMode.tsx">Stay focused. Minimize distractions.</p>
                <p data-id="uvfjbzvck" data-path="src/components/FocusMode.tsx">The shadow grows stronger with discipline.</p>
              </div>
            </motion.div>
          }
        </div>
      </motion.div>
    </AnimatePresence>);

};

export default FocusMode;