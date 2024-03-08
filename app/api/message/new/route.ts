import { auth } from "@/auth";
import authConfig from "@/auth.config";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

async function POST(req: Request) {
    try {
        const session = await auth();
        console.log(session?.user.id)
        const { content, roomId } = await req.json();
            
        await db.message.create({
            data: {
                content,
                userId: session?.user.id!,
                roomId
            }
        });
        
        return NextResponse.json({
            message: "Added a message"
        }, {
            status: 201
        })
    } catch {
        return NextResponse.json({
            message: "Internal Server Error"
        }, {
            status: 500
        })
    }
}

export {
    POST
}