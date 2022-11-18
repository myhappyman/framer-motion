# 1. framer-motion

설치를 먼저 진행한다.

`npm install framer-motion`

설치가 완료되고 문제가 없는지 import를 해보고 체크를한다.
(과거에는 설치시 오류 증상이 있었던것 같다.)

motion을 통해 애니메이트 처리를 하는데, div와 같은 태그를 바로 선언하여 사용하는게 아니라 <motion.사용할태그>로 선언해서 애니메이트를 걸어준다.
motion에 HTML태그를 호출해야한다!!!

# 2. motion

motion은 HTML태그를 호출해야한다고 했는데, 그동안 작성해온 UI, CSS방식은 styled 컴포넌트를 사용해서 작성해왔다. 이것을 연결하는 방법을 알아본다.

styled component를 초반에 배울때 다른 작성된 컴포넌트의 속성을 상속받는법을 배웠는데 그것을 그대로 활용한다.

```Javascript
styled(motion.div)`...css`;
```

이렇게 작성해주면 된다.

### 기본적으로 많이 사용하는 props

#### -animate{{변경할 요소값}} : 애니메이션을 처리할 속성을 넣는다. 색상, 모양변경 사이즈 변경 등등등

#### -transition : 시간을 지연시키거나 ~시간동안 애니메이션을 동작시키거나 등등

##### -transition > delay: n초 뒤에 동작

##### -transition > duration: n초동안 애니메이션 동작

```JSX
<Box transition={{duration: 3}} animate={{borderRadius:"100px"}}/>
```

(Box컴포넌트는 3초동안 div의 바깥선이 둥글어진다.)

#### -initial: 컴포넌트의 애니메이션 동작하기전 초기상태를 정의해줄 수 있다.

\*초기 작성시 약간 애니메이션이 끝나고 탱탱볼처럼 튕기는 느낌이 있는데, spring이라는게 걸려있기 때문이다. Ease같은 효과이다. transition={{type:"tween"}} 과 같은 props로 type을 명시해서 변경해주면 된다.

참고 url : https://www.framer.com/docs/transition/

# 3. Variants

코드를 깔끔하게 해준다.
많은 애니메이션들을 하나로 연결시켜준다.

varinats는 기본적으로 애니메이션의 Stage다.
initial이 있을수도 있고, 다른 하나는 finish, showing, hidden,
from, to, 0%, 100% 등 뭐든 처리해줄 수 있다.
Variant를 Js Object로 넣어본다.

object 변수명은 편한대로 작성하고 내부의 key값도 마음대로 작성한다.
보통 start/end, visible, invisible등 편하게 작성한다.

```Javascript
const myVars = {
    start : {scale:0},
    end: {
        scale:1,
        rotateZ: 360,
        transition: {
            type:"spring", delay: 0.5}
        }
    },
```

```JSX
<Box variants={myVars} initial="start" animate="end" />
```

variants에 작성한 object를 넣고 initial에는 시작할때 동작시킬 내용이 담긴 key값의 string을 적고 animate도 마찬가지다.(이름을 꼭 동일한 것으로 넣는다.)

# 4. Variants part Two

부모 노드에 variants를 걸어두면 하위에 존재하는 자식 컴포넌트들에게 자동으로 initial, animate가 동작된다.

variants는 정의한 시작값의 key이름과 끝날때 key이름이 매칭되어야 한다고 했고, 이 내용이 그대로 하위 자식에 들어간다고 했다.
이 원리를 이용해서 자식노드쪽 애니메이션도 시작과 끝나는 이름을 동일하게 작성하고 variants이름만 다르게 적용해주면 알아서 애니메이트가 동작 되는걸 볼 수 있다.

```Javascript
const boxVariants = {
  start: {opacity: 0, scale: 0.5},
  end: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.5,
      bounce: 0.5
    }
  }
};

const circleVariants = {
  start: {
    scale: 0,

  },
  end: {
    scale: 2,
    transition: {
      type: "spring",
      bounce: 0.8
    }
  },
}
```

