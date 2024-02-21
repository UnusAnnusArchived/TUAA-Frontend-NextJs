const fs = require("fs");
const stream = require("stream");
const decompress = require("decompress");
const config = require("../../src/config.json");
const endpoints = require("../../src/endpoints.json");

const { devApiKey } = config.tolgee;
const { tolgee: apiUrl } = endpoints;

const clean = async () => {
  const directory = fs.readdirSync("src/tolgee/exported-i18n");
  for (let i = 0; i < directory.length; i++) {
    fs.rmSync(`src/tolgee/exported-i18n/${directory[i]}`, { recursive: true, force: true });
  }
  await fetchExport();
};

const fetchExport = async () => {
  const res = await fetch(`${apiUrl}/v2/projects/export`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": devApiKey,
    },
    body: JSON.stringify({
      format: "JSON",
      zip: true,
      filterState: ["TRANSLATED", "REVIEWED"],
    }),
  });

  // stream.Readable.fromWeb(res.body).pipe(fs.createWriteStream("src/tolgee/exported-i18n/export.zip"));

  const arrayBuffer = await res.arrayBuffer();

  const buffer = Buffer.from(arrayBuffer);

  fs.writeFileSync("src/tolgee/exported-i18n/export.zip", buffer);

  await unzip();
};

const unzip = async () => {
  await decompress("src/tolgee/exported-i18n/export.zip", "src/tolgee/exported-i18n/");
  fs.rmSync("src/tolgee/exported-i18n/export.zip");
};

clean();
