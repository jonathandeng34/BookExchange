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
