var express = require('express');
const router = express.Router({ mergeParams: true, strict: true });
// const category = require('express').Router({ mergeParams: true });

const db = require('./queries');
const user = require('./users');
const bodyParser = require('body-parser');

/* API routers */
// ! Try and group the api calls to ones that are similar
// ! All api calls should be going through /api/whatever

router.route('/v1/AllNewThreads')
    .get(db.getAllNewThreads)

router.route('/v1/pages/Page/:page_id')
  /**
     * @swagger
     *
     * 
     * /pages/Page/{page_id}:
     *   get:
     *     description: Returns the subpage requested along with the categories that belong with it, aswell the subcategories that belong with those categories 
     *     tags:
     *       - Pages
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: page_name
     *         description: The id of the subpage
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Successfully got the page
     *         schema:
     *           example: {
                            "page_d": [
                                {
                                "page_id": 1,
                                "title": "Toyota",
                                "description": null,
                                "visiter_count": 0,
                                "created": "2020-02-22T05:01:56.255Z"
                                }
                            ],
                            "cat_d": [
                                {
                                "cat_id": 1,
                                "subject": "Sports Cars",
                                "created": "2020-02-22T05:26:50.633Z",
                                "page_id": 1
                                }
                            ],
                            "subcat_d": [
                                [
                                {
                                    "sub_cat_id": 1,
                                    "created": "2020-02-23T04:27:46.861Z",
                                    "main_cat_id": 1,
                                    "subject": "Supra"
                                },
                                {
                                    "sub_cat_id": 2,
                                    "created": "2020-02-23T04:27:50.041Z",
                                    "main_cat_id": 1,
                                    "subject": "GT86"
                                }
                                ]
                            ]
                            }
     *       500:
     *         description: Internal server error
     *       400:
     *          description: Could not get the requested page
     *       
     */
  .get(db.getPages)
  /**
   * @swagger
   *
   * /pages/Page/page:
   *   post:
   *     description: Create a new subpage to the database, returns a JSON containing the page_id and title
   *     tags:
   *       - Pages
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: title
   *         description: The title of the new subpage
   *         in: formData
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Successfully created a new page
   *         schema:
   *           example: {"title": "Page Name!","page_id": 12}
   *       500:
   *         description: Internal server error
   *       400:
   *         description: Could not create the requested page
   */
  .post(db.addPage)
  /**
   * @swagger
   *
   * /pages/Page/page:
   *   delete:
   *     description: Delete the specified subpage
   *     tags:
   *       - Pages
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: page_id
   *         description: The id of the subpage being deleted
   *         in: formData
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Successfully deleted the subpage
   *       500:
   *         description: Internal server error
   *       400:
   *         description: Could not delete the specified subpage
   *       404:
   *         description: The specified subpage does not exist in the database
   */
  .delete(db.deletePage);

router
  .route('/v1/pages/Category')
  /**
   * @swagger
   *
   * /pages/Category:
   *   get:
   *     description: Get all the categories of a subpage
   *     tags:
   *       - Category
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: page_id
   *         description: The id of the subpage
   *         in: formData
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: Successfully get the categories of the page
   *       500:
   *         description: Internal server error
   *       400:
   *         description: Could not get the subpage's category
   */
  .get(db.getCategories)
  /**
   * @swagger
   *
   * /pages/Category:
   *   post:
   *     description: Create a new category in the specified category
   *     tags:
   *       - Category
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: page_id
   *         description: The id of the subpage
   *         in: formData
   *         required: true
   *         type: integer
   *       - name: subject
   *         description: The subject of the category
   *         in: formData
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Successfully created the category
   *       500:
   *         description: Internal server error
   *       400:
   *         description: Could not create the category
   */
  .post(db.addCategory)
  /**
   * @swagger
   *
   * /pages/Category:
   *   delete:
   *     description: Delete the specified category
   *     tags:
   *       - Category
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: cat_id
   *         description: The id of the category being deleted
   *         in: formData
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: Successfully deleted the category
   *       500:
   *         description: Internal server error
   *       400:
   *         description: Could not delete the category
   *       404:
   *         description: The category does not exists
   */
  .delete(db.deleteCategory);

