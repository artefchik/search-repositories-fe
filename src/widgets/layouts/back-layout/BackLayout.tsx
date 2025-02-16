import {Link, Outlet} from "react-router";
import {ROUTES} from "shared/config/router/router.const";
import {ArrowIcon} from "shared/assets/icons/ArrowIcon";
import {Header} from "../header/Header.tsx";
import "./BackLayot.css"

export const BackLayout = () => (
    <div className="wrapper">
        <Header/>
        <main>
            <div className="wrapper__container">
                <Link className="back-link" to={ROUTES.repositories.index}>
                    <ArrowIcon/>
                    Back
                </Link>
            </div>
            <Outlet/>
        </main>
    </div>
);
