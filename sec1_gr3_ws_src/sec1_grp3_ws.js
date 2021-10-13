const exp = require("express");
const bp = require("body-parser");
const dotenv = require("dotenv");
const mysql = require('mysql2');
const cors = require("cors");
const jwt = require("jsonwebtoken");
const authorize = require("./middlewares/auth");

const app = exp();
dotenv.config();

const router = exp.Router();
app.use("/", router); 

let corsOptions = {
    origin: "http://localhost:3100",
    methods: "GET, POST, PUT, DELETE"
}
router.use(cors(corsOptions));

router.use(bp.json());
router.use(bp.urlencoded({extended: true}));

var connection = mysql.createConnection({
    port : process.env.MYSQL_PORT,
    host : process.env.MYSQL_HOST,
    user : process.env.MYSQL_USERNAME,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE
});
connection.connect(function(err){
    if(err) throw err;
    console.log("Connected DB: "+process.env.MYSQL_DATABASE);
});

// -------------------------------------------- Manipulate Product DB -----------------------------------------------------
/*
    //  ----- Insert Product-------
    
    method: POST
    URL: http://localhost:3000/product_list
    {
            "product": {
                "pID": "p1254856523715",
                "pName": "Big Bang Burger",
                "pPrice": 500,
                "pCal": 600,
                "pInfo": "A huge burger",
                "pImage": "Food.jpg"
            }
    }

    {
            "product": {
                "pID": "p1025456325895",
                "pName": "Dynamic Burger",
                "pPrice": 99,
                "pCal": 230,
                "pInfo": "Just a regular burger with a fancy name",
                "pImage": "Food.jpg"
            }
    }
//-------------------------------
*/
router.post("/product_list", (req,res)=>{
    connection.query("insert ignore into `product_info` set ?",[req.body.product], function(error, results){
        if(error) {       
            return res.send({
                error: true
            });
        }    
        return res.send({
            error: false,
            message: "Insert Succeed"
        });
    });
});


/*
//  ----- Update Product-------
    method: PUT
    URL: http://localhost:3000/product_list
    {
        "product": {
            "pID": "p1254856523715",
            "pName": "Big Bang Burger",
            "pPrice": 500,
            "pCal": 6000,
            "pInfo": "A huge burger that no one should ever eat",
            "pImage": "Food.jpg"
        }
    }

    {
        "product": {
            "pID": "p1025456325895",
            "pName": "Vegan Burger",
            "pPrice": 169,
            "pCal": 100,
            "pInfo": "A vegan burger for vegans",
            "pImage": "Food.jpg"
        }
    }
*/

router.put("/product_list", (req,res)=>{
    connection.query("update `product_info` set ? where pID = ?",[req.body.product, req.body.product.pID], function(error, results){
        if(error) {       
            return res.send({
                error: true
            });
        }    
        return res.send({
            error: false,
            message: "Update Succeed"
        });
    });
});

/*
    --------- Admin Delete -----------

    method: DELETE
    URL: http://localhost:3000/ds_product_list
	//// ----- Delete by ID -----
	{
        "method": "id",
        "product":{
            "pID": "p1025456325895",
            "pName": "",
            "pMinPrice": 0,
            "pMaxPrice": 0,
            "pCal": 0
        }
	}
	
    //// ----- Delete by Name -----
	{
        "method": "name",
        "product":{
            "pID": "",
            "pName": "Big Bang Burger",
            "pMinPrice": 0,
            "pMaxPrice": 0,
            "pCal": 0
        }
	}
*/
router.delete("/ds_product_list", (req,res)=>{

    let method = req.body.method;

    let q = "delete from `product_info` where ";
    switch (method){
        case "id":
            q += "`pID` = '" + req.body.product.pID + "'";
            break;
        case "name":
            q += "`pName` = '" + req.body.product.pName + "'";
            break;
        case "price":
            q += "`pPrice` between " + req.body.product.pMinPrice + " and " + req.body.product.pMaxPrice;
            break;
        case "cal":
            q += "`pCal` <= " + req.body.product.pCal;
            break;
    }
    connection.query(q, function(error, results){
        if(error) {       
            console.log(error);
            return res.send({
                error: true
            });
        }
        return res.send({
            error: false,
            message: "Delete Succeed"
        });
    });
});

