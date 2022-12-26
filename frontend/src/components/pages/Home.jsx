import React from "react";
import { Categories } from "../Home Components/Categories";
import Hero from "../Home Components/Hero";
import Zigzag from "../Home Components/Zigzag";

export const Home = () => {
  return (
    <div className="">
      <Hero />
      <Categories />
      <Zigzag />
    </div>
  );
};
