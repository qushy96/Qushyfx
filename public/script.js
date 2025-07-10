let connected = false;
let wins = 0;
let losses = 0;
let ws;

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const message = document.getElementById("login-message");

  if (user === "Qushyfx" && pass === "J21740555n") {
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("main-screen").style.display = "block";
  } else {
    message.textContent = "❌ Wrong username or password!";
  }
}

function connectDeriv() {
  const token = document.getElementById("api-token").value;
  ws = new WebSocket("wss://ws.derivws.com/websockets/v3?app_id=1089");

  ws.onopen = () => {
    ws.send(JSON.stringify({ authorize: token }));
    connected = true;
    logSignal("✅ Connected to Deriv");
  };

  ws.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    console.log(data);
    // ➡️ Here you will add digit analysis and trade signals later.
  };

  ws.onerror = () => logSignal("⚠️ Connection error");
  ws.onclose = () => logSignal("❌ Disconnected");
}

function startBot() {
  if (!connected) {
    logSignal("❌ Not connected. Paste API token and connect.");
    return;
  }
  logSignal("▶️ Bot started. Market analysis running...");
}

function stopBot() {
  logSignal("⏹ Bot stopped.");
}

function logSignal(text) {
  const signalsOutput = document.getElementById("signals-output");
  const div = document.createElement("div");
  div.textContent = text;
  signalsOutput.prepend(div);
}

function updateWinLoss(win) {
  if (win) wins++;
  else losses++;
  document.getElementById("wins").textContent = wins;
  document.getElementById("losses").textContent = losses;
              }
