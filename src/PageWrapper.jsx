import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, x: "100vw" },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    x: "-100vw",
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
