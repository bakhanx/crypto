import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Coin } from "./routes/Coin";
import { Coins } from "./routes/Coins";
import React from "react";
import { TopNav } from "./TopNav";

export const Router = () => {
  return (
    <BrowserRouter>
     <TopNav />
      <Routes>
        <Route path="/crypto" element={<Coins />} />
        <Route path="/:coinId/*" element={<Coin />} />
      </Routes>
    </BrowserRouter>
  );
};
