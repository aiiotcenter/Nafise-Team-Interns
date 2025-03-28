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
      className="relative w-full h-screen flex items-center justify-center overflow-hidden mt-12"
    >
      {/* Harita */}
      <motion.div
        initial={{ scale: 1, x: 0, y: 50 }}
        animate={isFullyVisible ? { scale: 0.6, x: "-30%", y: 0 } : { scale: 1, x: 0, y: 50 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="absolute w-3/4 h-auto"
      >
        <img
          src="/assets/icons/international.png"
          alt="Map"
          className="w-full h-auto"
        />
        {/* Konum İşaretleri */}
        <motion.img
          src="/assets/icons/location.png"
          alt="Location 1"
          className="w-12 h-12 absolute top-[35%] left-[20%] animate-bounce"
          initial={{ opacity: 0, scale: 0 }}
          animate={isFullyVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3 }}
        />
        <motion.img
          src="/assets/icons/location.png"
          alt="Location 2"
          className="w-12 h-12 absolute top-[30%] left-[70%] animate-bounce"
          initial={{ opacity: 0, scale: 0 }}
          animate={isFullyVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5 }}
        />
        <motion.img
          src="/assets/icons/location.png"
          alt="Location 3"
          className="w-12 h-12 absolute top-[50%] left-[50%] animate-bounce"
          initial={{ opacity: 0, scale: 0 }}
          animate={isFullyVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.7 }}
        />
      </motion.div>

      {/* Kartlar */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={isFullyVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        className="absolute right-16 bg-white p-8 rounded-xl shadow-2xl space-y-10 w-[500px]"
      >
        {/* Kart 1 */}
        <div className="flex items-center space-x-6">
          <img src="/assets/icons/earth.png" alt="Choices" className="w-14 h-14" />
          <div>
            <h3 className="text-xl font-bold">Lot Of Choices</h3>
            <p className="text-gray-600 text-md">We have 10+ camping destinations.</p>
          </div>
        </div>

        {/* Kart 2 */}
        <div className="flex items-center space-x-6">
          <img src="/assets/icons/bag.png" alt="Best Guide" className="w-14 h-14" />
          <div>
            <h3 className="text-xl font-bold">Best Camp Guide</h3>
            <p className="text-gray-600 text-md">Our camp guide is ready for you.</p>
          </div>
        </div>

        {/* Kart 3 */}
        <div className="flex items-center space-x-6">
          <img src="/assets/icons/booking.png" alt="Easy Booking" className="w-14 h-14" />
          <div>
            <h3 className="text-xl font-bold">Easy Booking</h3>
            <p className="text-gray-600 text-md">Fast and safe ticket process.</p>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
