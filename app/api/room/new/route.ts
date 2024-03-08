import db from "@/lib/db";
import { NextResponse } from "next/server";


async function POST(req: Request) {
    try {
        const { name } = await req.json();

        await db.room.create({
            data: {
                name
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