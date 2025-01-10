# 02. 목록 UI 구현하기: Props와 State

<img src="../images/02-one-way-data-flow.jpg" width=720 />    

## 🎯 요구 사항
- `RestaurantList` 가 restaurants 배열을 받아서 그릴 수 있도록 변경해 보세요.
  - restaurants 배열을 `RestaurantList` 의 props로 내려받도록 변경해 보세요.
- 카테고리 필터에 따라 필터된 음식점 목록을 보여줄 수 있도록 변경해 보세요. 

### 구현 결과 예시
```javascript
// App.jsx
<CategoryFilter category={category} onChangeCategory={setCategory} />
<RestaurantList restaurants={filteredRestaurants} />
```
```javascript
const restaurants = [
  {
    id: "a01",
    name: "피양콩할마니",
    description:
      "평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는 곳으로, ‘피양’은 평안도 사투리로 ‘평양’을 의미한다. 딸과 함께 운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은 건강식을 선보인다. 콩비지와 피양 만두가 이곳의 대표 메뉴지만, 할머니가 옛날 방식을 고수하며 만들어내는 비지전골 또한 이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다.",
    category: "한식",
  },
  {
    id: "a02",
    name: "친친",
    description: "Since 2004 편리한 교통과 주차, 그리고 관록만큼 깊은 맛과 정성으로 정통 중식의 세계를 펼쳐갑니다",
    category: "중식",
  },
  {
    id: "a03",
    name: "잇쇼우",
    description:
      "잇쇼우는 정통 자가제면 사누끼 우동이 대표메뉴입니다. 기술은 정성을 이길 수 없다는 신념으로 모든 음식에 최선을 다하는 잇쇼우는 고객 한분 한분께 최선을 다하겠습니다",
    category: "일식",
  },
  {
    id: "a04",
    name: "이태리키친",
    description: "늘 변화를 추구하는 이태리키친입니다.",
    category: "양식",
  },
  {
    id: "a05",
    name: "호아빈 삼성점",
    description: "푸짐한 양에 국물이 일품인 쌀국수",
    category: "아시안",
  },
  {
    id: "a06",
    name: "도스타코스 선릉점",
    description: "멕시칸 캐주얼 그릴",
    category: "기타",
  },
];
```


## ✅ 키워드
- Props
- State
  - useState
- Keys

> [Rendering Lists](https://react.dev/learn/rendering-lists) 문서에 ['Why does React need keys?'](https://react.dev/learn/rendering-lists#why-does-react-need-keys)는 지금 꼭 이해하지 않아도 괜찮습니다. 그냥 React에서 목록을 동적으로 그릴 때에는 이런 것들을 사용해야 하는구나~ 정도로만 알고 일단 넘어가세요. 우선 사용하는 법에 익숙해지는 것이 먼저입니다 :) 

## 🧙‍♀️ 진행 가이드
- 권장 진행 시간: 1시간 내 
- 권장 시간 이후에는 요구 사항 별로 아래 브랜치를 참고해 보세요 
  - [guide/02-1](https://github.com/woowacourse/self-paced-react/commit/24b8616c834694ac6ed0c94cbee58230fa48d206) 
  - [guide/02-2](https://github.com/woowacourse/self-paced-react/commit/54076034b0cc561a675c1289b18b353b9a44a9e8)

## 🔗 참고 문서     
- [Thinking in React](https://react.dev/learn/thinking-in-react)의 Step3-4          
- [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
- [Rendering Lists](https://react.dev/learn/rendering-lists)
- [State: A Component's Memory](https://react.dev/learn/state-a-components-memory)
  - [API Reference: useState](https://react.dev/reference/react/useState)