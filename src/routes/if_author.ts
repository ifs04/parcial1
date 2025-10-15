import { Application } from "express";
import { AuthorController } from "../controllers/if_authors.controller";

export class AuthorRoutes {
  public authorController: AuthorController = new AuthorController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================

    app.route("/api/authors")
      .get(this.authorController.getAllAuthors)
      .post(this.authorController.createAuthor);

    app.route("/api/authors/:id")
      .get(this.authorController.getAuthorById)
      .patch(this.authorController.updateAuthor)
      .delete(this.authorController.deleteAuthor);

    app.route("/api/authors/:id/logic")
      .delete(this.authorController.deleteAuthorAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    // Aquí podrías agregar rutas protegidas con middleware más adelante.
  }
}