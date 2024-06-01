import ajv from "ajv"

const RateSchema = {
    type: "object",
    properties: {
        star_rating: {type: "number"}
    },
    required: ["star_rating"],
    additionalProperties: false
};
export { RateSchema };


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
        search_query: {type: "string"},
        selected_genres: {type: "array"}
    },
    required: ["search_query"],
    additionalProperties: false
};
export { SearchSchema };


