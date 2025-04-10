import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Strip() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false });

  return (
    <section
      ref={sectionRef}
      className="container mx-auto flex flex-col items-center justify-center px-6 relative mt-10"
    >
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
