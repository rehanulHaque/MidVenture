import cloudinary from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/openai"
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import axios from "axios";


export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const user = await prisma.user.findUnique({ where: { id: session.user.id } });
        if (!user || user.credits <= 0) {
            return NextResponse.json({ message: "No credits left. Please upgrade to generate more images." }, { status: 403 });
        }
        const body = await req.json();

        const response = await client.images.generate({
            prompt: body.prompt,
            size: "1024x1024",
            n: 1,
        });
        const imageData = await axios.get(response.data![0].url as string, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(imageData.data, 'binary');
        const uploadResult = await new Promise<any>((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { resource_type: "image", folder: "MedVenture" },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
            stream.end(buffer);
        });
        await prisma.image.create({
            data: {
                userId: session.user.id,
                prompt: body.prompt,
                transformedUrl: uploadResult.secure_url,
            },
        });
        // Decrement credits
        await prisma.user.update({
            where: { id: session.user.id },
            data: { credits: { decrement: 1 } },
        });
        const updatedUser = await prisma.user.findUnique({ where: { id: session.user.id } });
        return NextResponse.json({ message: "Image generated successfully", transformedUrl: response.data![0].url, credits: updatedUser?.credits }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to generate image" }, { status: 500 });
    }
}