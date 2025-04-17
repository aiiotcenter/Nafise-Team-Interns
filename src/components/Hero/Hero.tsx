import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false });

  return (
    <section
      ref={sectionRef}
      className="container mx-auto flex flex-col items-center justify-center h-screen px-6 relative mt-10"
    >

      <div className="flex items-center justify-between w-full">
        
        {/* Yazı Kısmı */}
        <motion.div
          initial={{ opacity: 0, x: -150 }}
          animate={{
            opacity: isInView ? 1 : 0,
            x: isInView ? 0 : -150,
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="w-1/2"
        >
          <h1 className="text-5xl font-bold">
          ProfDux: AI-powered learning, answers anytime, any language!{" "}
            <span className="text-[#751944] underline text-3xl">Are you ready to revolutionize education?</span>
          </h1>
          <p className="text-gray-500 mt-4">Ready to revolutionize learning? Start now!</p>
          <button className="bg-[#751944] text-white hover:bg-blue-500 px-6 py-3 rounded-full mt-6">
            Get Started
          </button>
        </motion.div>

        {/* Telefon Görseli */}
        <motion.div
          initial={{ x: 150, opacity: 0, rotate: 0 }}
          animate={{
            x: isInView ? 0 : 150,
            opacity: isInView ? 1 : 0,
            rotate: isInView ? [-3, 3, -3] : 0,
          }}
          transition={{
            x: { duration: 1, ease: "easeOut" },
            rotate: { repeat: Infinity, duration: 2, ease: "easeInOut" },
          }}
          className="w-1/2 flex justify-center"
        >
          <img
            src="/assets/images/phoneprufdux.png"
            alt="Phone"
            className="w-[600px] h-auto object-contain"
          />
        </motion.div>
      </div>

      {/* Mor Şerit (Boydan Boya) */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{
          y: isInView ? 0 : 100,
          opacity: isInView ? 1 : 0,
        }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="bg-[#751944] text-white py-8 px-10 flex justify-around items-center w-full absolute bottom-[-100px] left-0"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isInView ? 1 : 0,
            y: isInView ? 0 : 20,
          }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold">8K</h2>
          <p className="text-sm">Happy Customers</p>
        </motion.div>

        <div className="w-[2px] h-10 bg-white"></div> {/* Çizgi */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isInView ? 1 : 0,
            y: isInView ? 0 : 20,
          }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold">4.2</h2>
          <p className="text-sm">Overall Rating</p>
        </motion.div>

        <div className="w-[2px] h-10 bg-white"></div> {/* Çizgi */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isInView ? 1 : 0,
            y: isInView ? 0 : 20,
          }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold">250+</h2>
          <p className="text-sm">Projects Completed</p>
        </motion.div>

        <div className="w-[2px] h-10 bg-white"></div> {/* Çizgi */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isInView ? 1 : 0,
            y: isInView ? 0 : 20,
          }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold">95%</h2>
          <p className="text-sm">Customer Satisfaction</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
