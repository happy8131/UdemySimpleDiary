import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import OptimizeTest from "./OptimizeTest";

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());
    //  console.log(res);

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });
    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    console.log(data);
    setData([newItem, ...data]);
  };

  const onRemove = (targetId) => {
    // console.log(`${targetId}가 삭제되었습니다`);
    const newDiaryList = data.filter((it) => it.id !== targetId);
    console.log(newDiaryList);
    setData(newDiaryList);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
    //수정대상이라면 newContent를 리턴해주고 아니면 원래 데이터(it)를 리턴해줄거다
  };

  const getDiaryAnalysis = useMemo(() => {
    //console.log("일기 분석 시작");

    const goodCount = data.filter((it) => it.emotion >= 3).length; //기분좋은 점수 개수
    const badCount = data.length - goodCount; //기분이 나쁜 일기 개수 (일기 전체 개수 - 좋은점수)
    const goodRatio = (goodCount / data.length) * 100; //좋은일기 비율

    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis; //useMemo를 하면 값으로 출력한다

  return (
    <div className="App">
      <OptimizeTest />
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기: {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
}

export default App;
/*
LifeCycle

화면에 나타나는 것 Mount

변화 update(리렌더)

화면에 사라짐 UnMount

 */
