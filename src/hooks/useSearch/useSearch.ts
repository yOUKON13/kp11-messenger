function useSearch(onDone: Function) {
  let typingTimer: any;
  const doneTypingInterval = 500;

  function onKeyUp() {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
  }

  function onKeyDown() {
    clearTimeout(typingTimer);
  }

  function doneTyping() {
    onDone();
  }

  return [onKeyUp, onKeyDown];
}

export default useSearch;
