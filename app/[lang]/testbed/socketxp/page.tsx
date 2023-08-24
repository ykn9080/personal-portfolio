"use client";
import React, { useState, useEffect } from "react";
import executeSocketXp from "@/lib/socketxp";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";

const Form: NextPage = () => {
  const { register, handleSubmit } = useForm();
const onSubmit = async (data: object) => {
  const response = await saveFormData(data);
  if (response.status === 400) {
    // Validation error
  } else if (response.ok) {
    // successful
  } else {
    // unknown error
  }
};

  return (
    <form onSubmit={handleSubmit(saveFormData)}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        autoComplete="email"
        {...register("email", { required: true })}
      />
      <button>Submit</button>
    </form>
  );
};