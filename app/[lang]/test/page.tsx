"use client";

import React from "react";

// import { useSelector, useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { updateValue } from "@/redux/features/globalSlice";

const MainPage = () => {
  const dispatch = useAppDispatch();
  const name = useAppSelector((state: RootState) => state.global).name;

  console.log(name);

  return (
    <div>
      {name}
      <button onClick={() => dispatch(updateValue({ name: "hi" }))}>
        test
      </button>
    </div>
  );
};

export default MainPage;
