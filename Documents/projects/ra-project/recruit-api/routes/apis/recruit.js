const express = require('express');
const router = express.Router();
const Recruit = require('../../models/Recruit');


router.get('/', (req, res, next) => {
    Recruit.find()
    .then((posts) => {
        res.json(posts);
    }) 
    .catch(err => console.log(err))

});


 router.get('/single/:id', (req, res, next) => {
        //Grab the id of each applicant
        let id = req.params.id;
        Recruit.findById(id)
            .then((recruit) => {
                res.json(recruit);
            
            })
            .catch(err => console.log(err))
    });




    router.post('/add', (req, res, next) => {
        const first_name = req.body.first_name;
       const last_name = req.body.last_name;
       const email = req.body.email;
        const date_of_birth = req.body.date_of_birth;
        const address = req.body.address;
        const university = req.body.university;
         const course_of_study = req.body.course_of_study;
          const cgpa = req.body.cgpa;

        newRecruit = new Recruit({
            first_name: first_name,
           last_name: last_name,
           email: email,
            date_of_birth: date_of_birth,
            address: address,
            university: university,
            course_of_study : course_of_study,
            cgpa : cgpa
           

        });
       newRecruit.save()
        .then(recruit => {
            res.json(recruit)
        })
        .catch(err => console.log(err));
        
    })

module.exports = router;

