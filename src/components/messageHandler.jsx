import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// MessageHandler component
function MessageHandler() {
    // Display the toast container
    return (
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            theme="dark"
        />
    );
}

export default MessageHandler;