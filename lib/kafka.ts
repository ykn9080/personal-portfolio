interface OptionType {
  method: string;
  headers: {
    Accept: string;
    "Content-Type": string;
  };
  cache: string;
}
export async function getKafkaGet(
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

export async function getKafkaPost(
  apiUrl: string,
  method: string,
  body: object
): Promise<any[] | undefined> {
  const res = await fetch(`http://imcmaster.iptime.org:9111/${apiUrl}`, {
    method: method,
    body: JSON.stringify(body),
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
