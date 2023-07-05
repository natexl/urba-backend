import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import jwtConfig from "../app/config/jwt"

export default (appInfo: EggAppInfo) => {
  
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1688523613557_793';

  // add your egg config in here
  config.middleware = [];

  config.jwt = jwtConfig;

  config.cors = {
    origin: '*', // 允许所有来源的请求，您可以根据需要更改此选项
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS', // 
    credentials: true, // 允许携带凭据
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };
  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
