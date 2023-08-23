export default async function executeSocketXp(command) {
  let workflow = await getWorkflowId(command);
  let job, result;
  const jobobj = {
    JobName: "any name",
    DeviceId: "d8db2e8c-6d36-4a86-a497-fa34eb3135d9",
    WorkflowId: workflow.WorkflowId,
  };
  job = await getJobId(jobobj);
  console.log(job.JobId);

  result = await getData(job.JobId);

  return result;
}

/**
 *
 * @param {*} command : "echo 'This is the content of the file.' > /home/yknam/helloconfig",
 * @returns
 */
async function getWorkflowId(command) {
  const res = await fetch("https://api.socketxp.com/v1/workflow", {
    method: "post",
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjI2NDQ5OTM3NDEsImtleSI6IjE5NTdlOGE5LTY3OWEtNDQzMi1iMWQ0LTcyODQ1ZWIxMTNkNyJ9.DQL1oVHCActh_6tsrl4CTu5hSuqm3lxo-jtnCy8XpJc`,
    },
    body: JSON.stringify({
      Name: "workflow name",
      Command: command,
    }),
    cache: "no-store",
  });

  return res.json();
}
/**
   * 
   * @param {*} body : {
        JobName: "any name",
        DeviceId: "d8db2e8c-6d36-4a86-a497-fa34eb3135d9",
        WorkflowId: workflowId,
      }
   * @returns 
   */
async function getJobId(body) {
  const res = await fetch("https://api.socketxp.com/v1/job", {
    method: "post",
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjI2NDQ5OTM3NDEsImtleSI6IjE5NTdlOGE5LTY3OWEtNDQzMi1iMWQ0LTcyODQ1ZWIxMTNkNyJ9.DQL1oVHCActh_6tsrl4CTu5hSuqm3lxo-jtnCy8XpJc`,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  return res.json();
}
async function getData(jobId) {
  const res = await fetch("https://api.socketxp.com/v1/job/" + jobId, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjI2NDQ5OTM3NDEsImtleSI6IjE5NTdlOGE5LTY3OWEtNDQzMi1iMWQ0LTcyODQ1ZWIxMTNkNyJ9.DQL1oVHCActh_6tsrl4CTu5hSuqm3lxo-jtnCy8XpJc`,
    },
    cache: "no-store",
  });

  return res.json();
}
