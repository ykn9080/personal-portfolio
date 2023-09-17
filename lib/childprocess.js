export async function winProcess(script) {
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

export async function namProcess(script) {
  console.log(script, JSON.stringify(script));
  const res = await fetch(
    "http://imcmaster.iptime.org:7879/script",

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
