import { useEffect, useRef, useState } from 'react';

export default function useAnimatedUnmount(visible) {
  const [shouldRender, setShouldRender] = useState(visible);
  const animatedElementRef = useRef();

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
    }

    function handleAnimationEnd() {
      setShouldRender(false);
    }

    if (!visible && animatedElementRef.current) {
      animatedElementRef.current.addEventListener(
        'animationend',
        handleAnimationEnd,
      );
    }

    return () => {
      if (animatedElementRef.current) {
        animatedElementRef.current.removeEventListener(
          'animationend',
          handleAnimationEnd,
        );
      }
    };
  }, [visible]);

  return { shouldRender, animatedElementRef };
}
