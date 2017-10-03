/* eslint-disable no-console */

import chalk from 'chalk';
import ip from 'ip';

/**
 * Logger middleware, you can customize it to make messages more personal
 */
export default () => {
  const divider = chalk.gray('\n-----------------------------------');
  return {
    // Called whenever there's an error on the server we want to print
    error: (err) => {
      console.error(chalk.red(err));
    },

    // Called when express.js app starts on given port w/o errors
    appStarted: (env, port, host, tunnelStarted) => {
      console.log(`Server(${chalk.yellow(env)}) started ! ${chalk.green('✓')}`);
      console.log(`
        ${chalk.bold('Access URLs:')}${divider}
        Localhost: ${chalk.magenta(`http://${host}:${port}`)}
              LAN: ${chalk.magenta(`http://${ip.address()}:${port}`) +
        (tunnelStarted ? `\n    Proxy: ${chalk.magenta(tunnelStarted)}` : '')}${divider}
        ${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
      `);
    },
  };
};
