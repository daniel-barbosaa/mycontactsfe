import { createRef, useCallback, useEffect, useRef, useState } from 'react';

export default function useAnimatedList() {
  const [items, setItems] = useState([]);
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState([]);
  const animatedRefs = useRef(new Map());
  const animatedEndListeners = useRef(new Map());

  const handleAnimationEnd = useCallback(itemId => {
    const removeListener = animatedEndListeners.current.get(itemId);
    removeListener();

    animatedEndListeners.current.delete(itemId);
    animatedRefs.current.delete(itemId);

    setItems(prevState => prevState.filter(item => item.id !== itemId));
    setPendingRemovalItemsIds(prevState =>
      prevState.filter(id => itemId !== id),
    );
  }, []);

  useEffect(() => {
    pendingRemovalItemsIds.forEach(itemId => {
      const animatedRef = animatedRefs.current.get(itemId);
      const animatedElements = animatedRef?.current;
      const alreadyHasListener = animatedEndListeners.current.has(itemId);

      if (animatedElements && !alreadyHasListener) {
        const onAnimationEnd = () => {
          handleAnimationEnd(itemId);
        };
        const removeListener = () => {
          console.log(`remove listener executor para ${itemId}`);
          animatedElements.removeEventListener('animationend', onAnimationEnd);
        };

        animatedElements.addEventListener('animationend', onAnimationEnd);
        animatedEndListeners.current.set(itemId, removeListener);
      }
    });
  }, [pendingRemovalItemsIds, handleAnimationEnd]);

  useEffect(() => {
    const removeListeners = animatedEndListeners.current;
    return () => {
      console.log('cleanUp executou');
      removeListeners.forEach(romeveListener => romeveListener());
    };
  }, []);

  const handleRemoveItems = useCallback(id => {
    setPendingRemovalItemsIds(prevState => [...prevState, id]);
  }, []);

  const getAnimatedRef = useCallback(itemId => {
    let animatedRef = animatedRefs.current.get(itemId);
    if (!animatedRef) {
      animatedRef = createRef();
      animatedRef = animatedRefs.current.set(itemId, animatedRef);
    }
    return animatedRef;
  }, []);

  const renderList = useCallback(
    renderItem =>
      items.map(item => {
        const isLeaving = pendingRemovalItemsIds.includes(item.id);
        const animatedRef = getAnimatedRef(item.id);
        return renderItem(item, {
          isLeaving,
          animatedRef,
        });
      }),
    [items, pendingRemovalItemsIds, getAnimatedRef],
  );

  return {
    handleRemoveItems,
    items,
    setItems,
    renderList,
  };
}
