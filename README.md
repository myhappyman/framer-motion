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
