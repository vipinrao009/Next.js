import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { usernameValidation } from "@/schemas/signUpSchema";
import z from "zod";


const UsernameQuerySchema = z.object({
    username:usernameValidation
})

export async function GET(request:Request){
    await dbConnect()

    try {
        const {searchParams} = new URL(request.url)
        const queryParams = {
            username:searchParams.get('username') // jab hme query se data nikalna ho to hme isi way se data nikalna chahiye 
        }
        // validate with zode
        const result = UsernameQuerySchema.safeParse(queryParams)
        // console.log(result)  // todo=> print and see carafully

        if(!result.success){
            const usernameError = result.error.format().username?._errors || []
            return Response.json({
                success:false,
                message: usernameError.length > 0
                ? usernameError.join(',')
                : "Invalid query parameter"
            })
        }

        const { username } = result.data;
        const existingVerifiedUser = await UserModel.findOne({username, isVerified:true})
        if(existingVerifiedUser){
            return Response.json({
                success:false,
                message:"Username already taken please choose another"
            },{status:400})
        }

        return Response.json({
            success:true,
            message:"Username is available..."
        },{status:200})

    } catch (error) {
        console.error("Error checking username",error)

        return Response.json({
            success:false,
            message:"Error checking username"
        },{status:500})
    }
}