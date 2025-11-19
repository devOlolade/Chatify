import * as signalR from "@microsoft/signalr";

let connection = null;

export const startConnection = async () => {
  connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5000/chathub")
    .withAutomaticReconnect()
    .build();

  connection.on("ReceiveMessage", (user, message) => {
    console.log("Received:", user, message);
  });

  await connection.start();
  console.log("SignalR Connected");

  return connection;
};

export const getConnection = () => connection;
