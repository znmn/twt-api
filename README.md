# Twitter V1 API Wrapper

Simple Twitter API V1 wrapper for Node.js

- Support using "oauth_token" and "oauth_token_secret" from X-Auth Client Twitter Login
- Using Package : [twitter-api-v2](https://github.com/plhery/node-twitter-api-v2)

## Installation

```bash
npm install twt-api
```

## Quick Example

```javascript
const TwitterAPI = require("twt-api");

(async () {
    const client = new TwitterApi({
        appKey: "CONSUMER_KEY",
        appSecret: "CONSUMER_SECRET",
        accessToken: "oauth_token",
        accessSecret: "oauth_token_secret",
    })

    const me = await client.getMyInfo();
    console.log(me);
})();
```

## How to get oauth and oauth_secret Twitter Token ?

Use This Package to Get oauth and oauth_secret Twitter Token : [znmn/xauth-login](https://github.com/znmn/xauth-login)

## Supported Method

- **_getMyInfo()_**

Get Info For Current User

```javascript
client.getMyInfo();
```

- **_follow()_**

Follow User By Username/ID User

```javascript
client.follow(user);
```

- **_unfollow()_**

Unfollow User By Username/ID User

```javascript
client.unfollow(user);
```

- **_tweet()_**

Create a Tweet

```javascript
client.tweet(text);
```

- **_retweet()_**

Retweet a Tweet by Tweet ID/Link Tweet

```javascript
client.retweet(tweet);
```

- **_getUserInfo()_**

Get Info For Another User By Username/ID User

```javascript
client.getUserInfo(user);
```

## My Social Media

    ☑ INSTAGRAM	: https://instagram.com/xznmnx
    ☑ FACEBOOK	: https://www.facebook.com/mr.znmn
    ☑ Github	: https://www.github.com/znmn
