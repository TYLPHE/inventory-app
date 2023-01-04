const express = require('express');
const router = express.Router();

// Require controller modules
const restaurantController = require('../controllers/restaurantController');
const equipmentController = require('../controllers/equipmentController');
const foodController = require('../controllers/foodController');
const ingredientsController = require('../controllers/ingredientsController');
const recipeController = require('../controllers/recipeController');
const staffController = require('../controllers/staffController');

// RESTAURANT ROUTES //
// GET restaurant home page
router.get('/', restaurantController.index);

// GET request for creating a restaurant. NOTE: This must come before routes that display restaurant (uses id)
router.get('/restaurant/create', restaurantController.restaurant_create_get);

// POST request for creating restaurant
router.post('/restaurant/create', restaurantController.restaurant_create_post);

// GET request to delete restaurant
router.get('/restaurant/:id/delete', restaurantController.restaurant_delete_get);

// POST request to delete restaurant
router.post('/restaurant/:id/delete', restaurantController.restaurant_delete_post);

// GET request to update restaurant
router.get('/restaurant/:id/update', restaurantController.restaurant_update_get);

// Post request to update restaurant
router.post('/restaurant/:id/update', restaurantController.restaurant_update_post);

// GET request for one restaurant
router.get('book/:id', restaurantController.restaurant_detail);

// GET request for list of all restaurants
router.get('/restaurant_list', restaurantController.restaurant_detail);

// EQUIPMENT ROUTES //
//GET request for creating equipment. NOTE: This must come before routes that display equipment (uses id)
router.get('/equipment/create', equipmentController.equipment_create_get);

// POST request for creating equipment
router.post('/equipment/create', equipmentController.equipment_create_post);

// GET request to delete equipment
router.get('/equipment/:id/delete', equipmentController.equipment_delete_get);

// POST request to delete equipment
router.post('equipment/:id/delete', equipmentController.equipment_delete_post);

// GET request to update equipment
router.get('/equipment/:id/update', equipmentController.equipment_update_get);

// POST request to update equipment
router.post('/equipment/:id/update', equipmentController.equipment_update_post);

// GET request for one eqipment
router.get('/equipment/:id', equipmentController.equipment_detail);

// GET request for list of equipment
router.get('/equipment_list', equipmentController.equipment_list);

// FOOD ROUTES //
//GET request for creating food. NOTE: This must come before routes that display food (uses id)
router.get('/food/create', foodController.food_create_get);

// POST request for creating food
router.post('/food/create', foodController.food_create_post);

// GET request to delete food
router.get('/food/:id/delete', foodController.food_delete_get);

// POST request to delete food
router.post('food/:id/delete', foodController.food_delete_post);

// GET request to update food
router.get('/food/:id/update', foodController.food_update_get);

// POST request to update food
router.post('/food/:id/update', foodController.food_update_post);

// GET request for one food
router.get('/food/:id', foodController.food_detail);

// GET request for list of food
router.get('/food_list', foodController.food_list);

// INGREDIENTS ROUTES
//GET request for creating ingredients. NOTE: This must come before routes that display ingredients (uses id)
router.get('/ingredients/create', ingredientsController.ingredient_create_get);

// POST request for creating ingredients
router.post('/ingredients/create', ingredientsController.ingredient_create_post);

// GET request to delete ingredients
router.get('/ingredients/:id/delete', ingredientsController.ingredient_delete_get);

// POST request to delete ingredients
router.post('ingredients/:id/delete', ingredientsController.ingredient_delete_post);

// GET request to update ingredients
router.get('/ingredients/:id/update', ingredientsController.ingredient_update_get);

// POST request to update ingredients
router.post('/ingredients/:id/update', ingredientsController.ingredient_update_post);

// GET request for one ingredients
router.get('/ingredients/:id', ingredientsController.ingredient_detail);

// GET request for list of ingredients
router.get('/ingredient_list', ingredientsController.ingredient_list);

// RECIPE ROUTES //
//GET request for creating recipe. NOTE: This must come before routes that display recipe (uses id)
router.get('/recipe/create', recipeController.recipe_create_get);

// POST request for creating recipe
router.post('/recipe/create', recipeController.recipe_create_post);

// GET request to delete recipe
router.get('/recipe/:id/delete', recipeController.recipe_delete_get);

// POST request to delete recipe
router.post('recipe/:id/delete', recipeController.recipe_delete_post);

// GET request to update recipe
router.get('/recipe/:id/update', recipeController.recipe_update_get);

// POST request to update recipe
router.post('/recipe/:id/update', recipeController.recipe_update_post);

// GET request for one recipe
router.get('/recipe/:id', recipeController.recipe_detail);

// GET request for list of recipe
router.get('/recipe_list', recipeController.recipe_list);

// STAFF ROUTES
//GET request for creating staff. NOTE: This must come before routes that display staff (uses id)
router.get('/staff/create', staffController.staff_create_get);

// POST request for creating staff
router.post('/staff/create', staffController.staff_create_post);

// GET request to delete staff
router.get('/staff/:id/delete', staffController.staff_delete_get);

// POST request to delete staff
router.post('staff/:id/delete', staffController.staff_delete_post);

// GET request to update staff
router.get('/staff/:id/update', staffController.staff_update_get);

// POST request to update staff
router.post('/staff/:id/update', staffController.staff_update_post);

// GET request for one staff
router.get('/staff/:id', staffController.staff_detail);

// GET request for list of staff
router.get('/staff_list', staffController.staff_list);

module.exports = router;