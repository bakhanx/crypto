import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Coin } from "./routes/Coin";
import { Coins } from "./routes/Coins";
import React from "react";
import { TopNav } from "./component/TopNav";

export const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
     <TopNav />
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path="/:coinId/*" element={<Coin />} />
      </Routes>
    </BrowserRouter>
  );
};
