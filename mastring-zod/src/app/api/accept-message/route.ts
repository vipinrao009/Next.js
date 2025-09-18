import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import UserModel from "@/model/User";

export async function POST(request: Request) {
  dbConnect();
  const session = await getServerSession(authOptions);

  const user: User = session?.user as User; // Assertion => not clear yet please clear the doubt

  if (!session?.user || session) {
    return Response.json(
      {
        success: false,
        message: "User not authenticated",
      },
      { status: 400 }
    );
  }

  const userId = user?._id;
  const { acceptMessage } = await request.json();

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptedMessage: acceptMessage },
      { new: true }
    );

    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "Failed to update user update to accepting message",
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Message acceptance status updated successfully..",
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "Failed to update user update to accepting message",
      },
      { status: 400 }
    );
  }
}

export async function GET(request: Request) {
  dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || session.user) {
    return Response.json(
      {
        success: false,
        message: "User is not authenticated",
      },
      { status: 401 }
    );
  }

  const userId = user._id;

  try {
    const foundUser = await UserModel.findById(userId);
    if (!foundUser) {
      return (
        Response.json({
          success: false,
          message: "User not found",
        }),
        { status: 404 }
      );
    }
    return Response.json(
      {
        success: true,
        isAcceptingMessage: foundUser.isAcceptedMessage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "Failed to update user update to accepting message",
      },
      { status: 400 }
    );
  }
}
