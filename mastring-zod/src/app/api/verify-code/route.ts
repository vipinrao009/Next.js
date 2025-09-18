import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
  dbConnect();

  try {
    const { username, code } = await request.json();
    const decodedUsername = decodeURIComponent(username); // decodeURIComponent se thoda username safe rahega kyuki ye params se aa raha hai we can also use directly without decodeURIComponent

    const user = await UserModel.findOne({ username: decodedUsername });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 401 }
      );
    }
    const isValidCode = user.verifyCode === code;
    const isNotExpiredCode = new Date(user.verifyCodeExpiry) > new Date();

    if (isValidCode && isNotExpiredCode) {
      ((user.isVerified = true), await user.save());
      return Response.json(
        {
          success: true,
          message: "User verified successfully....",
        },
        { status: 200 }
      );
    } else if (!isNotExpiredCode) {
      return Response.json(
        {
          success: false,
          message:
            "Verification code has expired, please sign-in again to get a new code",
        },
        { status: 400 }
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "Incorrect verification code",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error in verify code..", error);
    return Response.json({
      success: false,
      message: "Error in verify code",
    });
  }
}
