import React from 'react'
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

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
const AdminInputBox = styled.input`
    border-color: aliceblue;
    border-radius: 5px;
    padding: 5px 10px;
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
const PrintedTable = styled.table`
    width: 100%;  
    border: 1px solid black;
    border-collapse: collapse;
`;
const HeaderTR = styled.tr`
    border: 1px solid black;
`;
const PrintedTH = styled.th`
    border: 1px solid black;
`;
const PrintedTD = styled.td`
    border: 1px solid black;
`;
const NewNavLink = styled(NavLink)`
    text-decoration: none;
    color: blue;
	:hover {
		color: red;
		cursor: pointer;
	}
`;


class UserManagement extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id : "",
            username : "",
            password : "",
            firstname : "",
            lastname : "",
            address : "",
            dob : "",
            email : "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleInsert = this.handleInsert.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSelectAll = this.handleSelectAll.bind(this);
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleInsert(e){
        e.preventDefault();
        let toSend = {
            user: {
                uID: this.state.id,
                firstName: this.state.firstname,
                lastName: this.state.lastname,
                address: this.state.address,
                DOB: this.state.dob,
                email: this.state.email,
            },
            account: {
                username: this.state.username,
                password: this.state.password
            }
        }
        fetch("http://localhost:3000/register/", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(toSend)
        })
        .then((response) => response.json())
        .then((response) => {
            this.selectAll();
        })
        .catch((err) => {
            console.log(err);
        });
    }
    handleUpdate(e){
        e.preventDefault();
        let toSend = {
            user: {
                uID: this.state.id,
                firstName: this.state.firstname,
                lastName: this.state.lastname,
                address: this.state.address,
                DOB: this.state.dob,
                email: this.state.email,
            }
        }
        fetch("http://localhost:3000/user_list/", {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(toSend)
        })
        .then((response) => response.json())
        .then((response) => {
            this.selectAll();
        })
        .catch((err) => {
            console.log(err);
        });
    }
    handleDelete(e){
        e.preventDefault();
        let toSend = {
            uID: this.state.id,
        }
        fetch("http://localhost:3000/user_list/", {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(toSend)
        })
        .then((response) => response.json())
        .then((response) => {
            this.selectAll();
        })
        .catch((err) => {
            console.log(err);
        });
    }
    handleSelect(e){
        e.preventDefault();
        let toSend={
            id: this.state.id,
            firstName: this.state.firstname,
            lastName: this.state.lastname
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
               returnInfo: response
            });
            console.log(this.state);
        })
        .catch((err) => {
            console.log(err);
        });
    }
    handleSelectAll(e){
        e.preventDefault();
        this.selectAll();
    }

    selectAll() {
        fetch("http://localhost:3000/user_list_all/", {
            method: "GET",
        })
        .then((response) => response.json())
        .then((response) => {
            this.setState({
               returnInfo: response
            });
            console.log(this.state);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                <h1> User Management </h1>
                <Container>
                    <Collumn>
                        <LoginFieldSet>
                            <LoginLegend>Insert</LoginLegend>
                            <form>
                                User ID:
                                <div>
                                    <AdminInputBox type="text" id="in_id" onChange={this.handleChange} placeholder="u00000000001" name="id"/>
                                </div><br/>
                        
                                Username:
                                <div>
                                    <AdminInputBox type="text" id="in_un" onChange={this.handleChange} placeholder="Username" name="username"/>
                                </div>
                        
                                Password:
                                <div>
                                    <AdminInputBox type="password" id="in_ps" onChange={this.handleChange} placeholder="Password" name="password"/>
                                </div><br/>
                        
                                Firstname:
                                <div>
                                    <AdminInputBox type="text" id="in_fn" onChange={this.handleChange} placeholder="Firstname" name="firstname"/>
                                </div>
                        
                                Lastname:
                                <div>
                                    <AdminInputBox type="text" id="in_ln" onChange={this.handleChange} placeholder="Lastname" name="lastname"/>
                                </div>
                                    
                                Address:
                                <div>
                                    <AdminInputBox type="text" id="in_address" onChange={this.handleChange} placeholder="110/57 Samsen-nai, Bangkok" name="address"/>
                                </div>
                                    
                                Date Of Birth:
                                <div>
                                    <AdminInputBox type="datetime" id="in_DOB" onChange={this.handleChange} placeholder="yyyy-mm-dd" name="dob"/>
                                </div>
                        
                                Email:
                                <div>
                                    <AdminInputBox type="text" id="in_email" onChange={this.handleChange} placeholder="stephen@gmail.com:" name="email"/>
                                </div>
                                <br/>
                                <button type="button" id="insert" onClick={this.handleInsert}>Insert</button>
                                <br/><br/>
                            </form>
                        </LoginFieldSet>
                    </Collumn>
                    <Collumn>
                        <LoginFieldSet>
                            <LoginLegend>Update</LoginLegend>    
                            <form>
                                User ID:
                                <div>
                                    <AdminInputBox type="text" id="up_id" onChange={this.handleChange} placeholder="u00000000001" name="id"/>
                                </div><br/>

                                Firstname:
                                <div>
                                    <AdminInputBox type="text" id="up_fn" onChange={this.handleChange} placeholder="Firstname" name="firstname"/>
                                </div>

                                Lastname:
                                <div>
                                    <AdminInputBox type="text" id="up_ln" onChange={this.handleChange} placeholder="Lastname" name="lastname"/>
                                </div>
                                        
                                Address:
                                <div>
                                    <AdminInputBox type="text" id="up_address" onChange={this.handleChange} placeholder="110/57 Samsen-nai, Bangkok" name="address"/>
                                </div>
                                        
                                Date Of Birth:
                                <div>
                                    <AdminInputBox type="datetime"  id="up_DOB" onChange={this.handleChange} placeholder="yyyy-mm-dd" name="dob"/>
                                </div>

                                Email:
                                <div>
                                    <AdminInputBox type="text" id="up_email" onChange={this.handleChange} placeholder="stephen@gmail.com:" name="email"/>
                                </div>
                                <br/>

                                <button type="button" id="update" onClick={this.handleUpdate}>Update</button>
                                <br/><br/>
                            </form> 
                        </LoginFieldSet>
                    </Collumn>
                    <Collumn>
                        <LoginFieldSet>
                            <LoginLegend>Delete, Select, and Select All</LoginLegend>    
                                <form>
                                    User ID:
                                    <div>
                                        <AdminInputBox type="text" id="sl_id" onChange={this.handleChange} placeholder="u00000000001" name="id"/>  &nbsp; &nbsp; <button type="button" id="delete" onClick={this.handleDelete}>Delete</button>
                                    </div>
                                    User First Name:
                                    <div>
                                        <AdminInputBox type="text" id="sl_id" onChange={this.handleChange} placeholder="Firstname" name="firstname"/>
                                    </div>
                                    User Last Name:
                                    <div>
                                        <AdminInputBox type="text" id="sl_id" onChange={this.handleChange} placeholder="Lastname" name="lastname"/>
                                    </div>
                                    <br/>


                                    <button type="button" id="select" onClick={this.handleSelect}>Select</button> &nbsp;
                                    <button type="button" id="selectAll" onClick={this.handleSelectAll}>Select all</button> &nbsp;
                                    <br/><br/>
                                </form>
                        </LoginFieldSet>
                    </Collumn>
                </Container>
                
                <div>
                    <DisplayUsers toPrint={this.state.returnInfo} />
                </div>
            </div>
        );
    }
}

class DisplayUsers extends React.Component{
    render() {
        return (
            <div>
                <h2> User List </h2>
                <PrintedTable>
                    <HeaderTR>
                        <PrintedTH>ID</PrintedTH> <PrintedTH>Firstname</PrintedTH>  <PrintedTH>Lastname</PrintedTH> <PrintedTH>Birthdate</PrintedTH><PrintedTH>Address</PrintedTH><PrintedTH>Email</PrintedTH>
                    </HeaderTR>
                    {this.props.toPrint && this.props.toPrint.results.map(result => {
                        return <tr> 
                            <PrintedTD><NewNavLink to={"/userResult/" + result.uID}>{result.uID}</NewNavLink></PrintedTD>
                            <PrintedTD>{result.firstName}</PrintedTD>
                            <PrintedTD>{result.lastName}</PrintedTD>
                            <PrintedTD>{result.DOB}</PrintedTD>
                            <PrintedTD>{result.address}</PrintedTD>
                            <PrintedTD>{result.email}</PrintedTD>
                        </tr>
                    })}
                </PrintedTable>
            </div>
        )
    }

}
export default UserManagement