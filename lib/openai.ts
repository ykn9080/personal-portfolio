export async function openaiCall(script: any) {
  console.log(script);
  const res = await fetch(
    "http://imcmaster.iptime.org:7997",

    {
      method: "POST",
      body: JSON.stringify(script),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
  console.log(script, res);
  return res.json();
}
