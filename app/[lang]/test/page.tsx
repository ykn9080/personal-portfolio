"use client";

import React, { useEffect } from "react";

// import { useSelector, useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { updateValue } from "@/redux/features/globalSlice";

const MainPage = async () => {
  const dispatch = useAppDispatch();
  const name = useAppSelector((state: RootState) => state.global).name;

  // const rtn = await consumer();
  // console.log(rtn);

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
