import "graphile-config";
import "postgraphile";
import { PostGraphileAmberPreset } from "postgraphile/presets/amber";
import { PostGraphileRelayPreset } from "postgraphile/presets/relay";
import { makePgService } from "postgraphile/adaptors/pg";

const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
  console.error('No DATABASE_URL in environment. Exiting...');
  process.exit(1);
}

const preset: GraphileConfig.Preset = {
  extends: [PostGraphileAmberPreset, PostGraphileRelayPreset],
  pgServices: [makePgService({
    connectionString: DATABASE_URL,
    schemas: ["public"],
  })],
  grafserv: {
    graphqlPath: "/graphql",
    graphiqlPath: "/graphiql"
  }
};

export default preset;