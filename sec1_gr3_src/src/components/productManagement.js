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
const InputBox = styled.input`
    border-color: aliceblue;
    border-radius: 5px;
    padding: 5px 10px;
`;


class ProductManagement extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pID : "",
            pName : "",
            pMinPrice : 0,
            pMaxPrice : 0,
            pCal : 0,
            pInfo : "",
            pImage : "",
            fetchMethod: ""
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
            product: {
                pID: this.state.pID,
                pName: this.state.pName,
                pPrice: this.state.pMaxPrice,
                pCal: this.state.pCal,
                pInfo: this.state.pInfo,
                pImage: this.state.pImage,
            },
        }
        fetch("http://localhost:3000/product_list", {
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
            product: {
                pID: this.state.pID,
                pName: this.state.pName,
                pPrice: this.state.pMaxPrice,
                pCal: this.state.pCal,
                pInfo: this.state.pInfo,
                pImage: this.state.pImage,
            },
        }
        fetch("http://localhost:3000/product_list/", {
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
            method: e.target.value,
            product:{
                pID: this.state.pID,
                pName: this.state.pName,
                pMinPrice: this.state.pMinPrice,
                pMaxPrice: this.state.pMaxPrice,
                pCal: this.state.pCal
            }
        };
        fetch("http://localhost:3000/ds_product_list/", {
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
        let toSend = {
            method: e.target.value,
            product:{
                pID: this.state.pID,
                pName: this.state.pName,
                pMinPrice: this.state.pMinPrice,
                pMaxPrice: this.state.pMaxPrice,
                pCal: this.state.pCal
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
        fetch("http://localhost:3000/product_list_all/", {
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
                <h1> Product Management </h1>
                <Container>
                    <Collumn>
                        <LoginFieldSet>
                            <LoginLegend>Insert and Update</LoginLegend>
                            <form>
                                Product ID:
                                <div>
                                    <InputBox type="text" id="iu_id" placeholder="p1234567891234" name="pID" onChange={this.handleChange}/>
                                </div>

                                Product Name:
                                <div>
                                    <InputBox type="text" id="iu_name" placeholder="Cheese burger" name="pName" onChange={this.handleChange}/>
                                </div>

                                Product Price:
                                <div>
                                    <InputBox type="number" id="iu_price" placeholder="100" name="pMaxPrice" onChange={this.handleChange}/>
                                </div>

                                Product Calories:
                                <div class="col-sm-10">
                                    <InputBox type="number" id="iu_cals" placeholder="250" name="pCal" onChange={this.handleChange}/>
                                </div>
                                    
                                Product info:
                                <div class="col-sm-10">
                                    <InputBox type="text" id="iu_pInfo" placeholder="Made from 2 buns, a chunk of meat, and a slice of cheese" name="pInfo" onChange={this.handleChange}/>
                                </div>

                                Product image:
                                <div>
                                    <InputBox type="text" id="iu_pImage" placeholder="X_Burgur.png" name="pImage" onChange={this.handleChange}/>
                                </div>
                                <br/>
                                <button type="button" id="insert" onClick={this.handleInsert}>Insert</button>
                                <button type="button" id="update" onClick={this.handleUpdate}>Update</button>
                            </form>
                        </LoginFieldSet>
                    </Collumn>
                    <Collumn>
                        <LoginFieldSet>
                            <LoginLegend>Delete, Select, and Select All</LoginLegend>   
                            <form>

                                Product ID:
                                <div>
                                    <InputBox type="text" id="ds_id" placeholder="p1234567891234" name="pID" onChange={this.handleChange}/><br/>
                                    <button type="button" id="delete_id" value="id" onClick={this.handleDelete}>Delete</button>&nbsp;
                                    <button type="button" id="select_id" value="id" onClick={this.handleSelect}>Select</button>
                                </div>

                                Product Name:
                                <div>
                                    <InputBox type="text" id="ds_name" placeholder="Cheese burger" name="pName" onChange={this.handleChange}/><br/>
                                    <button type="button" id="delete_name" value="name" onClick={this.handleDelete}>Delete</button>&nbsp;
                                    <button type="button" id="select_name" value="name" onClick={this.handleSelect}>Select</button>
                                </div>

                                Min - Max Price:
                                <div>
                                    <InputBox type="number" id="ds_min_price" placeholder="Min Price" name="pMinPrice" onChange={this.handleChange}/> &nbsp; ~  &nbsp;
                                    <InputBox type="number" id="ds_max_price" placeholder="Max Price" name="pMaxPrice" onChange={this.handleChange}/> <br/>
                                    <button type="button" id="delete_price" value="price" onClick={this.handleDelete}>Delete</button>&nbsp;
                                    <button type="button" id="select_price" value="price" onClick={this.handleSelect}>Select</button>
                                </div>

                                Product Calories:
                                <div>
                                    <InputBox type="number" id="ds_cals" placeholder="Maximum Calories" name="pCal" onChange={this.handleChange}/><br/>
                                    <button type="button" id="delete_cal" value="cal" onClick={this.handleDelete}>Delete</button>&nbsp;
                                    <button type="button" id="select_cal" value="cal" onClick={this.handleSelect}>Select</button>
                                </div>
                                <br/>
                                <button type="button" id="selectAll" onClick={this.handleSelectAll}>Select all</button>
                            
                            </form>
                        </LoginFieldSet>
                    </Collumn>
                </Container>
                
                <div>
                    <DisplayProduct toPrint={this.state.returnInfo} />
                </div>
            </div>
        );
    }
}

class DisplayProduct extends React.Component{
    render() {
        return (
            <div>
                <h2> Product List </h2>
                <PrintedTable>
                    <HeaderTR>
                        <PrintedTH>ID</PrintedTH> <PrintedTH>Name</PrintedTH>  <PrintedTH>Price</PrintedTH> <PrintedTH>Calories</PrintedTH><PrintedTH>Info</PrintedTH>
                    </HeaderTR>
                    {this.props.toPrint && this.props.toPrint.results.map(result => {
                        return <tr> 
                            <PrintedTD><NewNavLink to={"/productResult/" + result.pID}>{result.pID}</NewNavLink></PrintedTD>
                            <PrintedTD>{result.pName}</PrintedTD>
                            <PrintedTD>{result.pPrice}</PrintedTD>
                            <PrintedTD>{result.pCal}</PrintedTD>
                            <PrintedTD>{result.pInfo}</PrintedTD>
                        </tr>
                    })}
                </PrintedTable>
            </div>
        )
    }

}
export default ProductManagement