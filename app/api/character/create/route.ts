import {prisma} from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import {auth} from "@/src/lib/auth";

export async function POST(req: Request) {
    const { pseudo,classeName,gender} = await req.json();

    const session = await auth();

    await prisma.characters.create({
        data: {
            classe: { connect: { slug: classeName}},
            pseudo: pseudo,
            gender:gender,
            user: { connect: { email: session.user.email }},
        },
    });

    return NextResponse.json({ message: "Created character" }, { status: 200 });
}