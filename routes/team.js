import express from "express";
import transporter from "../config/mail.js";

const router = express.Router();

router.post("/enroll", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    await transporter.sendMail({
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to: email,
      subject: "Exciting Team Opportunities at NexLume",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <p>Dear Candidate,</p>

          <p>
  Thank you for showing interest in <strong>NexLume</strong>!
  We are excited to offer internship opportunities for passionate
  individuals eager to gain hands-on experience in a fast-growing
  startup environment.
</p>

<h3>🌟 How to Apply?</h3>
<p>
  <a
    href="https://forms.gle/guHb8ZoeM1ybnSe98"
    style="color:#0073e6; text-decoration:none;"
  >
    Apply Here
  </a>
</p>

<h3>💡 Why Intern at NexLume?</h3>
<ul>
  <li>Work on real projects</li>
  <li>Practical experience</li>
  <li>Mentorship & growth</li>
</ul>

<p>
  Best regards,<br>
  <strong>The NexLume Team</strong>
</p>

<img
  src="https://res.cloudinary.com/da2ufcgyv/image/upload/v1738524093/jutgcwfol612xoxfgfnh.jpg"
  alt="NexLume Logo"
  style="width:150px; margin-top:10px;"
/>

<p style="font-size:12px; color:#777;">
  This is an automated email. Please do not reply.
</p>
</div>
      `,
    });

    res.json({ message: "Enrollment email sent successfully" });
  } catch (error) {
    console.error("SMTP error:", error);
    res.status(500).json({ message: "Email failed" });
  }
});

export default router;
