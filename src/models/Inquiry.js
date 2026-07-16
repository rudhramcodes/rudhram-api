const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: 100,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },

    countryCode: {
      type: String,
      required: [true, "Country code is required"],
      trim: true,
    },

    message: {
      type: String,
      trim: true,
      maxlength: 5000,
    },

    status: {
      type: String,
      enum: ["new", "reviewed", "contacted", "closed"],
      default: "new",
    },
    
    teamNotified: { type: Boolean, default: false },
    userAcknowledged: { type: Boolean, default: false },

  },
  {
    timestamps: true, // adds createdAt + updatedAt
  },
);

// Index for sorting by newest first
inquirySchema.index({ createdAt: -1 });

module.exports = mongoose.model("Inquiry", inquirySchema);
