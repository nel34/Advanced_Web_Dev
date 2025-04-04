const axios = require("axios");
const qs = require("qs");

const GRAYLOG_API = process.env.GRAYLOG_API_URL || "http://graylog:9000/api";
const GRAYLOG_USER = process.env.GRAYLOG_ADMIN_USERNAME || "admin";
const GRAYLOG_PASSWORD = process.env.GRAYLOG_ADMIN_PASSWORD || "admin";

const auth = Buffer.from(`${GRAYLOG_USER}:${GRAYLOG_PASSWORD}`).toString("base64");

const headers = {
  Authorization: `Basic ${auth}`,
  "X-Requested-By": "setup-gelf",
  "Content-Type": "application/json",
  Accept: "application/json",
};

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const waitForGraylog = async () => {
  for (let i = 0; i < 30; i++) {
    try {
      const res = await axios.get(`${GRAYLOG_API}/cluster`, { headers });
      if (res.status === 200) return true;
    } catch (err) {
      console.log("⌛ Waiting...");
    }
    await sleep(2000);
  }
  throw new Error("⛔ Graylog ne répond pas");
};

const gelfExists = async () => {
  try {
    const res = await axios.get(`${GRAYLOG_API}/system/inputs`, { headers });
    return res.data?.inputs?.some((input) => input?.title === "GELF UDP");
  } catch (err) {
    console.error("❌ Erreur lors de la vérification GELF:", err.response?.data || err.message);
    return false;
  }
};

const createGelfInput = async () => {
  const exists = await gelfExists();
  if (exists) {
    console.log("ℹ️ GELF UDP existe déjà.");
    return;
  }

  try {
    await axios.post(
      `${GRAYLOG_API}/system/inputs`,
      {
        title: "GELF UDP",
        type: "org.graylog2.inputs.gelf.udp.GELFUDPInput",
        configuration: {
          bind_address: "0.0.0.0",
          port: 12201,
          recv_buffer_size: 262144,
          override_source: null,
        },
        global: true,
      },
      { headers }
    );
    console.log("✅ GELF input créé !");
  } catch (err) {
    console.error("❌ Erreur création GELF:", err.response?.data || err.message);
  }
};

(async () => {
  await waitForGraylog();
  await createGelfInput();
})();