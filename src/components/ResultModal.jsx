import { forwardRef, useImperativeHandle, useRef } from "react";

const ResultModal = forwardRef(function ResultModal(
  { targetTime, remainingTime, onReset },
  ref
) {
  const dialog = useRef();

  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2); //소수점 2자리까지
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return (
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {userLost && <h2>실패</h2>}
      {!userLost && (
        <>
          <h2>성공!</h2>
          <h2>점수:{score}</h2>
        </>
      )}
      <p>
        목표시간: <strong>{targetTime}초</strong>
      </p>
      <p>
        당신은 <strong>{formattedRemainingTime} 초</strong>를 남기고 타이머를
        종료하였습니다
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>닫기</button>
      </form>
    </dialog>
  );
});

export default ResultModal;