/*
    --------- Admin Search -----------

    method: POST
    URL: http://localhost:3000/ds_product_list
	//// ----- Search by Price -----
	{
        "method": "price",
        "product":{
            "pID": "",
            "pName": "",
            "pMinPrice": 50,
            "pMaxPrice": 200,
            "pCal": 0
        }
	}

	//// ----- Search by Maximum Calories-----
	{
        "method": "cal",
        "product":{
            "pID": "",
            "pName": "",
            "pMinPrice": 0,
            "pMaxPrice": 0,
            "pCal": 300
        }
	}
*/

router.post("/ds_product_list", (req,res)=>{
    let method = req.body.method;

    let q = "select * from `product_info` where ";

    switch (method){
        case "id":
            q += "`pID` = '" + req.body.product.pID + "'";
            break;
        case "name":
            q += "`pName` like '%" + req.body.product.pName + "%'";
            break;
        case "price":
            q += "`pPrice` between " + req.body.product.pMinPrice + " and " + req.body.product.pMaxPrice;
            break;
        case "cal":
            q += "`pCal` <= " + req.body.product.pCal;
            break;
    }
    connection.query(q, function(error, results){
        if(error)  {       
            console.log(error);
            return res.send({
                error: true
            });
        }
        return res.send({
            error: false,
            results: results,
            message: "Products receive."
        });
    });
});

/*
    method: GET
    URL: http://localhost:3000/product_list_all
*/
router.get("/product_list_all", (req,res)=>{
    connection.query("select * from `product_info`", function(error, results){
        if(error) {       
            return res.send({
                error: true
            });
        }
        return res.send({
            error: false,
            results: results,
            message: "Products receive."
        });
    });
});

//----------------------------------------------------------------------------------------------------------------------



// -------------------------------------------- Manipulate User DB -----------------------------------------------------

/*

    ---------------------------  Insert -------------------------
    method: POST
    URL: http://localhost:3000/register

    { 
        "user": {
            "uID": "u12300012301",
            "firstName": "Johnson",
            "lastName": "Malton",
            "address": "Bangkok",
            "DOB": "1999-10-12",
            "email": "johnma@gmail.com"
        },
        "account": {
            "username": "JohnMalx",
            "password": "12AB35" 
        }
    }

    { 
        "user": {
            "uID": "u13100011112",
            "firstName": "Watthasit",
            "lastName": "Jirapat",
            "address": "Bangkok",
            "DOB": "2001-04-25",
            "email": "waji@gmail.com"
        },
        "account": {
            "username": "Waji",
            "password": "E13TGHKJ90" 
        }
    }
*/

router.post("/register", (req,res)=>{
    let account = req.body.account;
    let user = req.body.user;
    connection.query("insert ignore into `user_info` set ?",[user], function(error, results){
        if(error) {       
            return res.send({
                error: true
            });
        }
    });
    connection.query("insert ignore into `account` values (?,?, 'user',?)",[account.username, account.password, user.uID], function(error, results){
        if(error) {       
            return res.send({
                error: true
            });
        }
        return res.send({
            error: false,
            message: "Register Succeed"
        });
    });
});

/*
    ---------------------------  Update -------------------------
    method: PUT
    URL: http://localhost:3000/user_list

    {
        "user": {
            "uID": "u00000000121",
            "firstName": "Mera",
            "lastName": "Johnson",
            "address": "800/10/2 Srilom",
            "DOB": "2001-04-25",
            "email": "MEJJ@gmail.com"
        }
    }

    {
        "user": {
            "uID": "a00000000021",
            "firstName": "Asuka",
            "lastName": "Komaru",
            "address": "20/9 Bangkok, Phra Nakhon",
            "DOB": "2001-04-25",
            "email": "aszukoma@hotmail.com"
        }
    }
*/

router.put("/user_list", (req,res)=>{
    connection.query("update `user_info` set ? where `uID` = ?",[req.body.user, req.body.user.uID], function(error, results){
        if(error){
            return res.send({
                error: true
            });
        }
        return res.send({
            error: false,
            message: "Update Succeed"
        });
    });
});

