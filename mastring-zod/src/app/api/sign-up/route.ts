import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();

    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingUserVerifiedByUsername) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 400 }
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      if(existingUserByEmail.isVerified){
        return Response.json({
            success:false,
            message:'Email already existed'
        },{status:400})
      }else{
        const hashedPassword = await bcrypt.hash(password,10)
        existingUserByEmail.username = username;
        existingUserByEmail.password = hashedPassword,
        existingUserByEmail.verifyCode = verifyCode,
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
        await existingUserByEmail.save()
        const emailResponse = await sendVerificationEmail(email, username, verifyCode);
        if(!emailResponse.success){
          return Response.json({
            success:false,
            message:emailResponse.message
          },{status:500})
        }
        return Response.json({
          success:true,
          message:'Account updated. Please verify your email again'
        },{status:200})
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        isVerified: false,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isAcceptedMessage: true,
        message: [],
      });

      await newUser.save();

     // send email verification
     const emailResponse = await sendVerificationEmail(email,username,verifyCode)

     if(!emailResponse.success){
        return Response.json({
            success:false,
            message:emailResponse.message
        },{status:500})
     }

     return Response.json({
        success:true,
        message:'You are registered successfully. Please verify your email'
     },{status:201})

    }
  } catch (error) {
    console.error("Failed to register user", error);
    return Response.json(
      {
        success: false,
        message: "Failed to register user",
      },
      {
        status: 500,
      }
    );
  }
}
