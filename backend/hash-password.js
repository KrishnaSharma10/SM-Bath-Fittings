const bcrypt = require("bcryptjs");
const readline = require("readline");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.question("Type the admin password: ", (password) => {
  if (password.length < 10) {
    console.log("Please use at least 10 characters.");
  } else {
    console.log("\nCopy this whole line into your .env:\n");
    console.log(`ADMIN_PASSWORD_HASH='${bcrypt.hashSync(password, 12)}'`);
  }
  rl.close();
});