```JSX
<Box variants={boxVariants} initial="start" animate="end">
    <Circle variants={circleVariants}/>
    <Circle variants={circleVariants}/>
    <Circle variants={circleVariants}/>
    <Circle variants={circleVariants}/>
</Box>
```

이제 Box컴포넌트가 opacity:1이 되고나서 Circle하나하나가 약간의 delay를 겪으면서 나타나야할텐데, 이런 경우 예전에 하드코딩을 한다면 variants를 4개를 만들어서 각각 delay를 다르게 줬을것이다.
이런 경우를 예상하고 Orchestration파트에 정리가 되어있다.

### Orchestration

##### -delayChildren: 부모에 지정하는 옵션이며, 자식 요소의 애니메이트 동작시간을 n초만큼 지연시킨다.

#### -staggerChildren: 부모에 지정하는 옵션으로 첫번째 요소에 n초 그다음 자식요소에 n초 중첩 형태로 지연을 시켜준다.

# 5. Gestures part One

다음으로 알아볼 props는 while로 시작하는 속성들이다.

### while props

#### -whilehover: 마우스를 올리면 동작한다.

#### -whileTap: 마우스를 클릭하면 동작한다.

#### -whileDrag: 드래그 중에 동작한다.

적용도 바로 props를 줘도 되지만, variants를 배웠으니 해당 방식으로 적용을 해본다.

```Javascript
const boxVariants = {
  hover: {scale:1.5, rotateZ: 90},
  click: {scale:1, borderRadius:"100px"},
};
```

```JSX
<Box
    variants={boxVariants}
    whileHover="hover"
    whileTap="click"
/>
```

이렇게 variants를 사용하여 문자열을 넣어준느걸 선호하는 이유는 복잡해지는 UI에서는 state값에 따라 동작해야할 애니메이트가 달라질수 있는데 조건문을 통해서 동작해야할 variants 문자열만 넣어주면 되기 때문이다.

### drag

그냥 속성에 drag만 추가하면 드래그가 된다...
Awesome!

색상은 꼭 "#fff(hex코드)","blue"와 같은것이 아닌 rgba값으로 적용해줘야 한다.

# 6. Gestures part Two

드래그시 위아래 좌우 마음대로 돌아다니고 있는데 특정 영역을 벗어나지 못하도록 처리해보려고 한다.
일단 drag에 x, y를 통해서 수직으로만 이동하거나 수평으로만 이동되도록 제약을 걸수 있다.
`drag="x" or drag="y"`

#### -dragConstraints

그 외에 dragConstraints라는 prop이 있는데, 이곳에 드래깅이 가능한 영역을 정해줄 수 있다.
`dragConstraints={{top:-50, bottom:50, left:-50, right:50}}`
위 형태로 현 위치에서부터의 제약을 줄 수 있다.

이런식으로 수학적 계산으로 통해서 제약을 줄 수도 있지만, 우리에겐 ref라는 것이 있었다. 요소를 선택하도록 도와주는데, useRef를 사용하면 계산을 하지 않고 제약을 처리할 수 있다.

```Typescript
function App() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);

  return (
    <Wrapper>
      <BiggerBox ref={biggerBoxRef}>
        <Box drag dragConstraints={biggerBoxRef} />
      </BiggerBox>
    </Wrapper>
  );
}
```

useRef로 ref를 걸어주고 걸린 biggerBoxRef를 제약조건 prop에 넣어주면 끝이다. 알아서 걸린 요소의 끝부분까지만 동작하도록 해준다.

#### -dragSnapToOrigin

이것만으로도 만족스럽지만 동작 후 요소가 초기값인 중앙으로 돌아오게 하고 싶다면?
`<Box drag dragSnapToOrigin />`
dragSnapToOrigin prop을 drag처럼 추가만 해주면 벗어나자마자 중앙으로 돌아온다.

#### -dragElastic

