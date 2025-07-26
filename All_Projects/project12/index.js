import fs from 'fs';
import fetch from 'node-fetch';
import readline from 'readline';

const url = "https://latest.currency-api.pages.dev/v1/currencies/eur.json";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const convertor = async () => {
    try {
        const res = await fetch(url);
        const data = await res.json();

        rl.question("Enter target currency (e.g., inr, usd, jpy): ", (targetCurrency) => {
            const currency = targetCurrency.toLowerCase();

            if (!data.eur[currency]) {
                console.log(`❌ Currency "${currency}" not supported.`);
                rl.close();
                return;
            }

            const rate = data.eur[currency];

            rl.question(`Enter amount in EUR to convert to ${currency.toUpperCase()}: `, (uamount) => {
                const amount = parseFloat(uamount);

                if (isNaN(amount)) {
                    console.log("❌ Please enter a valid number.");
                } else {
                    const converted = amount * rate;
                    console.log(`✅ ${amount} EUR = ${converted.toFixed(2)} ${currency.toUpperCase()}`);
                }

                rl.close();
            });
        });

    } catch (err) {
        console.error("❌ Failed to fetch currency data:", err);
        rl.close();
    }
};

convertor();
