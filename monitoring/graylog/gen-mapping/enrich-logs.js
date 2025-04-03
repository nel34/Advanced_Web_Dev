const fs = require('fs');
const path = require('path');

const containersDir = '/var/lib/docker/containers';
const outputDir = '/app/enriched-logs';
const containerMapPath = '/app/container-map.json';

let containerMap = {};

function loadContainerMap() {
  try {
    const data = fs.readFileSync(containerMapPath, 'utf-8');
    const map = JSON.parse(data);
    for (const entry of map) {
      containerMap[entry.container_id.substring(0, 12)] = entry;
    }
    console.log("✅ container-map.json chargé.");
  } catch (err) {
    console.error("❌ Erreur chargement container-map.json:", err.message);
  }
}

function enrichLine(line, containerId) {
  const shortId = containerId.substring(0, 12);
  const meta = containerMap[shortId];
  const timestamp = new Date().toISOString();

  return JSON.stringify({
    container_id: shortId,
    container_name: meta?.container_name || 'unknown',
    ip_address: meta?.ip_address || null,
    host_port: meta?.host_port || null,
    timestamp,
    short_message: line.trim(),
    stream: "stdout"
  });
}

function enrichInitialLogs() {
  console.log("📁 Lecture initiale des logs Docker...");

  const containerDirs = fs.readdirSync(containersDir);
  for (const dir of containerDirs) {
    const logFile = path.join(containersDir, dir, `${dir}-json.log`);
    if (!fs.existsSync(logFile)) continue;

    const containerId = dir;
    const shortId = containerId.substring(0, 12);
    const meta = containerMap[shortId];
    if (!meta) continue;

    const outputFile = path.join(outputDir, `${meta.container_name}.log`);
    const lines = fs.readFileSync(logFile, 'utf-8').split('\n').filter(Boolean);

    const enrichedLines = lines.map(line => {
      try {
        const parsed = JSON.parse(line);
        return enrichLine(parsed.log || '', containerId);
      } catch (err) {
        return null;
      }
    }).filter(Boolean);

    fs.appendFileSync(outputFile, enrichedLines.join('\n') + '\n');
    console.log(`✅ ${enrichedLines.length} logs enrichis dans ${meta.container_name}.log`);
  }
}

function watchLiveLogs() {
  console.log("🔍 Surveillance des logs Docker...");

  const containerDirs = fs.readdirSync(containersDir);
  for (const dir of containerDirs) {
    const logFile = path.join(containersDir, dir, `${dir}-json.log`);
    if (!fs.existsSync(logFile)) continue;

    const containerId = dir;
    const shortId = containerId.substring(0, 12);
    const meta = containerMap[shortId];
    if (!meta) continue;

    const outputFile = path.join(outputDir, `${meta.container_name}.log`);

    let lastSize = fs.statSync(logFile).size;

    console.log(`📡 Suivi actif pour ${meta.container_name}`);

    fs.watchFile(logFile, { interval: 1000 }, (curr, prev) => {
      if (curr.size > lastSize) {
        console.log(`📝 Modification détectée dans ${meta.container_name}`);
        const stream = fs.createReadStream(logFile, {
          encoding: 'utf-8',
          start: lastSize,
          end: curr.size
        });

        let buffer = '';
        stream.on('data', chunk => {
          buffer += chunk;
          const lines = buffer.split('\n');
          buffer = lines.pop();

          lines.forEach(line => {
            try {
              const parsed = JSON.parse(line);
              const enriched = enrichLine(parsed.log || '', containerId);
              fs.appendFileSync(outputFile, enriched + '\n');
            } catch (err) {
              // ligne corrompue
            }
          });
        });

        stream.on('end', () => {
          lastSize = curr.size;
        });
      }
    });
  }
}

function main() {
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  loadContainerMap();
  enrichInitialLogs();
  watchLiveLogs();
}

main();