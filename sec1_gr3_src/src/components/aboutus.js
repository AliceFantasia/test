import React from 'react';
import styled from 'styled-components';
import P from './Images/P.png';
import Earth from './Images/Earth.png';
import Pan from './Images/Pan.png';
import Kla from './Images/MetasitGet.jfif';

const Container = styled.section`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const Row = styled.section`
    display: flex;
    flex-direction: row;
    border-radius: 10px;
    border-color: rgb(53, 53, 53);
    padding: 10px;
    margin: 10px;
`;

const ImageBox = styled.section`
    display: block;
    width: 20%;
    border-radius: 30%;
    padding: 5px;
    margin:auto; 
`;

const Img = styled.img`
    display: block;
    width: 90%;
    border-radius: 50%;
    padding: 5px;
    margin:auto;
`;
const Info = styled.section`
    display: block;
    font-size: large;
    border-radius: 10px;
    width: 25%;
    padding: 10px;
    margin: auto;
`;

class Aboutus extends React.Component{
    render() {
        return (
            <div>
                <header>
                    <h1>About us</h1>
                </header>
                <section>
                    <Container>
                        <Row>
                            
                            <ImageBox>
                                <Img src= {P} alt="Eakdanai Sontichai P"/>
                            </ImageBox>
                            <Info>
                                Name: Ekdanai Sontichai<br></br>
                                ID: 6288046 <br></br>
                                Section: 1<br></br>
                            </Info>

                            <ImageBox>
                                <Img src= {Earth} alt="Kasemwat Ongkanchana Earth"/>
                            </ImageBox>
                            <Info>
                                Name: Kasemwat Ongkanchana<br></br>
                                ID: 6288029 <br></br>
                                Section: 1<br></br>
                            </Info>
                        </Row>
                        <Row>

                            <ImageBox>
                                <Img src= {Pan} alt="Srawin Krisanayotin Pan"/>
                            </ImageBox>
                            <Info>
                                Name: Srawin Krisanayotin<br></br>
                                ID: 6288025<br></br>
                                Section: 1<br></br>
                            </Info>
                            
                            <ImageBox>
                                <Img src= {Kla} alt="Metasit Getrak Kla"/>
                            </ImageBox>
                            <Info>
                                Name: Metasit Getrak<br></br>
                                ID: 6288013<br></br>
                                Section: 1<br></br>
                            </Info>
                        </Row>
                    </Container>
                </section>
            </div>
    
        );    
    }
}
export default Aboutus
