import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/app/libs/prismabd";

interface IParams {
    listingId: string
}

export async function POST(req: Request, {params}: {params: IParams}) {
    const currentUser = await getCurrentUser()

    if(!currentUser) return NextResponse.error();

    const {listingId} = params

    if(!listingId || typeof listingId !== "string") {
        throw new Error("Invalid ID")
    }

    let favouriteIds = [...(currentUser.favouriteIds || [])]

    favouriteIds.push(listingId)

    const user = await client.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favouriteIds
        }
    })

    return NextResponse.json(user)
}

export async function DELETE(req: Request, {params} : {params: IParams}) {
    const currentUser = await getCurrentUser();

    if(!currentUser) return NextResponse.error();

    const {listingId} = params

    if(!listingId || typeof listingId !== "string") {
        throw new Error("Invalid ID")
    }

    let favouriteIds = [...(currentUser.favouriteIds || [])]

    favouriteIds = favouriteIds.filter((id) => id !== listingId)

    const user = await client.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favouriteIds
        }
    })

    return NextResponse.json(user)
}