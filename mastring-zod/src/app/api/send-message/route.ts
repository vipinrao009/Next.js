import dbConnect from "@/lib/dbConnect";
import UserModel, { Message } from "@/model/User";

export async function POST(request: Request) {
  dbConnect();
  const { username, content } = await request.json();

  try {
    const user = await UserModel.findOne(username);
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }
    if (!user.isAcceptedMessage) {
      return Response.json(
        {
          success: false,
          message: "User is not accepting the messages",
        },
        { status: 400 }
      );
    }

    const newMessage = { content, createdAt: new Date() };
    user.message.push(newMessage as Message);
    await user.save();

    return Response.json(
      {
        success: true,
        message: "Messsage sent successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json({
      success: false,
      message: "Failed to send message",
    });
  }
}
