const fs = require('fs');

const stdin = process.openStdin();
let data = '';

stdin.on('data', function(chunk) {
  data += chunk;
});

stdin.on('end', function() {

  const result = JSON.parse(data);

  fs.writeFileSync('config.json',  result["SecretString"]);
});
