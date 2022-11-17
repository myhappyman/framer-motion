import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Box = styled(motion.div)`
  width: 400px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  position:absolute;
  top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  font-size: 28px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  entry: (back:number) => {
    return {
      x: 500 * back,
      opacity: 0,
      scale: 0
    }
  },
  center: {
    x:0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: .5
    }
  },
  exit: (back:number) => {
    return {
      x: -500 * back,
      opacity: 0,
      scale: 0,
      rotateX: 180,
      transition: {
        duration: .5
      }
    }
  }
}

function App() {
  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState(1);
  const onNext = () => {
    setBack(1);
    setVisible(prev => prev === 10 ? prev : prev+1);    
  };     
  const onPrev = () => {
    setBack(-1);
    setVisible(prev => prev === 1 ? prev : prev-1);    
  };     
  
  return (
    <Wrapper>
      <AnimatePresence mode="wait" custom={back}>
        <Box 
          custom={back}
          variants={boxVariants} 
          initial="entry" 
          animate="center" 
          exit="exit" 
          key={visible}
        >
          {visible}
        </Box>
      </AnimatePresence>
      <button onClick={onPrev}>Prev</button>
      <button onClick={onNext}>Next</button>
    </Wrapper>
  );
}

export default App;
