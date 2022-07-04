const express = require('express');
const Note = require('../models/Note')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator')

//ROUTE:1  get all the notes using:GET "/api/notes/getuser".login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})


//ROUTE:2  add new notes using:POST "/api/notes/getuser".login required
router.post('/addnote', fetchuser, [
    body('title', 'enter a valid title').isLength({ min: 3 }),
    body('description', 'description must be at least 3 character').isLength({ min: 3 }),
],
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            //if there are errors,return bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save()

            res.json(savedNote)
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

//ROUTE:3  update eixisting  notes using:PUT "/api/notes/updatenote".login required
router.put('/updatenote/:id', fetchuser,
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            const newNote = {}
            if (title) { newNote.title = title }
            if (description) { newNote.description = description }
            if (tag) { newNote.tag = tag }

            //find the note to be updated
            let note = await Note.findById(req.params.id);
            if (!note) { return res.status(404).send('not found') }
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("not allowed")
            }
            note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            res.json({ note });
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    })


//ROUTE:4  delete eixisting  notes using:DELETE "/api/notes/deletenote".login required
router.delete('/deletenote/:id', fetchuser,
    async (req, res) => {
        try {
            //find the note to be deleted
            let note = await Note.findById(req.params.id);
            if (!note) { return res.status(404).send('not found') }


            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("not allowed")
            }
            note = await Note.findByIdAndDelete(req.params.id)
            res.json({ "success": "notes has been deleted", note: note });
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    })




module.exports = router;