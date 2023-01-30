const express = require('express');
const router = express.Router();
const Anotacao = require('./src/model/Anotacao')
const path = require('path');


//pagina inicial
router.get('/',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'src','views','index.html'));
});

//enviar anotação
router.post('/anotacao',(req, res) => {
  const novaAnotacao = new Anotacao({
      title: req.body.title,
      content: req.body.content
  });
  novaAnotacao.save();
  res.json({messagen:"anotação salva com sucesso"});
});

//função busca
//para buscar http://localhost:3000/busca?q=<conteudo>"
router.post('/busca', async (req, res) => {
  const query = req.body.q;

  Anotacao.find({ $text: { $search: query } }, { score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' } })
      .exec((error, anotacoes) => {
          if (error) {
              return res.send(error);
          }
          res.json(anotacoes);
      });
});


router.get('/listar',(req,res)=>{

  res.sendFile(path.resolve(__dirname,'src','views','listar.html'));
})

//função deletar
router.delete('/anotacao', async (req, res) => {


  try{
    const anotacao = await Anotacao.findByIdAndRemove(req.body.id);
    res.json(`A anotação ${anotacao.title} foi removida com sucesso`);
  }
  catch(e){
    res.status(404).json({error:e});
  }
  
});

//função de atualizar
router.put('/anotacao', (req, res) => {

  const id = req.body.id;
  const novoTitulo = req.body.title;
  const novoConteudo = req.body.content;

  console.log(req.body);
  
  try {
    Anotacao.findByIdAndUpdate(id, {
      title: novoTitulo,
      content: novoConteudo
    }, { new: true }, (err, anotacao) => {
      if (err) throw err;
      res.json({ message: "Anotação atualizada com sucesso." });
    });
  } catch (error) {
    res.json({ error: "Erro ao atualizar anotação." });
  }
});



//função  listar tudo 
router.get('/listarAll', async (req, res) => {
  try {
    const anotacoes = await Anotacao.find();
    res.json(anotacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;

