const fs = require("fs");

if (fs.existsSync("build.json")) {
  const buildNumber = JSON.parse(fs.readFileSync("build.json", "utf-8"));
  buildNumber.build++;
  buildNumber.date = Date.now();
  fs.writeFileSync("build.json", JSON.stringify(buildNumber));
} else {
  fs.writeFileSync("build.json", JSON.stringify({ build: 1, date: Date.now() }));
}