다음으로 알아볼 속성은 탄력성이다.
기본값은 0.5이고, 입력 가능한 값은 0 &#126; 1사이 값이어야 한다.
제약부분에서부터 점점 멀리 드래그하면 요소와 마우스가 멀어지는게 보이는데 서로 당기는 힘을 말한다.

-무한대로 잘 따라오게 만들기
`<Box drag dragElastic={1} />`

1로해두면 마우스와 같이 움직이고 0에 가까울수록 무거운? 느낌으로 잘 따라오지 않는다.

-부모요소에 가두기
`<Box drag dragElastic={0} />`
0으로 해두면 제약조건에 부딫히게되면 따라오지 않는다. 즉 완전 갇혀버린 느낌을 낼 수 있다.

# 7. MotionValues part One

MotionValue는 애니메이션 내의 수치를 트래킹할 때 필요하다.
<b>드래그등의 행위를 했을때, x축과 y축의 위치값을 찾거나 변경시킬 수 있다.</b>
useMotionValue메소드를 생성하고 수치를 체크할 컴포넌트에 걸어주고 console.log를 찍어보면 동작은 잘 되고 있지만 데이터가 찍히지 않는것을 볼 수 있다.
그 이유는 React의 state로 구성되어 있지 않기때문에, 위치가 바뀌거나 한다고 새롭게 렌더링 되지 않기때문에 console.log가 찍히지 않는다.
<i>왜냐하면 그저 데이터값만 추적하고 싶기 때문이다. 중요한 개념이다! 약간의 드래그 이벤트를 한다고 모션이 조금 바뀔때마다 리렌더링이 일어난다면 어플리케이션에 부하가 올 수도 있을것이다!</i>

데이터의 변화를 보고 싶다면 아래처럼 구성하면 된다.

```JSX
import {motion, useMotionValue} from "framer-motion";
import { useEffect } from "react";

function App() {
  const x = useMotionValue(0);

  useEffect(()=> {
    x.onChange(()=> console.log(x.get()));
  }, [x]);

  return (
    <Wrapper>
      <Box style={{x}} drag="x" dragSnapToOrigin />
    </Wrapper>
  );
}
```

useEffect에 useMotionValue값이 change되면 해당값을 get하도록 구성한다.

get을 통해 해당 요소의 위치값을 얻을 수 있다.

또는 반대로 set을 통해 위치를 강제로 바꿀수도 있다.

```JSX
function App() {
  const x = useMotionValue(0);
  return (
    <Wrapper>
      <button onClick={()=>x.set(200)}>Click Me!</button>
      <Box style={{x}} drag="x" dragSnapToOrigin />
    </Wrapper>
  );
}
```

button태그에 onClick을 걸고 x.set(200) 처리를 해주었다.
클릭을 하게되면 해당요소의 x축의 200만큼 이동을 시켜준다.

# 8. MotionValues part Two

useTransform을 활용하여 useMotionValue를 통해 가져온 값을 어떤 범위내의 값으로 변환하여 가져오도록 할 수 있다.
useTransform에는 3개의 인자를 받는다.

```Typescript
const x = useMotionValue(0);
const scale = useTransfrom(x, [-800, 0, 800], [2, 1, 0.1]);
/**
 * 위 정의한 값은 아래와 같다.
 * const scale = useTransfrom(받는데이터, [제한을 둘 값들], [제한값에 따른 출력값]);
 * -800 ~ -1까지는 2가 출력, 0은 1, 1~800은 0.1이 비례되어 출력된다.
 * 즉, -400쯤에선 1.5가 400쯤에선 0.5를 받고 있을것이다.
 **/
```

x축 드래그에 따라 커지고 작아지는 예제는 아래처럼 될 것이다.

```JSX
function App() {
  const x = useMotionValue(0);
  const scale = useTransform(x, [-800, 0, 800], [2, 1, 0.1]);
  return (
    <Wrapper>
      <Box style={{x, scale}} drag="x" dragSnapToOrigin />
    </Wrapper>
  );
}
```

