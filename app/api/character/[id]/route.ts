import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import {auth} from "@/src/lib/auth";
import {revalidatePath} from "next/cache";

type Params = {
    id:string
}

export async function GET(req: Request, context: { params: Params }) {
    const id = context.params.id;

    if (!id) {
        return NextResponse.json({ message: "Character not found" }, { status: 404 });
    }

    const character = await prisma.characters.findFirst({
        where: {
            id: id,
        },
        include: {
            classe: true,
        },
    });

    if (!character) {
        return NextResponse.json({ message: "Character not found" }, { status: 404 });
    }

    return NextResponse.json(character, { status: 200 });
}

export async function POST(req: Request, context: { params: Params }) {
    const { pseudo,classeName,gender} = await req.json();

    const session = await auth();

    await prisma.characters.update({
        data: {
            classe: { connect: { slug: classeName}},
            pseudo: pseudo,
            gender:gender,
            user: { connect: { email: session.user.email }},
        },
        where: {
            id: context.params.id,
        }
    });
    return NextResponse.json({ message: "Created updated" }, { status: 200 });
}

export async function DELETE(req: Request, context: { params: Params }) {
    await prisma.characters.delete({
        where: {
            id: context.params.id,
        }
    });
    return NextResponse.json({ message: "Deleted" }, { status: 200 });
}
