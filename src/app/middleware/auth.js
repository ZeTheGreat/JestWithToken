const jwt = require('jsonwebtoken');
const { promisify } = require('util');


module.exports = async (req,res,next) =>{
    const authHerader = req.headers.authorization;

    if(!authHerader){
        return res.status(401).json({message:'Token not provided'});
    }

    const [, token]= authHerader.split(' ');
    try{
        const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET);
        req.userId = decoded.id;

        return next();
    }catch(err){
        return res.status(401).json({message:'Token not provided'});
    }

    
};