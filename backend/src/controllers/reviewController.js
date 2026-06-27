import Review from "../models/Review.js";
import {reviewCode}
from "../services/geminiService.js";



export const analyzeCode =
async(req,res)=>{


try{


    const {
    code,
    language
    }=req.body;



    const result =
    await reviewCode(
                code,
                language
    );



    const review = await Review.create({
                    user:req.user._id,
                    code,
                    language,
                    result,
                    score:result.score

    });



    res.json(review);


}

catch(error){

res.status(500).json({
message:error.message
});

}


}