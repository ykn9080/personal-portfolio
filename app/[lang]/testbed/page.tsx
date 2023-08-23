"use client";

import React, { Component } from "react";
import PowerbiEmbedded from "nextjs-powerbi";

class App extends Component {
  render() {
    return (
      <div className="App">
        <PowerbiEmbedded
          id="134a278d-b274-4622-886e-78943d71a6ee" // required
          embedUrl="https://app.powerbi.com/reportEmbed?reportId=134a278d-b274-4622-886e-78943d71a6ee&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUVBU1QtQVNJQS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWUsInVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlfX0%3d" // required
          accessToken="Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzU1ZTU4N2ItZTA5OC00YmM5LTliODktZWFjZjYzNjE5NzAzLyIsImlhdCI6MTY5MjY3MzkxNSwibmJmIjoxNjkyNjczOTE1LCJleHAiOjE2OTI2NzgwMzQsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VUFBQUFsOVRpeG82a1o0bTVrMHRiZHJ3bTdXTjRiM2x1UlFPSXlJY1VTa3Y0REdsZThXekdwSm4veGxwVW1yaGgxK3V0IiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6IjE4ZmJjYTE2LTIyMjQtNDVmNi04NWIwLWY3YmYyYjM5YjNmMyIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoi64KoIiwiZ2l2ZW5fbmFtZSI6IuyYgeq4sCIsImlwYWRkciI6IjM5LjExOC4yMDQuMTAzIiwibmFtZSI6IuuCqOyYgeq4sCIsIm9pZCI6ImFhY2I5ODRjLTI4NTEtNDgxMi1hN2I0LTMxZGZlMzJiZGJhMyIsInB1aWQiOiIxMDAzMjAwMjVGMjQ4RkUwIiwicmgiOiIwLkFWTUFlMWhlZFpqZ3lVdWJpZXJQWTJHWEF3a0FBQUFBQUFBQXdBQUFBQUFBQUFERkFMcy4iLCJzY3AiOiJBcHAuUmVhZC5BbGwgQ2FwYWNpdHkuUmVhZC5BbGwgQ2FwYWNpdHkuUmVhZFdyaXRlLkFsbCBDb250ZW50LkNyZWF0ZSBEYXNoYm9hcmQuUmVhZC5BbGwgRGFzaGJvYXJkLlJlYWRXcml0ZS5BbGwgRGF0YWZsb3cuUmVhZC5BbGwgRGF0YWZsb3cuUmVhZFdyaXRlLkFsbCBEYXRhc2V0LlJlYWQuQWxsIERhdGFzZXQuUmVhZFdyaXRlLkFsbCBHYXRld2F5LlJlYWQuQWxsIEdhdGV3YXkuUmVhZFdyaXRlLkFsbCBQaXBlbGluZS5EZXBsb3kgUGlwZWxpbmUuUmVhZC5BbGwgUGlwZWxpbmUuUmVhZFdyaXRlLkFsbCBSZXBvcnQuUmVhZC5BbGwgUmVwb3J0LlJlYWRXcml0ZS5BbGwgU3RvcmFnZUFjY291bnQuUmVhZC5BbGwgU3RvcmFnZUFjY291bnQuUmVhZFdyaXRlLkFsbCBUZW5hbnQuUmVhZC5BbGwgVGVuYW50LlJlYWRXcml0ZS5BbGwgVXNlclN0YXRlLlJlYWRXcml0ZS5BbGwgV29ya3NwYWNlLlJlYWQuQWxsIFdvcmtzcGFjZS5SZWFkV3JpdGUuQWxsIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiN1NUU0lwaVdpeHZqZndra3MwamlaUi1jSFJPdHRCV0dZVWZjZEwycldzZyIsInRpZCI6Ijc1NWU1ODdiLWUwOTgtNGJjOS05Yjg5LWVhY2Y2MzYxOTcwMyIsInVuaXF1ZV9uYW1lIjoieW91bmdraW5hbUBrbm91LmFjLmtyIiwidXBuIjoieW91bmdraW5hbUBrbm91LmFjLmtyIiwidXRpIjoiVlFoQ3UwXzFHRXloZDZZR0hxTnRBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.rNjqemusTeAMkvI6jL8fbWyFaVB8JNHwtsHUZBExx2RNva4vorbtJqoV67hXgK64bkBD7C5pSWpgVeC1P72pwtFjx4eO6eMMNcYuomY-Oyh-exWgYqtNihHsd8hxU2XnzvKzKrEH8dOSRydQ6z8kr2SXl7lS1QPUZJlt7vdEpQ67RLD-VhSe1Tc6UPEaheP9tIqg7AXzSnmaZ7EIkNjLDAG1TwpzNxBswkdzY-sXy6izcuu50o9u3Mj1q5U9gbwmUtNTe4PfwfmhnJ7oggi2wztWpUMyED8D3OiyPdsoXzRtlnZ8Fjh458Jgnw3YrBt2xPVZaVGBw29xgq8o_yqZUw" // required
          filterPaneEnabled={false}
          navContentPaneEnabled={false}
          //   pageName={`${YOUR_PAGE_ID}`}
          //   embedType={`${EMBED_TYPE}`}
          //   tokenType={`${TOKEN_TYPE}`}
          //   permissions={`${PERMISSIONS}`}
          settings={
            {
              // any settings including localeSettings
            }
          }
          width="600px"
          height="900px"
        />
      </div>
    );
  }
}

export default App;
