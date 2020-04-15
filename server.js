const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res){
    const about = {
        avatar_url: "https://scontent.fbhz8-1.fna.fbcdn.net/v/t1.0-9/68991272_2030564997050128_5340009010361794560_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_eui2=AeE5utjrdJCKeLpBLXOEnPlyan4FVAM-hC76Q21EKl01PIT7D4gIdC9oYvw00rwrzQEEAVuSv_i3TEkc7oycOK5ukKVUUZ2y8JpBP1YIMr83xg&_nc_ohc=Bav2dHfKY2kAX8KGr1e&_nc_ht=scontent.fbhz8-1.fna&oh=5aed3035ba7fbb0a511150ef89fe32c5&oe=5EAA25F3",
        name: "Kevin Faria",
        description: "Analise e Desenvolvimento de sistemas",
        role: "Estudante - FacisaBH",
        links: [
            { name: "Github", url: "https://github.com/youngNyvek"},
            { name: "LinkedIn", url: "https://www.linkedin.com/in/kevin-fernandes2503/"}
        ]
    }


    return res.render("about", {about})
})

server.get("/projects", function(req, res){

    return res.render("projects", { items: videos })
})

server.get("/video", function(req, res){
    const id = req.query.id

    const video = videos.find(function(video){
        if (video.id == id){
            return true
        }
    })

    if (!video){
        return res.send("video not found!")
    }

    return res.render("video", { item: video })
})



server.listen(5000, function(){
    console.log("server is running")
})