"use client";

import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";

export default function page() {
  return (
    <div className="App">
      <header className="App-header">
        <PowerBIEmbed
          embedConfig={{
            type: "report", // Supported types: report, dashboard, tile, visual and qna
            id: "134a278d-b274-4622-886e-78943d71a6ee",
            embedUrl:
              "https://app.powerbi.com/reportEmbed?reportId=134a278d-b274-4622-886e-78943d71a6ee&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUVBU1QtQVNJQS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWUsInVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlfX0%3d",
            accessToken:
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzU1ZTU4N2ItZTA5OC00YmM5LTliODktZWFjZjYzNjE5NzAzLyIsImlhdCI6MTY5MjY3NTYyOSwibmJmIjoxNjkyNjc1NjI5LCJleHAiOjE2OTI2ODExNjUsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VUFBQUEvL0F6ZTN0c3lEQ3dYMTBGSXdhMXdYK3N4Ny9QakZUZnNFbVZJbkxxMDJHeVRkNHE1L05FRC9lWmtBSld4ZlZVIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6IjE4ZmJjYTE2LTIyMjQtNDVmNi04NWIwLWY3YmYyYjM5YjNmMyIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoi64KoIiwiZ2l2ZW5fbmFtZSI6IuyYgeq4sCIsImlwYWRkciI6IjM5LjExOC4yMDQuMTAzIiwibmFtZSI6IuuCqOyYgeq4sCIsIm9pZCI6ImFhY2I5ODRjLTI4NTEtNDgxMi1hN2I0LTMxZGZlMzJiZGJhMyIsInB1aWQiOiIxMDAzMjAwMjVGMjQ4RkUwIiwicmgiOiIwLkFWTUFlMWhlZFpqZ3lVdWJpZXJQWTJHWEF3a0FBQUFBQUFBQXdBQUFBQUFBQUFERkFMcy4iLCJzY3AiOiJBcHAuUmVhZC5BbGwgQ2FwYWNpdHkuUmVhZC5BbGwgQ2FwYWNpdHkuUmVhZFdyaXRlLkFsbCBDb250ZW50LkNyZWF0ZSBEYXNoYm9hcmQuUmVhZC5BbGwgRGFzaGJvYXJkLlJlYWRXcml0ZS5BbGwgRGF0YWZsb3cuUmVhZC5BbGwgRGF0YWZsb3cuUmVhZFdyaXRlLkFsbCBEYXRhc2V0LlJlYWQuQWxsIERhdGFzZXQuUmVhZFdyaXRlLkFsbCBHYXRld2F5LlJlYWQuQWxsIEdhdGV3YXkuUmVhZFdyaXRlLkFsbCBQaXBlbGluZS5EZXBsb3kgUGlwZWxpbmUuUmVhZC5BbGwgUGlwZWxpbmUuUmVhZFdyaXRlLkFsbCBSZXBvcnQuUmVhZC5BbGwgUmVwb3J0LlJlYWRXcml0ZS5BbGwgU3RvcmFnZUFjY291bnQuUmVhZC5BbGwgU3RvcmFnZUFjY291bnQuUmVhZFdyaXRlLkFsbCBUZW5hbnQuUmVhZC5BbGwgVGVuYW50LlJlYWRXcml0ZS5BbGwgVXNlclN0YXRlLlJlYWRXcml0ZS5BbGwgV29ya3NwYWNlLlJlYWQuQWxsIFdvcmtzcGFjZS5SZWFkV3JpdGUuQWxsIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiN1NUU0lwaVdpeHZqZndra3MwamlaUi1jSFJPdHRCV0dZVWZjZEwycldzZyIsInRpZCI6Ijc1NWU1ODdiLWUwOTgtNGJjOS05Yjg5LWVhY2Y2MzYxOTcwMyIsInVuaXF1ZV9uYW1lIjoieW91bmdraW5hbUBrbm91LmFjLmtyIiwidXBuIjoieW91bmdraW5hbUBrbm91LmFjLmtyIiwidXRpIjoiX0dENlpUUGU3a1dFZjZvLXM1TnpBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.DPac9BU6-8iQ-TtnTFNl4uWKEstrLC-jnWdNS2o6CH-ESnwrjRFimapAnYwJWZte4CtJ1lYytE9oiwre1XV_ULhijmi7dWg9_nODO4LuRfiqrqap1hyxFNqRGt-wLp7P0HXn4KYUSIjOjVpwRJkXR5dnI6eqTw0agvODc9VLp8Bb3y0_cojhWzj44Kbsg3_boeMJmhs8FxHmPdTNlCmnWzKDNDQc33WnG7IJgqETGh4S8KVEUTsLd9FYTzt-vfFbmLZ4BJU78MhAkXVyDdhb6tClExIhXJ2AR6BhpyDS5bpnA8aOmA4RIcVppKWSSOxcTCyvfRa6vNHSxLriBGy9hA",
            tokenType: models.TokenType,
            settings: {
              panes: {
                filters: {
                  expanded: false,
                  visible: true,
                },
              },
            },
          }}
          eventHandlers={
            new Map([
              [
                "loaded",
                function () {
                  console.log("Report loaded");
                },
              ],
              [
                "rendered",
                function () {
                  console.log("Report rendered");
                },
              ],
              [
                "error",
                function (event) {
                  console.log(event.detail);
                },
              ],
            ])
          }
          cssClassName={"Embed-container"}
          getEmbeddedComponent={(embeddedReport) => {
            window.report = embeddedReport;
          }}
        />
      </header>
    </div>
  );
}
