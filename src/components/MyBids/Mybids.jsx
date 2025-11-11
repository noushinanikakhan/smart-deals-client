import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

const Mybids = () => {

  const {user} = use (AuthContext)
  const [bids, setBids] = useState([])

  console.log('token', user.accessToken)

  useEffect( ()=>{
    if (user?.email){
      fetch(`http://localhost:3000/bids?email=${user.email}`, {
        headers: {
         authorization: `Bearer ${user.accessToken}`
        }
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setBids(data)
      })
    }
  }, [user])

  const handleDeleteBid = (_id) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`http://localhost:3000/bids/${_id}`, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                console.log("after delete", data);
                if (data.deletedCount) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your bid has been deleted.",
                        icon: "success"
                    }); // ✅ Properly closed Swal.fire
                }
            })
            .catch(error => {
                console.error("Delete error:", error);
            });
        }
    }); // ✅ Properly closed .then for Swal.fire
    
    const remainingBids = bids.filter(bid=> bid._id !==_id)
    setBids(remainingBids)



} // ✅ Properly closed handleDeleteBid function


  



    return (
        <div>
      <h1>this is My bids: {bids.length}</h1>

      <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
               Sl No.
        </th>
        <th>Product</th>
        <th>Seller</th>
        <th>Bid Price</th>
        <th>Status</th>
           <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
{
  bids.map((bid, index) =>       <tr key={bid._id}>
        <th>
   
         { index +1}
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
              <div className="font-bold">Hart Hagerty</div>
              <div className="text-sm opacity-50">United States</div>
            </div>
          </div>
        </td>
        <td>
          Zemlak, Daniel and Leannon
          <br />
          <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
        </td>
        <td>{bid.bid_price}</td>
        <td>
       {
        bid.status==='pending'?   <div className="badge badge-warning">
     {bid.status}
      </div>:
        <div className="badge badge-success">
     {bid.status}
      </div>
       }
        </td>
        <th>
          <button
          onClick={()=> handleDeleteBid(bid._id)}
          className="btn btn-outline btn-xs">Remove Bid</button>
        </th>
      </tr>)
}

  
    </tbody>

  
  </table>
</div>
        </div>
    )
};

export default Mybids;