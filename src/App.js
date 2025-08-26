import { useEffect, useState } from "react";
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
import Wallet from "./Wallet"
import Receive from "./Receive"
import DepositCrypto from "./DepositCrypto"
import DepositAddress from "./DepositAddress";
import SelectCoin from "./SelectCoin";
import ReceiveFromBeliever from "./ReceiveFromBeliever";
import P2PTrading from "./P2PTrading";
import P2PBankTransfer from "./P2PBankTransfer";
import P2PBank from "./P2PBankTransfer";
import WithdrawCrypto from "./WithdrawCrypto";
import SendToBeliever from "./SendToBeliever";
import ReferralLeaderboard from "./ReferralLeaderboard";
import RewardTiers from "./RewardTiers";

// ====== Referral / Bonus constants ======
const REF_PREFIX = "referrals-";                  // count of signups credited to a handle
const REF_OF_PREFIX = "referrerOf-";              // referrer of a specific user
const REF_CREDITED_PREFIX = "ref-credited-";      // lock so the same user isn't counted twice
const BONUS_PREFIX = "bonus-";                    // sum of credited bonus ₦BNG (for leaderboard)
const BONUS_PAID_PREFIX = "bonusPaid-";           // per-referrer-per-user guard (buy rule met)
const BONUS_WALLET_PREFIX = "bonusWallet-";       // pending wallet bonus to settle on login

const QUALIFYING_BUY = 5000; // ₦BNG
const BONUS_AMOUNT = 500;    // ₦BNG

