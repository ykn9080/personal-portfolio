export async function consumer() {
  const res = await fetch(
    "http://winubuntu:8883",

    {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  return res.json();
}
