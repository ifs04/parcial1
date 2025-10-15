import { Request, Response } from "express";
import { Author, AuthorI } from "../models/if_authors";

export class AuthorController {
  // Get all authors with status "ACTIVE"
  public async getAllAuthors(req: Request, res: Response) {
    try {
      const authors: AuthorI[] = await Author.findAll({
        where: { status: "ACTIVE" },
      });
      res.status(200).json({ authors });
    } catch (error) {
      res.status(500).json({ error: "Error fetching authors" });
    }
  }

  // Get an author by ID
  public async getAuthorById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const author = await Author.findOne({
        where: { id: pk, status: "ACTIVE" },
      });

      if (author) {
        res.status(200).json({ author });
      } else {
        res.status(404).json({ error: "Author not found or inactive" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching author" });
    }
  }

  // Create a new author
  public async createAuthor(req: Request, res: Response) {
    const { name, email, bio, status } = req.body;
    try {
      // Validate required fields
      if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
      }

      const body: AuthorI = {
        name,
        email,
        bio,
        status: status || "ACTIVE",
      };

      const newAuthor = await Author.create({ ...body });
      res.status(201).json(newAuthor);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Update an author
  public async updateAuthor(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { name, email, bio, status } = req.body;

    try {
      const authorExist = await Author.findOne({
        where: { id: pk, status: "ACTIVE" }
      });

      if (authorExist) {
        // Validate email format if provided
        if (email && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          return res.status(400).json({ error: "Invalid email format" });
        }

        await authorExist.update({ name, email, bio, status });
        res.status(200).json(authorExist);
      } else {
        res.status(404).json({ error: "Author not found or inactive" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Delete an author physically
  public async deleteAuthor(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const authorToDelete = await Author.findByPk(id);

      if (authorToDelete) {
        await authorToDelete.destroy();
        res.status(200).json({ message: "Author deleted successfully" });
      } else {
        res.status(404).json({ error: "Author not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting author" });
    }
  }

  // Delete an author logically (change status to "INACTIVE")
  public async deleteAuthorAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const authorToUpdate = await Author.findOne({
        where: { 
          id: pk, 
          status: "ACTIVE" 
        }
      });

      if (authorToUpdate) {
        await authorToUpdate.update({ status: "INACTIVE" });
        res.status(200).json({ message: "Author marked as inactive" });
      } else {
        res.status(404).json({ error: "Author not found or already inactive" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error marking author as inactive" });
    }
  }
}