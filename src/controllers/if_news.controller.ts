import { Request, Response } from "express";
import { IfNews, IfNewsI } from "../models/if_news";
import { Author } from "../models/if_authors";

export class IfNewsController {
  // Get all active news
  public async getAllNews(req: Request, res: Response) {
    try {
      const news: IfNewsI[] = await IfNews.findAll({
        where: { status: 'ACTIVE' },
        include: [{
          model: Author,
          where: { status: 'ACTIVE' }
        }]
      });
      res.status(200).json({ news });
    } catch (error) {
      res.status(500).json({ error: "Error fetching news" });
    }
  }

  // Get a news item by ID
  public async getNewsById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const news = await IfNews.findOne({
        where: { 
          id: pk,
          status: 'ACTIVE' 
        },
        include: [{
          model: Author,
          where: { status: 'ACTIVE' }
        }]
      });
      if (news) {
        res.status(200).json({ news });
      } else {
        res.status(404).json({ error: "News not found or inactive" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching news" });
    }
  }

  // Create a new news item
  public async createNews(req: Request, res: Response) {
    const { abstract, content_news, author_id, status } = req.body;
    try {
      // Verify if author exists and is active
      const author = await Author.findOne({
        where: { 
          id: author_id,
          status: 'ACTIVE'
        }
      });

      if (!author) {
        return res.status(404).json({ error: "Author not found or inactive" });
      }

      let body: IfNewsI = {
        abstract,
        content_news,
        author_id,
        status: status || "ACTIVE",
      };

      const newNews = await IfNews.create({ ...body });
      res.status(201).json(newNews);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Update a news item
  public async updateNews(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { abstract, content_news, author_id, status } = req.body;
    try {
      if (author_id) {
        // Verify if new author exists and is active
        const author = await Author.findOne({
          where: { 
            id: author_id,
            status: 'ACTIVE'
          }
        });

        if (!author) {
          return res.status(404).json({ error: "Author not found or inactive" });
        }
      }

      let body: IfNewsI = {
        abstract,
        content_news,
        author_id,
        status,
      };

      const newsExist = await IfNews.findOne({
        where: { 
          id: pk,
          status: 'ACTIVE'
        }
      });

      if (newsExist) {
        await newsExist.update(body);
        res.status(200).json(newsExist);
      } else {
        res.status(404).json({ error: "News not found or inactive" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Delete a news item physically
  public async deleteNews(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const newsToDelete = await IfNews.findByPk(id);

      if (newsToDelete) {
        await newsToDelete.destroy();
        res.status(200).json({ message: "News deleted successfully" });
      } else {
        res.status(404).json({ error: "News not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting news" });
    }
  }

  // Delete a news item logically (change status to "INACTIVE")
  public async deleteNewsAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const newsToUpdate = await IfNews.findOne({
        where: { 
          id: pk,
          status: 'ACTIVE' 
        }
      });

      if (newsToUpdate) {
        await newsToUpdate.update({ status: 'INACTIVE' });
        res.status(200).json({ message: "News marked as inactive" });
      } else {
        res.status(404).json({ error: "News not found or already inactive" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error marking news as inactive" });
    }
  }
}