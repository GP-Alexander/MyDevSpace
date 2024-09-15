export const ValidateSchema = (schema) => async (req, res, next) => {
 
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        console.log(error);

        return res.status(400).json({ error: error.errors.map((err) => err.message) });
    
    }

}