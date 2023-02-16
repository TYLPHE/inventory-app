const express = require('express');
const router = express.Router();

// Require controller modules
const restaurantController = require('../controllers/restaurantController');
const equipmentController = require('../controllers/equipmentController');
const ingredientsController = require('../controllers/ingredientsController');
const recipeController = require('../controllers/recipeController');
const staffController = require('../controllers/staffController');
const dishController = require('../controllers/dishController');

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
router.get('/restaurant/:id', restaurantController.restaurant_detail);

// GET request for list of all restaurants
router.get('/restaurant_list', restaurantController.restaurant_list);

// EQUIPMENT ROUTES //
//GET request for creating equipment. NOTE: This must come before routes that display equipment (uses id)
router.get('/equipment/create', equipmentController.equipment_create_get);

// POST request for creating equipment
router.post('/equipment/create', equipmentController.equipment_create_post);

// GET request to delete equipment
router.get('/equipment/:id/delete', equipmentController.equipment_delete_get);

// POST request to delete equipment
router.post('/equipment/:id/delete', equipmentController.equipment_delete_post);

// GET request to update equipment
router.get('/equipment/:id/update', equipmentController.equipment_update_get);

// POST request to update equipment
router.post('/equipment/:id/update', equipmentController.equipment_update_post);

// GET request for one eqipment
router.get('/equipment/:id', equipmentController.equipment_detail);

// GET request for list of equipment
router.get('/equipment_list', equipmentController.equipment_list);

// Dish ROUTES //
//GET request for creating dish. NOTE: This must come before routes that display dish (uses id)
router.get('/dish/create', dishController.dish_create_get);

// POST request for creating dish
router.post('/dish/create', dishController.dish_create_post);

// GET request to delete dish
router.get('/dish/:id/delete', dishController.dish_delete_get);

// POST request to delete dish
router.post('/dish/:id/delete', dishController.dish_delete_post);

// GET request to update dish
router.get('/dish/:id/update', dishController.dish_update_get);

// POST request to update dish
router.post('/dish/:id/update', dishController.dish_update_post);

// GET request for one dish
router.get('/dish/:id', dishController.dish_detail);

// GET request for list of dish
router.get('/dish_list', dishController.dish_list);

// INGREDIENTS ROUTES
//GET request for creating ingredients. NOTE: This must come before routes that display ingredients (uses id)
router.get('/ingredients/create', ingredientsController.ingredient_create_get);

// POST request for creating ingredients
router.post('/ingredients/create', ingredientsController.ingredient_create_post);

// GET request to delete ingredients
router.get('/ingredients/:id/delete', ingredientsController.ingredient_delete_get);

// POST request to delete ingredients
router.post('/ingredients/:id/delete', ingredientsController.ingredient_delete_post);

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
router.post('/recipe/:id/delete', recipeController.recipe_delete_post);

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
router.post('/staff/:id/delete', staffController.staff_delete_post);

// GET request to update staff
router.get('/staff/:id/update', staffController.staff_update_get);

// POST request to update staff
router.post('/staff/:id/update', staffController.staff_update_post);

// GET request for one staff
router.get('/staff/:id', staffController.staff_detail);

// GET request for list of staff
router.get('/staff_list', staffController.staff_list);

module.exports = router;