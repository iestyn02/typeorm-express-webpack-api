const figlet = require('figlet');
const chalk = require('chalk');

const log = console.info;

export const displayBanner = (APP_NAME: string, ENV: string, APP_VERSION: string, HOST: string, PORT: number, DB_HOST: number, DB_PORT: number) => {
  figlet.text(APP_NAME, (error: any, data: any) => {
    if (error) {
      return process.exit(1);
    }
    log(``);
    log(``);
    log(chalk.blue(data));
    log(``);
    log(``);
    log(`API is now running`);
    log(`press <CTRL> + C at any time to stop running`);
    log(``);
    log('__________________________________________________________________________');
    log('');
    log(`Environment  : ${ENV}`);
    log(`Version      : ${APP_VERSION}`);
    log(`DB           : ${DB_HOST}:${DB_PORT}`);
    log(`API          : http://${HOST}:${PORT}`);
    log('__________________________________________________________________________');
    log(``);
  });
}
