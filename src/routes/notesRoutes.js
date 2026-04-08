import { getNoteById, getAllNotes, createNote, deleteNote, updateNote } from '../controllers/notesController.js';
import {Router} from 'express';
import {getAllNotesSchema, noteIdSchema, createNoteSchema, updateNoteSchema} from "../validations/notesValidation.js";
import {celebrate} from "celebrate";
import { authenticate } from '../middleware/authenticate.js';

export const notesRoutes = Router();

notesRoutes.use('/notes', authenticate);

notesRoutes.get("/notes/:noteId", celebrate(noteIdSchema), getNoteById);

notesRoutes.get("/notes",celebrate(getAllNotesSchema), getAllNotes);

notesRoutes.post("/notes",celebrate(createNoteSchema), createNote);

notesRoutes.patch("/notes/:noteId",celebrate(updateNoteSchema), updateNote);

notesRoutes.delete("/notes/:noteId",celebrate(noteIdSchema), deleteNote);

export default notesRoutes;
