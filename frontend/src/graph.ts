import { graphConfig } from "./auth-config";

// Attaches a given access token to MS Graph API call. Returns user information.
export async function callMsGraph(accessToken: any) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(graphConfig.graphMeEndpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}
