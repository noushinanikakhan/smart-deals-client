import React, { use, useContext, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

const ProductDetails = (  ) => {

 const product = useLoaderData();
 const [bids, setBids] = useState([])
 const bidModalRef = useRef()
//  console.log("Full product data:", product)

 const {user} = useContext (AuthContext)


 useEffect(()=> {
    fetch(`http://localhost:3000/products/bids/${product._id}`, {
      headers: {
        authorization : `Bear ${user.accessToken}`
      }
    })
    .then(res=> res.json())
    .then(data=> {
        console.log('bids for this product', data)
        setBids(data)
    })
 }, [product])

 const handleBidModalOpen = () =>{
    bidModalRef.current.showModal()
 }

 const handleBidSubmit = (e) => {
    e.preventDefault();
    const name= e.target.name.value
    const email= e.target.email.value
    const bid= e.target.bid.value

    console.log(product._id, name, email, bid)
    const newBid = {
        product : product._id,
        buyer_name : name, 
        buyer_email: email,
        buyer_image: user?.photoURL,
        bid_price : bid, 
        status: 'pending'
     }

     fetch('http://localhost:3000/bids', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(newBid)
     })
        .then(res=> res.json())
        .then(data => {
          if (data.insertedId){
            bidModalRef.current.close();       
       Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Your bid has been placed",
  showConfirmButton: false,
  timer: 1500
});
// add the new bid to the state
  newBid.id = data.insertedId;
  const newBids =[ ...bids, newBid]
  newBids.sort((a, b)=> parseInt(b.bid_price)-parseInt(a.bid_price))
  setBids(newBids)
          }
        })
    
 }

    return (
  <div className="">
  {/* product info */}
<div>
    <div>
       {/* Add your product details here */}
                    <h1>{product.title}</h1>
                    <p>Price: ${product.price_min} - ${product.price_max}</p>
                    <p>{product.description}</p>
    </div>
    <div>
          <button
          onClick={handleBidModalOpen}
          className="btn btn-primary w-full">
                        I want to buy this product
                    </button>

<dialog ref={bidModalRef} id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Give Seller Your Offered Price!</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>

    <form onSubmit={handleBidSubmit}>
         <fieldset className="fieldset">
          <label className="label">Name</label>
          <input type="text" name="name" className="input" readOnly  defaultValue={user?.displayName || ''} />

          <label className="label">Email</label>
          <input type="email" name="email" className="input" readOnly  defaultValue={user?.email || ''} />

           <label className="label">Bid</label>
          <input type="text" name="bid" className="input" placeholder="your bid" />


        
          <button className="btn btn-neutral mt-4">Place your bid</button>
        </fieldset>
    </form>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Cancel</button>
      </form>
    </div>
  </div>
</dialog>
    </div>
</div>

  {/* bids for the product */}

  <h2 className="test-3xl font-bold ">
    Bids for this Product: <span className="text-primary">{bids.length}</span>
  </h2>
  <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
      
        <th>
        Sl No.
        </th>
        <th>Buyer Name</th>
        <th>Buyer Email</th>
        <th>Bid Price</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
  {
    bids.map((bid, index)=>     <tr>
        <th>
         {index +1}
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{bid.buyer_name}</div>
              <div className="text-sm opacity-50">United States</div>
            </div>
          </div>
        </td>
        <td>
          {bid.buyer_email}
         
        </td>
        <td>{bid.bid_price}</td>
        <th>
          <button className="btn btn-ghost btn-xs">details</button>
        </th>
      </tr> )
  }
   
  
     
    </tbody>
  </table>
</div>

  </div>
    )
};

export default ProductDetails;