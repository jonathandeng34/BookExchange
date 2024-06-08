import React from "react";
import { useLocation } from "react-router-dom";

async function snackbarError(response, setOpen, setSnackbarText) {
    let errorText = await response.text();
    try {
        let errorJson = JSON.parse(errorText);
        if(!errorJson["reason"]) {
            throw "Not a human readable error";
        }
        setSnackbarText(errorJson["reason"]);
        setOpen(true);
        return;
    }
    catch(e) {
        throw errorText;
    }
}

export { snackbarError };

//CREDIT: https://v5.reactrouter.com/web/example/query-parameters
function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

export { useQuery };