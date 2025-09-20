import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/option";
import UserModel from "@/model/User";

export async function Delete(
  request: Request,
  { params }: { params: { messageId: string } }
) {
  const messageId = params?.messageId;

  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated",
      },
      { status: 401 }
    );
  }

  try {
    const response = await UserModel.updateOne(
      { _id: user._id },
      { $pull: { message: { _id: messageId } } }
    );

    if (response.modifiedCount == 0) {
      return Response.json(
        {
          success: false,
          message: "Message not found or already deleted",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      success: false,
      message: "Failed to delete message ",
    },{status:500});
  }
}
