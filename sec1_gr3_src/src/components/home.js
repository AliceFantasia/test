import React from 'react';
import styled from 'styled-components';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
const Container = styled.section`
    display: flex;
    margin-top: 0%;
    margin-bottom: 0%;
    flex-wrap: wrap;
    justify-content: center;
    display: flex;
`;
const Collumn = styled.section`
    border-style: double;
    border-color: rgb(0, 34, 0);
    border-radius: 10px;
    width: 26%;
    padding: 10px;
    margin: 10px;
`;
const Image = styled.img`
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    height: auto;
    object-fit: fill;
`;
const MapHeader = styled.h3`
	margin-top: 80px;
	margin-bottom: 20px;
    text-align: center;
`;

const ReviewUl = styled.ul`
    font-size: 20px;
    text-align: left;
`;

const Biggesttext = styled.h1`
    font-size: 60px;
`

const Normaltext = styled.p`
    font-size: 2vh;
`;

const Bigtext = styled.p`
    font-size: 2vh;
	margin-top: 60px;
	margin-right: 140px;
	text-align: left;
`;

const Bigtext2 = styled.p`
    font-size: 2vh;
	margin-top: 60px;
	margin-left: 140px;
	text-align: left;
`;

const Image2 = styled.img`
    display: block;
	margin-left: 140px;
	margin-right: 20px;
	margin-top: 60px;
    float: left;
    width: 25%;
`;

const Image3 = styled.img`
    display: block;
	margin-right: 140px;
	margin-left: 20px;
	margin-top: 60px;
	margin-bottom: 60px;
    float: right;
    width: 25%;
`;

class Home extends React.Component {
    render() {
        return (
            <div>
                <header>
                    <h1><Biggesttext>Burger Kong</Biggesttext></h1>
					<h2><em>Freshest and fastest food delivery service at your doorstep</em></h2>
					<br/>
                </header>
                
                <section>
                    <Container>
                        <Collumn>
                            <article>
                                <Normaltext><h3>Our ingredients</h3>
                                Our restaurant contain all-organic ingredients from local farm in Thailand</Normaltext>
                                <figure>
                                    <Image src="https://media.istockphoto.com/photos/keeping-a-close-watch-on-his-crops-picture-id1083286598?k=6&m=1083286598&s=612x612&w=0&h=z-hXgpnT5xiOLyTCJHL4ObYs7WX2t-LB2F5p4p3JI9M="/>
                                </figure>
                            </article>
                        </Collumn>
                        <Collumn>
                            <article>
                                <Normaltext><h3>24 hours Delivery </h3>
                                We deliver all-freshly made cuisine directly to your place for free of charge!</Normaltext>
                                <figure>
                                    <Image src="https://freedesignfile.com/upload/2018/10/Smiling-young-delivery-guy-Stock-Photo-01.jpg"/>
                                </figure>    
                            </article>
                        </Collumn>
                        <Collumn>
                            <article>
                                <Normaltext><h3>Our application</h3>
                                FREE! download and ordering with our app to get free coke and fried chicken!</Normaltext>
                                <figure>
                                    <Image src="https://thumbs.dreamstime.com/b/man-hands-watch-holding-app-delivery-food-screen-above-table-office-140893985.jpg"/>
                                </figure>
                            </article>
                        </Collumn>
						<div>
							<Image2 src="https://cdn.pixabay.com/photo/2015/08/07/16/07/shopping-879498_960_720.jpg"/>
							<article>
								<Bigtext>
									<h3>Find the price that is right for you!</h3>
									<p>With our innovative search system, you can select your minimum and maximum price. Whether it be expensive seafood or your usually pickups from the grocery store. You will be able to manage how much money you will spend or save using this simple search function.</p>
								</Bigtext>
							</article>
						</div>
						<div>
							<Image3 src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80"/>
							<article>
								<Bigtext2>
									<h3>Keep your calories low!</h3>
									<p>Are you on diet? Do you want to eat and live a healthy lifestyle? Our search function will help you with that! You can type in your desired maximum calories and you can limit your search. Now, you can find the food and ingredients that is right for you.</p>
								</Bigtext2>
							</article>
						</div>
						<Collumn>
                            <article>
                                <h3>"The service is great! I can now make Jalapeno poppers any time I want."</h3>
                                <ReviewUl><em>- Johnny Mendoza</em></ReviewUl>
                            </article>
                        </Collumn>
						<Collumn>
                            <article>
                                <h3>"Good, fast and simple."</h3>
                                <ReviewUl><br/><em>- Chad Yu</em></ReviewUl>
                            </article>
                        </Collumn>
						<Collumn>
                            <article>
                                <h3>"I can not tell how much better it is right now after I found out about @BurgerKong"</h3>
                                <ReviewUl><em>- Toni Spark</em></ReviewUl>
                            </article>
                        </Collumn>
						<Collumn>
                            <article>
                                <h3>"Now, I can get ingredient whenever and wherever!"</h3>
                                <ReviewUl><em>- Jimmy Bravo</em></ReviewUl>
                            </article>
                        </Collumn>
						<Collumn>
                            <article>
                                <h3>"All the features I ever needed, hee hee"</h3>
                                <ReviewUl><em>- Miracle Jason</em></ReviewUl>
                            </article>
                        </Collumn>
			<Collumn>
                            <article>
                                <h3>"Thanks you CodeScene!"</h3>
                                <ReviewUl><em>- Batman</em></ReviewUl>
                            </article>
                        </Collumn>
                    </Container>
                </section>
				
                <MapHeader>Find a store near you</MapHeader>
                <div>
                    <Map google={this.props.google} 
                        initialCenter={{
                            lat: 13.79,
                            lng: 100.53
                        }}
                        zoom={14}>
                        <Marker
                            title={'First store'}
                            name={'STORE1'}
                            position={{lat: 13.79, lng: 100.36}} />
                        <Marker
                            title={'Second store'}
                            name={'STORE2'}
                            position={{lat: 13.79, lng: 100.54}} />
                        <Marker
                            title={'Third store'}
                            name={'STORE3'}
                            position={{lat: 16, lng: 102.82}} />
                        <Marker
                            title={'Fourth store'}
                            name={'STORE4'}
                            position={{lat: 18.76, lng: 99}} />
                        <InfoWindow onClose={this.onInfoWindowClose}></InfoWindow>
                    </Map>
                </div>
                <footer>
                    Burger Kong Co.
                </footer>
            </div>
       );
    }
}
export default GoogleApiWrapper({
  apiKey: ('AIzaSyDLPvwRj1YIXsnAZCvandtRItWTomoB_ps')
})(Home)
