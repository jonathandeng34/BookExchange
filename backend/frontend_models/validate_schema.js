import Ajv from 'ajv'

const ajv = new Ajv();

function validateSchema(schema) {
    return (req, res, next) => {
        const validator = ajv.compile(schema);
        const valid = validator(req.body);
        if(!valid) {
            res.status(400);
            res.send("Malformed JSON");
            return;
        }
        next();
    };
}

export default validateSchema;