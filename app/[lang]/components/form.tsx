"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getKafkaPost } from "@/lib/kafka";
const list = [
  "Andy",
  "Aubrey",
  "Morgan",
  "Finley",
  "Charlie",
  "Sawyer",
  "Logan",
  "Skyler",
  "Casey",
  "Justice",
  "Quinn",
  "Blake",
  "Sam",
  "Parker",
  "Jordan",
  "Drew",
  "Alex",
  "Hayden",
  "Jessie",
  "Riley",
];

export default function FileInput({ onChange }: any) {
  const autoFill = (e: React.ChangeEvent) => {
    const num = Math.floor(Math.random() * 20);
    const reversedString = list[num]
      .split("")
      .reduce((acc, char) => char + acc, "");

    setValue("name", list[num]);
    setValue("email", `${list[num]}@email.com`);
    setValue("password", reversedString);
  };
  const { register, handleSubmit, setValue } = useForm<HookFormTypes>();

  const onValid = (data: HookFormTypes) => {
    console.log(data);
    getKafkaPost("mysql/users", "post", data);
    onChange(true);
  };

  return (
    <div className="w-full max-w-xs">
      <form onSubmit={handleSubmit(onValid)} className="form">
        <div className="mb-4">
          <label className="label" htmlFor="username">
            Username
          </label>
          <input
            className="input"
            id="username"
            type="text"
            placeholder="Username"
            {...register("name")}
            onChange={(e) => setValue("name", e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            className="input"
            id="email"
            type="text"
            placeholder="Email"
            {...register("email")}
            onChange={(e) => setValue("email", e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            className="input"
            id="password"
            type="password"
            placeholder="******************"
            {...register("password")}
            onChange={(e) => setValue("password", e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button className="btn btn-blue" type="submit" value="send">
            Send
          </button>
          <button
            className="btn hover:underline"
            type="button"
            value="autoFill"
            onClick={autoFill}
          >
            Auto Fill
          </button>
        </div>
      </form>
    </div>
  );
}

interface HookFormTypes {
  name: string;
  email: string;
  password: string;
}
