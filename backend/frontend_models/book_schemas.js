import ajv from "ajv"

const BookCommentSchema = {
    type: "object",
    properties: {
        text: {type: "string"},
        starRating: {type: "number", minimum: 1, maximum: 5}
    },
    required: ["text", "starRating"],
    additionalProperties: false
};

export { BookCommentSchema };


const UploadBookSchema = {
    type: "object",
    properties: {
        title: {type: "string"},
        author: {type: "string"},
        genre: {type: "string"}
    },
    required: ["title", "author", "genre"],
    additionalProperties: false
};
export { UploadBookSchema };


const SearchSchema = {
    type: "object",
    properties: {
        searchQuery: {type: "string"},
        genreFilter: {type: "array"}
    },
    required: ["searchQuery"],
    additionalProperties: false
};
export { SearchSchema };


