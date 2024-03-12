import { auth } from "@/auth";
import db from "@/lib/db";
import { NextResponse } from "next/server";


async function POST(req: Request) {
    try {
        const session = await auth();
        const { name, image, isPrivate, description } = await req.json();

        console.log(`image:${image}`)

        await db.room.create({
            data: {
                name,
                image,
                private: isPrivate,
                description,
                memberIDs: [session?.user?.id!]
            }
        });

        return NextResponse.json({
            message: "Created a room"
        }, {
            status: 201
        })
    } catch {
        return NextResponse.json({
            message: "Internal Server Error",
        }, {
            status: 500
        })
    }
}

export {
    POST
};