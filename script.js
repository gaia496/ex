let wallet = 1000000;
const INITIAL_WALLET = 1000000;
let totalSpent = 0;
let totalWon = 0;

const prizes = [
    { name: "1等 7億円", amount: 700000000, prob: 20000000 },
    { name: "2等 1000万円", amount: 10000000, prob: 5000000 },
    { name: "3等 100万円", amount: 1000000, prob: 200000 },
    { name: "4等 5万円", amount: 50000, prob: 6666 },
    { name: "5等 1万円", amount: 10000, prob: 1000 },
    { name: "6等 3000円", amount: 3000, prob: 100 },
    { name: "7等 300円", amount: 300, prob: 10 }
];

function play(count) {
    const cost = count * 300;
    if (wallet < cost) {
        alert("軍資金が足りません！");
        return;
    }

    wallet -= cost;
    totalSpent += cost;
    let roundWon = 0;

    for (let i = 0; i < count; i++) {
        for (let p of prizes) {
            if (Math.random() < (1 / p.prob)) {
                roundWon += p.amount;
                addLog(p.name);
                if (p.amount >= 1000000) triggerFlash(); // 高額当選演出
                break;
            }
        }
    }

    totalWon += roundWon;
    updateUI();
}

function playAllIn() {
    const maxTickets = Math.floor(wallet / 300);
    if (maxTickets > 0) play(maxTickets);
}

function updateUI() {
    document.getElementById('currentWallet').innerText = wallet.toLocaleString();
    document.getElementById('totalSpent').innerText = totalSpent.toLocaleString();
    document.getElementById('totalWon').innerText = totalWon.toLocaleString();
    
    const balance = totalWon - totalSpent;
    const balanceEl = document.getElementById('balance');
    balanceEl.innerText = balance.toLocaleString();
    balanceEl.style.color = balance < 0 ? "#ff4757" : "#2ecc71";

    // プログレスバー更新
    const percent = (wallet / INITIAL_WALLET) * 100;
    document.getElementById('walletBar').style.width = Math.max(0, percent) + "%";

    // 絶望の換算
    document.getElementById('commentary').innerText = getCommentary(balance);
    
    // 称号
    document.getElementById('rankDisplay').innerText = "称号: " + getRank(totalSpent);
}

function getCommentary(balance) {
    const abs = Math.abs(balance);
    if (balance >= 0) return "奇跡だ…あなたは今、運命に勝っています。";
    if (abs < 10000) return "まだまだ。これからが本当の勝負ですよ。";
    if (abs < 100000) return `失ったお金で「高級な寿司」に ${Math.floor(abs/15000)}回 行けましたね。`;
    if (abs < 500000) return `失ったお金で「iPhone 15 Pro」が ${Math.floor(abs/180000)}台 買えましたね。`;
    return `損失は「軽自動車」 ${Math.floor(abs/1500000)}台分 に達しました。`;
}

function getRank(spent) {
    if (spent > 5000000) return "国家のパトロン";
    if (spent > 1000000) return "伝説の養分";
    if (spent > 500000) return "期待の新人ギャンブラー";
    return "一般人";
}

function addLog(prizeName) {
    const log = document.getElementById('winLog');
    const li = document.createElement('li');
    li.innerText = `[当選] ${prizeName}`;
    li.style.color = "#f1c40f";
    log.prepend(li);
}

function triggerFlash() {
    document.body.classList.add('flash');
    setTimeout(() => document.body.classList.remove('flash'), 500);
}
