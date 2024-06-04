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