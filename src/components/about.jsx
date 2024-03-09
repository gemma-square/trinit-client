import React from "react";
import airport from "../assets/airport.webp";
import caption from "../assets/caption.jpg";
import simply from "../assets/simply.jpg";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div id="about" className="py-16 bg-gray-100">
      <h1 className="text-center font-semibold text-4xl md:text-6xl mb-12">
        What the Model Does
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <motion.div
          className="bg-white rounded-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src={airport}
            className="w-full h-auto rounded-t-xl"
            alt="Airport"
          />
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              Getting Remote Sensing Image from User to Process
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora,
              perspiciatis.
            </p>
          </div>
        </motion.div>
        <motion.div
          className="bg-white rounded-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src={caption}
            className="w-full h-auto rounded-t-xl"
            alt="Caption"
          />
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              Generating Captions and Required Information Regarding the Object
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora,
              perspiciatis.
            </p>
          </div>
        </motion.div>
        <motion.div
          className="bg-white rounded-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src={simply}
            className="w-full h-auto rounded-t-xl"
            alt="Simply"
          />
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              Finally Displaying Back to You
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora,
              perspiciatis.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
