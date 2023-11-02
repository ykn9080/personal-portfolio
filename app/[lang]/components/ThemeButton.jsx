"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { updateValue } from "@/redux/features/globalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export const ThemeButton = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }
  const changeTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    setCookie("theme", resolvedTheme === "dark" ? "light" : "dark", 365);
    dispatch(
      updateValue({ theme: resolvedTheme === "dark" ? "light" : "dark" })
    );
  };
  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-slate-500"
      onClick={changeTheme}
    >
      {resolvedTheme === "dark" ? (
        <SunIcon className="h-5 w-5 text-orange-300" />
      ) : (
        <MoonIcon className="h-5 w-5 text-orange-200" />
      )}
    </button>
  );
};
