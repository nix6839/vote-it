import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  callback?: (entry: IntersectionObserverEntry) => void;
}

/**
 * This hook can handle only one element.
 */
export default function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {},
) {
  const { callback } = options;
  const [ref, setRef] = useState<Element | null>(null);

  const callbackRef = useRef<UseIntersectionObserverOptions['callback']>();

  // Store callback in a `ref`, so we can access the latest instance
  // inside the `useEffect`, but without triggering a rerender.
  callbackRef.current = callback;

  useEffect(() => {
    if (ref === null) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      callbackRef.current?.(entry);
    });
    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return { ref: setRef };
}
