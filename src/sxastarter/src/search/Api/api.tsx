import { EventTrackPayload } from '../payloads/EventTrackPayload';

export const discoverAPI = async (payload: any) => {
  // await accessTokenAPI();
  const discover_api: any = process.env.NEXT_PUBLIC_DISCOVER_API;
  const requestToken = process.env.NEXT_PUBLIC_bearer_token;
  let response = await fetch(discover_api, {
    method: 'Post',
    headers: { Authorization: 'Bearer ' + requestToken, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
  response = response.widgets[0];
  return response;
};

export const eventTrackAPI = async (
  pathname: string,
  uuid: any,
  email: any,
  eid: any,
  gender: any,
  action: any
) => {
  const eventpayload = EventTrackPayload();
  eventpayload.value.context.page.uri = pathname;
  eventpayload.uuid = uuid;
  eventpayload.action = action;
  eventpayload.value.context.user.email = email;
  eventpayload.value.context.user.eid = eid;
  eventpayload.value.context.user.gender = gender;
  const event_api: any = process.env.NEXT_PUBLIC_EVENT_API;
  const requestToken = process.env.NEXT_PUBLIC_bearer_token;
  const response = await fetch(event_api, {
    method: 'Post',
    headers: { Authorization: 'Bearer ' + requestToken, 'Content-Type': 'application/json' },
    body: JSON.stringify(eventpayload),
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
  console.log(response);
};
