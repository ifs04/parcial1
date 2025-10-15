import { Router } from "express";
import { IfNewsRoutes } from "./if_news";
import { AuthorRoutes } from "./if_author";
import { UserRoutes } from "./authorization/user";
import { RoleRoutes } from "./authorization/role";
import { RoleUserRoutes } from "./authorization/role_user";
import { ResourceRoutes } from "./authorization/resource"; // Import ResourceRoutes
import { ResourceRoleRoutes } from "./authorization/resource_role"; // Import ResourceRoleRoutes

export class Routes {
    public ifNewsRoutes: IfNewsRoutes = new IfNewsRoutes();
    public authorRoutes: AuthorRoutes = new AuthorRoutes();
    public userRoutes: UserRoutes = new UserRoutes();
    public roleRoutes: RoleRoutes = new RoleRoutes();
    public roleUserRoutes: RoleUserRoutes = new RoleUserRoutes();
    public resourceRoutes: ResourceRoutes = new ResourceRoutes(); // Add ResourceRoutes
    public resourceRoleRoutes: ResourceRoleRoutes = new ResourceRoleRoutes(); // Add ResourceRoutes

}