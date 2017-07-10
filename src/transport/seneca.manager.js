import singleton from 'singleton';
import Seneca from 'seneca';

class SenecaManager extends singleton {
  constructor() {
    super();
    this.seneca = new Seneca();
    this.seneca.use('./redis-queue-transport', {
        'redis-queue': {
            timeout: 22222,
            type: 'redis-queue',
            host: '192.168.99.100',
            port: 6379
        }
    }).client({ type: 'redis-queue', pin:'role:*, cmd:*, payload:*' });
  }

}


export default SenecaManager.get();
