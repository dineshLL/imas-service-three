import routes from './src/routing/index.routes'
import emmitor from './src/event-emmitor/emittor'
import manager from './src/transport/seneca.manager'

let seneca = require('seneca')()
seneca.use('./redis-queue-transport', {
  'redis-queue': {
    timeout: 22222,
    type: 'redis-queue',
    host: '192.168.99.100',
    port: 6379
  }
})

  .ready(function () {
    console.log('ready function called') //routes.insertHandler
    this.add({ role: 'three'}, function(msg, reply) {
      reply({message: 'this is the reply from the service 3'})
    });
  });

seneca.listen({ type: 'redis-queue', pin: 'role: three' })
