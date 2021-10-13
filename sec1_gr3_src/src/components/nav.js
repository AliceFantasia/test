import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';

const Bar = styled.nav`
    display:flex;
    flex-direction: row;
    margin: 0px;
    background-color: black;
`;
const List = styled.ul`
    list-style-type: none;
    display: flex;
`;
const Point = styled.li`
    display: block;
    padding: 14px 20px;
`;
const NewNavLink = styled(NavLink)`
    text-decoration: none;
    color: white;
	:hover {
		color: red;
		cursor: pointer;
	}
`;
class Navbar extends Component {
    render(){
        return(
            <Bar>
                <List>
                    <Point><NewNavLink to="/">Home</NewNavLink></Point>
                    <Point><NewNavLink to="/login">Login</NewNavLink></Point>
                    <Point><NewNavLink to="/userManagement">User Management</NewNavLink></Point>
                    <Point><NewNavLink to="/productManagement">Product Management</NewNavLink></Point>
                    <Point><NewNavLink to="/aboutUs">About Us</NewNavLink></Point>
                </List>
            </Bar>
        );
    }
}
export default Navbar;