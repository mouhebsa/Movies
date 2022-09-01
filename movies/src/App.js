import { Provider } from "react-redux";
import { configueAppStore } from "./store/configureStore";
import Movies from './modules/movies'
import 'antd/dist/antd.min.css';

function App() {
  const store = configueAppStore();

  return (
    <Provider store={store}>
      <Movies />
    </Provider>
  );
}

export default App;
