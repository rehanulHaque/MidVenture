import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const session = await auth()
        if(!session?.user){
            return NextResponse.json({message: "Unauthorize"}, {status: 401})
        }

        const getPhotos = await prisma.image.findMany({
            where: {
                userId: session.user.id
            }
        })
        return NextResponse.json({photos: getPhotos || []}, {status: 200})
    } catch (error) {
        return NextResponse.json({ message: "Failed to get images" }, { status: 500 });
    }
}


