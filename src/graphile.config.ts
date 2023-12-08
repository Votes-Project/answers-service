import "graphile-config";
import "postgraphile";
import { PostGraphileAmberPreset } from "postgraphile/presets/amber";
import { PostGraphileRelayPreset } from "postgraphile/presets/relay";
import { makePgService } from "postgraphile/adaptors/pg";

const preset: GraphileConfig.Preset = {
  extends: [PostGraphileAmberPreset, PostGraphileRelayPreset],
  pgServices: [makePgService({ connectionString: process.env.DATABASE_PRIVATE_URL })],
  grafserv: {
    graphqlPath: "/graphql",
    graphiqlPath: "/graphiql"
  }
};

export default preset;