import { useState } from "react";
import Onboarding from "./Onboarding";
import Auth from "./Auth";
import Otp from "./Otp";
import Home from "./Home";
import Deposit from "./Deposit";
import Borrow from "./Borrow";
import Send from "./Send";
import Buy from "./Buy";
import Referral from "./Referral";
import Profile from "./Profile";
import BottomNav from "./BottomNav";
import Chat from "./Chat";
import Map from "./Map";
import Transactions from "./Transactions";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [screen, setScreen] = useState("onboarding");
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(10342);
  const [naira, setNaira] = useState(0);

  const handleAuth = (input) => {
    setUser(input);
    setScreen("otp");
    const urlParams = new URLSearchParams(window.location.search);
    const referrer = urlParams.get("ref");
    if (referrer && referrer !== input) {
      const key = `referrals-${referrer}`;
      const existing = parseInt(localStorage.getItem(key)) || 0;
      localStorage.setItem(key, existing + 1);
    }
  };

  const handleDeposit = (amount) => {
    setNaira((prev) => prev + amount);
    setTransactions((prev) => [...prev, {
      type: "Deposit",
      amount,
      time: new Date().toLocaleString(),
    }]);
    setScreen("home");
  };

  const handleBorrow = (amount) => {
    setNaira((prev) => prev + amount);
    setTransactions((prev) => [...prev, {
      type: "Borrow",
      amount: `₦${amount}`,
      time: new Date().toLocaleString(),
    }]);
    setScreen("home");
  };

  const handleSend = (amount) => {
    setNaira((prev) => prev - amount);
    setTransactions((prev) => [...prev, {
      type: "Send",
      amount: `₦${amount}`,
      time: new Date().toLocaleString(),
    }]);
    setScreen("home");
  };

  const handleBuy = (bltAmount, nairaUsed) => {
    setBalance((prev) => prev + bltAmount);
    setNaira((prev) => prev - nairaUsed);
    setTransactions((prev) => [...prev, {
      type: "Buy",
      amount: `₦${nairaUsed} → ${bltAmount.toFixed(2)} BLT`,
      time: new Date().toLocaleString(),
    }]);
    setScreen("home");
  };

  return (
    <>
      {screen === "onboarding" && <Onboarding onStart={() => setScreen("auth")} />}
      {screen === "auth" && <Auth onContinue={handleAuth} />}
      {screen === "otp" && <Otp user={user} onVerify={() => setScreen("home")} />}
      {screen === "home" && (
        <Home
          user={user}
          balance={balance}
          naira={naira}
          onDeposit={() => setScreen("deposit")}
          onBorrow={() => setScreen("borrow")}
          onSend={() => setScreen("send")}
          onBuy={() => setScreen("buy")}
          onReferral={() => setScreen("referral")}
        />
      )}
      {screen === "deposit" && <Deposit onBack={() => setScreen("home")} onDeposit={handleDeposit} />}
      {screen === "borrow" && <Borrow balance={balance} naira={naira} onBack={() => setScreen("home")} onBorrow={handleBorrow} />}
      {screen === "send" && <Send naira={naira} onBack={() => setScreen("home")} onSend={handleSend} />}
      {screen === "buy" && <Buy naira={naira} onBack={() => setScreen("home")} onBuy={handleBuy} />}
      {screen === "referral" && <Referral user={user} onBack={() => setScreen("home")} />}
      {screen === "profile" && <Profile user={user} balance={balance} onReferral={() => setScreen("referral")} />}
      {screen === "chat" && <Chat />}
      {screen === "map" && <Map />}
      {screen === "transactions" && <Transactions transactions={transactions} onBack={() => setScreen("profile")} />}
      <BottomNav current={screen} setScreen={setScreen} />
    </>
  );
}

export default App;