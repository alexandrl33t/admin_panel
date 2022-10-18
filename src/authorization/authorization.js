import '../App.css';
import {useNavigate} from "react-router-dom";
function Authorization() {
  const navigateTo = useNavigate()

  const handleButtonClick = () => {
      navigateTo('/two-factors-authentication')
  }
  return (
      <>
        <div id="wrapper">
            <h1>SMART REVOLUTION</h1>
            <form id="signin" method="" action="" autoComplete="off">
                <input type="text" id="user" name="user" placeholder="username"/>
                <input type="password" id="pass" name="pass" placeholder="password"/>
                <button type="submit" onClick={handleButtonClick}>&#xf0da;</button>
                <p>forgot your password? <a href="#/">click here</a></p>
            </form>
        </div>
      </>
  );
}

export default Authorization;
