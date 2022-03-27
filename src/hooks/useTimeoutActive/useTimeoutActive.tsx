import { useEffect } from 'react';

function useTimeoutActive(
  state: any,
  dependsOn: any,
  onDestroy: Function,
  time = 2500
) {
  let timeout;

  useEffect(() => {
    if (dependsOn) {
      clearTimeout(timeout);
      onDestroy(true);
      timeout = setTimeout(destroy, time);

      return destroy;
    }
  }, [state]);

  function destroy() {
    onDestroy(false);
    clearTimeout(timeout);
  }
}

export default useTimeoutActive;