/*
    ---------------------------  Delete -------------------------
    method: DELETE
    URL: http://localhost:3000/user_list

    {
        "uID": "u13100011112"
    }
    {
        "uID": "u00000000121"
    }
*/
router.delete("/user_list", (req,res)=>{
    connection.query("delete from `account` where `uID` = ?",[req.body.uID], function(error, results){
        if(error) {
            return res.send({
                error: true
            });
        }
    });
    connection.query("delete from `user_info` where `uID` = ?",[req.body.uID], function(error, results){
        if(error) {
            return res.send({
                error: true
            });
        }
        return res.send({
            error: false, 
            message: "Delete Succeed"
        });
    });
});
/*
    ---------------------------  Select -------------------------
    method: Post
    URL: http://localhost:3000/user_list/
    {
        "id": "u00000000001",
        "firstName": "",
        "lastName": ""
    }
    
    {
        "id": ,
        "firstName": "Asuka",
        "lastName": "Kiske"
    }
*/
router.post("/user_list/", (req,res)=>{
    let id = req.body.id;
    let fName = req.body.firstName;
    let lName = req.body.lastName;

    let q = "select * from `user_info`";
    if(id != ""){
        q += " where `uID` = '" + id + "'";
    }
    if(fName != ""){
        if(id != ""){
            q += " or";
        }
        else{
            q += " where";
        }
        q += " `firstName` like '%" + fName +"%'";
    }
    if(lName != ""){
        if(id != "" || fName != ""){
            q += " or";
        }
        else{
            q += " where";
        }
        q += " `lastName` like '%" + lName +"%'";
    }
    console.log(q);
    connection.query(q , function(error, results){
        if(error){
            return res.send({
                error: true
            });
        }
        return res.send({
            error: false,
            results: results, 
        });
    });
});

/*
    method: GET
    URL: http://localhost:3000/user_list_all
*/
router.get("/user_list_all", (req,res)=>{

    let q = "select * from `user_info`";

    connection.query(q, function(error, results){
        if(error){
            return res.send({
                error: true
            });
        }
        return res.send({
            error: false,
            results: results, 
            message: 'Retrieved User list.'
        });
    });
});
//----------------------------------------------------------------------------------------------------------------------



// ******************************** Use in login page ********************************
/*
	method: POST
	URL: http://localhost:3000/search_product
    {
        "username": "Ky",
        "password": "Kiske"
    }
    
    {
        "username": "Sol",
        "password": "Badguy"
    }
*/ 
router.post("/login", (req,res)=>{
    connection.query("select * from `account` where `username` = ? and `password` = ?",[req.body.username, req.body.password], function(error, results){
        if(error || results.length == 0) {       
            return res.send({
                error: true
            });
        }
        return res.send({
            error: false,
            results: results,
            message: "Login Succeed"
        });
    });
});
// *********************************************************************************


// ******************************** Use in Search page ********************************

/*
	method: POST
	URL: http://localhost:3000/search_product

  	// No condition
	{
        "product":{	
			"name": "",
            "minPrice": 0,
            "maxPrice": 0,
            "cal": 0
		}
	}
	
	// 1 condition: name
	{
        "product":{	
			"name": "Cheese",
            "minPrice": 0,
            "maxPrice": 0,
            "cal": 0
		}
	}

	// 2 conditions: Price and Max Cal
	{
        "product":{	
			"name": "",
            "minPrice": 50,
            "maxPrice": 150,
            "cal": 125
		}
	}

*/

router.post("/search_product", (req,res)=>{

    let q = "select * from `product_info`";

    let productName = req.body.product.name;
    if(productName != ""){
        q += " where `pName` like '%"+productName+"%'";
    }
    
    if(req.body.product.minPrice != 0 || req.body.product.maxPrice != 0){
        if(productName != ""){
            q += " and ";
        }
        else{
            q += " where ";
        }
        q += "`pPrice` between "+req.body.product.minPrice+" and "+req.body.product.maxPrice+" ";
    }

    if(req.body.product.cal > 0){
        if(productName || (req.body.product.minPrice != 0 || req.body.product.maxPrice != 0)){
            q += " and "
        }
        else{
            q += " where ";
        }
        q += "`pCal` <= " + req.body.product.cal;
    }
    connection.query(q, function(error, results){
        if(error){
            console.log(error);
            return res.send({
                error: true,
            });
        };
        return res.send({
            error: false,
            results: results,
            message: "Products receive."
        });
    });
});
// *********************************************************************************


app.listen(process.env.PORT, function(){
    console.log("Connect to port " + process.env.PORT);
});