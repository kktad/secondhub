export const RequestPayload = () => ({
    "context": {
        "geo": {
            "ip": undefined,
            "location": undefined
        },
        "ids": {
            "property1":undefined,
            "property2": undefined
        },
        "locale": undefined,
        "page": {
            "uri": "/search"
        }

    },
    "widget": {
        "items": [
            {
                "entity": "content",
                "rfk_id": "rfkid_6",
                "search": {
                    "content": {},
                    "facet": {
                        "all": false,
                        "types":undefined
                    },
                    "sort": {
                        "value": undefined,
                        "choices": true
                    },
                    "limit": undefined,
                    "offset": undefined,
                    "query":{
                        "keyphrase": undefined
                    },
                    "suggestion": [
                        {                      
                        "keyphrase_fallback": true,
                        "max": 10,
                        "name": "title_context_aware"
                        }
                    ]
                }
            }
        ]
    }

})

