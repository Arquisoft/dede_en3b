const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://<username>:<password>@dedecluster.iqslm.mongodb.net/Products?retryWrites=true&w=majority');
  console.log("connected");

  const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    photo: String,
    type: String,
    price: Number
  });

  console.log("create schema");

  const Clothing = mongoose.model('Clothing', productSchema);

  console.log("create model");

  const pantalon = new Clothing({ name:'Pantalón de chandal', description: 'Pantalones de chandal para hacer deporte', photo:'link aqui?', type:'Pantalón', price:20.55 });

  await pantalon.save();
}