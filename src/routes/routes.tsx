import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Dashboard from '../pages/dashboard/dashboard/Dashboard';
import Login from '../pages/authentication/Login';
import ErrorPage from '../pages/error/ErrorPage';
import TermsCondition from '../pages/dashboard/settings/TermsCondition';
import Notification from '../pages/dashboard/Notification';
import ForgetPassword from '../pages/authentication/ForgetPassword';
import VerifyOtp from '../pages/authentication/VerifyOtp';
import NewPassword from '../pages/authentication/NewPassword';
import Profile from '../pages/dashboard/profile/Profile';
import SpaceSeeker from '../pages/dashboard/SpaceSeeker';
import DealingDetails from '../pages/dashboard/DealingDetails';
import Details from '../pages/Details/Details';
import Personal from '../pages/PersonalInformation/Personal';
import ChangeInfo from '../pages/PersonalInformation/ChangeInfo';
import Return from '../pages/PersonalInformation/Return';
import TransactionDetails from '../pages/dashboard/TransactionDetails/page';
import Products from '../pages/Products/page';
import AddProducts from '../pages/AddProducts/page';
import Colour from '../pages/Color/page';
import AddColour from '../pages/Color/AddColour';
import Size from '../pages/Size/page';
import AddSize from '../pages/Size/AddSize';
import Blog from '../pages/Blog/page';
import AddBlog from '../pages/Blog/AddBlog';
import Faq from '../pages/Faq/page';
import AddFaq from '../pages/Faq/AddFaq';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { path: '', element: <Dashboard /> },
            // { path: 'space-provider', element: <SpaceProvider /> },
            { path: 'transactions', element: <TransactionDetails /> },
            { path: 'space-seeker', element: <SpaceSeeker /> },
            { path: 'details/:id', element: <Details /> },
            // products
            { path: 'products', element: <Products /> },
            { path: 'add-product', element: <AddProducts /> },
            // personal information
            { path: 'personal', element: <Personal /> },
            { path: 'chnage-password', element: <ChangeInfo /> },
            { path: 'retrun-policy', element: <Return /> },
            { path: 'colors', element: <Colour /> },
            { path: 'addcolour', element: <AddColour /> },
            { path: 'size', element: <Size /> },
            { path: 'AddSize', element: <AddSize /> },
            { path: 'blog', element: <Blog /> },
            { path: 'add-blog', element: <AddBlog /> },
            { path: 'faq', element: <Faq /> },
            { path: 'add-faq', element: <AddFaq /> },

            //

            { path: 'dealing-details', element: <DealingDetails /> },

            //    for settings section

            { path: 'terms', element: <TermsCondition /> },

            // others sections
            { path: 'profile', element: <Profile /> },
            { path: 'notification', element: <Notification /> },
        ],
    },

    // ? for authentication sections
    { path: '/login', element: <Login /> },
    { path: 'forget-password', element: <ForgetPassword /> },
    // { path: '/forget-password', element: <ForgetPassword /> },
    { path: '/verify-otp', element: <VerifyOtp /> },
    { path: '/new-password', element: <NewPassword /> },
]);

export default router;
