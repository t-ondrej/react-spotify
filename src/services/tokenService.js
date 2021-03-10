const STORAGE_KEYS = {
	accessToken: 'access_token',
	expiresIn: 'expires_in'
};

export const getAccessToken = () => localStorage.getItem(STORAGE_KEYS.accessToken);

export const setToken = (token) => {
	Object.values(STORAGE_KEYS)
		.filter(storageKey => !!token[storageKey])
		.forEach(storageKey => localStorage.setItem(storageKey, token[storageKey]));
};

export const clearToken = () => {
	Object.values(STORAGE_KEYS)
		.forEach(storageKey => localStorage.removeItem(storageKey))
};