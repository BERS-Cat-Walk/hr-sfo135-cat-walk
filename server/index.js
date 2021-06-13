const express = require('express');
const app = express();
const path = require('path');
const port = 3001;
const productController = require('./controller/products.js');
const questionController = require('./controller/questions.js');
const ratingsController = require('./controller/ratingsAndReviews.js');
const relatedListController = require('./controller/RelatedProductsController.js');

app.listen(port, (err = `connected to ${port}`) => {
  console.log(err);
});

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());

app.get('/products', (req, res) => {
  productController.productDetailOverview(req.body.id, res);
})

app.get('/reviews/:id', (req, res) => {
  const id = req.params.id;
  // res.send(id);
  ratingsController.ratingsAndReviews(id, res);
});

app.get('/reviews/meta/:id', (req, res) => {
  const id = req.params.id;
  // res.send(id);
  ratingsController.ratingsAndReviewsMeta(id, res);
});

app.post('/reviews/:id', (req, res) => {
  const id = req.params.id;
  // res.send(req.body);
  ratingsController.postNewReview(id, req.body, res);
})
// app.get('/ratings', (req, res) => {

// });

// app.get('/reviews', (req, res) => {

// });

app.get('/related/:id', (req, res) => {
  const id = req.params.id;

  relatedListController.relatedListController(id, res);
});

app.post('/related/productInfo', (req, res) => {

  const productsInfo = req.body.products.map((productId) => {
    return [relatedListController.relatedProductsController(productId), relatedListController.relatedPhotosController(productId), relatedListController.relatedRatingsController(productId)];
  })

  const resolveInfoPromises = productsInfo.map((information) => {
    return Promise.all(information)
      .then(response => {
        return response;
      })
      .catch(err => {
        console.log(err);
      })
  })

  Promise.all(resolveInfoPromises)
    .then(response => {
      res.send(response);
    })
})

// get questions for a product
app.get('/qa/questions/:product_id/:page/:count', (req, res) => {
  questionController.getAllQuestions(req.params.product_id, req.params.page, req.params.count, res);
});

// get answers for a question
app.get('/qa/questions/:question_id/answers/:page/:count', (req, res) => {
  questionController.getAllAnswers(req.params.question_id, req.params.page, req.params.count, res);
})

// mark question as helpful
app.put('/qa/questions/:question_id/helpful', (req, res) => {
  questionController.markHelpfulQuestion(req.params.question_id, res);
})

// report question
app.put('/qa/questions/:question_id/report', (req, res) => {
  questionController.reportQuestion(req.params.question_id, res);
})

// mark answer as helpful
app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  questionController.markHelpfulAnswer(req.params.answer_id, res);
})

// report answer
app.put('/qa/answers/:answer_id/report', (req, res) => {
  questionController.reportAnswer(req.params.answer_id, res);
})