router
  .route('/v1/pages/subCategory/:sub_cat_id?/:page_num?')
  /**
   * @swagger
   *
   * /pages/subCategory/{sub_cat_id}/{page_num}:
   *   get:
   *     description: Get the all the subcategory associated to the subcategory
   *     tags:
   *       - Sub Category
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: sub_cat_id
   *         description: The id of the corresponding subcategory
   *         in: path
   *         required: true
   *         type: integer
   *       - name: page_num
   *         description: Current page number
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: Successfully get the subcategories
   *       500:
   *         description: Internal server error
   *       400:
   *         description: Could not get the subcategory
   */
  .get(db.getSubCategories)
  /**
   * @swagger
   *
   * /pages/subCategory:
   *   post:
   *     description: Create a new sub-category in the specified category
   *     tags:
   *       - Sub Category
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: main_cat_id
   *         description: The id of the corresponding category to add to
   *         in: formData
   *         required: true
   *         type: integer
   *       - name: subject
   *         description: The subject of the subcategory
   *         in: formData
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Successfully created the subcategory
   *       500:
   *         description: Internal server error
   *       400:
   *         description: Could not create the subcategory
   */
  .post(db.addSubCategory)
  /**
   * @swagger
   *
   * /pages/subCategory:
   *   delete:
   *     description: Delete the specified Subcategory
   *     tags:
   *       - Sub Category
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: sub_cat_id
   *         description: The id of the Subcategory being delete
   *         in: formData
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: Successfully Deleted the subcategory
   *       500:
   *         description: Internal server error
   *       400:
   *         description: Could not delete the subcategory
   *       404:
   *         description: Could not find the specified subcategory
   */
  .delete(db.deleteSubCategory);

router
  .route('/v1/pages/thread/:thread_id?/:page_num?')
  /**
   * @swagger
   *
   * /pages/thread:
   *   post:
   *     description: Create a new thread in a specified subcateogry
   *     tags:
   *       - Thread
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: sub_cat_id
   *         description: The id of the corresponding subcategory
   *         in: formData
   *         required: true
   *         type: integer
   *       - name: subject
   *         description: The subject of the thread (aka. Title)
   *         in: formData
   *         required: true
   *         type: string
   *       - name: content
   *         description: The content of the thread. This content belongs to the first post.
   *         in: formData
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Successfully created a thread inside
   *       500:
   *         description: Internal server error
   *       400:
   *         description: Could not create the thread
   */
  .post(db.addThread)

  /**
   * @swagger
   *
   * /pages/thread/{thread_id}/{page_num}:
   *   get:
   *     description: Get the specified thread with its child posts
   *     tags:
   *       - Thread
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: thread_id
   *         description: The id of the corresponding thread
   *         in: path
   *         required: true
   *         type: integer
   *       - name: page_num
   *         description: The current page number the user is at
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: Successfully get a specified thread
   *       500:
   *         description: Internal server error
   *       400:
   *         description: Could not get the specified thread
   */
  .get(db.getThread)

  /**
   * @swagger
   *
   * /pages/thread:
   *   put:
   *     description: Update the subject of an existing thread
   *     tags:
   *       - Thread
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: thread_id
   *         description: The id of the thread being updated
   *         in: formData
   *         required: true
   *         type: integer
   *       - name: subject
   *         description: The new subject of the thread (aka. Title)
   *         in: formData
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Successfully update the subject of the thread
   *       500:
   *         description: Internal server error
   *       400:
   *         description: Could not update the thread's subject
   *       404:
   *         description: Thread does not exists in database
   */
  .put(db.updateThread)

  /**
   * @swagger
   *
   * /pages/thread:
   *   delete:
   *     description: Delete the specified thread
   *     tags:
   *       - Thread
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: thread_id
   *         description: The id of the thread being delete
   *         in: formData
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: Successfully deleted the thread
   *       500:
   *         description: Internal server error
   *       400:
   *         description: Could not delete the thread
   *       404:
   *         description: The thread does not exists
   */
  .delete(db.deleteThread);

