import config from './config.json';

const getConfig = (parameter) => {
    const data = config[process.env.NODE_ENV][parameter];
    return data;
}

export default getConfig;