# 9. MotionValues part Three

특정 영역값에 따라 비율에 맞춰 scale값을 처리해보았는데, 이번엔 background color를 변경해보겠습니다.

```JSX
function App() {
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
  const gradient = useTransform(x,
    [-800, 0, 800],
    [
      "linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))",
      "linear-gradient(135deg, rgb(238, 0, 153), rgb(211, 0, 238))",
      "linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))",
    ]

    )
  return (
    <Wrapper style={{background: gradient}}>
      <Box style={{x, rotateZ}} drag="x" dragSnapToOrigin />
    </Wrapper>
  );
}
```

`<Wrapper/>` 컴포넌트도 motion.div로 감싸주고 linear gradien의 값들을 넣어주면 알아서 비율에 맞춰 값을 출력해준다.

#### -useScroll

이것도 motionValue값을 넘겨준다.(즉, state는 아니다)
Scroll행위에 따른 값을 준다.

##### `-scrollX, scrollY`

각각 x, y축의 진행 값이다.

##### `-scrollYProgress, scrollXProgress`

전체 영역의 퍼센트로 수치화한다.(각 x, y축을 0~1로 알려줌)

# 10. SVG Animation

svg에 애니메이션 처리를 해서 로고화를 해볼 예정이다.
font-awesome에서 마음에 드는 로고를 svg형태로 가져온다.

svg내 path태그에는 pathLength라는 속성이 있는데, 현재 우리 위치까지의 path의 길이를 나타낸다.
0~1까지의 범위 값을 가지며, 1이되면 전부 그려진다.
즉 애니메이션으로 0~1까지 그리게되면 그림을 그리는 효과처럼 보인다.

또한, transition에서 애니메이션의 동작시간, 지연시간등을 설정 할 수 있는데, default는 기본적으로 전체가 동작하는 시간으로 설정되지만, property명으로 따로 지정하여 설정해주면 각각 채우는시간 그려지는시간을 제각기 다르게 설정 할 수 있다.

```JSX
const Svg = styled.svg`
  width: 300px;
  height: 300px;
  path{
      stroke: #fff;
      stroke-width: 2;
  }
`;

const svg = {
  start: {pathLength: 0, fill:"rgba(255, 255, 255, 0)"},
  end: {
    fill:"rgba(255, 255, 255, 1)",
    pathLength: 1,
    transition:{
      default: { duration: 5 },
      fill: { duration: 1, delay: 3 },
    }
  }
};

function App() {
  return (
    <Wrapper>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512">
        <motion.path
          variants={svg}
          initial="start"
          animate="end"
          d="M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z"/>
      </Svg>
    </Wrapper>
  );
}
```

# 11. AnimatePresence

AnimatePresence는 컴포넌트로 React App에서 사라지는 component를 animate화 시켜준다.

그동안 작성해온 react에서 사라지는 컴포넌트에 대하여 애니메이션을 처리할 수 없었다. 왜냐하면 state의 boolean값에 따라 컴포넌트를 그리거나 null처리를 하였기 때문이다.

하지만 motion을 써서 AnimatePresence 컴포넌트를 사용하면 사라질때 animate를 할 수 있다.
사용법에 조건이 좀 있는데 아래와 같다.

1. visible상태여야한다.
2. {}를쓰는 조건문 전체를 AnimatePresence로 감싸줘야한다!

#### -exit

exit는 해당 컴포넌트가 사라질때 동작하는 props이다.

지금까지 정보로 사라질때와 나타날때의 animate예제를 보겠다.

