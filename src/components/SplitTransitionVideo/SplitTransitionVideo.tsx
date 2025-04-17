import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AiCom = () => {
  const { ref, inView } = useInView({ threshold: 0.6 });
  const [isActive, setIsActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    setIsActive(inView);

    if (videoRef.current) {
      if (inView) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      className="relative w-full h-[600px] overflow-hidden border-8 border-black bg-black rounded-xl shadow-lg my-12"
    >
      {/* Sol Görsel */}
      <motion.img
        src="/assets/images/bayan.jpeg"
        alt="left"
        animate={{ x: isActive ? "-100%" : 0 }}
        transition={{ duration: 1.5 }}
        className="absolute left-0 top-0 w-1/2 h-full object-cover z-20"
      />

      {/* Sağ Görsel */}
      <motion.img
        src="/assets/images/bay.jpeg"
        alt="right"
        animate={{ x: isActive ? "100%" : 0 }}
        transition={{ duration: 1.5 }}
        className="absolute right-0 top-0 w-1/2 h-full object-cover z-20"
        style={{ transform: "scaleX(-1)" }}
      />

      {/* Video */}
      <motion.video
        ref={videoRef}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isActive ? 1 : 0,
          scale: isActive ? 1 : 0.8,
        }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 w-full h-full object-cover z-10"
        src="/assets/videos/aivideo.mp4"
        autoPlay
        muted
        loop
      />

      {/* Yazılar */}
      {isActive && (
        <div className="absolute top-1/2 left-0 w-full z-30 flex justify-between items-center px-16 -translate-y-1/2 pointer-events-none">
          {/* Sol */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-black text-left max-w-xs"
          >
            <h3 className="text-3xl font-bold mb-2">🎓 Instant Answers</h3>
            <p className="text-md leading-snug">
              Any language, any time. <br />
              Ask freely — ProfDux is here.
            </p>
          </motion.div>

          {/* Sağ */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-black text-right max-w-xs"
          >
            <h3 className="text-3xl font-bold mb-2">📊 Smart Grading</h3>
            <p className="text-md leading-snug">
              Exams, analytics, attendance... <br />
              All automated. All with ProfDux.
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AiCom;
