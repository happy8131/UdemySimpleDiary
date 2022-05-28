import React, { useEffect, useRef, useState } from "react";

const DiaryEditor = ({ onCreate }) => {
  const [state, setState] = useState({ author: "", content: "", emotion: 1 });
  useEffect(() => {
    console.log("DiaryEditor 렌더");
  });
  const authorInput = useRef(); //돔 요소에 접근 할 수 있다
  const contentInput = useRef();

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (state.author.length < 1) {
      //focus
      authorInput.current.focus(); //current 현재 가리키는 값 포커스
      return;
    }

    if (state.content.length < 5) {
      contentInput.current.focus();
      return;
    }
    onCreate(state.author, state.content, state.emotion);
    alert("저장 성공");
    setState({
      author: "",
      content: "",
      emotion: 1,
    });
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          ref={authorInput}
          name="author"
          value={state.author}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <textarea
          ref={contentInput}
          name="content"
          value={state.content}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <button onClick={handleSubmit}>일기 저장하기</button>
    </div>
  );
};

export default React.memo(DiaryEditor);
//onChange 이벤트는 값이 바뀌었을때 발생하는 이벤트
