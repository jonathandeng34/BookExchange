import React, { useState } from "react";
import BookIcon from '@mui/icons-material/Book';

export function BookImage(props) {

    const [hasImage, setHasImage] = useState(false);

    const imageLoaded = () => {
        setHasImage(true);
    };

    return (
                <>
                <BookIcon fontSize="large" style={hasImage ? {display: "none"} : {}}/>
                <img
                    style={{
                        display: (hasImage ? "block" : "none"),
                        WebkitUserSelect: "none",
                        margin: "auto",
                        backgroundColor: "hsl(0, 0%, 90%)",
                        transition: "background-color 300ms"
                    }}
                    src={(props.book && props.book._id) ? "http://localhost:4000/book/downloadImage/"+props.book._id : null}
                    alt="Image"
                    onLoad={imageLoaded}
                    />
                </>
    );
}