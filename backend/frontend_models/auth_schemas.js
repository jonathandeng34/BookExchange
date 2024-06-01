import ajv from "ajv"

const RegisterSchema = {
    type: "object",
    properties: {
        email: {type: "string"},
        username: {type: "string"},
        password: {type: "string"}
    },
    required: ["email", "username", "password"],
    additionalProperties: false
};
export { RegisterSchema };


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


const ForgotPasswordSchema = {
    type: "object",
    properties: {
        email: {type: "string"}
    },
    required: ["email"],
    additionalProperties: false
};
export { ForgotPasswordSchema };


const ChangePasswordSchema = {
    type: "object",
    properties: {
        password: {type: "string"}
    },
    required: ["password"],
    additionalProperties: false
};
export { ChangePasswordSchema };