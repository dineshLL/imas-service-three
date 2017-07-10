import LogController from '../controllers/log.controller';

class RoutingHandler {

  constructor() {
    this.logCtrl = new LogController();
  }

  dataLogHandler = (args, reply) => {
    console.log('Routing handler(Loggin service)')
    this.logCtrl.logData(args)
    .then((data) => {
      reply(null, {
        code: 200,
        message: 'log completed'
      });
    })
    .catch((err) => {
      reply(err, {code: '500', message: 'internal error occured'});
    });
  }

}

const routes = new RoutingHandler();
export default routes;
