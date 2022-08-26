const { TwitterApi: Twitter } = require("twitter-api-v2");

class TwitterApiError extends Error {
	constructor(message = "Twitter Api Error") {
		super(message);
		this.name = "TWITTER_API_ERROR";
	}
}

class TwitterApi {
	#twitter;
	constructor({ appKey, appSecret, accessToken, accessSecret } = {}) {
		if (typeof appKey !== "string" || typeof appSecret !== "string" || typeof accessToken !== "string" || typeof accessSecret !== "string") {
			throw new TwitterApiError("BAD DATA { appKey, appSecret, accessToken, accessSecret }");
		}

		try {
			this.#twitter = new Twitter({
				appKey: appKey,
				appSecret: appSecret,
				accessToken: accessToken,
				accessSecret: accessSecret,
			});
		} catch (err) {
			if (err.name == "TypeError") throw new TwitterApiError("BAD DATA");
			else throw err;
		}
	}

	async getMyInfo() {
		try {
			let res = await this.#twitter.v1.get("account/verify_credentials.json", { include_entities: false, skip_status: true, include_email: false });

			return res;
		} catch (err) {
			throw err;
		}
	}

	async follow(user) {
		try {
			let res;

			if (isNaN(user)) res = await this.#twitter.v1.post("friendships/create.json", { screen_name: user });
			else res = await this.#twitter.v1.post("friendships/create.json", { user_id: user });

			return res;
		} catch (err) {
			throw err;
		}
	}

	async unfollow(user) {
		try {
			let res;

			if (isNaN(user)) res = await this.#twitter.v1.post("friendships/destroy.json", { screen_name: user });
			else res = await this.#twitter.v1.post("friendships/destroy.json", { user_id: user });

			return res;
		} catch (err) {
			throw err;
		}
	}

	async tweet(text) {
		try {
			let res = await this.#twitter.v1.post("statuses/update.json", { status: text });

			return res;
		} catch (err) {
			throw err;
		}
	}

	async retweet(tweet) {
		try {
			let tweetId;

			if (tweet.indexOf("/") !== -1 && isNaN(tweet)) tweetId = tweet.match(/[0-9]{15,20}/g)[0];
			else tweetId = tweet;

			let res = await this.#twitter.v1.post(`statuses/retweet/${tweetId}.json`, { id: tweetId });

			return res;
		} catch (err) {
			throw err;
		}
	}

	async getUserInfo(user) {
		try {
			let res;

			if (isNaN(user)) res = await this.#twitter.v1.get("users/show.json", { screen_name: user });
			else res = await this.#twitter.v1.get("users/show.json", { user_id: user });

			return res;
		} catch (err) {
			throw err;
		}
	}

	async tweetImages(text, images = []) {
		if (typeof text !== "string" || !Array.isArray(images)) throw new TwitterApiError("BAD DATA Type Parameters");
		if (images.length === 0 || images.length > 4) throw new TwitterApiError("Images length must be between 1 and 4");

		let mediaIds = [];

		try {
			for (const image of images) {
				const mediaId = await this.#twitter.v1.uploadMedia(image);
				mediaIds.push(mediaId);
			}
			let res = await this.#twitter.v1.tweetThread([{ status: text, media_ids: mediaIds }]);

			return res;
		} catch (err) {
			throw err;
		}
	}
}

module.exports = TwitterApi;
