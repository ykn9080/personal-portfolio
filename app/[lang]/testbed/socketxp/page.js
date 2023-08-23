// /**
//  *
//  * @param {*} name : "any name"
//  * @param {*} command : "echo 'This is the content of the file.' > /home/yknam/helloconfig",
//  * @returns
//  */
// async function getWorkflowId(name, command) {
//   const res = await fetch("https://api.socketxp.com/v1/workflow", {
//     method: "post",
//     headers: {
//       Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjI2NDQ5OTM3NDEsImtleSI6IjE5NTdlOGE5LTY3OWEtNDQzMi1iMWQ0LTcyODQ1ZWIxMTNkNyJ9.DQL1oVHCActh_6tsrl4CTu5hSuqm3lxo-jtnCy8XpJc`,
//     },
//     body: JSON.stringify({
//       Name: name,
//       Command: command,
//     }),
//     cache: "no-store",
//   });

//   return res.json();
// }
// /**
//  *
//  * @param {*} body : {
//       JobName: "any name",
//       DeviceId: "d8db2e8c-6d36-4a86-a497-fa34eb3135d9",
//       WorkflowId: workflowId,
//     }
//  * @returns
//  */
// async function getJobId(body) {
//   const res = await fetch("https://api.socketxp.com/v1/job", {
//     method: "post",
//     headers: {
//       Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjI2NDQ5OTM3NDEsImtleSI6IjE5NTdlOGE5LTY3OWEtNDQzMi1iMWQ0LTcyODQ1ZWIxMTNkNyJ9.DQL1oVHCActh_6tsrl4CTu5hSuqm3lxo-jtnCy8XpJc`,
//     },
//     body: JSON.stringify(body),
//     cache: "no-store",
//   });

//   return res.json();
// }
// async function getData(jobId) {
//   const res = await fetch("https://api.socketxp.com/v1/job/" + jobId, {
//     headers: {
//       Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjI2NDQ5OTM3NDEsImtleSI6IjE5NTdlOGE5LTY3OWEtNDQzMi1iMWQ0LTcyODQ1ZWIxMTNkNyJ9.DQL1oVHCActh_6tsrl4CTu5hSuqm3lxo-jtnCy8XpJc`,
//     },
//     cache: "no-store",
//   });

//   return res.json();
// }
import React from "react";
import executeSocketXp from "@/lib/socketxp";

export default async function SocketXp() {
  const rtn = await executeSocketXp(
    // "echo 'This is the content of the file.' > /home/yknam/helloconfig"
    //"/usr/local/hadoop/bin/hadoop jar /home/yknam/IdeaProjects/mapreduce/target/mapreduce-1.0.0.jar /data/wordSample.txt /output"
    //"/usr/local/hadoop/bin/hadoop fs -rm -r /outpu"
    "ls -la"
  );
  console.log(rtn);
  // let rtn1 = await getWorkflowId();
  // let job, result;
  // job = await getJobId(rtn1.WorkflowId);
  // console.log(rtn1.WorkflowId);
  // console.log(job.JobId);

  // result = await getData(job.JobId);

  return <p>{rtn.Result}</p>;
}
