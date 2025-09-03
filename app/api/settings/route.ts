import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest){
    try {
        const body = await req.json()
        const session = await auth()
        if(!session?.user){
            return NextResponse.json({message: "Unauthorize"}, {status: 401})
        }

        await prisma.user.update({
            where: {
                id: session.user.id
            },
            data: {
                name: body.username
            }
        })
        return NextResponse.json({message: "Settings updated successfully"}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Something went wrong"}, {status: 500})
    }
}