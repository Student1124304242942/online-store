import Input from "../../components/Input/Input";
import Header from "../../components/Header/Header";
import InputText from "../../components/InputText/InputText";
import Button from "../../components/Button/Button";
import Links from "../../components/Links/Links";
import { FormEvent,  useEffect } from "react";
import LinkBtnParent from "../../components/LinksBtnParent/LinkBtnParent";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../components/store/store";
import { login, userActions } from "../../components/store/user.slice";
import { RootState } from "../../components/store/store";
import cl from "classnames";
import styles from './Login.module.css'

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  }
}

const Login = () => {
  const navigate = useNavigate();
  const  dispatch = useDispatch<AppDispatch>();
  const {jwt, loginErrorMessage} = useSelector((s: RootState) => s.user);
  
  useEffect(() => {
    if(jwt){
      navigate('/online-store/');
    }
  }, [jwt, navigate]);
  
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearLoginError());
    const target = e.target as typeof e.target & LoginForm;
    const {email, password} = target;
    await sendLogin(email.value, password.value);
  };

  const sendLogin = async(email: string, password: string) => {
    dispatch(login({email, password}));
  };

  return (
    <form onSubmit={submit} className={cl(styles['form'])}>
       <Header>Вход</Header>
       {loginErrorMessage && <div className="dark">{loginErrorMessage}</div>}
        <div>
          <div>  
              <InputText>ваш email</InputText>            
              <Input name="email" id="email"/>          
          </div>
          <div>  
              <InputText>ваш пароль</InputText>            
              <Input type="password" name="password" id="password"/>          
          </div>
          <LinkBtnParent>
              <Button appearance="big">Вход</Button>
              <Links link="/auth/register" firstLink="Нет аккаунта ?" secondLink="Зарегистрироваться"/>
          </LinkBtnParent> 
        </div>
    </form>
  )
}

export default Login;

  /* const textRef = useRef();
  const focusError = () => {
      switch(true){
          case !isValid.text:
              textRef.current.focus();
              break;    
      }
  }
 */

  /*   const [value, setValue] = useState("");

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('submitted:', value);
  }
 */

   /* try {
      const {data} = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
        email,
        password
      })
      dispatch(userActions.addJwt(data.access_token));
      navigate('/');
    }catch(e){
      if(e instanceof AxiosError){
        console.log(e);
        setError(e.response?.data.message.join(" "));
      }
    } */