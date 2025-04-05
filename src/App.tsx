import { Navigate, Route, Routes } from "react-router-dom"
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



const App = () => {
  const { isLoggedIn } = useAuthContext()

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
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }
      >
        <Route path="main" element={<MainPage />} />
        <Route path="updatepassword" element={<UpdatePasswordPage />} />
        <Route path="updateuserinfo" element={<UpdateUserInfoPage />} />
      </Route >

      {/* <Route path="/member" element={<Layout />}>
        <Route path="main" element={<MemberMainPage />} />
      </Route > */}




      < Route path="*" element={< Navigate to="/" />} />
      {/* <Route path="/member" element={<ProtectedRoute />}>
        <Route path="main" element={<Layout><MemberMainPage /></Layout>} />
        
        
        <Route path="purchasedetail" element={<Layout><PurchaseDetailPage /></Layout>} />
      </Route> */}

      {/* <Route path="/order" element={<ProtectedRoute />}>
        <Route path="cart" element={<Layout><CartPage /></Layout>} />
        <Route path="checkout" element={<Layout><CheckoutPage /></Layout>} />
      </Route> */}



    </Routes >
  )
}

export default App