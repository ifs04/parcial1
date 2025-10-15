import { Router, Application } from "express";
import { IfNewsController } from "../controllers/if_news.controller";

export class IfNewsRoutes {
  public ifNewsController: IfNewsController = new IfNewsController();

  // ================== RUTAS PÚBLICAS (SIN AUTENTICACIÓN) ==================
  public routes(app: Application): void {
    // Listar todas las noticias y crear nueva
    app.route("/news/public")
      .get(this.ifNewsController.getAllNews)
      .post(this.ifNewsController.createNews);

    // Obtener, actualizar o eliminar físicamente una noticia por ID
    app.route("/news/public/:id")
      .get(this.ifNewsController.getNewsById)
      .patch(this.ifNewsController.updateNews)
      .delete(this.ifNewsController.deleteNews);

    // Eliminación lógica (marcar como INACTIVA)
    app.route("/news/public/:id/logic")
      .delete(this.ifNewsController.deleteNewsAdv);
  }
}