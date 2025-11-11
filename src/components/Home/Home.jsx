import React from "react";
import LatestProducts from "../LatestProducts/LatestProducts";


const latestProductsPromise = fetch('http://localhost:3000/latest-products')
.then(res=> res.json());

const Home = () => {
    return (
        <div>
      <h1>this is home</h1>
      <LatestProducts latestProductsPromise={latestProductsPromise}></LatestProducts>
        </div>
    )
};

export default Home;