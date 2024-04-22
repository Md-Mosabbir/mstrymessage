import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function POST(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions)
    const user = session?.user as User

    if(!session || !session.user){
        return Response.json({success: false, message: "Unauthorized"}, {status: 401})
    }

    const userId = user._id
    const {acceptMessages} =  await request.json()

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(userId, {isAcceptingMessages: acceptMessages}, {new: true})

        if(!updatedUser){
            return Response.json({success: false, message: "User not found"}, {status: 401})
        }

        return Response.json({success: true, message: "Accept messages updated",
        updatedUser
        }, {status: 200})


    } catch (error: any) {
        console.error("Error updating accept messages: ", error)
        return Response.json({success: false, message: "Error updating accept messages"}, {status: 500})
    }

}

export async function GET(request: Request) {

    await dbConnect();

    const session = await getServerSession(authOptions)
    const user = session?.user as User

    if(!session || !session.user){
        return Response.json({success: false, message: "Unauthorized"}, {status: 401})
    }

    const userId = user._id

    try {
        const user = await UserModel.findById(userId)

        if(!user){
            return Response.json({success: false, message: "User not found"}, {status: 401})
        }

        return Response.json({success: true, message: "Accept messages status",
        isAcceptingMessages: user.isAcceptingMessage
        }, {status: 200})

    } catch (error: any) {
        console.error("Error getting accept messages: ", error)
        return Response.json({success: false, message: "Error getting accept messages"}, {status: 500})
    }
}



