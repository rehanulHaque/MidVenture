import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorize" }, { status: 401 })
        }

        const { name, price } = await req.json();
        const order = await razorpay.orders.create({
            amount: Number(price) * 100,
            currency: "INR",
            receipt: `receipt_#${name}`,
        });

        await prisma.user.update({
            where: {
                id: session.user.id
            },
            data: {
                credits: {
                    increment: Number(price * 5)
                }
            }
        })

        return NextResponse.json(
            { message: "Order created successfully", success: true, order },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
    }
}