router
  .route('/v1/pages/post/:post_id?')
  /**
   * @swagger
   *
   * /pages/post:
   *   post:
   *     description: Create a new post in a specified thread
   *     tags:
   *       - Post
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: thread_id
   *         description: The id of the corresponding thread
   *         in: formData
   *         required: true
   *         type: integer
   *       - name: content
   *         description: The content of a post
   *         in: formData
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Successfully created a post inside a specified thread
   *       500:
   *         description: Internal server error
   *       400:
   *         description: Could not create a new post
   */
  .post(db.addPost)

  /**
   * @swagger
   *
   * /pages/post/{post_id}:
   *   get:
   *     description: Get the post with the specified post_id
   *     tags:
   *       - Post
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: post_id
   *         description: The id of the post in question.
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: Successfully get all the posts in a thread
   *       500:
   *         description: Internal server error
   *       400:
   *         description: Could not get the corresponding posts in a thread
   */
  .get(db.getPost)

  /**
   * @swagger
   *
   * /pages/post:
   *   put:
   *     description: Update the contents of an existing post
   *     tags:
   *       - Post
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: post_id
   *         description: The id of the post being updated
   *         in: formData
   *         required: true
   *         type: integer
   *       - name: thread_id
   *         description: The id of the thread the post belongs to
   *         in: formData
   *         required: true
   *         type: integer
   *       - name: content
   *         description: The new content of the post
   *         in: formData
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Successfully update the contents of the post
   *       500:
   *         description: Internal server error
   *       400:
   *         description: Could not update the post's contents
   *       404:
   *         description: Post does not exists in database
   */
  .put(db.updatePost)

  /**
   * @swagger
   *
   * /pages/post:
   *   delete:
   *     description: Delete an existing post in a specified thread
   *     tags:
   *       - Post
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: post_id
   *         description: The id of the post
   *         in: formData
   *         required: true
   *         type: integer
   *       - name: thread_id
   *         description: The id of the thread that the post belongs to
   *         in: formData
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: Successfully deleted the post inside the specified thread
   *       500:
   *         description: Internal server error
   *       400:
   *         description: Could not delete the post
   *       404:
   *         description: The post does not exist in the thread
   */
  .delete(db.deletePost);

router
  .route('/v1/user/')
  /**
   * @swagger
   *
   * /user/:
   *   post:
   *     description: Create a user
   *     tags:
   *       - User
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: name
   *         description: The name of the user
   *         in: formData
   *         required: true
   *         type: string
   *       - name: email
   *         description: The email of the user
   *         in: formData
   *         required: true
   *         type: string
   *       - name: password
   *         description: The password for this account
   *         in: formData
   *         required: true
   *         type: string
   *       - name: confirmation
   *         description: The password confirmation for this account
   *         in: formData
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Successfully created a user
   *       500:
   *         description: Internal server error
   *       404:
   *         description: Missing or wrong credentials
   */
  .post(user.createUser);

router
  .route('/v1/user/:user_account_id')
  /**
   * @swagger
   *
   * /user/{user_account_id}:
   *   get:
   *     description: Get a user using their id
   *     tags:
   *       - User
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: user_account_id
   *         description: The id of the corresponding user
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: Successfully get the user
   *       500:
   *         description: Internal server error
   *       404:
   *         description: Could not find user
   */
  .get(user.getUser)
  /**
   * @swagger
   *
   * /user/:
   *   delete:
   *     description: Delete a user using their id
   *     tags:
   *       - User
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: user_account_id
   *         description: The id of the corresponding user
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Successfully deleted the user
   *       500:
   *         description: Internal server error
   *       404:
   *         description: Could not find user
   */
  .delete(user.deteleUser);

module.exports = router;
