const Utils = {
    parseRequestURL: () => {
        let url = location.hash.slice(1).toLowerCase() || '/';
        let [path, queryString] = url.split("?");
        let r = path.split("/");

        let request = {
            resource: r[1] || null,
            id: r[2] || null,
            verb: r[3] || null,
            query: {}
        };

        if (queryString) {
            queryString.split("&").forEach(pair => {
                const [key, value] = pair.split("=");
                request.query[key] = decodeURIComponent(value);
            });
        }

        return request;
    }
};

export default Utils;
