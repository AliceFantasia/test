import React from 'react'
import styled, { ThemeConsumer } from 'styled-components';

const Container = styled.section`
    display: flex;
    margin-top: 0%;
    margin-bottom: 0%;
    justify-content: center;
`;
const Collumn = styled.section`
    display: block;
    border-radius: 10px;
    width: 33%;
    padding: 10px;
    margin: 10px;
`;
const Account = styled.div`
    width: 90%;
    background-color: rgb(213, 213, 213);
    padding: 10px;
    border-radius: 5px;
    margin: auto;
`;
const LoginFieldSet = styled.fieldset`
    width: 90%; 
    border-radius: 20px; 
    justify-content: center; 
    margin: auto; 
    padding: 10px;
`;
const LoginLegend = styled.legend`
    text-align: center;     
    font-size: large; 
    font-weight: bold;
`;
const InputBox = styled.input`
    border-color: aliceblue;
    border-radius: 5px;
    padding: 5px 10px;
`;

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username : "",
            password : ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleLogin(e){
        e.preventDefault();
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then((responseAccount) => responseAccount.json())
        .then((responseAccount) => {
            let toSend={
                id: responseAccount.results[0].uID,
                firstName: "",
                lastName: ""
            }
            fetch("http://localhost:3000/user_list/", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(toSend)
            })
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    username: "",
                    password: "",
                    accountInfo: response,
                    role: responseAccount.results[0].role
                });
                console.log(this.state);
            })
            .catch((err) => {
                console.log(err);
            });

        })
        .catch((err) => {
            console.log(err);
        });
    }
    handleLogOut(e){
        e.preventDefault();
        this.setState({
            accountInfo: null,
            role: null
        });
    }
  
  
    render() {
        return (
            <div>
                <Container>
                    <Collumn>
                        <form>
                            <LoginFieldSet>
                                <LoginLegend>Login</LoginLegend>
                                Username:<br/>
                                <InputBox type="text" name="username" id="Username" value={this.state.username} onChange={this.handleChange} required placeholder="username" /><br/>
                                Password:<br/>
                                <InputBox type="password" name="password" id="Password" value={this.state.password} onChange={this.handleChange} required placeholder="password" /><br/><br/>
                                <button type="button" onClick={this.handleLogin}> Log In </button> &nbsp;&nbsp;
                            </LoginFieldSet>
                        </form>
                    </Collumn>
                </Container><br/>
                <Container>
                    { this.state.accountInfo && this.state.role &&
                        <Collumn>
                            <LoginFieldSet>
                                <LoginLegend>Account</LoginLegend>
                                <Account> Name: {this.state.accountInfo.results[0].firstName} {this.state.accountInfo.results[0].lastName}</Account><br/>
                                <Account> Address: {this.state.accountInfo.results[0].address}</Account><br/>
                                <Account> Date of Birth: {this.state.accountInfo.results[0].DOB}</Account><br/>
                                <Account> E-mail: {this.state.accountInfo.results[0].email}</Account><br/>
                                <Account> Role: {this.state.role}</Account><br/>
                                <button type="button" onClick={this.handleLogOut}>Log out</button>
                            </LoginFieldSet>
                        </Collumn>
                    }
                </Container>
            </div>
        );
    }
}
export default Login