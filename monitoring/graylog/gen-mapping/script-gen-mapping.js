// script-gen-mapping.js
const fs = require('fs');
const path = require('path');

const containersDir = '/var/lib/docker/containers';
const outputPath = '/app/container-map.json';
const outputDir = '/app/enriched-logs';

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const result = [];

fs.readdirSync(containersDir).forEach(containerId => {
  const containerPath = path.join(containersDir, containerId);
  const configPath = path.join(containerPath, 'config.v2.json');
  const hostsPath = path.join(containerPath, 'hosts');

  if (!fs.existsSync(configPath) || !fs.existsSync(hostsPath)) return;

  try {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    const hosts = fs.readFileSync(hostsPath, 'utf-8');

    const name = config.Name ? config.Name.replace('/', '') : containerId.slice(0, 12);

    const ipMatch = hosts.match(/(\d+\.\d+\.\d+\.\d+)\s+/);
    const ip = ipMatch ? ipMatch[1] : null;

    const configText = fs.readFileSync(configPath, 'utf-8');
    const portMatch = configText.match(/"HostPort":"(\d+)"/);
    const hostPort = portMatch ? portMatch[1] : null;

    result.push({
      container_id: containerId,
      container_name: name,
      ip_address: ip,
      host_port: hostPort
    });
  } catch (err) {
    console.error(`Erreur dans ${containerId}:`, err.message);
  }
});

fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
console.log(`✅ Mapping écrit dans ${outputPath}`);