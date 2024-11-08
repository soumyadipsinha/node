const express = require('express');
const router = express.Router();
const Person = require('./models/person'); // Ensure you import the Person model

// POST method to add a new person
router.post('/person', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('Person data saved');
        res.status(200).json(response);
    } catch (err) {
        console.error('Error saving person:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET method to fetch all persons
router.get('/person', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('Person data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.error('Error fetching person data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET method to fetch persons by work type
router.get('/person/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (['chef', 'manager', 'waiter'].includes(workType)) {
            const response = await Person.find({ work: workType });
            console.log('Work type data fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid workType' });
        }
    } catch (err) {
        console.error('Error fetching by work type:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT method to update a person by ID
router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,
            runValidators: true,
        });
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('Person data updated');
        res.status(200).json(response);
    } catch (err) {
        console.error('Error updating person data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('./:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        //assuming you havbe a person model
        const response=await Person.findByIdAndRemove(personId);
        if(!response){
            return res.status(404).json({error:'person not found'});

        }console.log('data delete');
        res.status(200).json({message:'person delete successfully'});

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

module.exports = router;
