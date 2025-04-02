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



const App = () => {
  // const { isLoggedIn } = useAuthContext()
  // console.log(isLoggedIn)

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

      {/* <Route path="/auth">
        {!isLoggedIn &&
          <>
            <Route path="login" element={<Layout ><LoginPage /></Layout>} />
            <Route path="signup" element={<Layout ><SignUpPage /></Layout>} />
            <Route path="forgotpassword" element={<Layout ><ForgotPasswordPage /></Layout>} />
            <Route path="resetpassword/:resetToken" element={<Layout ><ResetPasswordPage /></Layout>} />
          </>
        }
        <Route path="term" element={<Layout ><TermPage /></Layout>} />
      </Route> */}

      {/* <Route path="/member" element={<ProtectedRoute />}>
        <Route path="main" element={<Layout><MemberMainPage /></Layout>} />
        <Route path="updatepassword" element={<Layout><MemberUpdatePasswordPage /></Layout>} />
        <Route path="updatepersonalinfo" element={<Layout><UpdatePersonalInfoPage /></Layout>} />
        <Route path="purchasedetail" element={<Layout><PurchaseDetailPage /></Layout>} />
      </Route> */}

      {/* <Route path="/order" element={<ProtectedRoute />}>
        <Route path="cart" element={<Layout><CartPage /></Layout>} />
        <Route path="checkout" element={<Layout><CheckoutPage /></Layout>} />
      </Route> */}


      <Route path="*" element={<Navigate to="/" />} />
    </Routes >
  )
}

export default App