import {prisma} from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import {auth} from "@/src/lib/auth";

export async function GET(req: Request) {
    const session = await auth();

    const characters = await prisma.characters.findMany({
        where: {
            userId: session?.user?.id
        },
        include: {
            classe: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    if (!characters) {
        return NextResponse.json({ message: "Character not found" }, { status: 404 });
    }

    return NextResponse.json(characters, { status: 200 });
}