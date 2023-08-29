const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const members = require('../../Members');

// get all members
router.get('/', (req,res)=>{
    res.json(members);
})

router.get('/:id', (req,res)=>{
    const found = members.some(members => members.id === parseInt(req.params.id));
    if(found){
        res.json(members.find(members => members.id === parseInt(req.params.id)));
    }else{
        res.status(404).json({message: `No member with id ${req.params.id}`});
    }
})

// create post
router.post('/', (req,res)=>{
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }
    if(!newMember.name || !newMember.email){
        return res.status(404).json({message: "please include the name and email"});
    }
    members.push(newMember)
    res.json(members)
})

// update post
router.put('/:id', (req,res)=>{
    const found = members.some(members => members.id === parseInt(req.params.id));
    const updMember = req.body;
    if(found){
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email? updMember.email : member.email;
                res.json({ msg: "Member updated", member});
            }
        })
    }else{
        res.status(404).json({message: `No member with id ${req.params.id}`});
    }
})

// delete post
router.delete('/:id', (req,res)=>{
    const found = members.some(members => members.id === parseInt(req.params.id));
    if(found){
        res.json({ msg: "Post deleted", members:members.filter(members => members.id !== parseInt(req.params.id))});
    }else{
        res.status(404).json({message: `No member with id ${req.params.id}`});
    }
})

module.exports = router;