export async function getMysql(
  apiUrl: string,
  method: string
): Promise<any[] | undefined> {
  const res = await fetch(`http://imcmaster.iptime.org:9111/${apiUrl}`, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  if (!res.ok) return undefined;
  console.log(res);
  return res.json();
}
