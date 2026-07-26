import AppRoutes from "./routes/AppRoutes";
import AnimatedBackground from "./components/common/AnimatedBackground";
import { Toaster } from "react-hot-toast";

function App(){

  return(

    <>

      <AnimatedBackground/>

      <Toaster
        position="top-right"
      />

      <AppRoutes/>

    </>

  );

}

export default App;