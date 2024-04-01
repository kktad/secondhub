
import { EventTrackPayload } from "../payloads/EventTrackPayload";

export const discoverAPI = async (payload: any) => {
    // await accessTokenAPI();
    const discover_api: any = process.env.NEXT_PUBLIC_DISCOVER_API
    const requestToken = process.env.NEXT_PUBLIC_bearer_token;
    let response = await fetch(discover_api, {
        method: "Post",
        headers: { 'Authorization': 'Bearer ' + requestToken, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .catch(error => console.error(error));
    response = response.widgets[0];
    return response;
}

export const eventTrackAPI = async (pathname: string, uuid: any, email: any, eid: any, gender: any, action: any) => {
    const eventpayload = EventTrackPayload();
    eventpayload.value.context.page.uri = pathname
    eventpayload.uuid = uuid;
    eventpayload.action = action;
    eventpayload.value.context.user.email = email
    eventpayload.value.context.user.eid = eid
    eventpayload.value.context.user.gender = gender
    const event_api: any = process.env.NEXT_PUBLIC_EVENT_API;
    const requestToken = process.env.NEXT_PUBLIC_bearer_token;
    let response = await fetch(event_api, {
        method: "Post",
        headers: { 'Authorization': 'Bearer ' + requestToken, 'Content-Type': 'application/json' },
        body: JSON.stringify(eventpayload)
    })
        .then(response => response.json())
        .catch(error => console.error(error));
}

const accessTokenAPI = async () => {
    const accessTokenAPI: any = process.env.NEXT_PUBLIC_ACCESS_TOKEN_API;
    let responseToken = await fetch(accessTokenAPI, {
       // mode: 'no-cors',
        method: 'Post',
        headers: {
            'x-api-key': '01-6744eb85-8e5639d3ea9c986a6a9fb5f1b0681a2a1ff94887',
            'scope': 'search-rec',
            'accessExpiry': '86400000',
            'refreshExpiry': '604800000',
            'Content-Type': 'application/json'
        }
        // body: JSON.stringify("")
    }).then(responseToken => responseToken.json()).catch(error => console.log(error));
    // const response1 = responseToken.json();
    // console.log(responseToken);
}