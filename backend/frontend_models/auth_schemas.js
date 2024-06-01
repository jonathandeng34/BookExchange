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


const forgotPasswordSchema = {
    type: "object",
    properties: {
        email: {type: "string"},
    },
    required: ["email"],
    additionalProperties: false
};
export { forgotPasswordSchema };


const changePasswordSchema = {
    type: "object",
    properties: {
        password: {type: "string"}
    },
    required: ["password"],
    additionalProperties: false
};
export { changePasswordSchema};