const { log } = require("console");
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const {v4: uuidv4} = require('uuid');
const methodOverride = require("method-override");

app.use(express.urlencoded({extended : true})); //url encoded data express will understand
app.use(methodOverride("_method"));

// set path of views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.static(path.join (__dirname,"public")));

let posts =[
    {   
        id :uuidv4(),
        username :"omkar",
        content :"Embarking on the journey of a software engineer, a fresher enters the realm of endless possibilities. Armed with a passion for coding and an eagerness to learn, they step into the world of algorithms, data structures, and programming paradigms.Their first steps are tentative yet filled with excitement as they navigate through lines of code, deciphering the intricacies of syntax and logic. With each bug resolved and each program compiled, they gain a deeper understanding of the software development lifecycle.",
    },
    {
        id : uuidv4(),
        username :"shubzz",
        content :"To all coding enthusiasts out there, let's dive deep into the labyrinth of algorithms, where each line of code holds the promise of discovery. With every keystroke, we unravel the mysteries of logic and creativity, crafting solutions to intricate puzzles. Let's embrace the joy of problem-solving and the thrill of innovation, as we build software that shapes the future. Together, we explore new technologies, share insights, and inspire each other to reach new heights. In this vibrant community of coding lovers, passion drives us forward, propelling us towards endless possibilities and endless lines of code.",
    },
    {
        id :uuidv4(),
        username :"rohan",
        content :"To all fellow computer science students,In the vast realm of binary and algorithms, we embark on a journey filled with discovery and innovation. Each line of code we write is a step towards unlocking the potential of technology. From algorithms to artificial intelligence, our quest for knowledge knows no bounds. Amidst the challenges and late-night debugging sessions, remember to cherish the journey. Embrace collaboration, seek mentorship, and never shy away from pushing the boundaries of what's possible.Together, let's code, create, and shape the future of technology. Our passion for computer science fuels our drive to make a meaningful impact. Keep coding, keep learning, and keep innovating!",
    },

];

//index route
app.get("/posts", (req , res)=>{
   res.render("index.ejs",{posts});
});
//Create and new route
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
//new routes
app.post("/posts", (req , res)=>{
        let {username,content} = req.body;
        let id = uuidv4();
        posts.push({id,username,content});
        res.redirect("/posts");
     });
     
app.get("/posts/:id" , (req , res)=>{
   let {id} = req.params;
//    console.log(id);
   let post = posts.find((p)=> id === p.id);
   res.render("show.ejs",{post});
});   
app.patch("/posts/:id",(req, res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=> id === p.id);
    post.content = newContent;
    res.redirect("/posts");
}); 
//edit
app.get("/posts/:id/edit" , (req , res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("edit.ejs",{post});

});
//delete
app.delete("/posts/:id",(req,res)=>{
    let{id} = req.params;
    posts = posts.filter((p)=>id !== p.id);
    res.redirect("/posts");
})
app.listen(port,()=>{
    console.log(`listing to port ${port}`);
});