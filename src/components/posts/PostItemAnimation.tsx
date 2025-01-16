"use client";
import { motion } from "motion/react";

const PostItemAnimation: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1, originY: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{
        type: "spring",
        stiffness: 350,
        duration: 0.5,
        damping: 40,
      }}
    >
      {children}
    </motion.div>
  );
};

export default PostItemAnimation;
