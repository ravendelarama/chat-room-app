import db from "@/lib/db";
import { NextResponse } from "next/server";


async function GET(req: Request, res: NextResponse) {

    try {
        const data = await db.room.findMany({
            orderBy: {
                name: "asc"
            },
        })

        return NextResponse.json({
            data
        }, {
            status: 200
        });
    } catch {
        return NextResponse.json({
            message: "Internal Error"
        }, {
            status: 500
        })
    }
}

export {
    GET
}