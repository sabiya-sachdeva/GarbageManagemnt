require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.static("public"));
const bcrypt = require("bcrypt");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const connectDb = require("../Db/Db.js");
const Waste = require("../models/Waste.js");
const JWT_SECRET = process.env.JWT_SECRET;
const router = express.Router();

// Middleware to verify the token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Token is invalid or expired" });
      }
      req.user = decoded; // Add decoded token payload to request object
      next();
    });
  } else {
    res.status(401).json({ error: "A token is required for authentication" });
  }
};

// Register User  for new user
router.post("/register", async (req, res) => {
  const { fname, lname, email, password, usertype } = req.body;

  if (!fname || !lname || !email || !password || !usertype) {
    return res.status(400).json({ error: "Please fill all required fields" });
  }

  try {
    await connectDb();
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ error: "Email already exists" });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fname,
      lname,
      email,
      password: hashedPassword,
      usertype,
    });

    await user.save();
    const token = jwt.sign({ userId: user._id, usertype }, JWT_SECRET, {
      expiresIn: "12h",
    });
    res.status(201).json({ token });
    //res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please provide email and password" });
  }

  try {
    await connectDb();
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // User matched, create JWT payload
    const tokenPayload = {
      userId: user._id,
      usertype: user.usertype,
      firstName: user.fname,
    };

    // Sign the token
    const token = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: "12h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const path = require("path");

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, './uploads');
    cb(null, "uploads"); // Save uploaded files to the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename uploaded files with a unique name
  },
});

