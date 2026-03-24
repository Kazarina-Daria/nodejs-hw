import { getNoteById, getAllNotes, createNote, deleteNote, updateNote } from '../controllers/notesController.js';
import {Router} from 'express';

export const router = Router();

router.get("/notes/:noteId", getNoteById);

router.get("/notes", getAllNotes);

router.post("/notes", createNote);

router.patch("/notes/:noteId", updateNote);

router.delete("/notes/:noteId",deleteNote);

export default router;
