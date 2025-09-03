import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(req :NextRequest, {params}: { params: Promise<{ id: string }> }){
    try {
        const session = await auth()
        const {id} = (await params)
        if(!session?.user){
            return NextResponse.json({message: "Unauthorize"}, {status: 401})
        }    
        await prisma.image.delete({
            where: {
                id
            }
        })
        return NextResponse.json({message: "Images deleted successfully"}, {status: 200})
    } catch (error) {
        return NextResponse.json({ message: "Failed to delete images" }, { status: 500 });
    }
}