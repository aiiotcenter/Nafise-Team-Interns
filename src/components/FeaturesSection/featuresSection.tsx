import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function FeaturesSection() {
  const [isFullyVisible, setIsFullyVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFullyVisible(entry.isIntersecting);
      },
      { threshold: 0.8 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Görsel */}
      <motion.div
        initial={{ scale: 1, x: 50, y: 115 }}
        animate={isFullyVisible ? { scale: 0.6, x: "-30%", y: 50 } : { scale: 1, x: 50, y: 115 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="absolute w-3/4 h-auto"
      >
        <img
          src="/assets/images/pd1.jpg"
          alt="Map"
          className="w-400 h-full"
        />
      </motion.div>

      {/* Kartlar */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={isFullyVisible ? { opacity: 1, x: 0, y:50 } : { opacity: 0, x: 100 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        className="absolute right-16 p-8 rounded-xl space-y-10 w-[700px]"
      >
        {/* Kart 1 */}
        <div className="flex items-center space-x-6">
          <img src="/assets/icons/chat.png" alt="Choices" className="w-12 h-12" />
          <div>
            <h3 className="text-xl font-bold">Personalized Assistance</h3>
            <p className="text-gray-600 text-md">Get answers to your questions in any language, anytime.</p>
          </div>
        </div>

        {/* Kart 2 */}
        <div className="flex items-center space-x-6">
          <img src="/assets/icons/calendar.png" alt="Best Guide" className="w-12 h-12" />
          <div>
            <h3 className="text-xl font-bold">Smart Attendance Tracking</h3>
            <p className="text-gray-600 text-md">Seamless monitoring for both online and face-to-face classes.</p>
          </div>
        </div>

        {/* Kart 3 */}
        <div className="flex items-center space-x-6">
          <img src="/assets/icons/pencil.png" alt="Easy Booking" className="w-12 h-12" />
          <div>
            <h3 className="text-xl font-bold">Automated Exam & Quiz Generation</h3>
            <p className="text-gray-600 text-md">Instantly create exams, quizzes, and course content.</p>
          </div>
        </div>

        {/* Kart 4 */}
        <div className="flex items-center space-x-6">
          <img src="/assets/icons/statistics.png" alt="Easy Booking" className="w-12 h-12" />
          <div>
            <h3 className="text-xl font-bold">Intelligent Grading & Analytics</h3>
            <p className="text-gray-600 text-md">Real-time insights to help teachers assess student progress.</p>
          </div>
        </div>

        {/* Kart 5 */}
        <div className="flex items-center space-x-6">
          <img src="/assets/icons/globe.png" alt="Easy Booking" className="w-12 h-12" />
          <div>
            <h3 className="text-xl font-bold">Multi-Language Support</h3>
            <p className="text-gray-600 text-md">Learn and teach without language barriers.</p>
          </div>
        </div>

      </motion.div>
    </motion.section>
  );
}
