var express = require("express");
var router = express.Router();
var expenses = require("../database/expenses");

router.get("/add", function (req, res, next) {
  console.log(expenses);
  res.render("addExpense");
});

router.get("/", function (req, res, next) {
  console.log(expenses);
  res.render("index", { title: "ExpenseTracker", expenseList: expenses });
});
//post req
router.post("/saveexpense", function (req, res, next) {
  let formData = {
    title: req.body.title,
    paidBy: req.body.paidBy,
    description: req.body.description,
    amount: req.body.amount,
  };
  console.log(formData);
  expenses.push({ ...formData, _id: expenses.length + 1 });
  res.redirect("/");
});
router.get("/edit/:id", function (req, res) {
 
  const expense=expenses.find(expense=>expense._id == req.params.id);
  console.log(expense)
  res.render("editExpense",{expense:expense});
});

router.get("/delete/:index", function (req, res, next) {
  //  console.log(req.params.index)
  expense = expenses.find((expense) => expense.id == req.params.id);
  res.redirect("editExpense", { expense: expense });
});
/* GET home page. */
// router.get('/', function(req, res, next) {
//   console.log(expenses)
//   res.render('index', { title: 'Express' });
// });
// router.get('/wlit', function(req, res, next) {
//   res.render('index', { title: 'wlit' });
// });

router.get("/wlit", function (req, res, next) {
  res.render("index", { title: "wlit", Number: 10 });
});
router.post('/saveEdited/:id', function(req,res){

 let formData = {
  title: req.body.title,
  paidBy: req.body.paidBy,
  description: req.body.description,
  amount: req.body.amount,
};
  const index = expenses.findIndex((expense) =>{ return expense._id ==req.params.id});
    expenses.splice(index,1,{_id:req.params.id, ...formData})
    res.redirect('/')
});
module.exports = router;
