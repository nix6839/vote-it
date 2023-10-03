import { useCallback, useState } from 'react';

interface UseModalOptions {
  /**
   * @default false
   */
  initialIsOpened?: boolean;
}

export default function useModal(options: UseModalOptions = {}) {
  const { initialIsOpened = false } = options;

  const [isOpened, setIsOpened] = useState(initialIsOpened);

  const open = useCallback(() => {
    setIsOpened(true);
  }, []);

  const close = useCallback(() => {
    setIsOpened(false);
  }, []);

  return { isOpened, open, close };
}
