import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import Feed from "./components/pages/Trees";
import NotFound from "./components/pages/NotFound";
import Profile from "./components/pages/Profile";
import ProjectDetail from './components/modules/ProjectDetail'; // Component for individual project details
import AllTrees from './components/pages/AllTrees';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "1085919672468-phhibbgobe22pfsnvba83d86gj2dbfke.apps.googleusercontent.com";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<NotFound />} element={<App />}>
      <Route path="/" element={<Feed />} />
      <Route path="/profile/:userId" element={<Profile />} />
      <Route path="/project/:id" element={<ProjectDetail />} />
      <Route path="/alltrees" element={<AllTrees />} />
    </Route>
  )
);

// renders React Component "Root" into the DOM element with ID "root"
ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={'1085919672468-phhibbgobe22pfsnvba83d86gj2dbfke.apps.googleusercontent.com'}>
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
);
