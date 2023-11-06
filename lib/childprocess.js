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

// debug용으로 만들어 놓은 대안 ~/childprocess1
export async function winProcess1(script) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log(script, JSON.stringify(script));
  const res = await fetch(
    "http://imcmaster.iptime.org:7888/script",

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
