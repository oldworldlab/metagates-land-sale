import React from "react";
import ReactDOM from "react-dom/client";
import { FlairProvider } from "@flair-sdk/react";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <FlairProvider
      wallet={{
        web3AuthOptions: {
          clientId:
            // "BERsn9ulYaLrS7gGYWZUahXaKBQxok5VheVlblnp58w8-ZDuvpzH3sSFRFZV3hrMRQhcwDnN1RTmwUzh6ARdAnA", // TEST
            "BJHx2FvP8r5G4d9geevWPFhyPFQvr0Wu-tU1b-xHINOUV7nU1w4n-EMSyKlffGleqDkkx6Gaq1Y4EEjbb5UTRUs", // PROD
        },
      }}
    >
      <App />
    </FlairProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
