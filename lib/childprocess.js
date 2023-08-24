export async function childProcess(script) {
  const res = await fetch(
    "http://imcmaster.iptime.org:7878/script",

    {
      method: "post",
      body: JSON.stringify(script),
      next: { revalidate: 0 },
    }
  );

  return res.json();
}
