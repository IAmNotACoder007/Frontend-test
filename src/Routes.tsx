import { Routes as ReactRoutes, Route, Navigate } from "react-router-dom";

import { NotFound } from "./components/feedback/404";
import { About } from "./components/About";
import { SignIn } from "./components/authentication/SignIn";
import { PrivateRoute } from "./PrivateRoute";
import { Profile } from "./components/profile/Profile";

export function Routes() {
  return (
    <ReactRoutes>
      <Route path="/about" element={<About />} />
      <Route path="/sign-in" element={<SignIn />} />

      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route path="/" element={<Navigate to="/about" />} />
      <Route path="*" element={<NotFound />} />
    </ReactRoutes>
  );
}
