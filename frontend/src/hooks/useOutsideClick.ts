import React, { useEffect, useCallback } from "react";

export const useOutsideClick = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void
) => {
  const handleClickOutside = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    },
    [ref, callback]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [handleClickOutside]);
};
