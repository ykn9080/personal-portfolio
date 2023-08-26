export async function childProcess(script) {
  console.log(script, JSON.stringify(script));
  const res = await fetch(
    "http://imcmaster.iptime.org:7878/script",

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

  return res.json();
}
