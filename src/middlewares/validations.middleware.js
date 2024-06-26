export const validation = (schema) => {
    let joiValidation = (req, res, next) => {
        let { error } = schema.validate(req.body, {
            abortEarly: false
        });
        if(error){
            let { message } = error
            res.status(422).json({error: message})
        }else{
            next()
        }
    }
    return joiValidation;
}

export const auth = (req, res, next) => {
    if(!req?.session?.user_id){
        return res.status(401).json({error: "No autorizado"})
    }
    next()
}