document.getElementById('startBtn').addEventListener('click', () => {
    const count = parseInt(document.getElementById('buyAmount').value);
    const PRICE = 300;
    
    const prizes = [
        { name: "1等 (7億円)", amount: 700000000, prob: 20000000 },
        { name: "2等 (1000万円)", amount: 10000000, prob: 5000000 },
        { name: "3等 (100万円)", amount: 1000000, prob: 200000 },
        { name: "4等 (5万円)", amount: 50000, prob: 6666 },
        { name: "5等 (1万円)", amount: 10000, prob: 1000 },
        { name: "6等 (3000円)", amount: 3000, prob: 100 },
        { name: "7等 (300円)", amount: 300, prob: 10 }
    ];

    let totalWon = 0;
    let results = {};
    prizes.forEach(p => results[p.name] = 0);

    // 抽選
    for (let i = 0; i < count; i++) {
        for (let p of prizes) {
            if (Math.random() < (1 / p.prob)) {
                totalWon += p.amount;
                results[p.name]++;
                break;
            }
        }
    }

    // 表示処理
    const spent = count * PRICE;
    const balance = totalWon - spent;
    
    document.getElementById('resultArea').classList.remove('hidden');
    document.getElementById('spent').innerText = spent.toLocaleString();
    document.getElementById('won').innerText = totalWon.toLocaleString();
    document.getElementById('balance').innerText = balance.toLocaleString();
    document.getElementById('rate').innerText = ((totalWon / spent) * 100).toFixed(2);

    // リストの更新
    const list = document.getElementById('detailsList');
    list.innerHTML = "";
    for (let key in results) {
        const li = document.createElement('li');
        li.innerText = `${key}: ${results[key]}本`;
        list.appendChild(li);
    }
});