const upload = multer({ storage: storage });
router.post(
  "/uploadImage",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    try {
      const imagePath = req.file ? req.file.path : ""; // Check if req.file exists
      const userEmail = req.body.email; // Assuming the email is sent as part of the request body
      if (!userEmail) {
        return res.status(400).json({ error: "Email is required" });
      }
      await connectDb();
      const existingUser = await User.findOne({ email: userEmail });
      if (existingUser) {
        // Update the existing user's profile image
        existingUser.profileimg = imagePath;
        await existingUser.save();
        res.status(200).json({ message: "Profile image updated successfully" });
      } else {
        // Create a new user with the provided email and profile image
        const user = new User({ email: userEmail, profileimg: imagePath });
        await user.save();
        res.status(201).json({
          message: "User created and profile image saved",
          newImagePath: imagePath,
        });
      }
    } catch (err) {
      console.error("Error uploading image:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.post(
  "/submit",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    const {
      name,
      contactno,
      address,
      pincode,
      email,
      pickupdate,
      wasteDetails
    } = req.body;
    const imagePath = req.file ? req.file.path : ""; // Check if req.file exists
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
     }
    try {
      await connectDb();
      const waste = new Waste({
        user: req.user.userId,
        useremail: user.email,
        userfullname: `${user.fname} ${user.lname}`,
        wasteDetails: JSON.parse(wasteDetails), //Array of objects so parse a json object to string
        imagePath,
        address,
        pincode,
        contactno,
        pickupdate,
        });
      await waste.save(); //save to database
      res.status(201).json({ message: "data saved" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

const uploadsPath = path.join(__dirname, "..", "uploads"); // Assuming the uploads folder is located at the root level of your project
router.use("/uploads", express.static(uploadsPath));
// router.use('/uploads',express.static('uploads'))
router.get("/user", async (req, res) => {
  try {
    await connectDb();
    const userdata = await Waste.find();
    if (!userdata) {
      // Handle case where no data is found
      return res.status(404).json({ message: "No user data found" });
    }

    const usersWithImageUrl = userdata.map((user) => {
      return {
        ...user._doc,
        imagePath: `/uploads/${user.imagePath}`,

        // Modify imagePath to contain the URL
      };
    });

    res.json(usersWithImageUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//forget password

router.post("/forgotpass", async (req, res) => {
  const { email, currentPassword, newPassword, confirmPassword } = req.body;

  try {
    await connectDb();
    // Check if the user exists with the provided email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Email id not exist" });
    }

    // Validate the new password and confirm password
    if (newPassword !== confirmPassword) {
      return res.status(422).json({ error: "Passwords do not match" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password with the hashed new password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Get user details after login
router.get("/userdetails", verifyToken, async (req, res) => {
  try {
    await connectDb();
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({
      firstName: user.fname,
      lastName: user.lname,
      email: user.email,
      usertype: user.usertype,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Failed to fetch user details" });
  }
});

// Update User Profile (firstName, lastName, email)
router.put("/updateProfile", verifyToken, async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.fname = firstName;
    user.lname = lastName;
    user.email = email;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Change password
router.put("/updatePassword", verifyToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.userId;
    console.log(currentPassword);

    // Fetch user from the database
    const user = await User.findById(userId); // Check if the current password provided by the user matches the one in the database
    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    // Return success response
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/searchwaste", async (req, res) => {
  const { types } = req.query; // "types" will be a comma-separated string of selected waste types
  try {
    await connectDb();
    let query = { status: "Pending" };

    if (types) {
      const typesArray = types.split(","); // Convert the string into an array of types
      query.typeofwaste = { $in: typesArray };
    }

    const filteredData = await Waste.find(query);

    // Format imagePath to contain the URL
    const filteredDataWithImageUrl = filteredData.map((user) => ({
      ...user._doc,
      imagePath: `/uploads/${user.imagePath}`,
    }));

    res.json(filteredDataWithImageUrl);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//For waste details page
router.get("/wastedetails/:id", async (req, res) => {
  try {
    await connectDb();
    const wasteId = req.params.id;
    const waste = await Waste.findById(wasteId);
    if (!waste) {
      return res.status(404).json({ error: "Waste not found" });
    }
    res.json(waste);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/trackOrders", verifyToken, async (req, res) => {
  try {
    await connectDb();
    let orders;

    // Check if the user ID from the token exists in the database
    const userExists = await User.findById(req.user.userId);
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    if (req.user.usertype === "user") {
      orders = await Waste.find({ user: req.user.userId }).populate(
        "user",
        "userfullname useremail"
      );
    } else if (req.user.usertype === "collector") {
      orders = await Waste.find({
        "collectorDetails.collectorId": req.user.userId,
      });
    } else {
      return res.status(400).json({ error: "Invalid User Type" });
    }
    res.json(orders);
  } catch (error) {
    console.error("Error fetching user's orders:", error);
    res.status(500).send("Internal Server Error");
  }
});

// PUT request to update waste information
router.put("/waste/:id/confirm", verifyToken, async (req, res) => {
  const { collectorName, collectorEmail, collectorContact } = req.body;
  const wasteId = req.params.id;
  const collectorId = req.user.userId;

  try {
    await connectDb();
    const updatedWaste = await Waste.findByIdAndUpdate(
      wasteId,
      {
        $set: {
          status: "Confirmed",
          collectorDetails: {
            collectorName,
            collectorEmail,
            collectorContact,
            collectorId,
          },
        },
      },
      { new: true }
    );
    res.json(updatedWaste);
  } catch (error) {
    console.error("Error updating waste:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Cancel order
router.put("/waste/:orderId/cancel", verifyToken, async (req, res) => {
  try {
    await connectDb();
    const { orderId } = req.params;
    const updatedOrder = await Waste.findByIdAndUpdate(
      orderId,
      { status: "Cancelled" },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).send("Internal Server Error");
  }
});




// router.get('*',(req,res)=>{
//   res.send("Sorry, this is a invalid URL");
// })

// Complete order
router.put("/waste/:orderId/complete", verifyToken, async (req, res) => {
  try {
    await connectDb();
    const { orderId } = req.params;
    const updatedOrder = await Waste.findByIdAndUpdate(
      orderId,
      { status: "Completed" },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
