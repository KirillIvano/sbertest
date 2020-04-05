export const enchanceJsonResponse = res => {
    const ok = res.ok;

    return res.json().then(
        json => {
            json.ok = ok;
            return json;
        },
    );
};


export const enchanceTextResponse = res => {
    const ok = res.ok;

    return res.text().then(
        text => ({text, ok}),
    );
};
