const apiKey = "live_XHAfl7nzBqEhHBHdkb3XQTY6goACC8Z2AtXCx56H28V53ApeQEfUQ4MQjd1vv917";

export function fetchCats(limit, order, page, breedIds = []) {
    const url = new URL("https://api.thecatapi.com/v1/images/search")
    url.searchParams.append("limit", limit);
    url.searchParams.append("has_breeds", 1);
    url.searchParams.append("order", order);
    url.searchParams.append("page", page);
    url.searchParams.append("api_key", apiKey);

    if (breedIds.length > 0) {
        url.searchParams.append("breed_ids", breedIds.join(","));
    }

    return fetch(url).then((res) => res.json());
}

//導入品種
export function fetchBreads() {
    return fetch("https://api.thecatapi.com/v1/breeds").then((res) => res.json());
}