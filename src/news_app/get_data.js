export async function getData(source) {
  const response = await fetch(source);
  if (response.status !== 200) {
    throw new Error('can not fetch the data');
  }
  const data = await response.json();
  return data;
}

export default getData;
