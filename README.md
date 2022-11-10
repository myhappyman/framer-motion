1. framer-motion
   설치를 먼저 진행한다.
   > npm install framer-motion
   > (과거에는 설치시 오류 증상이 있었던것 같다.)

설치가 완료되고 문제가 없는지 import를 해보고 체크를한다.

motion을 통해 애니메이트 처리를 하는데, div와 같은 태그를 바로 선언하여 사용하는게 아니라 <motion.사용할태그>로 선언해서 애니메이트를 걸어준다.
motion에 HTML태그를 호출해야한다!!!

2. motion은 HTML태그를 호출해야한다고 했는데, 그동안 작성해온 UI, CSS방식은 styled 컴포넌트를 사용해서 작성해왔다. 이것을 연결하는 방법을 알아본다.
   styled component를 초반에 배울때 다른 작성된 컴포넌트의 속성을 상속받는법을 배웠는데 그것을 그대로 활용한다.

- styled(motion.div)` ...css`;

이렇게 작성해주면 된다.

기본적으로 많이 사용하는 props
-animate{{변경할 요소값}} : 애니메이션을 처리할 속성을 넣는다. 색상, 모양변경 사이즈 변경 등등등
-transition : 시간을 지연시키거나 ~시간동안 애니메이션을 동작시키거나 등등
--delay: n시간 뒤에 동작
--duration: n시간동안 애니메이션 동작

<Box transition={{duration: 3}}animate={{borderRadius:"100px"}}/>

> Box컴포넌트는 3초동안 div의 바깥선이 둥글어진다.

-initial: 컴포넌트의 애니메이션 동작하기전 초기상태를 정의해줄 수 있다.

\*초기 작성시 약간 애니메이션이 끝나고 탱탱볼처럼 튕~기는 느낌이 있는데, spring이라는게 걸려있기 때문이다. Ease~같은 효과이다. transition={{type:"tween"}} 과 같은 props로 type을 명시해서 변경해주면 된다.

참고 url : https://www.framer.com/docs/transition/
