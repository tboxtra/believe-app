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
import MoonPhases from "./MoonPhases";
import Repay from "./Repay";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [screen, setScreen] = useState("onboarding");
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(10342);
  const [naira, setNaira] = useState(0);
  const [userInvestment, setUserInvestment] = useState(0);
  const [purchasedPhases, setPurchasedPhases] = useState([]);
  const [borrowedAmount, setBorrowedAmount] = useState(0);

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

  const handleRepay = (amount) => {
    setBorrowedAmount((prev) => prev - amount);
    setNaira((prev) => prev - amount);
    setTransactions((prev) => [
      ...prev,
      {
        type: "Repay",
        amount: `₦${amount}`,
        time: new Date().toLocaleString(),
      },
    ]);
    setScreen("home");
  };

  const [phases, setPhases] = useState([
    { id: 1, users: 0, cap: 25000, investment: 20, tokens: 2000 },
    { id: 2, users: 0, cap: 50000, investment: 50, tokens: 2500 },
    { id: 3, users: 0, cap: 75000, investment: 100, tokens: 4000 },
    { id: 4, users: 0, cap: 100000, investment: 200, tokens: 6000 },
    { id: 5, users: 0, cap: 150000, investment: 500, tokens: 8000 },
    { id: 6, users: 0, cap: 200000, investment: 1500, tokens: 12000 },
  ]);

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
    const borrowLimit = balance * 2000 * 0.4;

    if (borrowedAmount + amount > borrowLimit) {
      alert("Borrow limit exceeded (max 40% of vault health)");
      return;
    }

    setNaira((prev) => prev + amount);
    setBorrowedAmount((prev) => prev + amount);

    setTransactions((prev) => [
      ...prev,
      {
        type: "Borrow",
        amount: `₦${amount}`,
        time: new Date().toLocaleString(),
      },
    ]);

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

  const handleBuy = (bltAmount, nairaUsed, breakdown = []) => {
    setBalance((prev) => prev + bltAmount); // Increase vault
    setNaira((prev) => prev - nairaUsed);   // Reduce Naira

    // NEW: Track which phases were bought (skip "default")
    const newPurchased = breakdown
      .filter((entry) => entry.id !== "default")
      .map((entry) => entry.id);

    if (newPurchased.length > 0) {
      setPurchasedPhases((prev) => [...new Set([...prev, ...newPurchased])]);
    }

    setTransactions((prev) => [
      ...prev,
      {
        type: "Buy",
        amount: `₦${nairaUsed} → ${bltAmount} BLT`,
        time: new Date().toLocaleString(),
      },
    ]);

    setScreen("home");
  };

  const handlePhaseBuy = (phaseId) => {
    const phase = phases.find(p => p.id === phaseId);

    if (!phase) return;
    if (purchasedPhases.includes(phaseId)) return;
    if (phase.users >= phase.cap) return;

    // Update vault and tracker
    setBalance(prev => prev + phase.tokens);
    setUserInvestment(prev => prev + phase.investment);
    setNaira(prev => prev - (phase.investment * 2000));
    setPurchasedPhases(prev => [...prev, phaseId]);

    // Update phase users
    setPhases(prev =>
      prev.map(p =>
        p.id === phaseId ? { ...p, users: p.users + 1 } : p
      )
    );

    // Log transaction
    setTransactions(prev => [...prev, {
      type: `Phase ${phase.id} Buy`,
      amount: `₦${phase.investment * 2000} → ${phase.tokens} BLT`,
      time: new Date().toLocaleString(),
    }]);
  };

  const [purchases, setPurchases] = useState({});

  const handleMoonPhaseBuy = (phaseIndex, amount) => {
    const phase = phases[phaseIndex];

    if (naira < phase.investment * 2000) return alert("Insufficient BelieveNG Balance");

    const userBought = purchases[phaseIndex] || 0;
    if (userBought >= 1) return alert("You've already purchased this phase");

    setNaira((prev) => prev - (phase.investment * 2000));
    setBalance((prev) => prev + phase.tokens);
    setPurchases((prev) => ({ ...prev, [phaseIndex]: 1 }));
    setTransactions((prev) => [
      ...prev,
      {
        type: "Moon Phase",
        amount: `₦${phase.investment * 2000} → ${phase.tokens} BLT (Phase ${phase.id})`,
        time: new Date().toLocaleString(),
      },
    ]);
    setPhases((prev) =>
      prev.map((p, i) => (i === phaseIndex ? { ...p, users: p.users + 1 } : p))
    );
  };


  const handleSmartBuy = (amount) => {
    let remaining = amount;
    let bltTotal = 0;
    const newPurchases = { ...purchases };
    const updatedPhases = [...phases];

    for (let i = 0; i < updatedPhases.length; i++) {
      const phase = updatedPhases[i];
      if (newPurchases[phase.id]) continue;

      const price = phase.investment * 2000;
      if (remaining >= price && phase.users < phase.cap) {
        remaining -= price;
        bltTotal += phase.tokens;
        newPurchases[phase.id] = true;

        // Update phase users
        updatedPhases[i].users += 1;

        // Track in user state
        setUserInvestment(prev => prev + phase.investment);
        setPurchasedPhases(prev => [...prev, phase.id]);
      }
    }

    // Add BLT for remaining naira (if any)
    if (remaining >= 2000) {
      const extraBLT = Math.floor(remaining / 2000);
      bltTotal += extraBLT;
      remaining -= extraBLT * 2000;
    }

    setPurchases(newPurchases);
    setPhases(updatedPhases);
    setBalance((prev) => prev + bltTotal);
    setNaira((prev) => prev - amount + remaining);

    setTransactions((prev) => [
      ...prev,
      {
        type: "Buy",
        amount: `₦${amount} → ${bltTotal} BLT`,
        time: new Date().toLocaleString(),
      },
    ]);

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
          onRepay={() => setScreen("repay")}
          onReferral={() => setScreen("referral")}
          setScreen={setScreen}
          borrowedAmount={borrowedAmount}
        />
      )}
      {screen === "deposit" && <Deposit onBack={() => setScreen("home")} onDeposit={handleDeposit} />}
      {screen === "borrow" && <Borrow balance={balance} naira={naira} onBack={() => setScreen("home")} onBorrow={handleBorrow} />}
      {screen === "send" && <Send naira={naira} onBack={() => setScreen("home")} onSend={handleSend} />}
      {screen === "buy" && (
        <Buy
          naira={naira}
          onBack={() => setScreen("home")}
          balance={balance}
          onBuy={handleBuy}
          phases={phases}
          setPhases={setPhases}
          purchases={purchases}
          setPurchases={setPurchases}
        />
      )}
      {screen === "referral" && <Referral user={user} onBack={() => setScreen("home")} />}
      {screen === "profile" && (
        <Profile
          user={user}
          balance={balance}
          onReferral={() => setScreen("referral")}
          onMoonPhases={() => setScreen("moonphases")}
          onTransactions={() => setScreen("transactions")}
        />
      )}
      {screen === "chat" && <Chat />}
      {screen === "map" && <Map />}
      {screen === "transactions" && <Transactions transactions={transactions} onBack={() => setScreen("profile")} />}
      {screen === "repay" && (
        <Repay
          borrowed={borrowedAmount}
          naira={naira}
          onRepay={handleRepay}
          onBack={() => setScreen("home")}
        />
      )}
      {screen === "moonphases" && (
        <MoonPhases
          naira={naira}
          balance={balance}
          phases={phases}
          purchases={purchasedPhases}
          onBuyPhase={handlePhaseBuy}
          onBack={() => setScreen("profile")}
        />
      )}
      <BottomNav current={screen} setScreen={setScreen} />
    </>
  );
}

export default App;