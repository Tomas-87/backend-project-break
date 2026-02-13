1. Instalamos las dependencias necesarias express, dotenv, cors, jet y supertest, mongoose, method-override
2. Monto un servidor con express en el index.html 
3. Creo la conecsion a la base de datos y el archivo .env con las variables y MONGO_URI
4. Montamos las rutas de los endpoints estas seran las rutas con los nombres de los controladores
router.get("/products", productControllers.showProducts);
router.get("/products/:productId", productControllers.showProductById);

router.get("/dashboard", productControllers.showDashboard);
router.get("/dashboard/new", productControllers.showNewProduct);

router.post("/dashboard", productControllers.createProduct);

router.get("/dashboard/:productId/edit", productControllers.showEditProduct);
router.get(
  "/dashboard/:productId",
  productControllers.showDashboardProductById,
);

router.put("/dashboard/:productId", productControllers.updateProduct);

router.delete("/dashboard/:productId/delete", productControllers.deleteProduct);
5. separamos las rutas con los controladores en dos carpetas controlers donde iran todos los controladores de las rutas y routes donde iran las rutas.
6. crear los test con mongoMemoryServer     const { MongoMemoryServer } = require("mongodb-memory-server");
7. swager  documentar api con swager documentaremos todas las rutas creadas.
8. crear otra ruta pa el login.
instalamos las dependencias  
npm install bcrypt (para cifrar las contraseñas),
npm install express-session (manejar sessiones),
npm install connect-mongo (guardar siones en mongoDB)
9. crear rutas de login para fronted (react) con jwt && npm install jsonwebtoken bcrypt &&
y el .env con JWT_SECRET=miclave
10. subir fotos con cloudinary (npm i multer cloudinary)

