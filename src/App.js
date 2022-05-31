import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ProductPanel from "./components/productPanel/ProductPanel";
import UserPanel from "./components/userPanel/UserPanel";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <div className="userPanelApp">
        <UserPanel />
      </div>
      <div className="productPanelApp">
        <ProductPanel />
      </div>
    </div>
  );
}

export default App;
