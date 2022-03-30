import { useState } from "react";

const useQueryParam = (key: string, initialValue?: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  const updateSearchValue = (value: string) => {
    searchParams.set(key, value);
    window.history.pushState(null, "", `?${searchParams}`);
  };
  const [value, setValue_] = useState(() => {
    if (!searchParams.get(key) && initialValue) {
      updateSearchValue(initialValue);
    }
    return searchParams.get(key) || "";
  });
  const setValue = (value_: string) => {
    if (value_ !== value) {
      updateSearchValue(value);
    }
    setValue_(value_);
  };
  return [value, setValue] as const;
};

export default useQueryParam;
