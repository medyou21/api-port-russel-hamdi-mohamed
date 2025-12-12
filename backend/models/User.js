const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true,
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true 
  },
  password: { 
    type: String, 
    required: true,
    minlength: 6
  },
}, { timestamps: true });

// 🔐 Hash du mot de passe avant sauvegarde
userSchema.pre("save", async function (next) {
  try {
    // Si le mot de passe n'est pas modifié → ne pas le rehacher
    if (!this.isModified("password")) return next();

    // Hash avec bcrypt
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
  } catch (err) {
    next(err);
  }
});

// 🔍 Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
