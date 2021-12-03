/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRouteMatch, NavLink, Route, Switch } from "react-router-dom";
import ProfileDetails from "./ProfileDetails";
import CryptoCalculator from "../Profile/CryptoCalculator";
import NotFound from "../NotFound/NotFound";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";

const Profile = () => {
  const { path, url } = useRouteMatch();
  useWebsiteTitle(`CoinPrice.pl - Profile`);

  return (
    <div className="container mt-5">
      <div className="card text-center">
        <div className="card-header  ">
          <h2 className="text-start mb-4">My Profile</h2>
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <NavLink className="nav-link" exact to={`${url}`}>
                Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={`${url}/calc`}>
                Calculator
              </NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#" aria-disabled="true">
                Disabled
              </a>
            </li>
          </ul>
        </div>
        <div className="card-body">
          {/* <h5 className="card-title">Special title treatment</h5>
          <p className="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p> */}
          <Switch>
            <Route path={`${path}/calc`} exact component={CryptoCalculator} />
            <Route path={`${path}`} exact component={ProfileDetails} />
            <Route component={NotFound} />
          </Switch>
          {/* <a href="#" className="btn btn-primary">
            Go somewhere
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
