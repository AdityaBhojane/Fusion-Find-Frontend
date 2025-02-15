import { useOrderStore } from "../../store/Store";

const OrderStatus = () => {
  const orderProduct = useOrderStore((state) => state.orderProduct);
  const clearStorage = useOrderStore((state) => state.clearStorage);
  const setCancellation = useOrderStore((state) => state.setCancellation);


  return (
    <div className="container mx-auto p-8">
      <div className="flex">
        <h1 className="text-3xl font-bold mb-8">Order Status</h1>
      </div>
      <button className="border border-[#ccc] rounded-xl p-2 bg-red-400 text-white"
       onClick={()=> {clearStorage(); window.location.reload()}}
      >Clear All</button>

      <div className="card bg-base-100 shadow-lg p-6">
        {/* Product Information */}
        {orderProduct?.length > 0 ? (
          orderProduct?.map((items, index) => {
            return (
              <div
                key={index}
                className="flex flex-col lg:flex-row gap-6 my-6 border border-[#ccc] p-6 rounded-xl"
              >
                <div className="flex-shrink-0 w-[20%]">
                  <img
                    src={items.image}
                    alt="Product"
                    className="w-24 h-24 object-cover rounded"
                  />
                  <h2 className="text-sm font-semibold mt-2">{items.title}</h2>
                </div>
                {/* Order Status Section */}
                <div className="flex-1">
                  <ul className="steps steps-vertical lg:steps-horizontal w-full">
                    <li
                      className={`step ${
                      items.status.currentStatus >= 1 ? "step-primary" : ""
                      }`}
                    >
                      Order Placed
                    </li>
                    <li
                      className={`step ${
                        items.status.currentStatus >= 2 ? "step-primary" : ""
                      }`}
                    >
                      Processing
                    </li>
                    <li
                      className={`step ${
                        items.status.currentStatus >= 3 ? "step-primary" : ""
                      }`}
                    >
                      On the Way
                    </li>
                    <li
                      className={`step ${
                        items.status.currentStatus >= 4 ? "step-primary" : ""
                      }`}
                    >
                      Out for Delivery
                    </li>
                    <li
                      className={`step ${
                        items.status.currentStatus >= 5 ? "step-primary" : ""
                      }`}
                    >
                      Delivered
                    </li>
                  </ul>

                  {/* Order Details */}
                  <div className="mt-4 ml-16">
                    <h3 className="text-lg font-semibold">
                      Status: {items?.status.value}
                    </h3>
                    <p className="text-gray-600">
                      Estimated delivery: 2-3 days.
                    </p>
                  </div>
                </div>

                {/* Cancel Button */}
                <div className="flex items-center justify-center lg:justify-start">
                  <button 
                  disabled={items?.status.cancelRequest || items?.status.refundRequest || items.status.requestRejected}
                  className={`${items.status.cancelRequest? "disabled:bg-blue-800 btn disabled:btn-info" : items.status.refundRequest? "disabled:bg-green-800 btn disabled:btn-info" : items.status.requestRejected? "disabled:bg-slate-400 disabled:text-white btn":"btn btn-error"}`}
                  onClick={()=>{
                    setCancellation(index,false,true);
                  }}
                  >
                    {items.status.cancelRequest? "Request sent" : items.status.refundRequest? "Refunded" : items.status.requestRejected? "Refund Not Allowed":"Cancel Order"}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-xl text-center font-bold">
            <h3>No Order Placed ...</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderStatus;
