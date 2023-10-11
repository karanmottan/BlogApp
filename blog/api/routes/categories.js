const router = require("express").Router();
const Category = require("../models/Category");
const Post = require("../models/Post");
router.post("/", async (req, res) => {
  const newCat = new Category(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/getCategoryPost", async(req,res) => {
  //console.log('ayo');
  const category = req.query.title;
  try{
    let arr = [];
    for await( const doc of Post.find()){
      if(doc.category === category){
        arr.push(doc);
      }
    }
    console.log(arr)
    res.send({status : 'success', data : arr});
  }catch(err){
    res.send({status : 'error', error : err});
  }
  

  

})

router.get("/", async (req, res) => {
  //console.log(req);
    try {
      const cats = await Category.find();
      res.status(200).json(cats);
    } catch (err) {
      res.send({status : 'error',error : err});
    }
  });

module.exports = router;
