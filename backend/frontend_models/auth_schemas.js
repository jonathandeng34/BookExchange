import ajv from "ajv"

const LoginSchema = {
    type: "object",
    properties: {
        email: {type: "string"},
        password: {type: "string"}
    },
    required: ["email", "password"],
    additionalProperties: false
};

export { LoginSchema };