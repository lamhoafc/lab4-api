const express = require('express');
const router = express.Router();
const Fruit = require('./fruits');
const Upload = require('./upload');



router.post('/fruitsAdd', async (req, res) => {
    try {
      const fruit = new Fruit(req.body);
      await fruit.save();
      res.status(201).json(fruit);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

router.get('/fruitsAll', async (req, res) => {
  try {
    const fruits = await Fruit.find();
    res.status(200).json(fruits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/fruits/:id', async (req, res) => {
  try {
    const fruit = await Fruit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!fruit) return res.status(404).json({ message: 'Fruit not found' });
    res.status(200).json(fruit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/fruits/:id', async (req, res) => {
    try {
      const fruit = await Fruit.findById(req.params.id);
      if (!fruit) {
        return res.status(404).json({ message: 'Fruit not found' });
      }
      res.status(200).json(fruit);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
router.get('/fruitsAX', async (req, res) => {
    try {
      const fruits = await Fruit.find({ name: { $regex: /^[AX]/i } })
        .select('name quantity price distributorId');
      res.status(200).json(fruits);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});


router.delete('/destroy-fruit-by-id/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const result = await Fruit.findByIdAndDelete(id);
      if (result) {
          res.json({
              "status": 200,
              "messenger": "Xóa thành công",
              "data": result
          });
      } else {
          res.json({
              "status": 400,
              "messenger": "Lỗi, Xóa không thành công",
              "data": []
          });
      }
  } catch (error) {
      console.log(error);
  }
});
    
router.post('/add-fruit-with-file-image', Upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Vui lòng chọn file ảnh' });
    }

    const data = req.body;
    const urlImage = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    if (!data.name || !data.quantity || !data.price) {
      return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin' });
    }

    const newfruit = new Fruit({
      name: data.name,
      quantity: data.quantity,
      price: data.price,
      image: urlImage,
      id_distributor: data.id_distributor
    });

    const result = await newfruit.save();
    if (result) {
      res.json({
        status: 200,
        message: "Thêm thành công",
        data: result
      });
    } else {
      res.status(500).json({ message: "Lỗi, thêm không thành công" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
