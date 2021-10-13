import React from 'react'
import styled from 'styled-components';

const Container = styled.section`
    display: flex;
    margin-top: 0%;
    margin-bottom: 0%;
    justify-content: center;
`;
const Collumn = styled.section`
    display: block;
    border-radius: 10px;
    width: 30%;
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

class DisplayUsers extends React.Component{
    constructor(props){
        super(props);
        
        let res = props.location.pathname.split("/");
        this.state = {
            id: res[res.length-1]
        }
        
    }
    componentDidMount(){
        this.select();
    }
    select(){
        let toSend={
            id: this.state.id,
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
                returnInfo: response.results[0]
            });
            console.log(this.state);
        })
        .catch((err) => {
            console.log(err);
        });
    }
    render() {
        return (
            <Container>
            { this.state && this.state.returnInfo &&
                <Collumn>
                    <LoginFieldSet>
                        <LoginLegend>Account</LoginLegend>
                        <Account> Name: {this.state.returnInfo.firstName} {this.state.returnInfo.lastName}</Account><br/>
                        <Account> Address: {this.state.returnInfo.address}</Account><br/>
                        <Account> Date of Birth: {this.state.returnInfo.DOB}</Account><br/>
                        <Account> E-mail: {this.state.returnInfo.email}</Account><br/>
                    </LoginFieldSet>
                </Collumn>
            }
            </Container>
        )
    }

}
export default DisplayUsers;