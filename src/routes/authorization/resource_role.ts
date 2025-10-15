import { Application } from "express";
import { ResourceRoleController } from "../../controllers/authorization/resource_role.controller";


export class ResourceRoleRoutes {
  public resourceRoleController: ResourceRoleController = new ResourceRoleController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/resource-roles")
      .get(this.resourceRoleController.getAllResourceRoles)
      .post(this.resourceRoleController.createResourceRole);

    app.route("/api/resource-roles/:id")
      .get(this.resourceRoleController.getResourceRoleById)
      .patch(this.resourceRoleController.updateResourceRole)
      .delete(this.resourceRoleController.deleteResourceRole);

    app.route("/api/resource-roles/:id/logic")
      .delete(this.resourceRoleController.deleteResourceRoleAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    // Si se requieren rutas protegidas, se pueden agregar aquí:


  }
}