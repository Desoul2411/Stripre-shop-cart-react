import axios from "axios";
import { useShoppingCart } from "use-shopping-cart";
import toast from "react-hot-toast";

export default function useCheckout() {
    const {redirectToCheckout, cartDetails} = useShoppingCart();

    async function handleCheckout() {
        const session = await axios.post('/api/checkout-sessions', cartDetails)
            .then(res => res.data)
            .catch(error => {
                toast.error("Checkout failed!");
                console.log("Error during checkout: ", error);
            })

        if(session) {
            redirectToCheckout({ sessionId: session.id })
        }
    }

    return handleCheckout;
}
