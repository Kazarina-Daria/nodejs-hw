import { getNoteById, getAllNotes, createNote, deleteNote, updateNote } from '../controllers/notesController.js';
import {Router} from 'express';
import {getAllNotesSchema, noteIdSchema, createNoteSchema, updateNoteSchema} from "../validations/notesValidation.js";
import {celebrate} from "celebrate";

export const router = Router();

router.get("/notes/:noteId", celebrate(noteIdSchema), getNoteById);

router.get("/notes",celebrate(getAllNotesSchema), getAllNotes);

router.post("/notes",celebrate(createNoteSchema), createNote);

router.patch("/notes/:noteId",celebrate(updateNoteSchema), updateNote);

router.delete("/notes/:noteId",celebrate(noteIdSchema), deleteNote);

export default router;
