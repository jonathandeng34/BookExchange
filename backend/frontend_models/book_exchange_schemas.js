import ajv from "ajv"

const AcceptTwoSchema = {
    type: "object",
    properties: {
        bookId: {type: "string"}
    },
    required: ["bookId"],
    additionalProperties: false
};
export { AcceptTwoSchema };


const CreateExchangeSchema = {
    type: "object",
    properties: {
        bookId: {type: "string"}
    },
    required: ["bookId"],
    additionalProperties: false
};
export { CreateExchangeSchema };

const MessageSchema = {
    type: "object",
    properties: {
        content: {type: "string"}
    },
    required: ["content"],
    additionalProperties: false
};

export { MessageSchema };
