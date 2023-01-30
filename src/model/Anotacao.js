const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  AnotacaoSchema = new Schema({
    title: String,
    content: String
});

AnotacaoSchema.index({ title: 'text', content: 'text' }, { weights: { title: 2, content: 1 } });

const Anotacao = mongoose.model('Anotacao', AnotacaoSchema );

module.exports = Anotacao;