```JSX
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const boxVariants = {
  initial: {
    opacity:0,
    scale: 0
  },
  visible: {
    opacity:1,
    scale:1,
    rotateZ: 360
  },
  leaving: {
    opacity:0,
    scale:0,
    y:10
  }
}

function App() {
  const [showing, setShowing] = useState(false);
  const toggleShowing = () => setShowing(prev => !prev);

  return (
    <Wrapper>
      <button onClick={toggleShowing}>Click</button>
      <AnimatePresence>{showing ? <Box
                                    variants={boxVariants}
                                    initial="initial"
                                    animate="visible"
                                    exit="leaving"
                                  />
                                : null}</AnimatePresence>

    </Wrapper>
  );
}
```

# 12. Slide part One

AnimatePresence를 활용하여 slide효과를 만들어본다.

```JSX
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
  invisible: { x: 500, opacity: 0, scale: 0},
  visible: { x:0, opacity: 1, scale: 1, transition: { duration: .5 }},
  exit: { x: -500, opacity: 0, scale: 0, rotateX: 180, transition: { duration: .5 } },
}

function App() {
  const [visible, setVisible] = useState(1);
  const onNext = () => {
    setVisible(prev => prev === 10 ? prev : prev+1);
  };

  return (
    <Wrapper>
      <AnimatePresence>
        {[1,2,3,4,5,6,7,8,9,10].map(i =>
          visible === i ?
          <Box variants={boxVariants} initial="invisible" animate="visible" exit="exit" key={i}>{i}</Box>
          : null)
        }
      </AnimatePresence>
      <button onClick={onNext}>Next</button>
    </Wrapper>
  );
}

export default App;
```

# 12. Slide part Two

배열이 있다고 가정하고 해당 배열을 돌리면서 key값과 표현할값에 현재의 값을 넣어서 슬라이드를 만들었는데, 사실상 visible state의 값은 숫자로 next, prev버튼에 따라 제한되어 움직인다. 고로 map으로 표현하여 그리는 행위를 하지 않아도 key값이 바뀌면서 컴포넌트가 바뀐다고 react는 인지하기때문에 이것을 활용하여 이전과 똑같이 반복문으로 그려낸 컴포넌트와 동일한 행위를 할 수도 있다.

#### - custom

custom이란 variants에 데이터를 보내는 props이다.
variants에 사용시 object에서 function으로 바꿔주고 object를 return해줘야한다.

#### - ~exitBeforeEnter~ mode="wait"

`<AnimatePresence mode="wait" custom={back} />`
exit를 실행시키고 끝나면 다음 element가 올 수 있게한다.
동시에 일어나는걸 막아준다.
즉 앞에 일어나는 exit가 진행되고 다음 initial과 animate가 동작하게 도와준다. exitBeforeEnter는 사라지고 mode="wait"로 변경되었다.

# 14. You Need to Watch This

#### -layout

layout도 prop이다.
element에게 주게되면 layout이 바뀔때 알아서 animate가 동작된다.
실제로 동작되는 element에게 줘야한다. 부모에서 stlye로 바뀌고 있다면 영향받는 자식요소에게 layout속성만 주면 알아서 애니메이션이 된다.
쩐다!!!

```JSX
function App() {
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked((prev) => !prev)

  return (
    <Wrapper onClick={toggleClicked}>
      <Box
        style={{
          justifyContent : clicked ? "center" : "flex-start",
          alignItems: clicked ? "center" : "flex-start",}}>
        <Circle layout />
      </Box>
    </Wrapper>
  );
}
```

#### -layoutId

서로 다른영역의 컴포넌트라도 layoutId라는것으로 서로 같은 string으로 연결만 해주면 알아서 애니메이션을 연결시켜준다.

```JSX
const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  margin: 20px;
  width: 400px;
  height: 400px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
  background: #00a5ff;
  height: 100px;
  width: 100px;
  border-radius: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked((prev) => !prev)

  return (
    <Wrapper onClick={toggleClicked}>
      <Box>
        {!clicked ? <Circle layoutId="circle" style={{borderRadius:"50px"}}/> : null}
      </Box>
      <Box>
        {clicked ? <Circle layoutId="circle" style={{borderRadius:"0px"}}/> : null}
      </Box>
    </Wrapper>
  );
}
```
