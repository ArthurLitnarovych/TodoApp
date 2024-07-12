// http.service.js
import axios from 'axios';
import { STORAGE_KEYS } from '~shared/keys';
export default class HttpService {
	constructor(
		public baseUrl = process.env.SERVER_URL,
		public fetchingService = axios,
		public apiVersion = 'api',
	) {
		this.baseUrl = baseUrl;
		this.fetchingService = axios;
		this.apiVersion = apiVersion;
	}

	private getFullApiUrl(url) {
		return `${this.baseUrl}/${this.apiVersion}/${url}`;
	}

	private populateTokenToHeaderConfig() {
		return {
			Authorization: `Bearer ${STORAGE_KEYS.TOKEN}`,
		};
	}

	private extractUrlAndDataFromConfig({
		data,
		url,
		...configWithoutDataAndUrl
	}) {
		return configWithoutDataAndUrl;
	}

	get(config, withAuth = true) {
		if (withAuth) {
			config.headers = {
				...config.headers,
				...this.populateTokenToHeaderConfig(),
			};
		}
		return this.fetchingService.get(
			this.getFullApiUrl(config.url),
			this.extractUrlAndDataFromConfig(config),
		);
	}

	post(config: any, withAuth = true) {
		if (withAuth) {
			config.headers = {
				...config.headers,
				...this.populateTokenToHeaderConfig(),
			};
		}
		return this.fetchingService.post(
			this.getFullApiUrl(config.url),
			config.data,
			this.extractUrlAndDataFromConfig(config),
		);
	}

	put(config, withAuth = true) {
		if (withAuth) {
			config.headers = {
				...config.headers,
				...this.populateTokenToHeaderConfig(),
			};
		}
		return this.fetchingService.put(
			this.getFullApiUrl(config.url),
			config.data,
			this.extractUrlAndDataFromConfig(config),
		);
	}

	delete(config: any, withAuth = true) {
		if (withAuth) {
			config.headers = {
				...config.headers,
				...this.populateTokenToHeaderConfig(),
			};
		}
		return this.fetchingService
			.delete(
				this.getFullApiUrl(config.url),
				this.extractUrlAndDataFromConfig(config),
			)
			.then((res) => res.data);
	}
}
