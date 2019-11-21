module.exports = {
  apps : [{
    name: 'umnenie.com',
    script: 'npx',
    interpreter: 'none'	,
    args: 'serve build -s',
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};