function App() {
  const [transactions, setTransactions] = useState([]);
  const [screen, setScreen] = useState("onboarding");
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(10342);
  const [naira, setNaira] = useState(0);
  const [userInvestment, setUserInvestment] = useState(0);
  const [purchasedPhases, setPurchasedPhases] = useState([]);
  const [borrowedAmount, setBorrowedAmount] = useState(0);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const normalize = (h) => (h || "").replace(/^@/, "").trim().toLowerCase();

  const [phases, setPhases] = useState([
    { id: 1, users: 0, cap: 25000, investment: 20, tokens: 2000 },
    { id: 2, users: 0, cap: 50000, investment: 50, tokens: 2500 },
    { id: 3, users: 0, cap: 75000, investment: 100, tokens: 4000 },
    { id: 4, users: 0, cap: 100000, investment: 200, tokens: 6000 },
    { id: 5, users: 0, cap: 150000, investment: 500, tokens: 8000 },
    { id: 6, users: 0, cap: 200000, investment: 1500, tokens: 12000 },
  ]);

  // 1) On sign-up, register referrer once if ?ref=<handle> is present
  // 1) On sign-up, register referrer once if ?ref=<handle> is present
  const registerReferrerOnSignup = (newUserHandle) => {
    try {
      const params = new URLSearchParams(window.location.search);
      const ref = normalize(params.get("ref"));             // normalize '@john' → 'john'
      const u = normalize(newUserHandle);
      if (!ref || ref === u) return;                        // no self-referrals

      // Only count once per referred handle
      const creditedKey = REF_CREDITED_PREFIX + u;
      if (localStorage.getItem(creditedKey)) return;

      // Increment the referrer's count
      const countKey = REF_PREFIX + ref;
      const current = parseInt(localStorage.getItem(countKey), 10) || 0;
      localStorage.setItem(countKey, String(current + 1));

      // Remember who referred this user
      localStorage.setItem(REF_OF_PREFIX + u, ref);
      localStorage.setItem(creditedKey, "1");

      // Clean up the URL (optional)
      try {
        const url = new URL(window.location.href);
        url.searchParams.delete("ref");
        window.history.replaceState({}, "", url.toString());
      } catch { }
    } catch { }
  };

  // 2) When a referred user buys ≥ QUALIFYING_BUY, pay the referrer 500 now/later
  // 2) When a referred user buys ≥ QUALIFYING_BUY, pay the referrer 500 now/later
  const awardReferralBonusIfEligible = (buyerHandle, buyAmountNaira) => {
    const buyer = normalize(buyerHandle);
    const referrer = localStorage.getItem(REF_OF_PREFIX + buyer);  // who referred this buyer?
    if (!referrer) return;

    // Guard so the same buyer doesn't trigger multiple bonuses
    const paidKey = `${BONUS_PAID_PREFIX}${referrer}-${buyer}`;
    if (localStorage.getItem(paidKey)) return;

    if (buyAmountNaira >= QUALIFYING_BUY) {
      // Track total bonus for leaderboard
      const bonusKey = BONUS_PREFIX + referrer;
      const current = parseInt(localStorage.getItem(bonusKey), 10) || 0;
      localStorage.setItem(bonusKey, String(current + BONUS_AMOUNT));

      // If referrer is the currently logged-in user, credit immediately
      if (normalize(user) === referrer) {
        setNaira((prev) => prev + BONUS_AMOUNT);
        setTransactions((prev) => [
          {
            type: "Referral Bonus",
            amount: `+₦${BONUS_AMOUNT.toLocaleString()}`,
            time: new Date().toLocaleString(),
          },
          ...prev,
        ]);
      } else {
        // Otherwise, park it as pending to settle on next login
        const pendingKey = BONUS_WALLET_PREFIX + referrer;
        const pending = parseInt(localStorage.getItem(pendingKey), 10) || 0;
        localStorage.setItem(pendingKey, String(pending + BONUS_AMOUNT));
      }

      localStorage.setItem(paidKey, "1");
    }
  };

  // 3) On login, settle any pending bonuses for this user
  const settlePendingBonusesFor = (handle) => {
    const handleKey = normalize(handle);
    const pendingKey = BONUS_WALLET_PREFIX + handleKey;
    const pending = parseInt(localStorage.getItem(pendingKey), 10) || 0;
    if (!pending) return;

    setNaira((prev) => prev + pending);
    setTransactions((prev) => [
      {
        type: "Referral Bonus",
        amount: `+₦${pending.toLocaleString()}`,
        time: new Date().toLocaleString(),
      },
      ...prev,
    ]);
    localStorage.removeItem(pendingKey);
  };

  // Show nav only after user is verified/logged in
  const isAuthed = !["onboarding", "auth", "otp"].includes(screen);

  const handleAuth = (input) => {
    setUser(input);
    setScreen("otp");

    registerReferrerOnSignup(input);
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
    setScreen("wallet");
  };

  const handleBuy = (bltAmount, nairaUsed, breakdown = []) => {
    setBalance((prev) => prev + bltAmount); // Increase vault
    setNaira((prev) => prev - nairaUsed);   // Reduce Naira

    // NEW: Track which phases were bought (skip "default")
    const newPurchased = breakdown
      .filter((entry) => entry.id !== "default")
      .map((entry) => parseInt(entry.id));

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

    awardReferralBonusIfEligible(user, nairaUsed);

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
    setPurchasedPhases(prev => [...new Set([...prev, phaseId])]);
    setPurchases(prev => ({ ...prev, [phaseId]: true }));

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
      {screen === "otp" && (
        <Otp
          user={user}
          onVerify={() => {
            setBalance(0);               // Vault: 0 BLT
            setNaira(0);                 // Wallet: 0 BNG
            setBorrowedAmount(0);       // Loan: 0 BNG
            setUserInvestment(0);
            setPurchasedPhases([]);
            setTransactions([]);
            setPurchases({});
            setScreen("wallet");
            settlePendingBonusesFor(user);
          }}
        />
      )}
      {screen === "tiers" && (
        <RewardTiers user={user} onBack={() => setScreen("profile")} />
      )}
      {screen === "wallet" && (
        <Wallet
          balance={balance}
          naira={naira}
          borrowedAmount={borrowedAmount}
          setScreen={setScreen}
        />
      )}
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
      {screen === "depositAddress" && (
        <DepositAddress
          selectedCoin={selectedCoin}
          onBack={() => setScreen("selectCoin")}
        />
      )}
      {screen === "selectCoin" && (
        <SelectCoin
          setScreen={setScreen}
          setSelectedCoin={setSelectedCoin}
          onBack={() => setScreen("receive")}
        />
      )}
      {screen === "receive" && (
        <Receive setScreen={setScreen} onBack={() => setScreen("wallet")} />
      )}
      {screen === "receiveFromBeliever" && (
        <ReceiveFromBeliever user={user} onBack={() => setScreen("receive")} />
      )}
      {screen === "p2p" && (
        <P2PTrading
          onBack={() => setScreen("receive")}
          setScreen={setScreen}
          onDeposit={(amount) => {
            setNaira((prev) => prev + amount);
            setTransactions((prev) => [
              ...prev,
              {
                type: "Deposit",
                amount: `₦${amount.toLocaleString()}`,
                time: new Date().toLocaleString(),
              },
            ]);
            setScreen("wallet");
          }}
        />
      )}
      {screen === "p2pbanktransfer" && (
        <P2PBankTransfer onBack={() => setScreen("p2p")} />
      )}
      {screen === "p2pbank" && (
        <P2PBank
          onBack={() => setScreen("send")}
          onDeposit={(amount) => {
            setNaira((prev) => prev + amount);
            setTransactions((prev) => [
              ...prev,
              {
                type: "Deposit",
                amount: `₦${amount}`,
                time: new Date().toLocaleString(),
              },
            ]);
            setScreen("wallet");
          }}
        />
      )}
      {screen === "withdraw" && (
        <WithdrawCrypto
          naira={naira}
          onBack={() => setScreen("send")}
          onSend={handleSend} // You already have this
        />
      )}

      {screen === "sendtobeliever" && (
        <SendToBeliever
          naira={naira}
          onBack={() => setScreen("send")}
          onSend={handleSend}
        />
      )}
      {screen === "deposit" && <Deposit onBack={() => setScreen("home")} onDeposit={handleDeposit} />}
      {screen === "borrow" && <Borrow balance={balance} naira={naira} onBack={() => setScreen("home")} onBorrow={handleBorrow} />}
      {screen === "send" && (
        <Send
          setScreen={setScreen}
          onBack={() => setScreen("wallet")}
        />
      )}

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
      {screen === "depositcrypto" && <DepositCrypto onBack={() => setScreen("receive")} />}
      {screen === "referral" && (
        <Referral
          user={user}
          onBack={() => setScreen("profile")}
          onOpenLeaderboard={() => setScreen("referralLeaderboard")}
        />
      )}
      {screen === "referralLeaderboard" && (
        <ReferralLeaderboard
          user={normalize(user)}
          onBack={() => setScreen("referral")}
        />
      )}
      {screen === "profile" && (
        <Profile
          user={user}
          balance={balance}
          onReferral={() => setScreen("referral")}
          onMoonPhases={() => setScreen("moonphases")}
          onTransactions={() => setScreen("transactions")}
          onLeaderboard={() => setScreen("leaderboard")}
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
      {/* Show BottomNav only if user is authenticated */}
      {isAuthed && <BottomNav current={screen} setScreen={setScreen} />}
    </>
  );
}

export default App;