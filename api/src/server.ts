import app from "./app";
import dotenv from "dotenv";
import { getServiceConfig } from "./getServiceConfig";

dotenv.config();
const { PORT } = getServiceConfig();

const port = PORT || 3001;

app().listen(port, () => {
  console.log("Express server listening on port " + port);
});
