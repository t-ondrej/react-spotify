export function getHashParams() {
  const hashEntries = window.parent.location.hash
    .substring(1)
    .split('&')
    .filter(params => !!params)
    .map(param => {
      const nameToValue = param.split('=');
      return [nameToValue[0], nameToValue[1]];
    });

  return Object.fromEntries(hashEntries);
}