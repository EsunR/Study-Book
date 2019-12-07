export default async function(url, options) {
  const response = await fetch(url, options);
  return await response.json();
}
