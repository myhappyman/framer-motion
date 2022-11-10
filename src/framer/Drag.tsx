import { useRef } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  hover: {rotateZ: 90},
  click: {borderRadius:"100px"},
  drag: {
    backgroundColor:"rgba(46, 204, 113,1.0)",
    transition: {
      duration: 10
    }
  },
};

function Drag(){
    const biggerBoxRef = useRef<HTMLDivElement>(null);

    return (
        <BiggerBox ref={biggerBoxRef}>
            <Box 
                drag
                dragConstraints={biggerBoxRef}
                dragSnapToOrigin
                dragElastic={0.5}
                variants={boxVariants}
                whileHover="hover" 
                whileTap="click"
                whileDrag="drag"
            />
        </BiggerBox>
    );
}

export default Drag;