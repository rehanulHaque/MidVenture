
"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Gem, PlusCircle } from "lucide-react";

const plans = [
  { name: "Starter", points: 50, price: "$5" },
  { name: "Pro", points: 150, price: "$12" },
  { name: "Elite", points: 500, price: "$35" },
];

export default function Page() {
  const [points, setPoints] = useState(20);

  const handlePurchase = (planPoints: number) => {
    setPoints(points + planPoints);
    // Add payment logic here
  };

  return (
    <div className="py-10 px-4 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-white flex items-center gap-2">
        <Gem size={28} /> Upgrade
      </h1>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">Still In Development</p>
      <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl shadow p-6 flex flex-col gap-6">
        <div className="mb-4">
          <div className="text-lg font-semibold text-zinc-700 dark:text-zinc-200">Current Points</div>
          <div className="text-2xl font-bold text-primary flex items-center gap-2 mt-2">
            <Gem size={22} className="text-yellow-500" /> {points} pts
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {plans.map(plan => (
            <div key={plan.name} className="bg-white dark:bg-zinc-800 rounded-lg p-4 flex items-center justify-between border border-zinc-200 dark:border-zinc-700">
              <div>
                <div className="text-lg font-bold text-zinc-900 dark:text-white">{plan.name}</div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">{plan.points} points</div>
              </div>
              <Button onClick={() => handlePurchase(plan.points)} className="flex items-center gap-2">
                <PlusCircle size={18} /> Buy for {plan.price}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
