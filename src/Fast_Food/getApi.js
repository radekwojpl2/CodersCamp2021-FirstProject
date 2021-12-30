const getApi = async (url) => {
  let res = await fetch (url); 
  if (res.ok){
    return await res.json();
  } else {
    alert("Upsss. Something went wrong!")
  }
}
export default getApi