import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import { useAppContext } from "./contexts/AppContext";
import AdminLayout from "./layouts/AdminLayout";
import AddProduct from "./pages/admin/AddProduct";
import Products from "./pages/admin/Products";
import EditProduct from "./pages/admin/EditProduct";
import Categories from "./pages/admin/Categories";
import Users from "./pages/admin/Users";
import Product from "./pages/Product";
import Slides from "./pages/admin/Slides";
import AddSlider from "./forms/SliderForm/AddSlider";
import MainPage from "./pages/MainPage";
import Search from "./pages/Search";

function App() {
  const { isAdmin } = useAppContext();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <MainPage />
            </Layout>
          }
        ></Route>

        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        ></Route>

        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        ></Route>

        <Route
          path="/products/:productId"
          element={
            <Layout>
              <Product />
            </Layout>
          }
        ></Route>

        <Route
          path="/search/:searchQuery?"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        ></Route>

        {isAdmin && (
          <>
            <Route
              path="/admin"
              element={<AdminLayout>admin dashboard</AdminLayout>}
            />

            <Route
              path="/admin/customers"
              element={
                <AdminLayout>
                  <Users />
                </AdminLayout>
              }
            />

            <Route
              path="/admin/products"
              element={
                <AdminLayout>
                  <Products />
                </AdminLayout>
              }
            />

            <Route
              path="/admin/products/add"
              element={
                <AdminLayout>
                  <AddProduct />
                </AdminLayout>
              }
            />

            <Route
              path="/admin/products/categories"
              element={
                <AdminLayout>
                  <Categories />
                </AdminLayout>
              }
            />

            <Route
              path="/admin/products/:productId/edit"
              element={
                <AdminLayout>
                  <EditProduct />
                </AdminLayout>
              }
            />

            <Route
              path="/admin/orders"
              element={<AdminLayout>orders</AdminLayout>}
            />

            <Route
              path="/admin/reviews"
              element={<AdminLayout>reviews</AdminLayout>}
            />

            <Route
              path="/admin/slider"
              element={
                <AdminLayout>
                  <Slides />
                </AdminLayout>
              }
            />

            <Route
              path="/admin/slider/add"
              element={
                <AdminLayout>
                  <AddSlider />
                </AdminLayout>
              }
            />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
