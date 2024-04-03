export interface SitecoreResponseContent {
  description: string;
  id: string;
  img: string;
  name: string;
  productdescription: string;
  productid: string;
  productname: string;
  productprice: string;
  source_id: string;
  type: string;
  url: string;
}

export interface SitecoreResponseSuggestions {
  text?: string;
  freq?: number;
}
export interface SitecoreResponseFacets {
  name: string;
  label: string;
  value: Array<SitecoreResponseFacetsValue>;
}
export interface SitecoreResponseFacetsValue {
  id: string;
  text?: string;
  count?: number;
}
export interface SitecoreResponseSort {
  name: string;
  label: string;
}
//////////////////

export interface MyValue {
  name: string;
}
export interface Filter {
  values: string[];
  type: string;
}

export interface TypeItem {
  name: string;
  filter: Filter;
}

// let responseToken = await fetch('https://api.rfksrv.com/account/1/access-token', {
//   method: "Post",
//   headers: { 'x-api-key': '01-6744eb85-8e5639d3ea9c986a6a9fb5f1b0681a2a1ff94887',
//   'scope': 'search-rec',
//   'accessExpiry': '86400000',
//   'refreshExpiry': '604800000',
//   'Content-Type': 'application/json' },
//   body: JSON.stringify(search)
// }).then(responseToken=>responseToken.json())
// console.log(responseToken);

// const request: SitecoreRequestPayload = {
//   context: {
//    page:{
//     uri: "/search"
//    }
//   },
//   widget:{
//     items:[{
//       entity: "content",
//       rfk_id:"rfkid_6",
//       search:{
//         content:{}
//       }
//     }]
//   }
// }

// request.widget.items[0].search.limit=10;
// request.widget.items[0].search.offset=10;
// const key : Query = {
//   keyphrase: "product"
// }
// request.widget.items[0].search.query= key;
