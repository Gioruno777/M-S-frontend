import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import Layout from "./layout/Layout"
import HomePage from "./pages/HomePage"
import BurgerPage from "./pages/foodpages/BurgerPage"
import FoodDetailPage from "./pages/foodpages/FoodDetailPage"
import SideDishPage from "./pages/foodpages/SideDishPage"
import BeveragePage from "./pages/foodpages/BeveragePage"
import NutritionFactsPage from "./pages/foodpages/NutritionFactsPage"
import SearchBurgerPage from "./pages/foodpages/SearchBurgerPage"
import SearchSidePage from "./pages/foodpages/SearchSidePage"
import SearchBeveragePage from "./pages/foodpages/SearchBeveragePage"
import LoginPage from "./pages/aurhpages/LoginPage"
import SignUpPage from "./pages/aurhpages/SignUpPage"
import ForgotPasswordPage from "./pages/aurhpages/ForgotPasswordPage"
import ResetPasswordPage from "./pages/aurhpages/ResetPasswordPage"
import TermPage from "./pages/aurhpages/TermPage"
import { useAuthContext } from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import MainPage from "./pages/memberpages/MainPage"
import UpdateUserInfoPage from "./pages/memberpages/UpdateUserInfoPage"
import UpdatePasswordPage from "./pages/memberpages/UpdatePasswordPage"
import CartPage from "./pages/orderPages/CartPage"
import CheckoutPage from "./pages/orderPages/CheckoutPage"
import PurchasePage from "./pages/memberpages/PurchasePage"
import TransactionPage from "./pages/memberpages/TransactionPage"
import PurchaseDetailPage from "./pages/memberpages/PurchaseDetailPage"



const App = () => {
  const { isLoggedIn } = useAuthContext()
  const location = useLocation()

  return (
    <Routes>

      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
      </Route>

      <Route path="/menu" element={<Layout />}>
        <Route path="main" element={<BurgerPage />} />
        <Route path="main/:foodId" element={<FoodDetailPage />} />
        <Route path="main/search" element={<SearchBurgerPage />} />

        <Route path="side" element={<SideDishPage />} />
        <Route path="side/:foodId" element={<FoodDetailPage />} />
        <Route path="side/search" element={<SearchSidePage />} />

        <Route path="beverage" element={<BeveragePage />} />
        <Route path="beverage/:foodId" element={<FoodDetailPage />} />
        <Route path="beverage/search" element={<SearchBeveragePage />} />

        <Route path="nutritionfacts" element={<NutritionFactsPage />} />

      </Route>

      <Route path="/auth" element={<Layout />}>
        {!isLoggedIn &&
          <>
            <Route path="signup" element={<SignUpPage />} />
            <Route path="forgotpassword" element={<ForgotPasswordPage />} />
            <Route path="resetpassword/:resetToken" element={<ResetPasswordPage />} />
          </>
        }
        <Route path="login" element={<LoginPage />} />
        <Route path="term" element={<TermPage />} />
      </Route>

      <Route path="/member" element={
        <ProtectedRoute
          afterLoginPath={location.pathname}
        >
          <Layout />
        </ProtectedRoute>
      }
      >
        <Route path="main" element={<MainPage />} />
        <Route path="purchase" element={<PurchasePage />} />
        <Route path="purchase/:purchaseId" element={<PurchaseDetailPage />} />
        <Route path="transaction" element={<TransactionPage />} />
        <Route path="updatepassword" element={<UpdatePasswordPage />} />
        <Route path="updateuserinfo" element={<UpdateUserInfoPage />} />
      </Route >

      <Route path="/cart" element={
        <ProtectedRoute
          afterLoginPath="/menu/main"
        >
          <Layout />
        </ProtectedRoute>
      }
      >
        <Route path="main" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
      </Route >

      < Route path="*" element={< Navigate to="/" />} />

    </Routes >
  )
}

export default App