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
import {  register, userActions } from "../../components/store/user.slice";
import { RootState } from "../../components/store/store";
import cl from "classnames";
import styles from '../Login/Login.module.css'

export type LoginForm = {
  email: {
    value: string;
  };
  name: {
    value: string;
  };
  password: {
    value: string;
  };
}

const Register = () => {
  const navigate = useNavigate();
  const  dispatch = useDispatch<AppDispatch>();
  const {jwt, registerErrorMessage} = useSelector((s: RootState) => s.user);
  
  useEffect(() => {
    if(jwt){
      navigate('/online-store/');
    }
  }, [jwt, navigate]);
  
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearLoginError());
    const target = e.target as typeof e.target & LoginForm;
    const {email, password, name} = target;
    await sendRegister(email.value, password.value, name.value);
  };

  const sendRegister = async(email: string, password: string, name: string) => {
    dispatch(register({email, password, name}));
  };

  return (
    <form onSubmit={submit} className={cl(styles['form'])}>
       <Header>Зарегистрироваться</Header>
       {registerErrorMessage && <div className="dark">{registerErrorMessage}</div>}
        <div>
          <div>  
              <InputText>ваш email</InputText>            
              <Input name="email" id="email"/>          
          </div>
          <div>  
              <InputText>ваш пароль</InputText>            
              <Input type="password" name="password" id="password"/>          
          </div>
          <div>  
              <InputText>ваше имя</InputText>            
              <Input name="name" id="name"/>          
          </div>
          <LinkBtnParent>
              <Button appearance="big">Вход</Button>
              <Links link="/auth/login" firstLink="Нет аккаунта ?" secondLink="Зарегистрироваться"/>
          </LinkBtnParent> 
        </div>
    </form>
  )
}

export default Register;