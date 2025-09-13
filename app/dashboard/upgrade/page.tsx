
"use client"
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Gem, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const plans = [
  { name: "Starter", points: 25, price: 5, id: 1 },
  { name: "Pro", points: 60, price: 12, id: 2 },
  { name: "Elite", points: 180, price: 35, id: 3 },
];
declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function Page() {
  const [points, setPoints] = useState(20);
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; points: number; price: number; id: number; }>();

  const getCurrentPoints = async()=> {
    try {
      const response = await axios.get("/api/user-credits");
      setPoints(response.data.credits)
    } catch (error: any) {
      toast.error(error.response.data.message || "Something went wrong");
      setPoints(0)
    }
  }
  useEffect(()=> {
    getCurrentPoints()
  }, [])

  useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);
    const handlePurchase = async (id: number) => {
      setSelectedPlan(plans.find((plan) => plan.id === id)!);
        try {
            const { data } = await axios.post("/api/checkout", { name: selectedPlan?.name, price: selectedPlan?.price });
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: data.order.price,
                currency: "USD",
                name: "MidVenture",
                description: "Purchase",
                order_id: data.order.id,
                handler: async function (response: any) {
                    toast.success("Payment successful");
                },
                prefill: {
                    name: "",
                    email: "",
                },
                theme: {
                    color: "#6366f1",
                },
            };

            if (window.Razorpay) {
                const razorpay = new window.Razorpay(options);
                razorpay.open();
            } else {
                throw new Error("Razorpay not loaded");
            }
        } catch (error: any) {
            toast.error(error.response.data.message || "Something went wrong");
        }
    }

  return (
    <div className="py-10 px-4 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-white flex items-center gap-2">
        <Gem size={28} /> Upgrade
      </h1>
      {/* <p className="text-sm text-zinc-500 dark:text-zinc-400">Still In Development</p> */}
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
              <Button onClick={() => handlePurchase(plan.id)} className="flex items-center gap-2">
                <PlusCircle size={18} /> Buy for ${plan.price}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
