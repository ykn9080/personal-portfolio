let url = "http://imcmaster.iptime.org:7878/script";
//let url = "http://imcmaster.iptime.org:7888/script";
//let url = "https://imcmaster.duckdns.org/fetch";

// export async function winProcess1(script) {
//   const res = await fetch(
//     "https://imcmaster.duckdns.org/fetch",

//     {
//       method: "POST",
//       body: JSON.stringify(script),
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       cache: "no-store",
//     }
//   );
//   console.log(script, res);
//   return res.json();
// }

// debug용으로 만들어 놓은 대안
// winubuntu의 ~/childprocess1
export async function winProcess(script) {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  // console.log(script, JSON.stringify(script));
  const res = await fetch(
    url,

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
