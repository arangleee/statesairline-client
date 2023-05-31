import Head from "next/head";
import { useEffect, useState } from "react";
import { getFlight } from "../api/FlightDataApi";
import FlightList from "./component/FlightList";
import LoadingIndicator from "./component/LoadingIndicator";
import Search from "./component/Search";
import Debug from "./component/Debug";

//파일 확인하신 분들 정말 열정이 대단하세요~ 성장하는 개발자가 될 것 같아요 화이팅^^!

export default function Main() {
  const [condition, setCondition] = useState({
    departure: "ICN",
  });
  //변수 condition 생성 - 초기값으로 departure: "ICN"
  const [flightList, setFlightList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const search = ({ departure, destination }) => {
    if (
      condition.departure !== departure ||
      condition.destination !== destination
      //논리연산자 ||
      //왼쪽 피연산자 || 오른쪽 피연산자
      //왼쪽 피연산자가 true면 그 값을 반환
      //왼쪽 피연산자가 false면 오른쪽 값을 반환
      //출발지는 ICN으로 고정 -> 두번째 피연산자에 따라 true/false가 정해짐
      //도착지에 새로운 값이 들어와서 변경사항이 있을때
    ) {
      setCondition({ departure, destination });
    }
  };
  //condition 상태가 변경되었을 때 수행
  //도착지에 새로운 값이 들어왔을 때
  useEffect(() => {
    setIsLoading(true); //로딩중으로 바뀐다
    getFlight(condition).then((filtered) => {
      //getFlight 함수에 상태 변경된 condition을 보내고
      setFlightList(filtered); //필터된 배열을 flightList에 할당
      setIsLoading(false); //로딩 끝
    });
  }, [condition]);

  global.search = search;

  return (
    <div>
      <Head>
        <title>States Airline11111</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>여행가고 싶을 땐, States Airline</h1>
        <Search onSearch={search} />
        <div className="table">
          <div className="row-header">
            <div className="col">출발</div>
            <div className="col">도착</div>
            <div className="col">출발 시각</div>
            <div className="col">도착 시각</div>
            <div className="col"></div>
          </div>
          {isLoading ? <LoadingIndicator /> : <FlightList list={flightList} />}
        </div>

        <div className="debug-area">
          <Debug condition={condition} />
        </div>
        <img id="logo" alt="logo" src="codestates-logo.png" />
      </main>
    </div>
  );
}
