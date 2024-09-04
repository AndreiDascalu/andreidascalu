import React, { useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  const [modelLoaded, setModelLoaded] = useState(false);

  return (
    <section className="relative w-full h-screen mx-auto">
      <div
        className={`${styles.paddingX} absolute inset-0 top-[120px]
        max-w-7xl mx-auto flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915eff]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi there, I'm{" "}
            <span
              className="
              animate-text bg-gradient-to-r from-teal-500 
              via-purple-500 to-orange-500 
              bg-clip-text text-transparent 
              text-5xl font-black
              lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px]"
            >
              Andrei
            </span>
          </h1>
          <p className={`${styles.heroSubText} mt-1 text-white-100`}>
            Computer Science and Engineering graduate at TU Delft,
            <br className="sm:block hidden" /> dedicated to exploring innovative
            technologies
          </p>
        </div>
      </div>

      {/* 3D Computer Canvas */}
      <ComputersCanvas onModelLoaded={() => setModelLoaded(true)} />

      {/* Loading Message and Left-to-Right Arrow */}
      {!modelLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: modelLoaded ? 0 : 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-[40%] left-[25%] flex flex-col items-center space-y-2"
        >
          <p className="text-white bg-black/70 p-2 rounded-md text-center text-sm">
            3D models can be quite heavy, please wait 🙏
          </p>
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 12h12M12 6l6 6-6 6" // Arrow path
              />
            </svg>
          </motion.div>
        </motion.div>
      )}

      {/* Scroll Indicator */}
      <div
        className="absolute xs:bottom-10 bottom-32 w-full flex
                      justify-center items-center"
      >
        <a href="#about">
          <div
            className="w-[35px] h-[64px] rounded-3xl border-4
                          border-secondary flex justify-center
                          items-start p-2"
          >
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
