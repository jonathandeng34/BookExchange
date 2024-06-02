import ajv from "ajv"

const AcceptTwoSchema = {
    type: "object",
    properties: {
        book_title: {type: "string"}
    },
    required: ["book_title"],
    additionalProperties: false
};
export { AcceptTwoSchema };


const CreateExchangeSchema = {
    type: "object",
    properties: {
        book_ID: {type: "string"}
    },
    required: ["book_ID"],
    additionalProperties: false
};
export { CreateExchangeSchema };
