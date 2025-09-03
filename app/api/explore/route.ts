import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const images = await prisma.image.findMany({})
        return NextResponse.json({images}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Something went wrong"}, {status: 500})
    }
}