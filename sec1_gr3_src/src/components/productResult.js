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
const Img = styled.img`
    display: block;
    width: 90%;
    border-radius: 50%;
    padding: 5px;
    margin:auto;
`;

class DisplayProduct extends React.Component{
    constructor(props){
        super(props);
        
        let res = props.location.pathname.split("/");
        this.state = {
            pID: res[res.length-1]
        }
        
    }
    componentDidMount(){
        this.select();
    }
    select(){
        let toSend = {
            method: "id",
            product:{
                pID: this.state.pID,
                pName: "",
                pMinPrice: "",
                pMaxPrice: "",
                pCal: ""
            }
        };
        fetch("http://localhost:3000/ds_product_list", {
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
                        <LoginLegend>Menu</LoginLegend>
                        <Img src={process.env.PUBLIC_URL +'/Images/Product/'+ this.state.returnInfo.pImage}/>
                        <Account> Name: {this.state.returnInfo.pName}</Account><br/>
                        <Account> Price: {this.state.returnInfo.pPrice} &nbsp;&nbsp;&nbsp;&nbsp; Cals: {this.state.returnInfo.pCal}</Account><br/>
                        <Account> {this.state.returnInfo.pInfo}</Account><br/>
                    </LoginFieldSet>
                </Collumn>
            }
            </Container>
        )
    }

}
export default DisplayProduct;