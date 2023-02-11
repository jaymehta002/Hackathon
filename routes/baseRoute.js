const router = require('express').Router();

router.get('/', (req, res)=>{
	res.render("index");
});

router.get('/contact', (req, res) => {
    res.render("contact");
})

router.get('/login', (req, res) => {
    res.render("login");
})
router.use((req, res, next) => {
    res.status(404).render(
        "404")
})

module.exports = router;