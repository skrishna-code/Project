document.getElementById("rzp-button1").onclick = function (e) {

    e.preventDefault();

    var options = {
        key: "rzp_test_GfditonZroqbtl",

        amount: 300 * 100,

        currency: "INR",

        name: "MyShop Checkout",

        description: "This is your order",

        image:
            "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",

        theme: {
            color: "#000000"
        },

        handler: function (response) {

            alert(
                "Payment Successful!\n\n" +
                "Payment ID: " +
                response.razorpay_payment_id
            );

            localStorage.removeItem("cart");

        },

        modal: {
            ondismiss: function () {
                console.log("Payment window closed");
            }
        }
    };

    var rzpy1 = new Razorpay(options);

    rzpy1.on("payment.failed", function (response) {

        alert(
            "Payment Failed\n\n" +
            response.error.description
        );

    });

    rzpy1.open();
};