import flightList from "../resource/flightList";
import fetch from "node-fetch";

if (typeof window !== "undefined") {
  localStorage.setItem("flight", JSON.stringify(flightList));
}

export function getFlight(filterBy = {}) {
  let json = []; //변수 json은 빈배열을 할당받는다

  //윈도우라는 전역객체가 언디파인드가 아니라면 조건 수행
  //윈도우에 객체가 정의되어 있다면 조건 수행
  //브라우저에서 자바스크립트가 잘 수행되고 있다면 조건을 수행해라
  //브라우저랑 서버랑 코드를 동일하게 사용해서 연결을 잘 시키기 위함
  if (typeof window !== "undefined") {
    json = localStorage.getItem("flight");
    //localStorage에서 flight는 key와 value로 정의되있다.
    //변수 json에 flight의 키값을 넣는다.
  }
  const flight = JSON.parse(json) || [];
  // || 논리연산자
  // 왼쪽이 false이면 오른쪽 값을 반환한다.

  //JSON.parse()
  //인자로 들어온 값이 올바른 JSON 형태라면 자바스크립트 객체로 변환해주는 함수

  //만약 JSON.parse(json) 이 값이 null, undefined가 되면 false가 되어 빈배열을 flight에 할당함

  return new Promise((resolve) => {
    const filtered = flight.filter((flight) => {
      let condition = true;
      if (filterBy.departure) {
        condition = condition && flight.departure === filterBy.departure;
      }
      if (filterBy.destination) {
        condition = condition && flight.destination === filterBy.destination;
      }
      return condition;
    });

    //논리연산자 &&
    //왼쪽 피연산자 && 오른쪽 피연산자
    //양쪽 피연산자가 모두 true일때 true를 반환해준다
    //왼쪽 피연산자가 true면 오른쪽 피연산자 결과 반환

    setTimeout(() => {
      resolve(filtered);
    }, 500);
  });
}

// export function getFlight(filterBy = {}) {
//   let queryString = "";
//   if (filterBy.departure) {
//     queryString = queryString + `departure=${filterBy.departure}&`;
//   }
//   if (filterBy.destination) {
//     queryString = queryString + `destination=${filterBy.destination}`;
//   }

//   let endpoint = `http://ec2-43-201-32-255.ap-northeast-2.compute.amazonaws.com/flight?${queryString}`;

//   return fetch(endpoint).then((resp) => resp.json());
// }
