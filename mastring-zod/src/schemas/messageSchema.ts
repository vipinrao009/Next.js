import {z} from 'zod'

export const messageSchema = z.object({
    content: z
     .string()
     .min(10, {message:'Content must be atleast of 10 charactors'})
     .max(300,{message:'Content must be no longer more than 300 charactors'})

})