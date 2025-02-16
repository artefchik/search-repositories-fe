import {Outlet} from "react-router";
import {Header} from "../header/Header";

export const MainLayout = () => (
    <div className="wrapper">
        <Header/>
        <main>
            <Outlet/>
        </main>
    </div>
);
