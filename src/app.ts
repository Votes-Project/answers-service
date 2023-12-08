import { join } from 'path';
import AutoLoad, {AutoloadPluginOptions} from '@fastify/autoload';
import { FastifyPluginAsync, FastifyServerOptions } from 'fastify';
import { grafserv } from "postgraphile/grafserv/fastify/v4";
import pgl from './pgl';
export interface AppOptions extends FastifyServerOptions, Partial<AutoloadPluginOptions> {}

const grafservInstance = pgl.createServ(grafserv);
const app: FastifyPluginAsync<AppOptions> = async (
    fastify,
    opts
): Promise<void> => {

  grafservInstance.addTo(fastify).catch((e) => {
    console.error(e);
    process.exit(1);
  });

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts
  })

};

export default app;
export { app }
