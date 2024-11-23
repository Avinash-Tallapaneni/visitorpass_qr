import serverConfig from "../config/config";
import app from "./app";

app.listen(serverConfig.port, () => {
  console.log(`server is running on port ${serverConfig.port}`);
});
