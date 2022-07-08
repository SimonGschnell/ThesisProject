import Hardware from "./components/Hardware";
import Software from "./components/Software";
import Server from "./components/Server";
import Test from "./components/Test";
const routes = [
  { name: "Hardware", title: "Hardware 💾", component: Hardware },
  { name: "Server", title: "Server 🖥️", component: Server },
  {
    name: "Software",
    title: "Software ℹ️",
    component: Software,
    initialParams: { test: "someTest" },
  },
];

export default routes;
