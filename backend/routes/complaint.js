const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Complaint = require("../models/Complaint");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const { sendComplaintSubmittedEmail, sendComplaintResolvedEmail } = require("../utils/emailService");


// =========================
// CREATE COMPLAINT
// =========================
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    const complaint = new Complaint({
      user: req.user.id,
      title,
      description
    });

    await complaint.save();

    // Send email to user
    try {
      await sendComplaintSubmittedEmail(req.user.email, title);
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // Don't fail the request if email fails
    }

    res.json({
      message: "Complaint submitted successfully",
      complaint
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// =========================
// GET MY COMPLAINTS
// =========================
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const complaints = await Complaint.find({
      user: req.user.id
    });

    res.json(complaints);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// =========================
// EDIT COMPLAINT
// =========================
router.put("/edit/:id", authMiddleware, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found"
      });
    }

    // only owner can edit
    if (complaint.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }

    complaint.title = req.body.title || complaint.title;
    complaint.description =
      req.body.description || complaint.description;

    const updatedComplaint = await complaint.save();

    res.json(updatedComplaint);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// =========================
// DELETE COMPLAINT
// =========================
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found"
      });
    }

    // only owner can delete
    if (complaint.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }

    await complaint.deleteOne();

    res.json({
      message: "Complaint deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// =========================
// ADMIN - GET ALL COMPLAINTS
// =========================
router.get(
  "/all",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const complaints = await Complaint.find()
        .populate("user", "email");

      res.json(complaints);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);


// =========================
// ADMIN - UPDATE STATUS
// =========================
router.put(
  "/update/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const complaint = await Complaint.findById(req.params.id).populate("user", "email");

      if (!complaint) {
        return res.status(404).json({
          message: "Complaint not found"
        });
      }

      const oldStatus = complaint.status;
      complaint.status =
        req.body.status || complaint.status;

      const updatedComplaint = await complaint.save();

      // Send email if status changed to Resolved
      if (oldStatus !== "Resolved" && complaint.status === "Resolved") {
        try {
          await sendComplaintResolvedEmail(complaint.user.email, complaint.title);
        } catch (emailError) {
          console.error('Failed to send resolution email:', emailError);
          // Don't fail the request if email fails
        }
      }

      res.json(updatedComplaint);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;